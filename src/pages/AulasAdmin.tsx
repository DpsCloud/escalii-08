
import { useState } from 'react';
import { Sidebar } from '@/components/Sidebar';
import { Header } from '@/components/Header';
import { useIsMobile } from '@/hooks/use-mobile';
import { useCourseStore } from '@/stores/useCourseStore';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogTrigger } from '@/components/ui/dialog';
import { AulaForm } from '@/components/AulaForm';
import { AulaFilters } from '@/components/AulaFilters';
import { CourseSection } from '@/components/CourseSection';
import { Plus } from 'lucide-react';
import { Aula } from '@/types/course';

const AulasAdmin = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [aulaDialogOpen, setAulaDialogOpen] = useState(false);
  const [editingAula, setEditingAula] = useState<Aula | undefined>();
  const [selectedCourse, setSelectedCourse] = useState<string>('all');
  const [searchTerm, setSearchTerm] = useState('');
  const isMobile = useIsMobile();
  const { courses } = useCourseStore();

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  const filteredCourses = courses.filter(course => 
    selectedCourse === 'all' || course.id === selectedCourse
  );

  const handleEditAula = (aula: Aula) => {
    setEditingAula(aula);
    setAulaDialogOpen(true);
  };

  const handleCloseDialog = () => {
    setAulaDialogOpen(false);
    setEditingAula(undefined);
  };

  const handleCourseChange = (value: string) => {
    setSelectedCourse(value === 'all' ? 'all' : value);
  };

  return (
    <div className="min-h-screen bg-muted flex">
      <Sidebar isOpen={sidebarOpen} toggleSidebar={toggleSidebar} />

      <div className={`flex-1 flex flex-col transition-all duration-300 ${
        isMobile ? 'w-full' : (sidebarOpen ? 'ml-64' : 'ml-[70px]')
      }`}>
        <Header toggleSidebar={toggleSidebar} />

        <main className="flex-1 overflow-y-auto p-4 md:p-6">
          <div className="max-w-7xl mx-auto space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
              <div>
                <h1 className="text-xl sm:text-2xl font-bold text-gray-800 mb-1">Gerenciamento de Aulas</h1>
                <p className="text-sm sm:text-base text-gray-600">Adicione e gerencie as aulas dos cursos</p>
              </div>
              <Dialog open={aulaDialogOpen} onOpenChange={setAulaDialogOpen}>
                <DialogTrigger asChild>
                  <Button className="hover-scale">
                    <Plus className="h-4 w-4 mr-2" />
                    Nova Aula
                  </Button>
                </DialogTrigger>
                <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
                  <AulaForm 
                    onClose={handleCloseDialog} 
                    editingAula={editingAula}
                    courses={courses}
                  />
                </DialogContent>
              </Dialog>
            </div>

            <AulaFilters
              selectedCourse={selectedCourse}
              searchTerm={searchTerm}
              courses={courses}
              onCourseChange={handleCourseChange}
              onSearchChange={setSearchTerm}
            />

            <div className="space-y-6">
              {filteredCourses.map((course) => (
                <CourseSection
                  key={course.id}
                  course={course}
                  searchTerm={searchTerm}
                  editingAula={editingAula}
                  aulaDialogOpen={aulaDialogOpen}
                  courses={courses}
                  onEditAula={handleEditAula}
                  onCloseDialog={handleCloseDialog}
                  setAulaDialogOpen={setAulaDialogOpen}
                />
              ))}
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default AulasAdmin;
