
import { useState } from 'react';
import { Sidebar } from '@/components/Sidebar';
import { Header } from '@/components/Header';
import { useIsMobile } from '@/hooks/use-mobile';
import AttendanceForm from '@/components/AttendanceForm';

const Presenca = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const isMobile = useIsMobile();

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  const presencas = [
    { aula: "Aula 1: Comunicação", data: "2023-05-10", status: "Presente", horario: "19:35" },
    { aula: "Aula 2: Atributos da Liderança", data: "2023-05-17", status: "Presente", horario: "19:32" },
    { aula: "Aula 3: Ouvir, Confiar e Obedecer", data: "2023-05-24", status: "Presente", horario: "19:28" },
    { aula: "Aula 4: O DNA de Cristo", data: "2023-05-31", status: "Presente", horario: "19:40" },
    { aula: "Aula 5: Honra e Lealdade", data: "2023-06-07", status: "Presente", horario: "19:30" },
    { aula: "Aula 6: 9 Dimensões da Imaturidade", data: "2023-06-14", status: "Aguardando", horario: "-" },
  ];

  const percentualPresenca = Math.round((presencas.filter(p => p.status === "Presente").length / presencas.length) * 100);

  return (
    <div className="min-h-screen bg-muted flex">
      <Sidebar isOpen={sidebarOpen} toggleSidebar={toggleSidebar} />

      <div className={`flex-1 flex flex-col transition-all duration-300 ${isMobile ? 'w-full' : (sidebarOpen ? 'ml-64' : 'ml-[70px]')}`}>
        <Header toggleSidebar={toggleSidebar} />

        <main className="flex-1 overflow-y-auto p-4 md:p-6">
          <div className="mb-6 sm:mb-8">
            <h1 className="text-xl sm:text-2xl font-bold text-gray-800 mb-1">Controle de Presença</h1>
            <p className="text-sm sm:text-base text-gray-600">Acompanhe sua frequência nas aulas</p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 md:gap-6">
            <div className="lg:col-span-2 space-y-4 md:space-y-6">
              {/* Estatísticas de Presença */}
              <div className="bg-white rounded-xl shadow-sm p-4 sm:p-6">
                <h2 className="text-lg font-semibold text-gray-800 mb-4">Estatísticas</h2>
                
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div className="text-center p-4 bg-green-50 rounded-lg">
                    <div className="text-2xl font-bold text-green-600">{percentualPresenca}%</div>
                    <div className="text-sm text-gray-600">Taxa de Presença</div>
                  </div>
                  
                  <div className="text-center p-4 bg-blue-50 rounded-lg">
                    <div className="text-2xl font-bold text-blue-600">{presencas.filter(p => p.status === "Presente").length}</div>
                    <div className="text-sm text-gray-600">Aulas Assistidas</div>
                  </div>
                  
                  <div className="text-center p-4 bg-purple-50 rounded-lg">
                    <div className="text-2xl font-bold text-purple-600">{presencas.length - presencas.filter(p => p.status === "Presente").length}</div>
                    <div className="text-sm text-gray-600">Aulas Restantes</div>
                  </div>
                </div>
              </div>

              {/* Histórico de Presença */}
              <div className="bg-white rounded-xl shadow-sm p-4 sm:p-6">
                <h2 className="text-lg font-semibold text-gray-800 mb-4">Histórico de Presença</h2>
                
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b border-gray-200">
                        <th className="text-left py-3 px-2 text-sm font-semibold text-gray-600">Aula</th>
                        <th className="text-left py-3 px-2 text-sm font-semibold text-gray-600">Data</th>
                        <th className="text-left py-3 px-2 text-sm font-semibold text-gray-600">Horário Check-in</th>
                        <th className="text-left py-3 px-2 text-sm font-semibold text-gray-600">Status</th>
                      </tr>
                    </thead>
                    <tbody>
                      {presencas.map((presenca, index) => (
                        <tr key={index} className="border-b border-gray-100">
                          <td className="py-3 px-2 text-sm text-gray-800">{presenca.aula}</td>
                          <td className="py-3 px-2 text-sm text-gray-600">
                            {new Date(presenca.data).toLocaleDateString('pt-BR')}
                          </td>
                          <td className="py-3 px-2 text-sm text-gray-600">{presenca.horario}</td>
                          <td className="py-3 px-2">
                            <span className={`text-xs font-medium px-2 py-1 rounded-full ${
                              presenca.status === "Presente" ? "bg-green-100 text-green-800" :
                              "bg-yellow-100 text-yellow-800"
                            }`}>
                              {presenca.status}
                            </span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>

            {/* Sidebar com formulário de presença */}
            <div className="space-y-4 md:space-y-6">
              <AttendanceForm />
              
              <div className="bg-white rounded-xl shadow-sm p-4 sm:p-6">
                <h3 className="text-lg font-semibold text-gray-800 mb-3">Próxima Aula</h3>
                <div className="space-y-3">
                  <div>
                    <p className="text-sm font-medium text-gray-700">9 Dimensões da Imaturidade</p>
                    <p className="text-xs text-gray-500">Quarta-feira, 14 de Junho</p>
                    <p className="text-xs text-gray-500">19:30 - 21:30</p>
                  </div>
                  
                  <div className="p-3 bg-blue-50 rounded-lg">
                    <p className="text-xs text-blue-800">
                      <strong>Lembrete:</strong> Chegue 10 minutos antes para garantir sua presença!
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Presenca;
