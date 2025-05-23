
import { useState } from 'react';
import { Sidebar } from '@/components/Sidebar';
import { Header } from '@/components/Header';
import { useIsMobile } from '@/hooks/use-mobile';

const Certificado = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const isMobile = useIsMobile();

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  const progressoGeral = 62; // 5 de 8 aulas concluídas
  const presencaMinima = 75;
  const presencaAtual = 100;
  const aulasRestantes = 3;

  return (
    <div className="min-h-screen bg-muted flex">
      <Sidebar isOpen={sidebarOpen} toggleSidebar={toggleSidebar} />

      <div className={`flex-1 flex flex-col transition-all duration-300 ${isMobile ? 'w-full' : (sidebarOpen ? 'ml-64' : 'ml-[70px]')}`}>
        <Header toggleSidebar={toggleSidebar} />

        <main className="flex-1 overflow-y-auto p-4 md:p-6">
          <div className="mb-6 sm:mb-8">
            <h1 className="text-xl sm:text-2xl font-bold text-gray-800 mb-1">Certificado</h1>
            <p className="text-sm sm:text-base text-gray-600">Acompanhe seu progresso para obter o certificado</p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 md:gap-6">
            {/* Status do Certificado */}
            <div className="bg-white rounded-xl shadow-sm p-4 sm:p-6">
              <h2 className="text-lg font-semibold text-gray-800 mb-4">Status do Certificado</h2>
              
              <div className="text-center mb-6">
                <div className="inline-flex items-center justify-center w-20 h-20 bg-yellow-100 rounded-full mb-4">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-yellow-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold text-gray-800 mb-2">Em Andamento</h3>
                <p className="text-gray-600">Você está progredindo bem! Continue assim para obter seu certificado.</p>
              </div>

              <div className="space-y-4">
                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span className="text-gray-700">Progresso do Curso</span>
                    <span className="font-medium">{progressoGeral}%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div className="bg-blue-600 h-2 rounded-full" style={{width: `${progressoGeral}%`}}></div>
                  </div>
                </div>

                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span className="text-gray-700">Taxa de Presença</span>
                    <span className="font-medium text-green-600">{presencaAtual}%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div className="bg-green-600 h-2 rounded-full" style={{width: `${presencaAtual}%`}}></div>
                  </div>
                  <p className="text-xs text-gray-500 mt-1">Mínimo necessário: {presencaMinima}%</p>
                </div>
              </div>
            </div>

            {/* Requisitos */}
            <div className="bg-white rounded-xl shadow-sm p-4 sm:p-6">
              <h2 className="text-lg font-semibold text-gray-800 mb-4">Requisitos para Certificação</h2>
              
              <div className="space-y-3">
                <div className="flex items-center p-3 bg-green-50 rounded-lg">
                  <div className="flex-shrink-0 w-6 h-6 bg-green-600 rounded-full flex items-center justify-center mr-3">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <div className="flex-1">
                    <p className="font-medium text-gray-800">Presença Mínima</p>
                    <p className="text-sm text-gray-600">75% de frequência nas aulas</p>
                  </div>
                  <span className="text-sm font-medium text-green-600">Completo</span>
                </div>

                <div className="flex items-center p-3 bg-blue-50 rounded-lg">
                  <div className="flex-shrink-0 w-6 h-6 bg-blue-600 rounded-full flex items-center justify-center mr-3">
                    <div className="w-2 h-2 bg-white rounded-full"></div>
                  </div>
                  <div className="flex-1">
                    <p className="font-medium text-gray-800">Conclusão do Curso</p>
                    <p className="text-sm text-gray-600">Participar de todas as 8 aulas</p>
                  </div>
                  <span className="text-sm font-medium text-blue-600">5/8 Aulas</span>
                </div>

                <div className="flex items-center p-3 bg-gray-50 rounded-lg">
                  <div className="flex-shrink-0 w-6 h-6 bg-gray-400 rounded-full flex items-center justify-center mr-3">
                    <div className="w-2 h-2 bg-white rounded-full"></div>
                  </div>
                  <div className="flex-1">
                    <p className="font-medium text-gray-800">Avaliação Final</p>
                    <p className="text-sm text-gray-600">Nota mínima de 7.0</p>
                  </div>
                  <span className="text-sm font-medium text-gray-500">Pendente</span>
                </div>
              </div>
            </div>

            {/* Preview do Certificado */}
            <div className="lg:col-span-2 bg-white rounded-xl shadow-sm p-4 sm:p-6">
              <h2 className="text-lg font-semibold text-gray-800 mb-4">Preview do Certificado</h2>
              
              <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center bg-gray-50">
                <div className="max-w-md mx-auto">
                  <div className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm">
                    <div className="text-center">
                      <h3 className="text-lg font-bold text-gray-800 mb-2">CERTIFICADO DE CONCLUSÃO</h3>
                      <p className="text-sm text-gray-600 mb-4">ESCALI - Capacitação de Líderes</p>
                      
                      <div className="border-t border-b border-gray-200 py-4 my-4">
                        <p className="text-xs text-gray-500 mb-1">Certificamos que</p>
                        <p className="text-lg font-bold text-gray-800">João Silva</p>
                        <p className="text-xs text-gray-500 mt-1">concluiu com êxito o curso</p>
                      </div>
                      
                      <p className="text-sm font-medium text-gray-700 mb-2">Capacitação de Líderes</p>
                      <p className="text-xs text-gray-500 mb-4">Turma 2025.1 • 16 horas</p>
                      
                      <div className="flex justify-between text-xs text-gray-500">
                        <span>Data: __/__/____</span>
                        <span>Conceito: ____</span>
                      </div>
                    </div>
                  </div>
                  
                  <p className="text-sm text-gray-500 mt-4">
                    Certificado será liberado após conclusão de todos os requisitos
                  </p>
                </div>
              </div>
            </div>

            {/* Próximos Passos */}
            <div className="lg:col-span-2 bg-white rounded-xl shadow-sm p-4 sm:p-6">
              <h2 className="text-lg font-semibold text-gray-800 mb-4">Próximos Passos</h2>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="text-center p-4 bg-blue-50 rounded-lg">
                  <div className="text-2xl font-bold text-blue-600 mb-2">{aulasRestantes}</div>
                  <p className="text-sm text-gray-600">Aulas restantes</p>
                </div>
                
                <div className="text-center p-4 bg-yellow-50 rounded-lg">
                  <div className="text-2xl font-bold text-yellow-600 mb-2">1</div>
                  <p className="text-sm text-gray-600">Avaliação final</p>
                </div>
                
                <div className="text-center p-4 bg-green-50 rounded-lg">
                  <div className="text-2xl font-bold text-green-600 mb-2">🎓</div>
                  <p className="text-sm text-gray-600">Cerimônia de formatura</p>
                </div>
              </div>
              
              <div className="mt-6 p-4 bg-gray-50 rounded-lg">
                <h4 className="font-medium text-gray-800 mb-2">Informações Importantes:</h4>
                <ul className="text-sm text-gray-600 space-y-1">
                  <li>• O certificado será enviado por email em até 15 dias após a conclusão</li>
                  <li>• Certificado válido em todo território nacional</li>
                  <li>• Possibilidade de segunda via mediante solicitação</li>
                  <li>• Cerimônia de formatura agendada para 12 de Julho de 2023</li>
                </ul>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Certificado;
