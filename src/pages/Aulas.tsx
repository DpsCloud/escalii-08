
import { useState, useEffect } from 'react';
import { Sidebar } from '@/components/Sidebar';
import { Header } from '@/components/Header';
import { useIsMobile } from '@/hooks/use-mobile';
import { useNavigate } from 'react-router-dom';
import { aulasService, turmasService } from '@/services/supabaseServices';
import { useAuth } from '@/contexts/SupabaseAuthContext';

interface AulaData {
  id: string;
  titulo: string;
  descricao: string;
  duracao: number;
  status: 'ativa' | 'planejada' | 'concluida';
  data_aula: string;
  ordem: number;
}

const Aulas = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [aulas, setAulas] = useState<AulaData[]>([]);
  const [loading, setLoading] = useState(true);
  const isMobile = useIsMobile();
  const navigate = useNavigate();
  const { profile } = useAuth();

  useEffect(() => {
    const fetchAulasFromCourse = async () => {
      try {
        // Buscar turma ativa
        const turmaAtiva = await turmasService.getTurmaAtiva();
        
        if (turmaAtiva?.course_id) {
          // Buscar aulas do curso
          const aulasData = await aulasService.getByCourse(turmaAtiva.course_id);
          
          // Mapear para o formato esperado
          const aulasFormatadas = aulasData.map((item, index) => ({
            id: item.aula.id,
            titulo: item.aula.titulo,
            descricao: item.aula.descricao || '',
            duracao: item.aula.duracao,
            status: item.aula.status as 'ativa' | 'planejada' | 'concluida',
            data_aula: item.relacao.data_aula || '',
            ordem: item.relacao.ordem
          }));

          setAulas(aulasFormatadas.sort((a, b) => a.ordem - b.ordem));
        }
      } catch (error) {
        console.error('Erro ao carregar aulas:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchAulasFromCourse();
  }, [profile]);

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  const handleAulaClick = (aula: AulaData) => {
    if (aula.status === "planejada") return;
    
    // Navegar para a página da aula específica
    navigate(`/aula/${aula.id}`, { 
      state: { 
        aula: aula 
      } 
    });
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'ativa': return 'Disponível';
      case 'concluida': return 'Concluída';
      case 'planejada': return 'Em Breve';
      default: return status;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'ativa': return 'bg-blue-100 text-blue-800';
      case 'concluida': return 'bg-green-100 text-green-800';
      case 'planejada': return 'bg-gray-100 text-gray-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getButtonStyle = (status: string) => {
    switch (status) {
      case 'ativa': return 'bg-blue-600 text-white hover:bg-blue-700';
      case 'concluida': return 'bg-green-100 text-green-800 hover:bg-green-200';
      case 'planejada': return 'bg-gray-100 text-gray-600 cursor-not-allowed';
      default: return 'bg-gray-100 text-gray-600 cursor-not-allowed';
    }
  };

  const getButtonText = (status: string) => {
    switch (status) {
      case 'ativa': return 'Acessar Aula';
      case 'concluida': return 'Revisar Aula';
      case 'planejada': return 'Em Breve';
      default: return 'Indisponível';
    }
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
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {[...Array(8)].map((_, i) => (
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
          <div className="mb-6 sm:mb-8">
            <h1 className="text-xl sm:text-2xl font-bold text-gray-800 mb-1">Aulas do Curso</h1>
            <p className="text-sm sm:text-base text-gray-600">
              Acompanhe seu progresso nas aulas do ESCALI
            </p>
          </div>

          {aulas.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-gray-500">Nenhuma aula encontrada</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
              {aulas.map((aula) => (
                <div key={aula.id} className="bg-white rounded-xl shadow-sm p-4 sm:p-6 hover:shadow-md transition-shadow">
                  <div className="flex justify-between items-start mb-3">
                    <h3 className="text-lg font-semibold text-gray-800">{aula.titulo}</h3>
                    <span className={`text-xs font-medium px-2 py-1 rounded-full ${getStatusColor(aula.status)}`}>
                      {getStatusText(aula.status)}
                    </span>
                  </div>
                  
                  <p className="text-sm text-gray-600 mb-4">{aula.descricao}</p>
                  
                  <div className="space-y-2 mb-4">
                    {aula.data_aula && (
                      <div className="flex justify-between text-xs sm:text-sm">
                        <span className="text-gray-500">Data:</span>
                        <span className="text-gray-700">
                          {new Date(aula.data_aula).toLocaleDateString('pt-BR')}
                        </span>
                      </div>
                    )}
                    <div className="flex justify-between text-xs sm:text-sm">
                      <span className="text-gray-500">Duração:</span>
                      <span className="text-gray-700">{aula.duracao} min</span>
                    </div>
                    <div className="flex justify-between text-xs sm:text-sm">
                      <span className="text-gray-500">Ordem:</span>
                      <span className="text-gray-700">Aula {aula.ordem}</span>
                    </div>
                  </div>

                  <button 
                    onClick={() => handleAulaClick(aula)}
                    className={`w-full py-2 px-4 rounded-lg text-sm font-medium transition-colors ${getButtonStyle(aula.status)}`}
                    disabled={aula.status === "planejada"}
                  >
                    {getButtonText(aula.status)}
                  </button>
                </div>
              ))}
            </div>
          )}
        </main>
      </div>
    </div>
  );
};

export default Aulas;
