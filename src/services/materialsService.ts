
import { supabase } from '@/integrations/supabase/client';

export const materialsService = {
  async getRecentMaterials(limit = 5) {
    try {
      const { data: materials } = await supabase
        .from('materials')
        .select(`
          *,
          aulas:aula_id (
            titulo
          )
        `)
        .order('created_at', { ascending: false })
        .limit(limit);

      return materials || [];
    } catch (error) {
      console.error('Erro ao buscar materiais recentes:', error);
      return [];
    }
  }
};
