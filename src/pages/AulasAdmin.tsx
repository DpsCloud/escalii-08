
import { useState, useEffect } from 'react';
import { Sidebar } from '@/components/Sidebar';
import { Header } from '@/components/Header';
import { useIsMobile } from '@/hooks/use-mobile';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogTrigger } from '@/components/ui/dialog';
import { AulaForm } from '@/components/AulaForm';
import { AulaFilters } from '@/components/AulaFilters';
import { AulaGrid } from '@/components/AulaGrid';
import { Plus } from 'lucide-react';
import { aulasService } from '@/services/supabaseServices';
import { mapSupabaseAulaToAula } from '@/utils/supabaseMappers';
import { Aula } from '@/types/course';

const AulasAdmin = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [aulaDialogOpen, setAulaDialogOpen] = useState(false);
  const [editingAula, setEditingAula] = useState<Aula | undefined>();
  const [aulas, setAulas] = useState<Aula[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const isMobile = useIsMobile();

  useEffect(() => {
    const fetchAulas = async () => {
      try {
        const data = await aulasService.getAllAulas();
        // Map Supabase data to Aula type
        const mappedAulas = data.map(mapSupabaseAulaToAula);
        setAulas(mappedAulas);
      } catch (error) {
        console.error('Erro ao carregar aulas:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchAulas();
  }, []);

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

  const filteredAulas = aulas.filter(aula => {
    const matchesSearch = searchTerm === '' || 
      aula.titulo.toLowerCase().includes(searchTerm.toLowerCase()) ||
      aula.descricao?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      aula.tags?.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));
    
    const matchesCategory = selectedCategory === 'all' || aula.categoria === selectedCategory;
    
    return matchesSearch && matchesCategory;
  });

  if (loading) {
    return (
      <div className="min-h-screen bg-muted flex">
        <Sidebar isOpen={sidebarOpen} toggleSidebar={toggleSidebar} />
        <div className={`flex-1 flex flex-col transition-all duration-300 ${
          isMobile ? 'w-full' : (sidebarOpen ? 'ml-64' : 'ml-[70px]')
        }`}>
          <Header toggleSidebar={toggleSidebar} />
          <main className="flex-1 overflow-y-auto p-4 md:p-6">
            <div className="animate-pulse space-y-6">
              <div className="h-8 bg-gray-200 rounded w-1/3"></div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {[...Array(6)].map((_, i) => (
                  <div key={i} className="h-48 bg-gray-200 rounded"></div>
                ))}
              </div>
            </div>
          </main>
        </div>
      </div>
    );
  }

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
                <p className="text-sm sm:text-base text-gray-600">
                  Gerencie aulas independentes que podem ser reutilizadas em diferentes cursos
                </p>
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

            <AulaFilters 
              searchTerm={searchTerm}
              selectedCategory={selectedCategory}
              onSearchChange={setSearchTerm}
              onCategoryChange={setSelectedCategory}
              aulas={aulas}
            />

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
