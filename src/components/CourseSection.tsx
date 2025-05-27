
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogTrigger } from '@/components/ui/dialog';
import { BookOpen, Plus } from 'lucide-react';
import { Course, Aula } from '@/types/course';
import { AulaCard } from './AulaCard';
import { AulaForm } from './AulaForm';

interface CourseSectionProps {
  course: Course;
  searchTerm: string;
  editingAula: Aula | undefined;
  aulaDialogOpen: boolean;
  courses: Course[];
  onEditAula: (aula: Aula) => void;
  onCloseDialog: () => void;
  setAulaDialogOpen: (open: boolean) => void;
}

export const CourseSection = ({
  course,
  searchTerm,
  editingAula,
  aulaDialogOpen,
  courses,
  onEditAula,
  onCloseDialog,
  setAulaDialogOpen
}: CourseSectionProps) => {
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'ativo': return 'bg-green-100 text-green-800';
      case 'planejado': return 'bg-blue-100 text-blue-800';
      case 'finalizado': return 'bg-gray-100 text-gray-800';
      case 'cancelado': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const filteredAulas = course.aulas
    ?.filter(aula => 
      searchTerm === '' || 
      aula.titulo.toLowerCase().includes(searchTerm.toLowerCase())
    )
    .sort((a, b) => a.ordem - b.ordem) || [];

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
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredAulas.length > 0 ? (
            filteredAulas.map((aula) => (
              <AulaCard
                key={aula.id}
                aula={aula}
                onEdit={onEditAula}
              />
            ))
          ) : (
            <div className="col-span-full text-center py-8 text-gray-500">
              <BookOpen className="h-12 w-12 mx-auto mb-3 opacity-50" />
              <p>Nenhuma aula cadastrada neste curso</p>
              <Dialog open={aulaDialogOpen} onOpenChange={setAulaDialogOpen}>
                <DialogTrigger asChild>
                  <Button className="mt-3" variant="outline" size="sm">
                    <Plus className="h-4 w-4 mr-2" />
                    Adicionar primeira aula
                  </Button>
                </DialogTrigger>
                <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
                  <AulaForm 
                    onClose={onCloseDialog} 
                    editingAula={editingAula}
                    courses={courses}
                    preSelectedCourse={course.id}
                  />
                </DialogContent>
              </Dialog>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};
