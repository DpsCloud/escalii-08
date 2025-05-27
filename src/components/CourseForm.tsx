
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Form, FormField, FormItem, FormLabel, FormControl, FormMessage } from '@/components/ui/form';
import { courseSchema, CourseFormData } from '@/schemas/courseSchema';
import { useCourseStore } from '@/stores/useCourseStore';
import { toast } from '@/components/ui/use-toast';
import { Course } from '@/types/course';

interface CourseFormProps {
  onClose: () => void;
  editingCourse?: Course;
}

export const CourseForm = ({ onClose, editingCourse }: CourseFormProps) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { addCourse, updateCourse } = useCourseStore();

  const form = useForm<CourseFormData>({
    resolver: zodResolver(courseSchema),
    defaultValues: editingCourse ? {
      nome: editingCourse.nome,
      descricao: editingCourse.descricao,
      tipo: editingCourse.tipo,
      periodo: editingCourse.periodo,
      dataInicio: editingCourse.dataInicio,
      dataFim: editingCourse.dataFim,
      totalAulas: editingCourse.totalAulas,
      cargaHoraria: editingCourse.cargaHoraria,
      maxAlunos: editingCourse.maxAlunos,
      status: editingCourse.status
    } : {
      nome: '',
      descricao: '',
      tipo: 'capacitacao',
      periodo: '',
      dataInicio: '',
      dataFim: '',
      totalAulas: 8,
      cargaHoraria: 32,
      maxAlunos: 40,
      status: 'planejado'
    }
  });

  const onSubmit = async (data: CourseFormData) => {
    setIsSubmitting(true);
    
    try {
      if (editingCourse) {
        updateCourse(editingCourse.id, data);
        toast({
          title: "Curso atualizado",
          description: "Os dados do curso foram atualizados com sucesso.",
        });
      } else {
        const newCourse: Course = {
          id: Date.now().toString(),
          nome: data.nome,
          descricao: data.descricao,
          tipo: data.tipo,
          periodo: data.periodo,
          dataInicio: data.dataInicio,
          dataFim: data.dataFim,
          totalAulas: data.totalAulas,
          cargaHoraria: data.cargaHoraria,
          maxAlunos: data.maxAlunos,
          status: data.status,
          inscricoesAbertas: false,
          alunosInscritos: 0,
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
          Preencha os dados do curso abaixo
        </p>
      </div>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <FormField
            control={form.control}
            name="nome"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Nome do Curso</FormLabel>
                <FormControl>
                  <Input placeholder="Digite o nome do curso" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="descricao"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Descrição</FormLabel>
                <FormControl>
                  <Input placeholder="Descrição detalhada do curso" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
              name="periodo"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Período</FormLabel>
                  <FormControl>
                    <Input placeholder="2025.1" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

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

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <FormField
              control={form.control}
              name="totalAulas"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Total de Aulas</FormLabel>
                  <FormControl>
                    <Input 
                      type="number" 
                      placeholder="8" 
                      {...field}
                      onChange={(e) => field.onChange(parseInt(e.target.value) || 0)}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="cargaHoraria"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Carga Horária</FormLabel>
                  <FormControl>
                    <Input 
                      type="number" 
                      placeholder="32" 
                      {...field}
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
