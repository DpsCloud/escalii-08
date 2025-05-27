
import { useState } from 'react';
import { Sidebar } from '@/components/Sidebar';
import { Header } from '@/components/Header';
import { useIsMobile } from '@/hooks/use-mobile';
import { useAulaStore } from '@/stores/useAulaStore';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogTrigger } from '@/components/ui/dialog';
import { AulaForm } from '@/components/AulaForm';
import { AulaFilters } from '@/components/AulaFilters';
import { AulaGrid } from '@/components/AulaGrid';
import { Plus } from 'lucide-react';
import { Aula } from '@/types/course';

const AulasAdmin = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [aulaDialogOpen, setAulaDialogOpen] = useState(false);
  const [editingAula, setEditingAula] = useState<Aula | undefined>();
  const isMobile = useIsMobile();
  const { aulas, getFilteredAulas } = useAulaStore();

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  const handleEditAula = (aula: Aula) => {
    setEditingAula(aula);
    setAulaDialogOpen(true);
  };

  const handleCloseDialog = () => {
    setAulaDialogOpen(false);
    setEditingAula(undefined);
  };

  const filteredAulas = getFilteredAulas();

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
                <h1 className="text-xl sm:text-2xl font-bold text-gray-800 mb-1">Biblioteca de Aulas</h1>
                <p className="text-sm sm:text-base text-gray-600">Gerencie aulas independentes que podem ser reutilizadas em diferentes cursos</p>
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
                  />
                </DialogContent>
              </Dialog>
            </div>

            <AulaFilters />

            <AulaGrid 
              aulas={filteredAulas}
              onEditAula={handleEditAula}
            />
          </div>
        </main>
      </div>
    </div>
  );
};

export default AulasAdmin;
