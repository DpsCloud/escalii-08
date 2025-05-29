
import { useEffect, useState } from 'react';
import { useAuth } from '@/contexts/SupabaseAuthContext';
import { supabase } from '@/integrations/supabase/client';

const CourseProgress = () => {
  const { profile } = useAuth();
  const [progressData, setProgressData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCourseProgress = async () => {
      if (!profile) return;

      try {
        // Buscar dados do estudante e sua turma
        const { data: student } = await supabase
          .from('students')
          .select(`
            *,
            turmas:turma_id (
              course_id,
              courses:course_id (*)
            )
          `)
          .eq('profile_id', profile.id)
          .single();

        if (!student?.turmas?.course_id) {
          setProgressData([]);
          return;
        }

        // Buscar aulas do curso
        const { data: courseAulas } = await supabase
          .from('course_aulas')
          .select(`
            *,
            aulas:aula_id (
              id,
              titulo
            )
          `)
          .eq('course_id', student.turmas.course_id)
          .order('ordem');

        if (!courseAulas) {
          setProgressData([]);
          return;
        }

        // Buscar presenças do aluno
        const { data: presencas } = await supabase
          .from('presencas')
          .select('course_aula_id, presente, aula_concluida')
          .eq('student_id', student.id);

        const presencasMap = presencas?.reduce((acc, p) => {
          acc[p.course_aula_id] = p;
          return acc;
        }, {}) || {};

        // Mapear progresso das aulas
        const progressList = courseAulas.map((courseAula, index) => {
          const presenca = presencasMap[courseAula.id];
          let status = 'Pendente';
          let progress = 0;

          if (presenca?.presente && presenca?.aula_concluida) {
            status = 'Concluída';
            progress = 100;
          } else if (index === 0 || (courseAulas[index - 1] && presencasMap[courseAulas[index - 1].id]?.aula_concluida)) {
            status = 'Próxima';
            progress = 0;
          }

          return {
            lessonName: `Aula ${courseAula.ordem}: ${courseAula.aulas?.titulo || 'Sem título'}`,
            status,
            progress
          };
        });

        setProgressData(progressList);
      } catch (error) {
        console.error('Erro ao carregar progresso do curso:', error);
        setProgressData([]);
      } finally {
        setLoading(false);
      }
    };

    fetchCourseProgress();
  }, [profile]);

  if (loading) {
    return (
      <div className="bg-white rounded-xl shadow-sm p-4 sm:p-6">
        <h3 className="text-lg font-semibold text-gray-800 mb-4">Progresso do Curso</h3>
        <div className="space-y-3 sm:space-y-4">
          {[...Array(5)].map((_, i) => (
            <div key={i} className="animate-pulse">
              <div className="h-4 bg-gray-200 rounded mb-2"></div>
              <div className="h-2 bg-gray-200 rounded"></div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-xl shadow-sm p-4 sm:p-6">
      <h3 className="text-lg font-semibold text-gray-800 mb-4">Progresso do Curso</h3>
      <div className="space-y-3 sm:space-y-4">
        {progressData.length === 0 ? (
          <div className="text-center py-8">
            <p className="text-gray-500">Nenhum curso matriculado</p>
          </div>
        ) : (
          progressData.map((lesson, index) => (
            <div key={index}>
              <div className="flex justify-between items-center mb-1">
                <span className="text-xs sm:text-sm font-medium text-gray-700 truncate mr-2">{lesson.lessonName}</span>
                <span className={`text-xs sm:text-sm font-medium ${
                  lesson.status === "Concluída" ? "text-green-600" : 
                  lesson.status === "Próxima" ? "text-primary" : "text-gray-500"
                }`}>
                  {lesson.status}
                </span>
              </div>
              <div className="progress-bar">
                <div 
                  className={`progress-value ${
                    lesson.status === "Concluída" ? "bg-green-600" : "bg-gray-400"
                  }`} 
                  style={{width: `${lesson.progress}%`}}
                ></div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default CourseProgress;
