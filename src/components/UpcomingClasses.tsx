
import { useEffect, useState } from 'react';
import { useAuth } from '@/contexts/SupabaseAuthContext';
import { coursesService } from '@/services/supabaseServices';
import { Calendar, Clock, Users, MapPin } from 'lucide-react';

const UpcomingClasses = () => {
  const { profile } = useAuth();
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const data = await coursesService.getAllCourses();
        // Filtrar apenas cursos ativos
        const activeCourses = data.filter(course => course.status === 'ativo');
        setCourses(activeCourses);
      } catch (error) {
        console.error('Erro ao carregar cursos:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchCourses();
  }, []);

  if (loading) {
    return (
      <div className="bg-white rounded-xl shadow-sm p-4 sm:p-6">
        <h2 className="text-lg sm:text-xl font-bold text-gray-800 mb-4">Próximas Aulas</h2>
        <div className="space-y-4">
          {[...Array(3)].map((_, i) => (
            <div key={i} className="animate-pulse">
              <div className="h-4 bg-gray-200 rounded mb-2"></div>
              <div className="h-3 bg-gray-200 rounded w-3/4"></div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-xl shadow-sm p-4 sm:p-6">
      <div className="flex items-center justify-between mb-4 sm:mb-6">
        <h2 className="text-lg sm:text-xl font-bold text-gray-800">Próximas Aulas</h2>
        <Calendar className="h-5 w-5 text-gray-400" />
      </div>

      <div className="space-y-3 sm:space-y-4">
        {courses.length === 0 ? (
          <div className="text-center py-8">
            <Calendar className="h-12 w-12 text-gray-300 mx-auto mb-4" />
            <p className="text-gray-500">Nenhum curso ativo encontrado</p>
          </div>
        ) : (
          courses.map((course) => (
            <div key={course.id} className="border-l-4 border-blue-500 pl-4 py-3 hover:bg-gray-50 transition-colors rounded-r-lg">
              <div className="flex items-start justify-between">
                <div className="flex-1 min-w-0">
                  <h3 className="font-semibold text-gray-800 text-sm sm:text-base truncate">
                    {course.nome}
                  </h3>
                  <p className="text-gray-600 text-xs sm:text-sm mt-1 line-clamp-2">
                    {course.descricao}
                  </p>
                  
                  <div className="flex flex-wrap items-center gap-2 sm:gap-4 mt-2 text-xs text-gray-500">
                    <div className="flex items-center gap-1">
                      <Clock className="h-3 w-3" />
                      <span>{course.carga_horaria}h</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Users className="h-3 w-3" />
                      <span>{course.max_alunos} vagas</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <MapPin className="h-3 w-3" />
                      <span>Presencial/Online</span>
                    </div>
                  </div>
                </div>
                
                <div className="flex flex-col items-end ml-2 sm:ml-4">
                  <div className="text-right">
                    <p className="text-xs sm:text-sm font-medium text-gray-800">
                      {new Date(course.data_inicio).toLocaleDateString('pt-BR')}
                    </p>
                    <p className="text-xs text-gray-500">
                      até {new Date(course.data_fim).toLocaleDateString('pt-BR')}
                    </p>
                  </div>
                  <div className={`mt-2 px-2 py-1 rounded-full text-xs font-medium ${
                    course.inscricoes_abertas 
                      ? 'bg-green-100 text-green-800' 
                      : 'bg-gray-100 text-gray-600'
                  }`}>
                    {course.inscricoes_abertas ? 'Inscrições Abertas' : 'Fechado'}
                  </div>
                </div>
              </div>
            </div>
          ))
        )}
      </div>

      {courses.length > 0 && (
        <div className="mt-4 sm:mt-6 pt-4 border-t">
          <button className="w-full text-blue-600 hover:text-blue-800 text-sm font-medium py-2 transition-colors">
            Ver todos os cursos →
          </button>
        </div>
      )}
    </div>
  );
};

export default UpcomingClasses;
