
import { useState } from 'react';
import { useLocation, useParams, useNavigate } from 'react-router-dom';
import { Sidebar } from '@/components/Sidebar';
import { Header } from '@/components/Header';
import { useIsMobile } from '@/hooks/use-mobile';
import { ArrowLeft, Play, FileText, Clock, Calendar } from 'lucide-react';

const AulaDetalhes = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const isMobile = useIsMobile();
  const location = useLocation();
  const { id } = useParams();
  const navigate = useNavigate();

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  // Dados da aula vindos do state ou buscar por ID
  const aula = location.state?.aula || {
    id: id,
    titulo: "Aula não encontrada",
    descricao: "Esta aula não foi encontrada.",
    data: new Date().toISOString(),
    duracao: "0h",
    status: "Pendente"
  };

  return (
    <div className="min-h-screen bg-muted flex">
      <Sidebar isOpen={sidebarOpen} toggleSidebar={toggleSidebar} />

      <div className={`flex-1 flex flex-col transition-all duration-300 ${isMobile ? 'w-full' : (sidebarOpen ? 'ml-64' : 'ml-[70px]')}`}>
        <Header toggleSidebar={toggleSidebar} />

        <main className="flex-1 overflow-y-auto p-4 md:p-6">
          {/* Botão Voltar */}
          <button
            onClick={() => navigate('/aulas')}
            className="flex items-center text-blue-600 hover:text-blue-800 mb-6"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Voltar para Aulas
          </button>

          <div className="max-w-4xl mx-auto">
            {/* Cabeçalho da Aula */}
            <div className="bg-white rounded-xl shadow-sm p-6 mb-6">
              <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-4">
                <h1 className="text-2xl md:text-3xl font-bold text-gray-800 mb-2 md:mb-0">
                  {aula.titulo}
                </h1>
                <span className={`inline-block text-sm font-medium px-3 py-1 rounded-full ${
                  aula.status === "Concluída" ? "bg-green-100 text-green-800" :
                  aula.status === "Próxima" ? "bg-blue-100 text-blue-800" :
                  "bg-gray-100 text-gray-800"
                }`}>
                  {aula.status}
                </span>
              </div>

              <p className="text-gray-600 mb-4">{aula.descricao}</p>

              <div className="flex flex-wrap gap-4 text-sm text-gray-500">
                <div className="flex items-center">
                  <Calendar className="h-4 w-4 mr-1" />
                  {new Date(aula.data).toLocaleDateString('pt-BR')}
                </div>
                <div className="flex items-center">
                  <Clock className="h-4 w-4 mr-1" />
                  {aula.duracao}
                </div>
              </div>
            </div>

            {/* Player de Vídeo */}
            <div className="bg-white rounded-xl shadow-sm p-6 mb-6">
              <h2 className="text-xl font-semibold text-gray-800 mb-4">Vídeo da Aula</h2>
              <div className="aspect-video bg-gray-900 rounded-lg flex items-center justify-center">
                <div className="text-center text-white">
                  <Play className="h-16 w-16 mx-auto mb-4 opacity-70" />
                  <p className="text-lg">Vídeo da {aula.titulo}</p>
                  <p className="text-sm opacity-70">Clique para reproduzir</p>
                </div>
              </div>
            </div>

            {/* Materiais da Aula */}
            <div className="bg-white rounded-xl shadow-sm p-6">
              <h2 className="text-xl font-semibold text-gray-800 mb-4">Materiais da Aula</h2>
              <div className="space-y-3">
                <div className="flex items-center p-3 border rounded-lg hover:bg-gray-50 transition-colors">
                  <div className="p-2 bg-red-100 rounded-lg mr-3">
                    <FileText className="h-5 w-5 text-red-600" />
                  </div>
                  <div className="flex-1">
                    <h4 className="font-medium text-gray-800">Material da {aula.titulo}.pdf</h4>
                    <p className="text-sm text-gray-500">PDF • 2.3 MB</p>
                  </div>
                  <button className="text-blue-600 hover:text-blue-800 text-sm font-medium">
                    Baixar
                  </button>
                </div>
                
                <div className="flex items-center p-3 border rounded-lg hover:bg-gray-50 transition-colors">
                  <div className="p-2 bg-blue-100 rounded-lg mr-3">
                    <FileText className="h-5 w-5 text-blue-600" />
                  </div>
                  <div className="flex-1">
                    <h4 className="font-medium text-gray-800">Exercícios - {aula.titulo}.pdf</h4>
                    <p className="text-sm text-gray-500">PDF • 1.1 MB</p>
                  </div>
                  <button className="text-blue-600 hover:text-blue-800 text-sm font-medium">
                    Baixar
                  </button>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default AulaDetalhes;
