
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogTrigger } from '@/components/ui/dialog';
import { BookOpen, Plus, Clock, Calendar } from 'lucide-react';
import { Course, Aula } from '@/types/course';
import { AulaCard } from './AulaCard';
import { AulaForm } from './AulaForm';
import { useAulaStore } from '@/stores/useAulaStore';

interface CourseSectionProps {
  course: Course;
  searchTerm: string;
  editingAula: Aula | undefined;
  aulaDialogOpen: boolean;
  onEditAula: (aula: Aula) => void;
  onCloseDialog: () => void;
  setAulaDialogOpen: (open: boolean) => void;
}

export const CourseSection = ({
  course,
  searchTerm,
  editingAula,
  aulaDialogOpen,
  onEditAula,
  onCloseDialog,
  setAulaDialogOpen
}: CourseSectionProps) => {
  const { aulas } = useAulaStore();

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'ativo': return 'bg-green-100 text-green-800';
      case 'planejado': return 'bg-blue-100 text-blue-800';
      case 'finalizado': return 'bg-gray-100 text-gray-800';
      case 'cancelado': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  // Buscar aulas selecionadas para este curso
  const aulasAssociadas = aulas.filter(aula => 
    course.aulasSelecionadas.includes(aula.id) &&
    (searchTerm === '' || aula.titulo.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  const formatarDiasSemana = (dias: string[]) => {
    const diasCapitalizados = dias.map(dia => dia.charAt(0).toUpperCase() + dia.slice(1));
    if (diasCapitalizados.length <= 2) {
      return diasCapitalizados.join(' e ');
    }
    return diasCapitalizados.slice(0, -1).join(', ') + ' e ' + diasCapitalizados[diasCapitalizados.length - 1];
  };

  return (
    <Card className="animate-fade-in">
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="flex items-center gap-2">
              <BookOpen className="h-5 w-5" />
              {course.nome}
            </CardTitle>
            <p className="text-sm text-muted-foreground mt-1">
              {course.descricao}
            </p>
          </div>
          <Badge className={getStatusColor(course.status)}>
            {course.status}
          </Badge>
        </div>
        
        {/* Informações do cronograma */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-4 border-t">
          <div className="flex items-center gap-2 text-sm">
            <Calendar className="h-4 w-4 text-gray-400" />
            <span>
              <strong>Período:</strong> {new Date(course.dataInicio).toLocaleDateString('pt-BR')} - {new Date(course.dataFim).toLocaleDateString('pt-BR')}
            </span>
          </div>
          
          <div className="flex items-center gap-2 text-sm">
            <Clock className="h-4 w-4 text-gray-400" />
            <span>
              <strong>Dias:</strong> {course.diasSemana.length > 0 ? formatarDiasSemana(course.diasSemana) : 'Não definido'}
            </span>
          </div>
          
          <div className="text-sm">
            <span><strong>Carga Horária:</strong> {course.cargaHoraria}h</span>
          </div>
          
          <div className="text-sm">
            <span><strong>Total de Aulas:</strong> {course.totalAulas}</span>
          </div>
        </div>
      </CardHeader>
      
      <CardContent>
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h4 className="font-medium">Aulas do Curso</h4>
            <span className="text-sm text-gray-500">
              {aulasAssociadas.length} de {course.totalAulas} aulas
            </span>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {aulasAssociadas.length > 0 ? (
              aulasAssociadas.map((aula, index) => (
                <div key={aula.id} className="relative">
                  <div className="absolute -top-2 -left-2 bg-blue-600 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs font-bold z-10">
                    {index + 1}
                  </div>
                  <AulaCard
                    aula={aula}
                    onEdit={onEditAula}
                    showCategory={false}
                    showDelete={false}
                  />
                </div>
              ))
            ) : (
              <div className="col-span-full text-center py-8 text-gray-500">
                <BookOpen className="h-12 w-12 mx-auto mb-3 opacity-50" />
                <p>Nenhuma aula associada a este curso</p>
                {course.aulasSelecionadas.length === 0 && (
                  <p className="text-sm mt-2">
                    Edite o curso para selecionar aulas ou crie novas aulas primeiro.
                  </p>
                )}
              </div>
            )}
          </div>
          
          {course.aulasSelecionadas.length > aulasAssociadas.length && searchTerm && (
            <p className="text-sm text-gray-500 text-center">
              {course.aulasSelecionadas.length - aulasAssociadas.length} aula(s) oculta(s) pelo filtro de busca
            </p>
          )}
        </div>
      </CardContent>
    </Card>
  );
};
