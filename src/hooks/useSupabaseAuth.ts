
import { useState, useEffect } from 'react';
import { User } from '@supabase/supabase-js';
import { authService, profilesService } from '@/services/supabaseServices';
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

    // Configurar listener de mudanças de autenticação PRIMEIRO
    const { data: { subscription } } = authService.onAuthStateChange(
      async (event, session) => {
        console.log('Auth event:', event, session?.user?.id);
        
        if (!isMounted) return;

        if (session?.user) {
          setUser(session.user);
          
          // Buscar perfil apenas se necessário
          if (event === 'SIGNED_IN' || event === 'TOKEN_REFRESHED') {
            try {
              const userProfile = await profilesService.getCurrentProfile();
              if (isMounted) {
                setProfile(userProfile);
              }
            } catch (error) {
              console.error('Erro ao buscar perfil:', error);
              if (isMounted) {
                setProfile(null);
              }
            }
          }
        } else {
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
        const { data: { session } } = await authService.supabase.auth.getSession();
        
        if (!isMounted) return;

        if (session?.user) {
          setUser(session.user);
          try {
            const userProfile = await profilesService.getCurrentProfile();
            if (isMounted) {
              setProfile(userProfile);
            }
          } catch (error) {
            console.error('Erro ao buscar perfil inicial:', error);
            if (isMounted) {
              setProfile(null);
            }
          }
        }
      } catch (error) {
        console.error('Erro ao buscar sessão inicial:', error);
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    };

    getInitialSession();

    return () => {
      isMounted = false;
      subscription.unsubscribe();
    };
  }, []);

  const signIn = async (email: string, password: string) => {
    setLoading(true);
    try {
      const result = await authService.signIn(email, password);
      return result;
    } catch (error) {
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const signUp = async (email: string, password: string, metadata?: any) => {
    setLoading(true);
    try {
      const result = await authService.signUp(email, password, metadata);
      return result;
    } catch (error) {
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const signOut = async () => {
    setLoading(true);
    try {
      await authService.signOut();
    } catch (error) {
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
