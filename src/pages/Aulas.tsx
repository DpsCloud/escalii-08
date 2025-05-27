
import { useState } from 'react';
import { Sidebar } from '@/components/Sidebar';
import { Header } from '@/components/Header';
import { useIsMobile } from '@/hooks/use-mobile';
import { useNavigate } from 'react-router-dom';

const Aulas = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const isMobile = useIsMobile();
  const navigate = useNavigate();

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  const aulas = [
    { 
      id: 1, 
      titulo: "Comunicação", 
      status: "Concluída", 
      data: "2023-05-10", 
      duracao: "2h",
      descricao: "Fundamentos da comunicação eficaz na liderança",
      videoUrl: "/aula/1"
    },
    { 
      id: 2, 
      titulo: "Atributos da Liderança", 
      status: "Concluída", 
      data: "2023-05-17", 
      duracao: "2h",
      descricao: "Características essenciais de um líder cristão",
      videoUrl: "/aula/2"
    },
    { 
      id: 3, 
      titulo: "Ouvir, Confiar e Obedecer", 
      status: "Concluída", 
      data: "2023-05-24", 
      duracao: "2h",
      descricao: "A importância da escuta ativa e obediência",
      videoUrl: "/aula/3"
    },
    { 
      id: 4, 
      titulo: "O DNA de Cristo", 
      status: "Concluída", 
      data: "2023-05-31", 
      duracao: "2h",
      descricao: "Desenvolvendo o caráter cristão na liderança",
      videoUrl: "/aula/4"
    },
    { 
      id: 5, 
      titulo: "Honra e Lealdade", 
      status: "Concluída", 
      data: "2023-06-07", 
      duracao: "2h",
      descricao: "Princípios de honra e lealdade no ministério",
      videoUrl: "/aula/5"
    },
    { 
      id: 6, 
      titulo: "9 Dimensões da Imaturidade", 
      status: "Próxima", 
      data: "2023-06-14", 
      duracao: "2h",
      descricao: "Identificando e superando a imaturidade espiritual",
      videoUrl: "/aula/6"
    },
    { 
      id: 7, 
      titulo: "Propósito da Mesa", 
      status: "Pendente", 
      data: "2023-06-21", 
      duracao: "2h",
      descricao: "O papel da comunhão na liderança",
      videoUrl: "/aula/7"
    },
    { 
      id: 8, 
      titulo: "8 Características de um Líder", 
      status: "Pendente", 
      data: "2023-06-28", 
      duracao: "2h",
      descricao: "Qualidades essenciais para a liderança eficaz",
      videoUrl: "/aula/8"
    },
  ];

  const handleAulaClick = (aula: any) => {
    if (aula.status === "Pendente") return;
    
    // Navegar para a página da aula específica
    navigate(`/aula/${aula.id}`, { 
      state: { 
        aula: aula 
      } 
    });
  };

  return (
    <div className="min-h-screen bg-muted flex">
      <Sidebar isOpen={sidebarOpen} toggleSidebar={toggleSidebar} />

      <div className={`flex-1 flex flex-col transition-all duration-300 ${isMobile ? 'w-full' : (sidebarOpen ? 'ml-64' : 'ml-[70px]')}`}>
        <Header toggleSidebar={toggleSidebar} />

        <main className="flex-1 overflow-y-auto p-4 md:p-6">
          <div className="mb-6 sm:mb-8">
            <h1 className="text-xl sm:text-2xl font-bold text-gray-800 mb-1">Aulas do Curso</h1>
            <p className="text-sm sm:text-base text-gray-600">Acompanhe seu progresso nas aulas do ESCALI</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
            {aulas.map((aula) => (
              <div key={aula.id} className="bg-white rounded-xl shadow-sm p-4 sm:p-6 hover:shadow-md transition-shadow">
                <div className="flex justify-between items-start mb-3">
                  <h3 className="text-lg font-semibold text-gray-800">{aula.titulo}</h3>
                  <span className={`text-xs font-medium px-2 py-1 rounded-full ${
                    aula.status === "Concluída" ? "bg-green-100 text-green-800" :
                    aula.status === "Próxima" ? "bg-blue-100 text-blue-800" :
                    "bg-gray-100 text-gray-800"
                  }`}>
                    {aula.status}
                  </span>
                </div>
                
                <p className="text-sm text-gray-600 mb-4">{aula.descricao}</p>
                
                <div className="space-y-2 mb-4">
                  <div className="flex justify-between text-xs sm:text-sm">
                    <span className="text-gray-500">Data:</span>
                    <span className="text-gray-700">{new Date(aula.data).toLocaleDateString('pt-BR')}</span>
                  </div>
                  <div className="flex justify-between text-xs sm:text-sm">
                    <span className="text-gray-500">Duração:</span>
                    <span className="text-gray-700">{aula.duracao}</span>
                  </div>
                </div>

                <button 
                  onClick={() => handleAulaClick(aula)}
                  className={`w-full py-2 px-4 rounded-lg text-sm font-medium transition-colors ${
                    aula.status === "Concluída" ? 
                      "bg-green-100 text-green-800 hover:bg-green-200" :
                    aula.status === "Próxima" ?
                      "bg-blue-600 text-white hover:bg-blue-700" :
                      "bg-gray-100 text-gray-600 cursor-not-allowed"
                  }`}
                  disabled={aula.status === "Pendente"}
                >
                  {aula.status === "Concluída" ? "Revisar Aula" :
                   aula.status === "Próxima" ? "Acessar Aula" :
                   "Em Breve"}
                </button>
              </div>
            ))}
          </div>
        </main>
      </div>
    </div>
  );
};

export default Aulas;
