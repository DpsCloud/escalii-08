
import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Form, FormField, FormItem, FormLabel, FormControl, FormMessage } from '@/components/ui/form';
import { Checkbox } from '@/components/ui/checkbox';
import { courseSchema, CourseFormData } from '@/schemas/courseSchema';
import { useCourseStore } from '@/stores/useCourseStore';
import { useAulaStore } from '@/stores/useAulaStore';
import { toast } from '@/components/ui/use-toast';
import { Course, ANOS_DISPONIVEIS, PERIODOS_DISPONIVEIS, DIAS_SEMANA, gerarNomeCurso, gerarDescricaoCurso, gerarTurma, TipoCurso, AnoDisponivel, PeriodoDisponivel, DiaSemana } from '@/types/course';

interface CourseFormProps {
  onClose: () => void;
  editingCourse?: Course;
}

export const CourseForm = ({ onClose, editingCourse }: CourseFormProps) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [turmaCustomizada, setTurmaCustomizada] = useState(false);
  const { addCourse, updateCourse } = useCourseStore();
  const { aulas } = useAulaStore();

  const form = useForm<CourseFormData>({
    resolver: zodResolver(courseSchema),
    defaultValues: editingCourse ? {
      tipo: editingCourse.tipo,
      ano: editingCourse.ano,
      periodo: editingCourse.periodo,
      turmaCustomizada: editingCourse.turma !== gerarTurma(editingCourse.ano, editingCourse.periodo) ? editingCourse.turma : undefined,
      dataInicio: editingCourse.dataInicio,
      dataFim: editingCourse.dataFim,
      totalAulas: editingCourse.totalAulas,
      maxAlunos: editingCourse.maxAlunos,
      status: editingCourse.status,
      diasSemana: editingCourse.diasSemana as DiaSemana[],
      aulasSelecionadas: editingCourse.aulasSelecionadas
    } : {
      tipo: 'capacitacao' as TipoCurso,
      ano: '2025' as AnoDisponivel,
      periodo: '1' as PeriodoDisponivel,
      dataInicio: '',
      dataFim: '',
      totalAulas: 8,
      maxAlunos: 40,
      status: 'planejado' as const,
      diasSemana: [],
      aulasSelecionadas: []
    }
  });

  // Observar mudanças no tipo, ano e período para gerar nome/descrição automaticamente
  const tipoValue = form.watch('tipo');
  const anoValue = form.watch('ano');
  const periodoValue = form.watch('periodo');
  const turmaCustomizadaValue = form.watch('turmaCustomizada');
  const aulasSelecionadas = form.watch('aulasSelecionadas') || [];

  // Calcular carga horária automaticamente baseada nas aulas selecionadas
  const cargaHorariaCalculada = aulasSelecionadas.reduce((total, aulaId) => {
    const aula = aulas.find(a => a.id === aulaId);
    return total + (aula ? Math.round(aula.duracao / 60) : 0);
  }, 0);

  // Atualizar total de aulas quando aulas são selecionadas
  useEffect(() => {
    form.setValue('totalAulas', aulasSelecionadas.length);
  }, [aulasSelecionadas, form]);

  const turmaFinal = turmaCustomizada && turmaCustomizadaValue ? turmaCustomizadaValue : gerarTurma(anoValue, periodoValue);

  const onSubmit = async (data: CourseFormData) => {
    setIsSubmitting(true);
    
    try {
      const turmaDefinitiva = data.turmaCustomizada || gerarTurma(data.ano, data.periodo);
      
      if (editingCourse) {
        const updatedCourse = {
          ...editingCourse,
          nome: gerarNomeCurso(data.tipo, turmaDefinitiva),
          descricao: gerarDescricaoCurso(data.tipo, turmaDefinitiva),
          tipo: data.tipo,
          ano: data.ano,
          periodo: data.periodo,
          turma: turmaDefinitiva,
          dataInicio: data.dataInicio,
          dataFim: data.dataFim,
          totalAulas: data.totalAulas,
          cargaHoraria: cargaHorariaCalculada,
          maxAlunos: data.maxAlunos,
          status: data.status,
          diasSemana: data.diasSemana,
          aulasSelecionadas: data.aulasSelecionadas,
          updatedAt: new Date().toISOString()
        };
        
        updateCourse(editingCourse.id, updatedCourse);
        toast({
          title: "Curso atualizado",
          description: "Os dados do curso foram atualizados com sucesso.",
        });
      } else {
        const newCourse: Course = {
          id: Date.now().toString(),
          nome: gerarNomeCurso(data.tipo, turmaDefinitiva),
          descricao: gerarDescricaoCurso(data.tipo, turmaDefinitiva),
          tipo: data.tipo,
          ano: data.ano,
          periodo: data.periodo,
          turma: turmaDefinitiva,
          dataInicio: data.dataInicio,
          dataFim: data.dataFim,
          totalAulas: data.totalAulas,
          cargaHoraria: cargaHorariaCalculada,
          maxAlunos: data.maxAlunos,
          status: data.status,
          inscricoesAbertas: false,
          alunosInscritos: 0,
          diasSemana: data.diasSemana,
          aulasSelecionadas: data.aulasSelecionadas,
          turmas: [],
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString()
        };
        
        addCourse(newCourse);
        toast({
          title: "Curso criado",
          description: "O curso foi criado com sucesso.",
        });
      }
      
      onClose();
    } catch (error) {
      toast({
        title: "Erro",
        description: "Ocorreu um erro ao salvar o curso. Tente novamente.",
        variant: "destructive"
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-lg font-semibold">
          {editingCourse ? 'Editar Curso' : 'Novo Curso'}
        </h2>
        <p className="text-sm text-gray-600">
          Preencha os dados do curso abaixo. Nome e descrição serão gerados automaticamente.
        </p>
      </div>

      {/* Preview do curso */}
      <div className="bg-blue-50 p-4 rounded-lg border">
        <h3 className="font-medium text-blue-900 mb-2">Pré-visualização do Curso:</h3>
        <p className="text-blue-800 font-medium">{gerarNomeCurso(tipoValue, turmaFinal)}</p>
        <p className="text-blue-700 text-sm mt-1">{gerarDescricaoCurso(tipoValue, turmaFinal)}</p>
        <p className="text-blue-600 text-sm mt-2">Carga Horária Calculada: {cargaHorariaCalculada}h</p>
      </div>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          {/* Tipo e Turma */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <FormField
              control={form.control}
              name="tipo"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Tipo do Curso</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Selecione o tipo" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="capacitacao">Capacitação</SelectItem>
                      <SelectItem value="revalidacao">Revalidação</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="ano"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Ano</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Selecione o ano" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {ANOS_DISPONIVEIS.map((ano) => (
                        <SelectItem key={ano} value={ano}>{ano}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="periodo"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Período</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Selecione o período" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {PERIODOS_DISPONIVEIS.map((periodo) => (
                        <SelectItem key={periodo} value={periodo}>
                          {periodo === 'revalida' ? 'Revalidação' : `${periodo}º Período`}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          {/* Turma customizada */}
          <div className="space-y-2">
            <div className="flex items-center space-x-2">
              <Checkbox 
                id="turma-customizada" 
                checked={turmaCustomizada}
                onCheckedChange={(checked) => setTurmaCustomizada(checked === true)}
              />
              <label htmlFor="turma-customizada" className="text-sm font-medium">
                Usar turma customizada
              </label>
            </div>
            {turmaCustomizada && (
              <FormField
                control={form.control}
                name="turmaCustomizada"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Turma Customizada</FormLabel>
                    <FormControl>
                      <Input placeholder="Ex: 2025.especial" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            )}
          </div>

          {/* Datas */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <FormField
              control={form.control}
              name="dataInicio"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Data de Início</FormLabel>
                  <FormControl>
                    <Input type="date" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="dataFim"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Data de Fim</FormLabel>
                  <FormControl>
                    <Input type="date" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          {/* Dias da semana */}
          <FormField
            control={form.control}
            name="diasSemana"
            render={() => (
              <FormItem>
                <FormLabel>Dias da Semana das Aulas</FormLabel>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
                  {DIAS_SEMANA.map((dia) => (
                    <FormField
                      key={dia}
                      control={form.control}
                      name="diasSemana"
                      render={({ field }) => {
                        return (
                          <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                            <FormControl>
                              <Checkbox
                                checked={field.value?.includes(dia)}
                                onCheckedChange={(checked) => {
                                  return checked
                                    ? field.onChange([...field.value, dia])
                                    : field.onChange(
                                        field.value?.filter(
                                          (value) => value !== dia
                                        )
                                      )
                                }}
                              />
                            </FormControl>
                            <FormLabel className="text-sm font-normal capitalize">
                              {dia}
                            </FormLabel>
                          </FormItem>
                        )
                      }}
                    />
                  ))}
                </div>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Seleção de Aulas */}
          <FormField
            control={form.control}
            name="aulasSelecionadas"
            render={() => (
              <FormItem>
                <FormLabel>Aulas do Curso</FormLabel>
                <div className="max-h-60 overflow-y-auto border rounded-lg p-4 space-y-2">
                  {aulas.length > 0 ? aulas.map((aula) => (
                    <FormField
                      key={aula.id}
                      control={form.control}
                      name="aulasSelecionadas"
                      render={({ field }) => {
                        return (
                          <FormItem className="flex flex-row items-start space-x-3 space-y-0 p-2 border rounded hover:bg-gray-50">
                            <FormControl>
                              <Checkbox
                                checked={field.value?.includes(aula.id)}
                                onCheckedChange={(checked) => {
                                  return checked
                                    ? field.onChange([...field.value, aula.id])
                                    : field.onChange(
                                        field.value?.filter(
                                          (value) => value !== aula.id
                                        )
                                      )
                                }}
                              />
                            </FormControl>
                            <div className="flex-1">
                              <FormLabel className="text-sm font-medium">
                                {aula.titulo}
                              </FormLabel>
                              <p className="text-xs text-gray-500">{aula.descricao}</p>
                              <p className="text-xs text-blue-600">{aula.duracao} min</p>
                            </div>
                          </FormItem>
                        )
                      }}
                    />
                  )) : (
                    <p className="text-sm text-gray-500 text-center py-4">
                      Nenhuma aula disponível. Crie aulas primeiro na aba Aulas.
                    </p>
                  )}
                </div>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Configurações do curso */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <FormField
              control={form.control}
              name="totalAulas"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Total de Aulas (Calculado)</FormLabel>
                  <FormControl>
                    <Input 
                      type="number" 
                      {...field}
                      value={aulasSelecionadas.length}
                      readOnly
                      className="bg-gray-100"
                      onChange={(e) => field.onChange(parseInt(e.target.value) || 0)}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="maxAlunos"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Máximo de Alunos</FormLabel>
                  <FormControl>
                    <Input 
                      type="number" 
                      placeholder="40" 
                      {...field}
                      onChange={(e) => field.onChange(parseInt(e.target.value) || 0)}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <FormField
            control={form.control}
            name="status"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Status</FormLabel>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Selecione o status" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="planejado">Planejado</SelectItem>
                    <SelectItem value="ativo">Ativo</SelectItem>
                    <SelectItem value="finalizado">Finalizado</SelectItem>
                    <SelectItem value="cancelado">Cancelado</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className="flex gap-3 pt-4">
            <Button type="submit" disabled={isSubmitting} className="flex-1">
              {isSubmitting ? 'Salvando...' : (editingCourse ? 'Atualizar' : 'Criar')}
            </Button>
            <Button type="button" variant="outline" onClick={onClose} className="flex-1">
              Cancelar
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
};
