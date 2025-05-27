
import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { Student } from '@/types/student';

interface StudentStore {
  students: Student[];
  loading: boolean;
  error: string | null;
  searchTerm: string;
  filterStatus: string;
  
  setStudents: (students: Student[]) => void;
  addStudent: (student: Student) => void;
  updateStudent: (id: string, student: Partial<Student>) => void;
  deleteStudent: (id: string) => void;
  getStudentById: (id: string) => Student | undefined;
  setLoading: (loading: boolean) => void;
  setError: (error: string | null) => void;
  setSearchTerm: (term: string) => void;
  setFilterStatus: (status: string) => void;
  getFilteredStudents: () => Student[];
}

// Dados mock expandidos para alunos
const mockStudents: Student[] = [
  {
    id: '1',
    nome: 'João Silva',
    cpf: '111.111.111-11',
    telefone: '(11) 99999-9999',
    email: 'joao@email.com',
    dataNascimento: '1990-05-15',
    endereco: {
      rua: 'Rua das Flores',
      numero: '123',
      bairro: 'Centro',
      cidade: 'São Paulo',
      cep: '01234-567',
      estado: 'SP'
    },
    curso: 'ESCALI 2025.1',
    turma: 'Turma A',
    progresso: 75,
    status: 'ativo',
    foto: 'https://ui-avatars.com/api/?name=João+Silva&background=3b82f6&color=fff',
    dataMatricula: '2025-01-15',
    presencaGeral: 87,
    aulasAssistidas: 5,
    aproveitamento: 92,
    certificadoDisponivel: false,
    observacoes: 'Aluno dedicado e participativo'
  },
  {
    id: '2',
    nome: 'Maria Santos',
    cpf: '222.222.222-22',
    telefone: '(11) 88888-8888',
    email: 'maria@email.com',
    dataNascimento: '1988-03-20',
    endereco: {
      rua: 'Av. Principal',
      numero: '456',
      bairro: 'Jardins',
      cidade: 'São Paulo',
      cep: '01234-890',
      estado: 'SP'
    },
    curso: 'ESCALI 2025.1',
    turma: 'Turma A',
    progresso: 62,
    status: 'ativo',
    foto: 'https://ui-avatars.com/api/?name=Maria+Santos&background=ec4899&color=fff',
    dataMatricula: '2025-01-15',
    presencaGeral: 95,
    aulasAssistidas: 4,
    aproveitamento: 88,
    certificadoDisponivel: false
  },
  {
    id: '3',
    nome: 'Pedro Costa',
    cpf: '333.333.333-33',
    telefone: '(11) 77777-7777',
    email: 'pedro@email.com',
    dataNascimento: '1992-08-10',
    curso: undefined,
    turma: undefined,
    progresso: 0,
    status: 'pendente',
    foto: 'https://ui-avatars.com/api/?name=Pedro+Costa&background=10b981&color=fff',
    dataMatricula: '2025-01-20',
    presencaGeral: 0,
    aulasAssistidas: 0,
    aproveitamento: 0,
    certificadoDisponivel: false,
    observacoes: 'Aguardando definição de turma'
  },
  {
    id: '4',
    nome: 'Ana Oliveira',
    cpf: '444.444.444-44',
    telefone: '(11) 66666-6666',
    email: 'ana@email.com',
    dataNascimento: '1985-12-03',
    curso: 'ESCALI 2024.2',
    turma: 'Turma B',
    progresso: 100,
    status: 'formado',
    foto: 'https://ui-avatars.com/api/?name=Ana+Oliveira&background=f59e0b&color=fff',
    dataMatricula: '2024-08-01',
    presencaGeral: 100,
    aulasAssistidas: 8,
    aproveitamento: 95,
    certificadoDisponivel: true,
    observacoes: 'Concluiu o curso com excelência'
  }
];

export const useStudentStore = create<StudentStore>()(
  persist(
    (set, get) => ({
      students: mockStudents,
      loading: false,
      error: null,
      searchTerm: '',
      filterStatus: 'all',
      
      setStudents: (students) => set({ students }),
      addStudent: (student) => set((state) => ({ 
        students: [...state.students, { ...student, id: Date.now().toString() }] 
      })),
      updateStudent: (id, updatedStudent) => set((state) => ({
        students: state.students.map(student => 
          student.id === id ? { ...student, ...updatedStudent } : student
        )
      })),
      deleteStudent: (id) => set((state) => ({
        students: state.students.filter(student => student.id !== id)
      })),
      getStudentById: (id) => {
        const { students } = get();
        return students.find(student => student.id === id);
      },
      setLoading: (loading) => set({ loading }),
      setError: (error) => set({ error }),
      setSearchTerm: (searchTerm) => set({ searchTerm }),
      setFilterStatus: (filterStatus) => set({ filterStatus }),
      
      getFilteredStudents: () => {
        const { students, searchTerm, filterStatus } = get();
        return students.filter(student => {
          const matchesSearch = student.nome.toLowerCase().includes(searchTerm.toLowerCase()) ||
                               student.cpf.includes(searchTerm) ||
                               student.email.toLowerCase().includes(searchTerm.toLowerCase());
          
          const matchesFilter = filterStatus === 'all' || student.status === filterStatus;
          
          return matchesSearch && matchesFilter;
        });
      }
    }),
    {
      name: 'student-store',
    }
  )
);
