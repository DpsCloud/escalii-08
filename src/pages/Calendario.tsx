
import { useState } from 'react';
import { Sidebar } from '@/components/Sidebar';
import { Header } from '@/components/Header';
import { useIsMobile } from '@/hooks/use-mobile';

const Calendario = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const isMobile = useIsMobile();

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  const eventos = [
    {
      id: 1,
      titulo: "Aula 6: 9 Dimensões da Imaturidade",
      data: "2023-06-14",
      horario: "19:30 - 21:30",
      tipo: "aula",
      status: "próxima"
    },
    {
      id: 2,
      titulo: "Aula 7: Propósito da Mesa",
      data: "2023-06-21",
      horario: "19:30 - 21:30",
      tipo: "aula",
      status: "agendada"
    },
    {
      id: 3,
      titulo: "Aula 8: 8 Características de um Líder",
      data: "2023-06-28",
      horario: "19:30 - 21:30",
      tipo: "aula",
      status: "agendada"
    },
    {
      id: 4,
      titulo: "Avaliação Final",
      data: "2023-07-05",
      horario: "19:30 - 21:00",
      tipo: "avaliacao",
      status: "agendada"
    },
    {
      id: 5,
      titulo: "Cerimônia de Formatura",
      data: "2023-07-12",
      horario: "19:00 - 22:00",
      tipo: "evento",
      status: "agendada"
    }
  ];

  return (
    <div className="min-h-screen bg-muted flex">
      <Sidebar isOpen={sidebarOpen} toggleSidebar={toggleSidebar} />

      <div className={`flex-1 flex flex-col transition-all duration-300 ${isMobile ? 'w-full' : (sidebarOpen ? 'ml-64' : 'ml-[70px]')}`}>
        <Header toggleSidebar={toggleSidebar} />

        <main className="flex-1 overflow-y-auto p-4 md:p-6">
          <div className="mb-6 sm:mb-8">
            <h1 className="text-xl sm:text-2xl font-bold text-gray-800 mb-1">Calendário</h1>
            <p className="text-sm sm:text-base text-gray-600">Acompanhe suas aulas e eventos do curso</p>
          </div>

          <div className="bg-white rounded-xl shadow-sm p-4 sm:p-6">
            <h2 className="text-lg font-semibold text-gray-800 mb-4">Próximos Eventos</h2>
            
            <div className="space-y-4">
              {eventos.map((evento) => (
                <div key={evento.id} className={`p-4 rounded-lg border-l-4 ${
                  evento.tipo === 'aula' ? 'bg-blue-50 border-blue-500' :
                  evento.tipo === 'avaliacao' ? 'bg-yellow-50 border-yellow-500' :
                  'bg-purple-50 border-purple-500'
                }`}>
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
                    <div className="flex-1">
                      <h3 className="font-semibold text-gray-800 mb-1">{evento.titulo}</h3>
                      <div className="flex flex-col sm:flex-row sm:items-center sm:gap-4 text-sm text-gray-600">
                        <span>📅 {new Date(evento.data).toLocaleDateString('pt-BR', { 
                          weekday: 'long', 
                          year: 'numeric', 
                          month: 'long', 
                          day: 'numeric' 
                        })}</span>
                        <span>⏰ {evento.horario}</span>
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-2 mt-3 sm:mt-0">
                      <span className={`text-xs font-medium px-2 py-1 rounded-full ${
                        evento.status === 'próxima' ? 'bg-green-100 text-green-800' :
                        'bg-gray-100 text-gray-800'
                      }`}>
                        {evento.status === 'próxima' ? 'Próxima' : 'Agendada'}
                      </span>
                      
                      {evento.tipo === 'aula' && (
                        <button className="text-xs bg-blue-600 text-white px-3 py-1 rounded-lg hover:bg-blue-700 transition-colors">
                          {evento.status === 'próxima' ? 'Entrar' : 'Detalhes'}
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-6 p-4 bg-gray-50 rounded-lg">
              <h3 className="font-semibold text-gray-800 mb-2">Informações Importantes</h3>
              <ul className="text-sm text-gray-600 space-y-1">
                <li>• Todas as aulas são realizadas online via Zoom</li>
                <li>• Link de acesso será enviado por email 30 minutos antes</li>
                <li>• Presença obrigatória em pelo menos 75% das aulas</li>
                <li>• Gravações disponíveis por 48h após a aula</li>
              </ul>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Calendario;
