
import { supabase } from '@/integrations/supabase/client';

interface UserMetadata {
  nome: string;
  cpf?: string;
  telefone?: string;
  role?: 'admin' | 'instructor' | 'student';
  data_nascimento?: string;
}

export const addUserToSystem = async (email: string, password: string, metadata?: UserMetadata) => {
  try {
    console.log('🔄 Criando usuário:', email);
    
    // Create user with Supabase Auth
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          nome: metadata?.nome || email.split('@')[0],
          cpf: metadata?.cpf || '',
          telefone: metadata?.telefone || '',
          role: metadata?.role || 'student',
          data_nascimento: metadata?.data_nascimento || null
        }
      }
    });

    if (error) {
      console.error('❌ Erro ao criar usuário:', error);
      throw error;
    }

    console.log('✅ Usuário criado com sucesso:', data);
    return data;
  } catch (error) {
    console.error('❌ Erro geral:', error);
    throw error;
  }
};

// Função para adicionar o usuário específico do Fábio
export const addFabioUser = async () => {
  return await addUserToSystem('fabiopersi@outlook.com', 'Fal85858d.', {
    nome: 'Fábio Persi',
    role: 'admin'
  });
};
