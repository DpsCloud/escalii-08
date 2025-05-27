
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { AulaCard } from './AulaCard';
import { BookOpen } from 'lucide-react';
import { Aula } from '@/types/course';

interface AulaGridProps {
  aulas: Aula[];
  onEditAula: (aula: Aula) => void;
}

export const AulaGrid = ({ aulas, onEditAula }: AulaGridProps) => {
  if (aulas.length === 0) {
    return (
      <Card className="animate-fade-in">
        <CardContent className="text-center py-12">
          <BookOpen className="h-16 w-16 mx-auto mb-4 text-gray-300" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">Nenhuma aula encontrada</h3>
          <p className="text-gray-500">
            Nenhuma aula corresponde aos filtros selecionados ou ainda não há aulas cadastradas.
          </p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="animate-fade-in">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <BookOpen className="h-5 w-5" />
          Aulas Disponíveis ({aulas.length})
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {aulas.map((aula) => (
            <AulaCard
              key={aula.id}
              aula={aula}
              onEdit={onEditAula}
              showCategory={true}
            />
          ))}
        </div>
      </CardContent>
    </Card>
  );
};
