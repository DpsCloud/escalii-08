import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { Student } from '@/types/student';
import { alunosService } from '@/services/supabaseServices';

interface StudentStore {
  students: Student[];
  loading: boolean;
  error: string | null;
  searchTerm: string;
  filterStatus: string;
  
  setStudents: (students: Student[]) => void;
  addStudent: (student: Student) => Promise<void>;
  updateStudent: (id: string, student: Partial<Student>) => Promise<void>;
  deleteStudent: (id: string) => Promise<void>;
  getStudentById: (id: string) => Student | undefined;
  setLoading: (loading: boolean) => void;
  setError: (error: string | null) => void;
  setSearchTerm: (term: string) => void;
  setFilterStatus: (status: string) => void;
  getFilteredStudents: () => Student[];
  fetchStudents: () => Promise<void>;
}

export const useStudentStore = create<StudentStore>()(
  persist(
    (set, get) => ({
      students: [],
      loading: false,
      error: null,
      searchTerm: '',
      filterStatus: 'all',
      
      setStudents: (students) => set({ students }),
      
      addStudent: async (student) => {
        try {
          set({ loading: true });
          const newStudent = await alunosService.createAluno(student);
          set((state) => ({ 
            students: [...state.students, newStudent],
            loading: false 
          }));
        } catch (error) {
          set({ error: 'Erro ao criar aluno', loading: false });
          throw error;
        }
      },
      
      updateStudent: async (id, updatedStudent) => {
        try {
          set({ loading: true });
          const updated = await alunosService.updateAluno(id, updatedStudent);
          set((state) => ({
            students: state.students.map(student => 
              student.id === id ? { ...student, ...updated } : student
            ),
            loading: false
          }));
        } catch (error) {
          set({ error: 'Erro ao atualizar aluno', loading: false });
          throw error;
        }
      },
      
      deleteStudent: async (id) => {
        try {
          set({ loading: true });
          // Note: Implement delete in alunosService if needed
          set((state) => ({
            students: state.students.filter(student => student.id !== id),
            loading: false
          }));
        } catch (error) {
          set({ error: 'Erro ao deletar aluno', loading: false });
          throw error;
        }
      },
      
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
      },

      fetchStudents: async () => {
        try {
          set({ loading: true });
          const data = await alunosService.getAllAlunos();
          set({ students: data, loading: false });
        } catch (error) {
          set({ error: 'Erro ao carregar alunos', loading: false });
          throw error;
        }
      }
    }),
    {
      name: 'student-store',
    }
  )
);