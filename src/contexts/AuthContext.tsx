
import React, { createContext, useContext, useState, useEffect } from 'react';

interface User {
  id: string;
  nome: string;
  email: string;
  tipoUsuario: 'admin' | 'aluno';
}

interface LoginResponse {
  status: 'success' | 'error';
  message?: string;
}

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  isAdmin: boolean;
  isAluno: boolean;
  loading: boolean;
  login: (email: string, password: string) => Promise<LoginResponse>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simular usuário logado para desenvolvimento
    const mockUser: User = {
      id: '1',
      nome: 'João Silva',
      email: 'joao@exemplo.com',
      tipoUsuario: 'aluno'
    };
    setUser(mockUser);
    setLoading(false);
  }, []);

  const login = async (email: string, password: string): Promise<LoginResponse> => {
    setLoading(true);
    try {
      // Simular login
      const mockUser: User = {
        id: '1',
        nome: 'João Silva',
        email: email,
        tipoUsuario: email.includes('admin') ? 'admin' : 'aluno'
      };
      setUser(mockUser);
      setLoading(false);
      return { status: 'success' };
    } catch (error) {
      setLoading(false);
      return { status: 'error', message: 'Erro ao fazer login' };
    }
  };

  const logout = () => {
    setUser(null);
  };

  const value = {
    user,
    isAuthenticated: !!user,
    isAdmin: user?.tipoUsuario === 'admin',
    isAluno: user?.tipoUsuario === 'aluno',
    loading,
    login,
    logout
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
