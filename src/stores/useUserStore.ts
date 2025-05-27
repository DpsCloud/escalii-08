
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface User {
  id: string;
  nome: string;
  cpf: string;
  email: string;
  tipoUsuario: 'admin' | 'instrutor';
  telefone: string;
  status: 'ativo' | 'inativo';
  ultimoAcesso: string;
}

interface UserStore {
  usuarios: User[];
  loading: boolean;
  error: string | null;
  searchTerm: string;
  filterType: string;
  
  setUsuarios: (usuarios: User[]) => void;
  addUsuario: (usuario: User) => void;
  updateUsuario: (id: string, usuario: Partial<User>) => void;
  deleteUsuario: (id: string) => void;
  setLoading: (loading: boolean) => void;
  setError: (error: string | null) => void;
  setSearchTerm: (term: string) => void;
  setFilterType: (type: string) => void;
  getFilteredUsuarios: () => User[];
}

export const useUserStore = create<UserStore>()(
  persist(
    (set, get) => ({
      usuarios: [
        {
          id: '1',
          nome: 'Maria Souza',
          cpf: '111.111.111-11',
          email: 'maria@escali.com',
          tipoUsuario: 'admin',
          telefone: '(11) 99999-9999',
          status: 'ativo',
          ultimoAcesso: '2024-01-15'
        },
        {
          id: '2',
          nome: 'João Santos',
          cpf: '222.222.222-22',
          email: 'joao@escali.com',
          tipoUsuario: 'instrutor',
          telefone: '(11) 88888-8888',
          status: 'ativo',
          ultimoAcesso: '2024-01-14'
        },
        {
          id: '3',
          nome: 'Ana Costa',
          cpf: '333.333.333-33',
          email: 'ana@escali.com',
          tipoUsuario: 'instrutor',
          telefone: '(11) 77777-7777',
          status: 'inativo',
          ultimoAcesso: '2024-01-10'
        }
      ],
      loading: false,
      error: null,
      searchTerm: '',
      filterType: 'all',
      
      setUsuarios: (usuarios) => set({ usuarios }),
      addUsuario: (usuario) => set((state) => ({ 
        usuarios: [...state.usuarios, usuario] 
      })),
      updateUsuario: (id, updatedUser) => set((state) => ({
        usuarios: state.usuarios.map(user => 
          user.id === id ? { ...user, ...updatedUser } : user
        )
      })),
      deleteUsuario: (id) => set((state) => ({
        usuarios: state.usuarios.filter(user => user.id !== id)
      })),
      setLoading: (loading) => set({ loading }),
      setError: (error) => set({ error }),
      setSearchTerm: (searchTerm) => set({ searchTerm }),
      setFilterType: (filterType) => set({ filterType }),
      
      getFilteredUsuarios: () => {
        const { usuarios, searchTerm, filterType } = get();
        return usuarios.filter(usuario => {
          const matchesSearch = usuario.nome.toLowerCase().includes(searchTerm.toLowerCase()) ||
                               usuario.cpf.includes(searchTerm) ||
                               usuario.email.toLowerCase().includes(searchTerm.toLowerCase());
          
          const matchesFilter = filterType === 'all' || usuario.tipoUsuario === filterType;
          
          return matchesSearch && matchesFilter;
        });
      }
    }),
    {
      name: 'user-store',
    }
  )
);
