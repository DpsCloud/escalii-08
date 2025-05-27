
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
  login: (cpf: string, senha: string) => Promise<LoginResponse>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Verificar se há usuário salvo no localStorage
    const savedUser = localStorage.getItem('user');
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
    setLoading(false);
  }, []);

  const login = async (cpf: string, senha: string): Promise<LoginResponse> => {
    setLoading(true);
    try {
      // Simular login com CPFs demo
      let mockUser: User;
      
      if (cpf === '111.111.111-11' || cpf === '11111111111') {
        mockUser = {
          id: '1',
          nome: 'Admin Silva',
          email: 'admin@exemplo.com',
          tipoUsuario: 'admin'
        };
      } else if (cpf === '222.222.222-22' || cpf === '22222222222') {
        mockUser = {
          id: '2',
          nome: 'João Silva',
          email: 'joao@exemplo.com',
          tipoUsuario: 'aluno'
        };
      } else {
        setLoading(false);
        return { status: 'error', message: 'CPF ou senha inválidos' };
      }
      
      setUser(mockUser);
      localStorage.setItem('user', JSON.stringify(mockUser));
      setLoading(false);
      return { status: 'success' };
    } catch (error) {
      setLoading(false);
      return { status: 'error', message: 'Erro ao fazer login' };
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('user');
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
