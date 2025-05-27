
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Clock, FileText, Video, Edit, Trash2 } from 'lucide-react';
import { Aula } from '@/types/course';

interface AulaCardProps {
  aula: Aula;
  onEdit: (aula: Aula) => void;
  onDelete?: (aulaId: string) => void;
}

export const AulaCard = ({ aula, onEdit, onDelete }: AulaCardProps) => {
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'ativa': return 'bg-green-100 text-green-800';
      case 'planejada': return 'bg-blue-100 text-blue-800';
      case 'concluida': return 'bg-gray-100 text-gray-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="bg-white border rounded-lg p-4 hover:shadow-md transition-shadow">
      <div className="flex items-start justify-between mb-2">
        <h4 className="font-medium text-sm">{aula.titulo}</h4>
        <div className="flex gap-1">
          <Button
            size="sm"
            variant="ghost"
            onClick={() => onEdit(aula)}
            className="h-6 w-6 p-0"
          >
            <Edit className="h-3 w-3" />
          </Button>
          {onDelete && (
            <Button
              size="sm"
              variant="ghost"
              onClick={() => onDelete(aula.id)}
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
        <div className="flex items-center justify-between text-xs">
          <span className="text-gray-500">Ordem:</span>
          <span className="font-medium">#{aula.ordem}</span>
        </div>
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
      </div>
    </div>
  );
};
