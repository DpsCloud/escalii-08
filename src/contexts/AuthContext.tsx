
import React, { createContext, useContext, useState, useEffect } from 'react';

interface User {
  id: string;
  nome: string;
  email: string;
  tipoUsuario: 'admin' | 'aluno';
}

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  isAdmin: boolean;
  isAluno: boolean;
  login: (email: string, password: string) => Promise<boolean>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    // Simular usuário logado para desenvolvimento
    const mockUser: User = {
      id: '1',
      nome: 'João Silva',
      email: 'joao@exemplo.com',
      tipoUsuario: 'aluno' // Mudando de 'instrutor' para 'aluno'
    };
    setUser(mockUser);
  }, []);

  const login = async (email: string, password: string): Promise<boolean> => {
    // Simular login
    const mockUser: User = {
      id: '1',
      nome: 'João Silva',
      email: email,
      tipoUsuario: email.includes('admin') ? 'admin' : 'aluno'
    };
    setUser(mockUser);
    return true;
  };

  const logout = () => {
    setUser(null);
  };

  const value = {
    user,
    isAuthenticated: !!user,
    isAdmin: user?.tipoUsuario === 'admin',
    isAluno: user?.tipoUsuario === 'aluno',
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
