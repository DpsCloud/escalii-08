
import { useState } from 'react';
import { Sidebar } from '@/components/Sidebar';
import { Header } from '@/components/Header';
import { useIsMobile } from '@/hooks/use-mobile';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';

const Materiais = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [filtroTipo, setFiltroTipo] = useState('todos');
  const [materialVisualizando, setMaterialVisualizando] = useState(null);
  const isMobile = useIsMobile();

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  const materiais = [
    {
      id: 1,
      titulo: "Aula 5 - Honra e Lealdade.pdf",
      tipo: "pdf",
      tamanho: "2.3 MB",
      dataUpload: "2023-06-08",
      categoria: "aula",
      status: "disponivel",
      url: "/materiais/aula-5-honra-lealdade.pdf"
    },
    {
      id: 2,
      titulo: "Aula 4 - O DNA de Cristo.pdf",
      tipo: "pdf",
      tamanho: "1.8 MB",
      dataUpload: "2023-06-01",
      categoria: "aula",
      status: "disponivel",
      url: "/materiais/aula-4-dna-cristo.pdf"
    },
    {
      id: 3,
      titulo: "Aula 3 - Ouvir, Confiar e Obedecer.pdf",
      tipo: "pdf",
      tamanho: "2.1 MB",
      dataUpload: "2023-05-25",
      categoria: "aula",
      status: "disponivel",
      url: "/materiais/aula-3-ouvir-confiar-obedecer.pdf"
    },
    {
      id: 4,
      titulo: "Manual do Estudante ESCALI.pdf",
      tipo: "pdf",
      tamanho: "5.2 MB",
      dataUpload: "2023-05-10",
      categoria: "manual",
      status: "disponivel",
      url: "/materiais/manual-estudante-escali.pdf"
    },
    {
      id: 5,
      titulo: "Vídeo - Introdução ao Curso",
      tipo: "video",
      tamanho: "150 MB",
      dataUpload: "2023-05-10",
      categoria: "video",
      status: "disponivel",
      url: "/materiais/video-introducao.mp4"
    },
    {
      id: 6,
      titulo: "Exercícios Práticos - Módulo 1",
      tipo: "doc",
      tamanho: "0.8 MB",
      dataUpload: "2023-05-15",
      categoria: "exercicio",
      status: "disponivel",
      url: "/materiais/exercicios-modulo-1.docx"
    },
    {
      id: 7,
      titulo: "Aula 6 - 9 Dimensões da Imaturidade.pdf",
      tipo: "pdf",
      tamanho: "2.5 MB",
      dataUpload: "2023-06-14",
      categoria: "aula",
      status: "breve",
      url: "/materiais/aula-6-dimensoes-imaturidade.pdf"
    }
  ];

  const materiaisFiltrados = filtroTipo === 'todos' 
    ? materiais 
    : materiais.filter(material => material.categoria === filtroTipo);

  const getIconColor = (tipo: string) => {
    switch (tipo) {
      case 'pdf': return 'text-red-600 bg-red-100';
      case 'video': return 'text-purple-600 bg-purple-100';
      case 'doc': return 'text-blue-600 bg-blue-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  const handleVisualizar = (material: any) => {
    if (material.status !== 'disponivel') return;
    
    if (material.tipo === 'video') {
      // Para vídeos, abrir em nova aba ou player
      window.open(material.url, '_blank');
    } else {
      // Para PDFs e documentos, abrir modal de visualização
      setMaterialVisualizando(material);
    }
  };

  const handleBaixar = (material: any) => {
    if (material.status !== 'disponivel') return;
    
    // Simular download
    const link = document.createElement('a');
    link.href = material.url;
    link.download = material.titulo;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    
    console.log(`Baixando: ${material.titulo}`);
  };

  return (
    <div className="min-h-screen bg-muted flex">
      <Sidebar isOpen={sidebarOpen} toggleSidebar={toggleSidebar} />

      <div className={`flex-1 flex flex-col transition-all duration-300 ${isMobile ? 'w-full' : (sidebarOpen ? 'ml-64' : 'ml-[70px]')}`}>
        <Header toggleSidebar={toggleSidebar} />

        <main className="flex-1 overflow-y-auto p-4 md:p-6">
          <div className="mb-6 sm:mb-8">
            <h1 className="text-xl sm:text-2xl font-bold text-gray-800 mb-1">Materiais do Curso</h1>
            <p className="text-sm sm:text-base text-gray-600">Acesse e baixe todos os materiais disponíveis</p>
          </div>

          {/* Filtros */}
          <div className="bg-white rounded-xl shadow-sm p-4 sm:p-6 mb-6">
            <h2 className="text-lg font-semibold text-gray-800 mb-4">Filtros</h2>
            <div className="flex flex-wrap gap-2">
              {[
                { value: 'todos', label: 'Todos' },
                { value: 'aula', label: 'Aulas' },
                { value: 'manual', label: 'Manuais' },
                { value: 'video', label: 'Vídeos' },
                { value: 'exercicio', label: 'Exercícios' }
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
              {materiaisFiltrados.map((material) => (
                <div key={material.id} className="flex items-center p-3 hover:bg-gray-50 rounded-lg transition">
                  <div className={`p-2 rounded-lg mr-3 ${getIconColor(material.tipo)}`}>
                    {material.tipo === 'pdf' && (
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
                      </svg>
                    )}
                    {material.tipo === 'video' && (
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14.828 14.828a4 4 0 01-5.656 0M9 10h1.586a1 1 0 01.707.293l2.414 2.414a1 1 0 00.707.293H15M9 10v4a2 2 0 002 2h2a2 2 0 002-2v-4M9 10V6a2 2 0 012-2h2a2 2 0 012 2v4" />
                      </svg>
                    )}
                    {material.tipo === 'doc' && (
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                      </svg>
                    )}
                  </div>
                  
                  <div className="flex-1">
                    <h4 className="font-medium text-gray-800">{material.titulo}</h4>
                    <div className="flex flex-wrap gap-2 text-xs text-gray-500 mt-1">
                      <span>{material.tamanho}</span>
                      <span>•</span>
                      <span>Adicionado em {new Date(material.dataUpload).toLocaleDateString('pt-BR')}</span>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    {material.status === 'disponivel' ? (
                      <>
                        <button 
                          onClick={() => handleVisualizar(material)}
                          className="p-2 text-gray-500 hover:text-blue-600 transition-colors"
                          title="Visualizar"
                        >
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                          </svg>
                        </button>
                        <button 
                          onClick={() => handleBaixar(material)}
                          className="p-2 text-gray-500 hover:text-blue-600 transition-colors"
                          title="Baixar"
                        >
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                          </svg>
                        </button>
                      </>
                    ) : (
                      <span className="text-xs bg-yellow-100 text-yellow-800 px-2 py-1 rounded-full">
                        Em breve
                      </span>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </main>
      </div>

      {/* Modal de Visualização */}
      <Dialog open={!!materialVisualizando} onOpenChange={() => setMaterialVisualizando(null)}>
        <DialogContent className="max-w-4xl max-h-[90vh]">
          <DialogHeader>
            <DialogTitle>{materialVisualizando?.titulo}</DialogTitle>
          </DialogHeader>
          <div className="h-[70vh] bg-gray-100 rounded-lg flex items-center justify-center">
            <div className="text-center text-gray-600">
              <p className="text-lg mb-2">Visualização do Material</p>
              <p className="text-sm">
                Aqui seria exibido o conteúdo do arquivo: {materialVisualizando?.titulo}
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
