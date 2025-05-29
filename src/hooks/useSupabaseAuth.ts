
import { useState, useEffect } from 'react';
import { User } from '@supabase/supabase-js';
import { authService } from '@/services/authService';
import { profilesService } from '@/services/profilesService';
import type { Database } from '@/integrations/supabase/types';

type Profile = Database['public']['Tables']['profiles']['Row'];

interface UseSupabaseAuthReturn {
  user: User | null;
  profile: Profile | null;
  loading: boolean;
  signIn: (email: string, password: string) => Promise<any>;
  signUp: (email: string, password: string, metadata?: any) => Promise<any>;
  signOut: () => Promise<void>;
  isAuthenticated: boolean;
  isAdmin: boolean;
  isInstructor: boolean;
  isStudent: boolean;
}

export const useSupabaseAuth = (): UseSupabaseAuthReturn => {
  const [user, setUser] = useState<User | null>(null);
  const [profile, setProfile] = useState<Profile | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;

    console.log('🔧 Inicializando useSupabaseAuth...');

    // Configurar listener de mudanças de autenticação
    const { data: { subscription } } = authService.onAuthStateChange(
      async (event, session) => {
        console.log('🔔 Auth event:', event, 'User ID:', session?.user?.id);
        
        if (!isMounted) {
          console.log('⚠️ Componente desmontado, ignorando evento');
          return;
        }

        if (session?.user) {
          console.log('✅ Usuário logado:', session.user.email);
          setUser(session.user);
          
          // Buscar perfil apenas quando necessário e com timeout para evitar loop
          if (event === 'SIGNED_IN') {
            setTimeout(async () => {
              if (!isMounted) return;
              
              try {
                console.log('📋 Buscando perfil do usuário...');
                const userProfile = await profilesService.getCurrentProfile();
                if (isMounted) {
                  console.log('✅ Perfil carregado:', userProfile);
                  setProfile(userProfile);
                }
              } catch (error) {
                console.error('❌ Erro ao buscar perfil:', error);
                if (isMounted) {
                  // Criar perfil padrão se não existir
                  setProfile({
                    id: session.user.id,
                    nome: session.user.email?.split('@')[0] || 'Usuário',
                    cpf: '',
                    telefone: '',
                    role: 'student',
                    status: 'ativo',
                    created_at: new Date().toISOString(),
                    updated_at: new Date().toISOString(),
                    ultimo_acesso: null,
                    avatar_url: null
                  });
                }
              }
            }, 100);
          }
        } else {
          console.log('🚫 Usuário deslogado');
          setUser(null);
          setProfile(null);
        }
        
        if (isMounted) {
          setLoading(false);
        }
      }
    );

    // Buscar sessão inicial
    const getInitialSession = async () => {
      try {
        console.log('🔍 Verificando sessão inicial...');
        const { data: { session } } = await authService.supabase.auth.getSession();
        
        if (!isMounted) return;

        if (session?.user) {
          console.log('✅ Sessão encontrada:', session.user.email);
          setUser(session.user);
          
          try {
            const userProfile = await profilesService.getCurrentProfile();
            if (isMounted) {
              setProfile(userProfile);
            }
          } catch (error) {
            console.error('❌ Erro ao buscar perfil inicial:', error);
            if (isMounted) {
              // Criar perfil padrão se não existir
              setProfile({
                id: session.user.id,
                nome: session.user.email?.split('@')[0] || 'Usuário',
                cpf: '',
                telefone: '',
                role: 'student',
                status: 'ativo',
                created_at: new Date().toISOString(),
                updated_at: new Date().toISOString(),
                ultimo_acesso: null,
                avatar_url: null
              });
            }
          }
        } else {
          console.log('ℹ️ Nenhuma sessão encontrada');
        }
      } catch (error) {
        console.error('❌ Erro ao buscar sessão inicial:', error);
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    };

    getInitialSession();

    return () => {
      console.log('🧹 Limpando useSupabaseAuth...');
      isMounted = false;
      subscription.unsubscribe();
    };
  }, []);

  const signIn = async (email: string, password: string) => {
    console.log('🔐 Tentando fazer login...');
    setLoading(true);
    try {
      const result = await authService.signIn(email, password);
      console.log('✅ Login realizado com sucesso');
      return result;
    } catch (error) {
      console.error('❌ Erro no login:', error);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const signUp = async (email: string, password: string, metadata?: any) => {
    console.log('📝 Tentando fazer cadastro...');
    setLoading(true);
    try {
      const result = await authService.signUp(email, password, metadata);
      console.log('✅ Cadastro realizado com sucesso');
      return result;
    } catch (error) {
      console.error('❌ Erro no cadastro:', error);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const signOut = async () => {
    console.log('🚪 Fazendo logout...');
    setLoading(true);
    try {
      await authService.signOut();
      console.log('✅ Logout realizado com sucesso');
    } catch (error) {
      console.error('❌ Erro no logout:', error);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  return {
    user,
    profile,
    loading,
    signIn,
    signUp,
    signOut,
    isAuthenticated: !!user,
    isAdmin: profile?.role === 'admin',
    isInstructor: profile?.role === 'instructor',
    isStudent: profile?.role === 'student'
  };
};
