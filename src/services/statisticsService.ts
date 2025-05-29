
import { supabase } from '@/integrations/supabase/client';

export const statisticsService = {
  async getAdminStats() {
    try {
      // Total de alunos
      const { count: totalAlunos } = await supabase
        .from('students')
        .select('*', { count: 'exact', head: true });

      // Total de cursos
      const { count: totalCursos } = await supabase
        .from('courses')
        .select('*', { count: 'exact', head: true });

      // Turmas ativas
      const { count: turmasAtivas } = await supabase
        .from('turmas')
        .select('*', { count: 'exact', head: true })
        .eq('status', 'ativo');

      // Próximas formaturas (turmas que terminam nos próximos 30 dias)
      const dataLimite = new Date();
      dataLimite.setDate(dataLimite.getDate() + 30);
      
      const { count: proximasFormaturas } = await supabase
        .from('turmas')
        .select('*', { count: 'exact', head: true })
        .eq('status', 'ativo')
        .lte('data_fim', dataLimite.toISOString().split('T')[0]);

      // Presença média geral
      const { data: presencaData } = await supabase
        .from('students')
        .select('presenca_geral')
        .not('presenca_geral', 'is', null);

      const presencaMedia = presencaData && presencaData.length > 0
        ? Math.round(presencaData.reduce((sum, student) => sum + (student.presenca_geral || 0), 0) / presencaData.length)
        : 0;

      // Aproveitamento médio
      const { data: aproveitamentoData } = await supabase
        .from('students')
        .select('aproveitamento')
        .not('aproveitamento', 'is', null);

      const aproveitamento = aproveitamentoData && aproveitamentoData.length > 0
        ? Math.round(aproveitamentoData.reduce((sum, student) => sum + (student.aproveitamento || 0), 0) / aproveitamentoData.length)
        : 0;

      // Aniversariantes do mês
      const { count: aniversariantes } = await supabase
        .from('aniversariantes_mes')
        .select('*', { count: 'exact', head: true });

      return {
        totalAlunos: totalAlunos || 0,
        totalCursos: totalCursos || 0,
        turmasAtivas: turmasAtivas || 0,
        proximasFormaturas: proximasFormaturas || 0,
        presencaMedia,
        aproveitamento,
        aniversariantes: aniversariantes || 0
      };
    } catch (error) {
      console.error('Erro ao buscar estatísticas admin:', error);
      return {
        totalAlunos: 0,
        totalCursos: 0,
        turmasAtivas: 0,
        proximasFormaturas: 0,
        presencaMedia: 0,
        aproveitamento: 0,
        aniversariantes: 0
      };
    }
  },

  async getStudentStats() {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error('Usuário não autenticado');

      // Buscar dados do estudante
      const { data: student } = await supabase
        .from('students')
        .select(`
          *,
          turmas:turma_id (
            *,
            courses:course_id (*)
          )
        `)
        .eq('profile_id', user.id)
        .single();

      if (!student) {
        return {
          progresso: 0,
          presencaGeral: 0,
          aulasAssistidas: 0,
          certificadoDisponivel: false,
          turma: null
        };
      }

      return {
        progresso: student.progresso || 0,
        presencaGeral: student.presenca_geral || 0,
        aulasAssistidas: student.aulas_assistidas || 0,
        certificadoDisponivel: student.certificado_disponivel || false,
        turma: student.turmas
      };
    } catch (error) {
      console.error('Erro ao buscar estatísticas do estudante:', error);
      return {
        progresso: 0,
        presencaGeral: 0,
        aulasAssistidas: 0,
        certificadoDisponivel: false,
        turma: null
      };
    }
  }
};
