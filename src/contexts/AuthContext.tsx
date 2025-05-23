
import React, { createContext, useContext, useState, useEffect } from 'react';
import { User, LoginResponse, AuthContextType } from '@/types/auth';

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Verificar se há token salvo no localStorage
    const token = localStorage.getItem('token');
    const userData = localStorage.getItem('user');
    
    if (token && userData) {
      try {
        const parsedUser = JSON.parse(userData);
        setUser(parsedUser);
      } catch (error) {
        console.error('Erro ao carregar dados do usuário:', error);
        localStorage.removeItem('token');
        localStorage.removeItem('user');
      }
    }
    
    setLoading(false);
  }, []);

  const login = async (cpf: string, senha: string): Promise<LoginResponse> => {
    try {
      // Aqui seria a chamada real para a API
      // Por enquanto, vou simular uma resposta
      const mockResponse: LoginResponse = {
        status: 'success',
        token: 'mock_jwt_token',
        usuario: {
          id: '1',
          nome: 'Maria Souza',
          cpf: cpf,
          email: 'maria@email.com',
          tipoUsuario: cpf === '111.111.111-11' ? 'admin' : 'instrutor',
          createdAt: new Date().toISOString()
        }
      };

      if (mockResponse.status === 'success' && mockResponse.token && mockResponse.usuario) {
        localStorage.setItem('token', mockResponse.token);
        localStorage.setItem('user', JSON.stringify(mockResponse.usuario));
        setUser(mockResponse.usuario);
      }

      return mockResponse;
    } catch (error) {
      return {
        status: 'error',
        message: 'Erro ao fazer login'
      };
    }
  };

  const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setUser(null);
  };

  const isAdmin = user?.tipoUsuario === 'admin';
  const isInstructor = user?.tipoUsuario === 'instrutor';

  return (
    <AuthContext.Provider
      value={{
        user,
        login,
        logout,
        loading,
        isAdmin,
        isInstructor
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
