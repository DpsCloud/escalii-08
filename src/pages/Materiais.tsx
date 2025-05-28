
import { useState, useEffect } from 'react';
import { Sidebar } from '@/components/Sidebar';
import { Header } from '@/components/Header';
import { useIsMobile } from '@/hooks/use-mobile';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { materialsService } from '@/services/supabaseServices';
import { FileText, Download, Eye, Calendar } from 'lucide-react';

interface Material {
  id: string;
  nome: string;
  tipo: string;
  tamanho_arquivo: number;
  created_at: string;
  url: string;
  aulas?: {
    titulo: string;
  };
}

const Materiais = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [filtroTipo, setFiltroTipo] = useState('todos');
  const [materialVisualizando, setMaterialVisualizando] = useState<Material | null>(null);
  const [materiais, setMateriais] = useState<Material[]>([]);
  const [loading, setLoading] = useState(true);
  const isMobile = useIsMobile();

  useEffect(() => {
    const fetchMateriais = async () => {
      try {
        const data = await materialsService.getAllMaterials();
        setMateriais(data);
      } catch (error) {
        console.error('Erro ao carregar materiais:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchMateriais();
  }, []);

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  const materiaisFiltrados = filtroTipo === 'todos' 
    ? materiais 
    : materiais.filter(material => material.tipo === filtroTipo);

  const formatFileSize = (bytes: number) => {
    if (!bytes || bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  const getIconColor = (tipo: string) => {
    switch (tipo) {
      case 'pdf': return 'text-red-600 bg-red-100';
      case 'video': return 'text-purple-600 bg-purple-100';
      case 'document': return 'text-blue-600 bg-blue-100';
      case 'image': return 'text-green-600 bg-green-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  const getFileIcon = (tipo: string) => {
    return <FileText className="h-6 w-6" />;
  };

  const handleVisualizar = (material: Material) => {
    if (material.tipo === 'video') {
      window.open(material.url, '_blank');
    } else {
      setMaterialVisualizando(material);
    }
  };

  const handleBaixar = (material: Material) => {
    const link = document.createElement('a');
    link.href = material.url;
    link.download = material.nome;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

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
              <div className="bg-white rounded-xl p-6 space-y-4">
                {[...Array(5)].map((_, i) => (
                  <div key={i} className="flex items-center space-x-4">
                    <div className="w-10 h-10 bg-gray-200 rounded"></div>
                    <div className="flex-1">
                      <div className="h-4 bg-gray-200 rounded mb-2"></div>
                      <div className="h-3 bg-gray-200 rounded w-1/2"></div>
                    </div>
                  </div>
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
          <div className="mb-6 sm:mb-8">
            <h1 className="text-xl sm:text-2xl font-bold text-gray-800 mb-1">Materiais do Curso</h1>
            <p className="text-sm sm:text-base text-gray-600">
              Acesse e baixe todos os materiais disponíveis
            </p>
          </div>

          {/* Filtros */}
          <div className="bg-white rounded-xl shadow-sm p-4 sm:p-6 mb-6">
            <h2 className="text-lg font-semibold text-gray-800 mb-4">Filtros</h2>
            <div className="flex flex-wrap gap-2">
              {[
                { value: 'todos', label: 'Todos' },
                { value: 'pdf', label: 'PDFs' },
                { value: 'video', label: 'Vídeos' },
                { value: 'document', label: 'Documentos' },
                { value: 'image', label: 'Imagens' }
              ].map((filtro) => (
                <button
                  key={filtro.value}
                  onClick={() => setFiltroTipo(filtro.value)}
                  className={`px-3 py-1 rounded-lg text-sm font-medium transition-colors ${
                    filtroTipo === filtro.value
                      ? 'bg-blue-600 text-white'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  {filtro.label}
                </button>
              ))}
            </div>
          </div>

          {/* Lista de Materiais */}
          <div className="bg-white rounded-xl shadow-sm p-4 sm:p-6">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg font-semibold text-gray-800">
                Materiais ({materiaisFiltrados.length})
              </h2>
            </div>

            <div className="space-y-3">
              {materiaisFiltrados.length === 0 ? (
                <div className="text-center py-8">
                  <FileText className="h-12 w-12 text-gray-300 mx-auto mb-4" />
                  <p className="text-gray-500">Nenhum material encontrado</p>
                </div>
              ) : (
                materiaisFiltrados.map((material) => (
                  <div key={material.id} className="flex items-center p-3 hover:bg-gray-50 rounded-lg transition">
                    <div className={`p-2 rounded-lg mr-3 ${getIconColor(material.tipo)}`}>
                      {getFileIcon(material.tipo)}
                    </div>
                    
                    <div className="flex-1">
                      <h4 className="font-medium text-gray-800">{material.nome}</h4>
                      <div className="flex flex-wrap gap-2 text-xs text-gray-500 mt-1">
                        <div className="flex items-center gap-1">
                          <Calendar className="h-3 w-3" />
                          <span>{new Date(material.created_at).toLocaleDateString('pt-BR')}</span>
                        </div>
                        <span>•</span>
                        <span>{formatFileSize(material.tamanho_arquivo)}</span>
                        {material.aula && (
                          <>
                            <span>•</span>
                            <span className="text-blue-600">{material.aula.titulo}</span>
                          </>
                        )}
                      </div>
                    </div>

                    <div className="flex items-center gap-2">
                      <button 
                        onClick={() => handleVisualizar(material)}
                        className="p-2 text-gray-500 hover:text-blue-600 transition-colors"
                        title="Visualizar"
                      >
                        <Eye className="h-5 w-5" />
                      </button>
                      <button 
                        onClick={() => handleBaixar(material)}
                        className="p-2 text-gray-500 hover:text-blue-600 transition-colors"
                        title="Baixar"
                      >
                        <Download className="h-5 w-5" />
                      </button>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        </main>
      </div>

      {/* Modal de Visualização */}
      <Dialog open={!!materialVisualizando} onOpenChange={() => setMaterialVisualizando(null)}>
        <DialogContent className="max-w-4xl max-h-[90vh]">
          <DialogHeader>
            <DialogTitle>{materialVisualizando?.nome}</DialogTitle>
          </DialogHeader>
          <div className="h-[70vh] bg-gray-100 rounded-lg flex items-center justify-center">
            <div className="text-center text-gray-600">
              <p className="text-lg mb-2">Visualização do Material</p>
              <p className="text-sm">
                Aqui seria exibido o conteúdo do arquivo: {materialVisualizando?.nome}
              </p>
              <button 
                onClick={() => materialVisualizando && handleBaixar(materialVisualizando)}
                className="mt-4 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
              >
                Baixar Material
              </button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Materiais;
