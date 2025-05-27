
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Form, FormField, FormItem, FormLabel, FormControl, FormMessage } from '@/components/ui/form';
import { studentSchema, StudentFormData } from '@/schemas/studentSchema';
import { useStudentStore } from '@/stores/useStudentStore';
import { toast } from '@/components/ui/use-toast';

interface StudentFormProps {
  onClose: () => void;
  editingStudent?: any;
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
      endereco: editingStudent.endereco,
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

  const onSubmit = async (data: StudentFormData) => {
    setIsSubmitting(true);
    
    try {
      if (editingStudent) {
        updateStudent(editingStudent.id, {
          ...data,
          foto: editingStudent.foto || `https://ui-avatars.com/api/?name=${encodeURIComponent(data.nome)}&background=3b82f6&color=fff`
        });
        toast({
          title: "Aluno atualizado",
          description: "Os dados do aluno foram atualizados com sucesso.",
        });
      } else {
        addStudent({
          id: Date.now().toString(),
          ...data,
          curso: undefined,
          turma: undefined,
          progresso: 0,
          foto: `https://ui-avatars.com/api/?name=${encodeURIComponent(data.nome)}&background=3b82f6&color=fff`,
          dataMatricula: new Date().toISOString().split('T')[0],
          presencaGeral: 0,
          aulasAssistidas: 0,
          aproveitamento: 0,
          certificadoDisponivel: false
        });
        toast({
          title: "Aluno criado",
          description: "O aluno foi criado com sucesso.",
        });
      }
      
      onClose();
    } catch (error) {
      toast({
        title: "Erro",
        description: "Ocorreu um erro ao salvar o aluno. Tente novamente.",
        variant: "destructive"
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const formatCPF = (value: string) => {
    const digits = value.replace(/\D/g, '');
    return digits.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, '$1.$2.$3-$4');
  };

  const formatPhone = (value: string) => {
    const digits = value.replace(/\D/g, '');
    if (digits.length <= 10) {
      return digits.replace(/(\d{2})(\d{4})(\d{4})/, '($1) $2-$3');
    }
    return digits.replace(/(\d{2})(\d{5})(\d{4})/, '($1) $2-$3');
  };

  const formatCEP = (value: string) => {
    const digits = value.replace(/\D/g, '');
    return digits.replace(/(\d{5})(\d{3})/, '$1-$2');
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
                    <Input 
                      placeholder="000.000.000-00"
                      {...field}
                      onChange={(e) => {
                        const formatted = formatCPF(e.target.value);
                        field.onChange(formatted);
                      }}
                      maxLength={14}
                    />
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
                    <Input 
                      placeholder="(00) 00000-0000"
                      {...field}
                      onChange={(e) => {
                        const formatted = formatPhone(e.target.value);
                        field.onChange(formatted);
                      }}
                      maxLength={15}
                    />
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
                    <Input type="email" placeholder="aluno@email.com" {...field} />
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

          {/* Endereço */}
          <div className="space-y-4 p-4 border rounded-lg">
            <h3 className="font-medium">Endereço</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <FormField
                control={form.control}
                name="endereco.rua"
                render={({ field }) => (
                  <FormItem className="md:col-span-2">
                    <FormLabel>Rua</FormLabel>
                    <FormControl>
                      <Input placeholder="Nome da rua" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

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

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <FormField
                control={form.control}
                name="endereco.bairro"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Bairro</FormLabel>
                    <FormControl>
                      <Input placeholder="Bairro" {...field} />
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
                      <Input placeholder="Cidade" {...field} />
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

            <FormField
              control={form.control}
              name="endereco.cep"
              render={({ field }) => (
                <FormItem className="md:w-1/3">
                  <FormLabel>CEP</FormLabel>
                  <FormControl>
                    <Input 
                      placeholder="00000-000"
                      {...field}
                      onChange={(e) => {
                        const formatted = formatCEP(e.target.value);
                        field.onChange(formatted);
                      }}
                      maxLength={9}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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

          <FormField
            control={form.control}
            name="observacoes"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Observações</FormLabel>
                <FormControl>
                  <Input placeholder="Observações adicionais (opcional)" {...field} />
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
