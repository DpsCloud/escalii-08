
import { supabase } from '@/integrations/supabase/client';

export const turmasService = {
  async getTurmaAtiva() {
    try {
      const { data: turma } = await supabase
        .from('turmas')
        .select(`
          *,
          courses:course_id (
            nome,
            descricao,
            total_aulas
          )
        `)
        .eq('status', 'ativo')
        .single();

      return turma;
    } catch (error) {
      console.error('Erro ao buscar turma ativa:', error);
      return null;
    }
  }
};
