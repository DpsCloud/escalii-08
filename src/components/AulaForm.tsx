import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Form, FormField, FormItem, FormLabel, FormControl, FormMessage } from '@/components/ui/form';
import { toast } from '@/components/ui/use-toast';
import { Aula, Material } from '@/types/course';
import { useAulaStore } from '@/stores/useAulaStore';
import { Plus, Trash2, FileText, Tag } from 'lucide-react';

const aulaSchema = z.object({
  titulo: z.string().min(1, "Título é obrigatório"),
  descricao: z.string().min(1, "Descrição é obrigatória"),
  duracao: z.number().min(1, "Duração deve ser maior que 0"),
  videoUrl: z.string().optional(),
  status: z.enum(['ativa', 'planejada', 'concluida', 'agendada', 'em_andamento', 'finalizada', 'cancelada']),
  categoria: z.string().optional(),
  tags: z.string().optional(),
});

type AulaFormData = z.infer<typeof aulaSchema>;

interface AulaFormProps {
  onClose: () => void;
  editingAula?: Aula;
}

export const AulaForm = ({ onClose, editingAula }: AulaFormProps) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [materiais, setMateriais] = useState<Material[]>(editingAula?.materiais || []);
  const { addAula, updateAula } = useAulaStore();

  const form = useForm<AulaFormData>({
    resolver: zodResolver(aulaSchema),
    defaultValues: editingAula ? {
      titulo: editingAula.titulo,
      descricao: editingAula.descricao,
      duracao: editingAula.duracao,
      videoUrl: editingAula.videoUrl || '',
      status: editingAula.status,
      categoria: editingAula.categoria || '',
      tags: editingAula.tags?.join(', ') || ''
    } : {
      titulo: '',
      descricao: '',
      duracao: 120,
      videoUrl: '',
      status: 'planejada' as const,
      categoria: '',
      tags: ''
    }
  });

  const adicionarMaterial = () => {
    const novoMaterial: Material = {
      id: Date.now().toString(),
      nome: '',
      tipo: 'pdf',
      url: '',
      aulaId: editingAula?.id || ''
    };
    setMateriais([...materiais, novoMaterial]);
  };

  const removerMaterial = (index: number) => {
    setMateriais(materiais.filter((_, i) => i !== index));
  };

  const atualizarMaterial = (index: number, campo: keyof Material, valor: string) => {
    const novosMateirais = [...materiais];
    (novosMateirais[index] as any)[campo] = valor;
    setMateriais(novosMateirais);
  };

  const onSubmit = async (data: AulaFormData) => {
    setIsSubmitting(true);
    
    try {
      const aulaId = editingAula?.id || Date.now().toString();
      const tags = data.tags ? data.tags.split(',').map(tag => tag.trim()).filter(Boolean) : [];
      
      const aulaData: Aula = {
        id: aulaId,
        titulo: data.titulo,
        descricao: data.descricao,
        duracao: data.duracao,
        videoUrl: data.videoUrl || undefined,
        materiais: materiais.map(m => ({ ...m, aulaId })),
        status: data.status,
        categoria: data.categoria || '',
        tags,
        createdAt: editingAula?.createdAt || new Date().toISOString(),
        updatedAt: new Date().toISOString()
      };

      if (editingAula) {
        updateAula(editingAula.id, aulaData);
      } else {
        addAula(aulaData);
      }
      
      toast({
        title: editingAula ? "Aula atualizada" : "Aula criada",
        description: editingAula ? "A aula foi atualizada com sucesso." : "A aula foi criada com sucesso.",
      });
      
      onClose();
    } catch (error) {
      toast({
        title: "Erro",
        description: "Ocorreu um erro ao salvar a aula. Tente novamente.",
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
          {editingAula ? 'Editar Aula' : 'Nova Aula'}
        </h2>
        <p className="text-sm text-gray-600">
          Crie uma aula independente que pode ser reutilizada em diferentes cursos
        </p>
      </div>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <FormField
            control={form.control}
            name="titulo"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Título da Aula</FormLabel>
                <FormControl>
                  <Input placeholder="Digite o título da aula" {...field} />
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
                  <Textarea 
                    placeholder="Descrição detalhada da aula" 
                    className="min-h-[100px]"
                    {...field} 
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <FormField
              control={form.control}
              name="duracao"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Duração (minutos)</FormLabel>
                  <FormControl>
                    <Input 
                      type="number" 
                      placeholder="120" 
                      {...field}
                      onChange={(e) => field.onChange(parseInt(e.target.value) || 120)}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="categoria"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Categoria (opcional)</FormLabel>
                  <FormControl>
                    <Input placeholder="Ex: Fundamentos, Caráter..." {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

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
                      <SelectItem value="planejada">Planejada</SelectItem>
                      <SelectItem value="ativa">Ativa</SelectItem>
                      <SelectItem value="concluida">Concluída</SelectItem>
                      <SelectItem value="agendada">Agendada</SelectItem>
                      <SelectItem value="em_andamento">Em Andamento</SelectItem>
                      <SelectItem value="finalizada">Finalizada</SelectItem>
                      <SelectItem value="cancelada">Cancelada</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <FormField
            control={form.control}
            name="tags"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="flex items-center gap-2">
                  <Tag className="h-4 w-4" />
                  Tags (separadas por vírgula)
                </FormLabel>
                <FormControl>
                  <Input placeholder="liderança, fundamentos, caráter..." {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="videoUrl"
            render={({ field }) => (
              <FormItem>
                <FormLabel>URL do Vídeo (opcional)</FormLabel>
                <FormControl>
                  <Input placeholder="https://..." {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Seção de Materiais */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-md font-medium">Materiais da Aula</h3>
              <Button type="button" variant="outline" size="sm" onClick={adicionarMaterial}>
                <Plus className="h-4 w-4 mr-2" />
                Adicionar Material
              </Button>
            </div>

            {materiais.map((material, index) => (
              <div key={index} className="border rounded-lg p-4 space-y-3">
                <div className="flex items-center justify-between">
                  <h4 className="text-sm font-medium flex items-center gap-2">
                    <FileText className="h-4 w-4" />
                    Material {index + 1}
                  </h4>
                  <Button 
                    type="button" 
                    variant="ghost" 
                    size="sm" 
                    onClick={() => removerMaterial(index)}
                    className="text-red-600 hover:text-red-800"
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  <Input
                    placeholder="Nome do material"
                    value={material.nome}
                    onChange={(e) => atualizarMaterial(index, 'nome', e.target.value)}
                  />
                  <Select 
                    value={material.tipo} 
                    onValueChange={(value) => atualizarMaterial(index, 'tipo', value)}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="pdf">PDF</SelectItem>
                      <SelectItem value="video">Vídeo</SelectItem>
                      <SelectItem value="link">Link</SelectItem>
                      <SelectItem value="documento">Documento</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <Input
                  placeholder="URL ou caminho do material"
                  value={material.url}
                  onChange={(e) => atualizarMaterial(index, 'url', e.target.value)}
                />
                
                <Input
                  placeholder="Descrição (opcional)"
                  value={material.descricao || ''}
                  onChange={(e) => atualizarMaterial(index, 'descricao', e.target.value)}
                />
              </div>
            ))}
          </div>

          <div className="flex gap-3 pt-4">
            <Button type="submit" disabled={isSubmitting} className="flex-1">
              {isSubmitting ? 'Salvando...' : (editingAula ? 'Atualizar' : 'Criar')}
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
