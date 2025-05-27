export interface User {
  id: string;
  name: string;
  email: string;
  role: 'admin' | 'user' | 'instructor';
  createdAt: Date;
  updatedAt: Date;
}

export interface LoginResponse {
  status: 'success' | 'error';
  token?: string;
  usuario?: User;
  message?: string;
}

export interface AuthContextType {
  user: User | null;
  login: (cpf: string, senha: string) => Promise<LoginResponse>;
  logout: () => void;
  loading: boolean;
  isAdmin: boolean;
  isInstructor: boolean;
}

export interface AuthState {
  user: User | null;
  token: string | null;
  isLoading: boolean;
  error: string | null;
}

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface RegisterData extends LoginCredentials {
  name: string;
  role?: 'admin' | 'user' | 'instructor';
}
