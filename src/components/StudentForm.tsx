
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Form, FormField, FormItem, FormLabel, FormControl, FormMessage } from '@/components/ui/form';
import { Textarea } from '@/components/ui/textarea';
import { toast } from '@/hooks/use-toast';
import { Student } from '@/types/student';
import { useStudentStore } from '@/stores/useStudentStore';
import { studentSchema, StudentFormData } from '@/schemas/studentSchema';

interface StudentFormProps {
  onClose: () => void;
  editingStudent?: Student;
}

export const StudentForm = ({ onClose, editingStudent }: StudentFormProps) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { addStudent, updateStudent } = useStudentStore();

  const form = useForm<StudentFormData>({
    resolver: zodResolver(studentSchema),
    defaultValues: editingStudent ? {
      nome: editingStudent.nome,
      cpf: editingStudent.cpf,
      email: editingStudent.email,
      telefone: editingStudent.telefone,
      dataNascimento: editingStudent.dataNascimento,
      endereco: {
        rua: editingStudent.endereco?.rua || '',
        numero: editingStudent.endereco?.numero || '',
        bairro: editingStudent.endereco?.bairro || '',
        cidade: editingStudent.endereco?.cidade || '',
        cep: editingStudent.endereco?.cep || '',
        estado: editingStudent.endereco?.estado || ''
      },
      status: editingStudent.status,
      observacoes: editingStudent.observacoes || ''
    } : {
      nome: '',
      cpf: '',
      email: '',
      telefone: '',
      dataNascimento: '',
      endereco: {
        rua: '',
        numero: '',
        bairro: '',
        cidade: '',
        cep: '',
        estado: ''
      },
      status: 'pendente',
      observacoes: ''
    }
  });

  const [selectedCourse, setSelectedCourse] = useState(editingStudent?.curso || '');

  const onSubmit = async (data: StudentFormData) => {
    setIsSubmitting(true);
    
    try {
      const studentData: Student = {
        id: editingStudent?.id || Date.now().toString(),
        nome: data.nome,
        cpf: data.cpf,
        email: data.email,
        telefone: data.telefone,
        dataNascimento: data.dataNascimento,
        endereco: data.endereco && (data.endereco.rua || data.endereco.numero || data.endereco.bairro || data.endereco.cidade || data.endereco.cep || data.endereco.estado) ? {
          rua: data.endereco.rua || '',
          numero: data.endereco.numero || '',
          bairro: data.endereco.bairro || '',
          cidade: data.endereco.cidade || '',
          cep: data.endereco.cep || '',
          estado: data.endereco.estado || ''
        } : undefined,
        curso: selectedCourse || undefined,
        turma: editingStudent?.turma,
        progresso: editingStudent?.progresso || 0,
        status: data.status,
        foto: editingStudent?.foto || `https://ui-avatars.com/api/?name=${encodeURIComponent(data.nome)}&background=3b82f6&color=fff`,
        dataMatricula: editingStudent?.dataMatricula || new Date().toISOString().split('T')[0],
        presencaGeral: editingStudent?.presencaGeral || 0,
        aulasAssistidas: editingStudent?.aulasAssistidas || 0,
        aproveitamento: editingStudent?.aproveitamento || 0,
        certificadoDisponivel: editingStudent?.certificadoDisponivel || false,
        observacoes: data.observacoes
      };

      if (editingStudent) {
        updateStudent(editingStudent.id, studentData);
        toast({
          title: "Aluno atualizado",
          description: "Os dados do aluno foram atualizados com sucesso.",
        });
      } else {
        addStudent(studentData);
        toast({
          title: "Aluno criado",
          description: "O aluno foi criado com sucesso.",
        });
      }
      
      onClose();
    } catch (error) {
      console.error('Erro ao salvar aluno:', error);
      toast({
        title: "Erro",
        description: "Ocorreu um erro ao salvar o aluno. Tente novamente.",
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
          {editingStudent ? 'Editar Aluno' : 'Novo Aluno'}
        </h2>
        <p className="text-sm text-gray-600">
          Preencha os dados do aluno abaixo
        </p>
      </div>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          {/* Dados Pessoais */}
          <div className="space-y-4">
            <h3 className="text-md font-medium border-b pb-2">Dados Pessoais</h3>
            
            <FormField
              control={form.control}
              name="nome"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Nome Completo</FormLabel>
                  <FormControl>
                    <Input placeholder="Digite o nome completo" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="cpf"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>CPF</FormLabel>
                    <FormControl>
                      <Input placeholder="000.000.000-00" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="dataNascimento"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Data de Nascimento</FormLabel>
                    <FormControl>
                      <Input type="date" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input type="email" placeholder="email@exemplo.com" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="telefone"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Telefone</FormLabel>
                    <FormControl>
                      <Input placeholder="(00) 00000-0000" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </div>

          {/* Endereço */}
          <div className="space-y-4">
            <h3 className="text-md font-medium border-b pb-2">Endereço (Opcional)</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="md:col-span-2">
                <FormField
                  control={form.control}
                  name="endereco.rua"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Rua</FormLabel>
                      <FormControl>
                        <Input placeholder="Nome da rua" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <FormField
                control={form.control}
                name="endereco.numero"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Número</FormLabel>
                    <FormControl>
                      <Input placeholder="123" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="endereco.bairro"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Bairro</FormLabel>
                    <FormControl>
                      <Input placeholder="Nome do bairro" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="endereco.cidade"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Cidade</FormLabel>
                    <FormControl>
                      <Input placeholder="Nome da cidade" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="endereco.cep"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>CEP</FormLabel>
                    <FormControl>
                      <Input placeholder="00000-000" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="endereco.estado"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Estado</FormLabel>
                    <FormControl>
                      <Input placeholder="SP" maxLength={2} {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </div>

          {/* Informações Acadêmicas */}
          <div className="space-y-4">
            <h3 className="text-md font-medium border-b pb-2">Informações Acadêmicas</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="text-sm font-medium">Curso</label>
                <Select value={selectedCourse} onValueChange={setSelectedCourse}>
                  <SelectTrigger>
                    <SelectValue placeholder="Selecione um curso" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="">Nenhum curso</SelectItem>
                    <SelectItem value="ESCALI 2025.1">ESCALI 2025.1</SelectItem>
                    <SelectItem value="ESCALI 2024.2">ESCALI 2024.2</SelectItem>
                  </SelectContent>
                </Select>
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
                        <SelectItem value="ativo">Ativo</SelectItem>
                        <SelectItem value="pendente">Pendente</SelectItem>
                        <SelectItem value="formado">Formado</SelectItem>
                        <SelectItem value="inativo">Inativo</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </div>

          {/* Observações */}
          <FormField
            control={form.control}
            name="observacoes"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Observações</FormLabel>
                <FormControl>
                  <Textarea 
                    placeholder="Informações adicionais sobre o aluno"
                    className="min-h-[80px]"
                    {...field} 
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className="flex gap-3 pt-4">
            <Button type="submit" disabled={isSubmitting} className="flex-1">
              {isSubmitting ? 'Salvando...' : (editingStudent ? 'Atualizar' : 'Criar')}
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
