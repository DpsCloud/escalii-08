
export interface User {
  id: string;
  nome: string;
  cpf: string;
  email: string;
  tipoUsuario: 'admin' | 'instrutor';
  telefone?: string;
  dataNascimento?: string;
  createdAt: string;
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
