
import { useEffect } from 'react';
import { useStudentStore } from '@/stores/useStudentStore';

const AdminStatusCards = () => {
  const { students } = useStudentStore();

  // Calcular estatísticas dos alunos
  const totalAlunos = students.length;
  const alunosAtivos = students.filter(student => student.status === 'ativo').length;
  const alunosFormados = students.filter(student => student.status === 'formado').length;
  const presencaMedia = students.length > 0 
    ? Math.round(students.reduce((acc, student) => acc + student.presencaGeral, 0) / students.length)
    : 0;

  useEffect(() => {
    // Progress ring animation para presença média
    const circle = document.querySelector('.admin-progress-ring__circle:last-child');
    if (circle) {
      const radius = (circle as SVGCircleElement).r.baseVal.value;
      const circumference = radius * 2 * Math.PI;
      
      (circle as SVGCircleElement).style.strokeDasharray = `${circumference} ${circumference}`;
      
      function setProgress(percent: number) {
        const offset = circumference - percent / 100 * circumference;
        (circle as SVGCircleElement).style.strokeDashoffset = `${offset}`;
      }
      
      setProgress(presencaMedia);
    }
  }, [presencaMedia]);

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2 sm:gap-3 md:gap-4 mb-4 sm:mb-6">
      <div className="card bg-white rounded-xl shadow-sm p-3 sm:p-4 md:p-6 hover:shadow-md transition-all duration-300">
        <div className="flex items-center justify-between mb-3 sm:mb-4">
          <h3 className="text-xs sm:text-sm font-semibold text-gray-500">TOTAL DE ALUNOS</h3>
          <div className="bg-blue-100 text-blue-800 text-xs font-medium px-2 py-0.5 rounded-full">Geral</div>
        </div>
        <div className="flex items-center">
          <div className="p-2 sm:p-3 bg-blue-100 rounded-full mr-2 sm:mr-3 md:mr-4 flex-shrink-0">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 sm:h-6 sm:w-6 md:h-8 md:w-8 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z"></path>
            </svg>
          </div>
          <div>
            <p className="text-2xl font-bold text-gray-800">{totalAlunos}</p>
            <p className="text-gray-500 text-xs sm:text-sm">alunos matriculados</p>
          </div>
        </div>
      </div>

      <div className="card bg-white rounded-xl shadow-sm p-3 sm:p-4 md:p-6 hover:shadow-md transition-all duration-300">
        <div className="flex items-center justify-between mb-3 sm:mb-4">
          <h3 className="text-xs sm:text-sm font-semibold text-gray-500">ALUNOS ATIVOS</h3>
          <div className="bg-green-100 text-green-800 text-xs font-medium px-2 py-0.5 rounded-full">Ativo</div>
        </div>
        <div className="flex items-center">
          <div className="p-2 sm:p-3 bg-green-100 rounded-full mr-2 sm:mr-3 md:mr-4 flex-shrink-0">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 sm:h-6 sm:w-6 md:h-8 md:w-8 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
            </svg>
          </div>
          <div>
            <p className="text-2xl font-bold text-gray-800">{alunosAtivos}</p>
            <p className="text-gray-500 text-xs sm:text-sm">em andamento</p>
          </div>
        </div>
      </div>

      <div className="card bg-white rounded-xl shadow-sm p-3 sm:p-4 md:p-6 hover:shadow-md transition-all duration-300">
        <div className="flex items-center justify-between mb-3 sm:mb-4">
          <h3 className="text-xs sm:text-sm font-semibold text-gray-500">PRESENÇA MÉDIA</h3>
          <div className={`text-xs font-medium px-2 py-0.5 rounded-full ${
            presencaMedia >= 80 ? 'bg-green-100 text-green-800' : 
            presencaMedia >= 60 ? 'bg-yellow-100 text-yellow-800' : 
            'bg-red-100 text-red-800'
          }`}>
            {presencaMedia >= 80 ? 'Excelente' : presencaMedia >= 60 ? 'Bom' : 'Baixo'}
          </div>
        </div>
        <div className="flex items-center">
          <div className="relative w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 mr-2 sm:mr-3 md:mr-4 flex-shrink-0">
            <svg className="admin-progress-ring w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 transform -rotate-90" width="48" height="48" viewBox="0 0 60 60">
              <circle className="admin-progress-ring__circle" stroke="#e5e7eb" strokeWidth="6" fill="transparent" r="25" cx="30" cy="30"></circle>
              <circle className="admin-progress-ring__circle" stroke="#10b981" strokeWidth="6" fill="transparent" r="25" cx="30" cy="30"></circle>
            </svg>
            <div className="absolute inset-0 flex items-center justify-center text-sm sm:text-base md:text-lg font-bold">
              {presencaMedia}%
            </div>
          </div>
          <div>
            <p className="text-gray-800 font-medium text-xs sm:text-sm md:text-base">Média geral</p>
            <p className="text-gray-500 text-xs sm:text-sm">{totalAlunos} alunos</p>
          </div>
        </div>
      </div>

      <div className="card bg-white rounded-xl shadow-sm p-3 sm:p-4 md:p-6 hover:shadow-md transition-all duration-300">
        <div className="flex items-center justify-between mb-3 sm:mb-4">
          <h3 className="text-xs sm:text-sm font-semibold text-gray-500">FORMADOS</h3>
          <div className="bg-purple-100 text-purple-800 text-xs font-medium px-2 py-0.5 rounded-full">Concluído</div>
        </div>
        <div className="flex items-center">
          <div className="p-2 sm:p-3 bg-purple-100 rounded-full mr-2 sm:mr-3 md:mr-4 flex-shrink-0">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 sm:h-6 sm:w-6 md:h-8 md:w-8 text-purple-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
            </svg>
          </div>
          <div>
            <p className="text-2xl font-bold text-gray-800">{alunosFormados}</p>
            <p className="text-gray-500 text-xs sm:text-sm">certificados emitidos</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminStatusCards;
