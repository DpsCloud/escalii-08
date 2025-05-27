
import { useEffect } from 'react';

const StatusCards = () => {
  useEffect(() => {
    // Progress ring animation
    const circle = document.querySelector('.progress-ring__circle:last-child');
    if (circle) {
      const radius = (circle as SVGCircleElement).r.baseVal.value;
      const circumference = radius * 2 * Math.PI;
      
      (circle as SVGCircleElement).style.strokeDasharray = `${circumference} ${circumference}`;
      
      function setProgress(percent: number) {
        const offset = circumference - percent / 100 * circumference;
        (circle as SVGCircleElement).style.strokeDashoffset = `${offset}`;
      }
      
      // Set to 62%
      setProgress(62);
    }
  }, []);

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 md:gap-6 mb-4 sm:mb-6">
      <div className="card bg-white rounded-xl shadow-sm p-3 sm:p-4 md:p-6">
        <div className="flex items-center justify-between mb-3 sm:mb-4">
          <h3 className="text-xs sm:text-sm font-semibold text-gray-500">PROGRESSO DO CURSO</h3>
          <div className="bg-blue-100 text-blue-800 text-xs font-medium px-2 py-0.5 rounded-full">5/8 Aulas</div>
        </div>
        <div className="flex items-center">
          <div className="relative w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 mr-2 sm:mr-3 md:mr-4 flex-shrink-0">
            <svg className="progress-ring" width="48" height="48" viewBox="0 0 60 60" className="sm:w-14 sm:h-14 md:w-16 md:h-16">
              <circle className="progress-ring__circle" stroke="#e5e7eb" strokeWidth="6" fill="transparent" r="25" cx="30" cy="30"></circle>
              <circle className="progress-ring__circle" stroke="#3b82f6" strokeWidth="6" fill="transparent" r="25" cx="30" cy="30"></circle>
            </svg>
            <div className="absolute inset-0 flex items-center justify-center text-sm sm:text-base md:text-lg font-bold">
              62%
            </div>
          </div>
          <div>
            <p className="text-gray-800 font-medium text-xs sm:text-sm md:text-base">Bom progresso!</p>
            <p className="text-gray-500 text-xs sm:text-sm">Próxima aula em 2 dias</p>
          </div>
        </div>
      </div>

      <div className="card bg-white rounded-xl shadow-sm p-3 sm:p-4 md:p-6">
        <div className="flex items-center justify-between mb-3 sm:mb-4">
          <h3 className="text-xs sm:text-sm font-semibold text-gray-500">PRESENÇA</h3>
          <div className="bg-green-100 text-green-800 text-xs font-medium px-2 py-0.5 rounded-full">Excelente</div>
        </div>
        <div className="flex items-center">
          <div className="p-2 sm:p-3 bg-green-100 rounded-full mr-2 sm:mr-3 md:mr-4 flex-shrink-0">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 sm:h-6 sm:w-6 md:h-8 md:w-8 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
            </svg>
          </div>
          <div>
            <p className="text-gray-800 font-medium text-xs sm:text-sm md:text-base">100% de presença</p>
            <p className="text-gray-500 text-xs sm:text-sm">5 aulas assistidas</p>
          </div>
        </div>
      </div>

      <div className="card bg-white rounded-xl shadow-sm p-3 sm:p-4 md:p-6">
        <div className="flex items-center justify-between mb-3 sm:mb-4">
          <h3 className="text-xs sm:text-sm font-semibold text-gray-500">PRÓXIMA AULA</h3>
          <div className="bg-purple-100 text-purple-800 text-xs font-medium px-2 py-0.5 rounded-full">Aula 6</div>
        </div>
        <div className="flex items-center">
          <div className="p-2 sm:p-3 bg-purple-100 rounded-full mr-2 sm:mr-3 md:mr-4 flex-shrink-0">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 sm:h-6 sm:w-6 md:h-8 md:w-8 text-purple-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"></path>
            </svg>
          </div>
          <div>
            <p className="text-gray-800 font-medium text-xs sm:text-sm md:text-base">9 Dimensões da Imaturidade</p>
            <p className="text-gray-500 text-xs sm:text-sm">Quarta-feira, 19:30h</p>
          </div>
        </div>
      </div>

      <div className="card bg-white rounded-xl shadow-sm p-3 sm:p-4 md:p-6">
        <div className="flex items-center justify-between mb-3 sm:mb-4">
          <h3 className="text-xs sm:text-sm font-semibold text-gray-500">CERTIFICADO</h3>
          <div className="bg-yellow-100 text-yellow-800 text-xs font-medium px-2 py-0.5 rounded-full">Em andamento</div>
        </div>
        <div className="flex items-center">
          <div className="p-2 sm:p-3 bg-yellow-100 rounded-full mr-2 sm:mr-3 md:mr-4 flex-shrink-0">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 sm:h-6 sm:w-6 md:h-8 md:w-8 text-yellow-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
            </svg>
          </div>
          <div>
            <p className="text-gray-800 font-medium text-xs sm:text-sm md:text-base">Disponível ao final</p>
            <p className="text-gray-500 text-xs sm:text-sm">3 aulas restantes</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StatusCards;
