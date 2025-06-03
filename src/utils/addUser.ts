
import { supabase } from '@/integrations/supabase/client';

export const addUserToSystem = async (email: string, password: string) => {
  try {
    console.log('🔄 Criando usuário:', email);
    
    // Create user with Supabase Auth
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          nome: email.split('@')[0],
          role: 'student'
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

// Função para adicionar o usuário específico
export const addFabioUser = async () => {
  return await addUserToSystem('fabiopersi@outlook.com', 'Fal85858d.');
};
