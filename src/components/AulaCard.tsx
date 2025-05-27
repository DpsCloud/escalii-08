
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Clock, FileText, Video, Edit, Trash2, Tag } from 'lucide-react';
import { Aula } from '@/types/course';
import { useAulaStore } from '@/stores/useAulaStore';
import { toast } from '@/components/ui/use-toast';

interface AulaCardProps {
  aula: Aula;
  onEdit: (aula: Aula) => void;
  showCategory?: boolean;
  showDelete?: boolean;
}

export const AulaCard = ({ aula, onEdit, showCategory = false, showDelete = true }: AulaCardProps) => {
  const { deleteAula } = useAulaStore();

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'ativa': return 'bg-green-100 text-green-800';
      case 'planejada': return 'bg-blue-100 text-blue-800';
      case 'concluida': return 'bg-gray-100 text-gray-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const handleDelete = () => {
    if (window.confirm('Tem certeza que deseja excluir esta aula?')) {
      deleteAula(aula.id);
      toast({
        title: "Aula excluída",
        description: "A aula foi excluída com sucesso.",
      });
    }
  };

  return (
    <div className="bg-white border rounded-lg p-4 hover:shadow-md transition-shadow">
      <div className="flex items-start justify-between mb-2">
        <h4 className="font-medium text-sm line-clamp-2">{aula.titulo}</h4>
        <div className="flex gap-1 flex-shrink-0">
          <Button
            size="sm"
            variant="ghost"
            onClick={() => onEdit(aula)}
            className="h-6 w-6 p-0"
          >
            <Edit className="h-3 w-3" />
          </Button>
          {showDelete && (
            <Button
              size="sm"
              variant="ghost"
              onClick={handleDelete}
              className="h-6 w-6 p-0 text-red-600 hover:text-red-800"
            >
              <Trash2 className="h-3 w-3" />
            </Button>
          )}
        </div>
      </div>
      
      <p className="text-xs text-gray-600 mb-3 line-clamp-2">
        {aula.descricao}
      </p>
      
      <div className="space-y-2">
        {showCategory && aula.categoria && (
          <div className="flex items-center justify-between text-xs">
            <span className="text-gray-500">Categoria:</span>
            <Badge variant="outline" className="text-xs">
              {aula.categoria}
            </Badge>
          </div>
        )}
        
        <div className="flex items-center justify-between text-xs">
          <span className="text-gray-500">Duração:</span>
          <span className="font-medium flex items-center gap-1">
            <Clock className="h-3 w-3" />
            {aula.duracao}min
          </span>
        </div>
        
        <div className="flex items-center justify-between text-xs">
          <span className="text-gray-500">Materiais:</span>
          <span className="font-medium flex items-center gap-1">
            <FileText className="h-3 w-3" />
            {aula.materiais?.length || 0}
          </span>
        </div>
        
        <div className="flex items-center justify-between text-xs">
          <span className="text-gray-500">Status:</span>
          <Badge className={`${getStatusColor(aula.status)} text-xs px-1 py-0`}>
            {aula.status}
          </Badge>
        </div>
        
        {aula.videoUrl && (
          <div className="flex items-center gap-1 text-xs text-blue-600">
            <Video className="h-3 w-3" />
            <span>Vídeo disponível</span>
          </div>
        )}
        
        {aula.tags && aula.tags.length > 0 && (
          <div className="flex items-center gap-1 text-xs">
            <Tag className="h-3 w-3 text-gray-400" />
            <div className="flex flex-wrap gap-1">
              {aula.tags.slice(0, 2).map((tag, index) => (
                <span key={index} className="bg-gray-100 text-gray-600 px-1 rounded text-xs">
                  {tag}
                </span>
              ))}
              {aula.tags.length > 2 && (
                <span className="text-gray-400">+{aula.tags.length - 2}</span>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
