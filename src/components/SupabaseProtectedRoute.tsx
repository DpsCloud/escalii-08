
import { useAuth } from '@/contexts/SupabaseAuthContext';
import { SupabaseLoginForm } from '@/components/auth/SupabaseLoginForm';

interface SupabaseProtectedRouteProps {
  children: React.ReactNode;
  requiredRole?: 'admin' | 'instructor' | 'student';
}

export const SupabaseProtectedRoute = ({ 
  children, 
  requiredRole 
}: SupabaseProtectedRouteProps) => {
  const { isAuthenticated, profile, loading, user } = useAuth();

  console.log('🛡️ ProtectedRoute - Estado:', {
    isAuthenticated,
    profile,
    loading,
    user: user?.email,
    requiredRole
  });

  if (loading) {
    console.log('⏳ ProtectedRoute - Carregando...');
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-600 to-purple-600">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-white mx-auto mb-4"></div>
          <p className="text-white text-lg">Carregando...</p>
        </div>
      </div>
    );
  }

  if (!isAuthenticated) {
    console.log('🔒 ProtectedRoute - Usuário não autenticado, redirecionando para login');
    return <SupabaseLoginForm />;
  }

  if (requiredRole && profile?.role !== requiredRole) {
    console.log(`🚫 ProtectedRoute - Acesso negado. Role necessária: ${requiredRole}, Role atual: ${profile?.role}`);
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center max-w-md mx-auto p-8">
          <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <span className="text-2xl">🚫</span>
          </div>
          <h1 className="text-2xl font-bold text-gray-900 mb-2">Acesso Negado</h1>
          <p className="text-gray-600 mb-4">
            Você não tem permissão para acessar esta página.
          </p>
          <p className="text-sm text-gray-500">
            Role necessária: {requiredRole} | Sua role: {profile?.role || 'Não definida'}
          </p>
        </div>
      </div>
    );
  }

  console.log('✅ ProtectedRoute - Acesso liberado');
  return <>{children}</>;
};
