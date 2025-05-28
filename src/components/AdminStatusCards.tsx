
import { useEffect, useState } from 'react';
import { studentsService, coursesService } from '@/services/supabaseServices';

const AdminStatusCards = () => {
  const [stats, setStats] = useState({
    totalAlunos: 0,
    totalCursos: 0,
    turmasAtivas: 0,
    proximasFormaturas: 0,
    presencaMedia: 0,
    aproveitamento: 0
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const [students, courses] = await Promise.all([
          studentsService.getAllStudents(),
          coursesService.getAllCourses()
        ]);

        const totalAlunos = students.length;
        const totalCursos = courses.length;
        const turmasAtivas = courses.filter(c => c.status === 'ativo').length;
        const proximasFormaturas = students.filter(s => s.progresso >= 90).length;
        
        const presencaMedia = students.length > 0 
          ? Math.round(students.reduce((sum, s) => sum + (s.presenca_geral || 0), 0) / students.length)
          : 0;
        
        const aproveitamento = students.length > 0
          ? Math.round(students.reduce((sum, s) => sum + (s.aproveitamento || 0), 0) / students.length)
          : 0;

        setStats({
          totalAlunos,
          totalCursos,
          turmasAtivas,
          proximasFormaturas,
          presencaMedia,
          aproveitamento
        });
      } catch (error) {
        console.error('Erro ao carregar estatísticas:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, []);

  if (loading) {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2 sm:gap-3 md:gap-4 mb-4 sm:mb-6">
        {[...Array(4)].map((_, i) => (
          <div key={i} className="card bg-white rounded-xl shadow-sm p-3 sm:p-4 md:p-6 animate-pulse">
            <div className="h-4 bg-gray-200 rounded mb-4"></div>
            <div className="flex items-center">
              <div className="w-12 h-12 bg-gray-200 rounded-full mr-4"></div>
              <div className="flex-1">
                <div className="h-6 bg-gray-200 rounded mb-2"></div>
                <div className="h-3 bg-gray-200 rounded"></div>
              </div>
            </div>
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2 sm:gap-3 md:gap-4 mb-4 sm:mb-6">
      <div className="card bg-white rounded-xl shadow-sm p-3 sm:p-4 md:p-6">
        <div className="flex items-center justify-between mb-3 sm:mb-4">
          <h3 className="text-xs sm:text-sm font-semibold text-gray-500">TOTAL ALUNOS</h3>
          <div className="bg-blue-100 text-blue-800 text-xs font-medium px-2 py-0.5 rounded-full">Ativo</div>
        </div>
        <div className="flex items-center">
          <div className="p-2 sm:p-3 bg-blue-100 rounded-full mr-2 sm:mr-3 md:mr-4 flex-shrink-0">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 sm:h-6 sm:w-6 md:h-8 md:w-8 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z"></path>
            </svg>
          </div>
          <div>
            <p className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-800">{stats.totalAlunos}</p>
            <p className="text-gray-500 text-xs sm:text-sm">Estudantes matriculados</p>
          </div>
        </div>
      </div>

      <div className="card bg-white rounded-xl shadow-sm p-3 sm:p-4 md:p-6">
        <div className="flex items-center justify-between mb-3 sm:mb-4">
          <h3 className="text-xs sm:text-sm font-semibold text-gray-500">CURSOS</h3>
          <div className="bg-green-100 text-green-800 text-xs font-medium px-2 py-0.5 rounded-full">{stats.turmasAtivas} Ativas</div>
        </div>
        <div className="flex items-center">
          <div className="p-2 sm:p-3 bg-green-100 rounded-full mr-2 sm:mr-3 md:mr-4 flex-shrink-0">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 sm:h-6 sm:w-6 md:h-8 md:w-8 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C20.832 18.477 19.246 18 17.5 18c-1.746 0-3.332.477-4.5 1.253"></path>
            </svg>
          </div>
          <div>
            <p className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-800">{stats.totalCursos}</p>
            <p className="text-gray-500 text-xs sm:text-sm">Cursos disponíveis</p>
          </div>
        </div>
      </div>

      <div className="card bg-white rounded-xl shadow-sm p-3 sm:p-4 md:p-6">
        <div className="flex items-center justify-between mb-3 sm:mb-4">
          <h3 className="text-xs sm:text-sm font-semibold text-gray-500">PRESENÇA MÉDIA</h3>
          <div className={`text-xs font-medium px-2 py-0.5 rounded-full ${
            stats.presencaMedia >= 85 ? 'bg-green-100 text-green-800' : 
            stats.presencaMedia >= 70 ? 'bg-yellow-100 text-yellow-800' : 
            'bg-red-100 text-red-800'
          }`}>
            {stats.presencaMedia >= 85 ? 'Excelente' : stats.presencaMedia >= 70 ? 'Bom' : 'Baixa'}
          </div>
        </div>
        <div className="flex items-center">
          <div className={`p-2 sm:p-3 rounded-full mr-2 sm:mr-3 md:mr-4 flex-shrink-0 ${
            stats.presencaMedia >= 85 ? 'bg-green-100' : 
            stats.presencaMedia >= 70 ? 'bg-yellow-100' : 
            'bg-red-100'
          }`}>
            <svg xmlns="http://www.w3.org/2000/svg" className={`h-5 w-5 sm:h-6 sm:w-6 md:h-8 md:w-8 ${
              stats.presencaMedia >= 85 ? 'text-green-600' : 
              stats.presencaMedia >= 70 ? 'text-yellow-600' : 
              'text-red-600'
            }`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"></path>
            </svg>
          </div>
          <div>
            <p className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-800">{stats.presencaMedia}%</p>
            <p className="text-gray-500 text-xs sm:text-sm">Média de presença</p>
          </div>
        </div>
      </div>

      <div className="card bg-white rounded-xl shadow-sm p-3 sm:p-4 md:p-6">
        <div className="flex items-center justify-between mb-3 sm:mb-4">
          <h3 className="text-xs sm:text-sm font-semibold text-gray-500">APROVEITAMENTO</h3>
          <div className="bg-purple-100 text-purple-800 text-xs font-medium px-2 py-0.5 rounded-full">{stats.proximasFormaturas} Formandos</div>
        </div>
        <div className="flex items-center">
          <div className="p-2 sm:p-3 bg-purple-100 rounded-full mr-2 sm:mr-3 md:mr-4 flex-shrink-0">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 sm:h-6 sm:w-6 md:h-8 md:w-8 text-purple-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
            </svg>
          </div>
          <div>
            <p className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-800">{stats.aproveitamento}%</p>
            <p className="text-gray-500 text-xs sm:text-sm">Média geral</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminStatusCards;
