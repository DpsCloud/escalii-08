
import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { Course } from '@/types/course';

interface CourseStore {
  courses: Course[];
  loading: boolean;
  error: string | null;
  searchTerm: string;
  filterType: string;
  
  setCourses: (courses: Course[]) => void;
  addCourse: (course: Course) => void;
  updateCourse: (id: string, course: Partial<Course>) => void;
  deleteCourse: (id: string) => void;
  getCourseById: (id: string) => Course | undefined;
  toggleInscricoes: (id: string) => void;
  setLoading: (loading: boolean) => void;
  setError: (error: string | null) => void;
  setSearchTerm: (term: string) => void;
  setFilterType: (type: string) => void;
  getFilteredCourses: () => Course[];
  getAllCourses: () => Course[];
}

// Dados mock atualizados com nova estrutura
const mockCourses: Course[] = [
  {
    id: '1',
    nome: 'ESCALI Capacitação de Líderes 2025.1',
    descricao: 'Curso de capacitação para desenvolvimento de líderes cristãos da turma 2025.1.',
    tipo: 'capacitacao',
    ano: '2025',
    periodo: '1',
    dataInicio: '2025-05-01',
    dataFim: '2025-07-30',
    totalAulas: 8,
    cargaHoraria: 32,
    status: 'ativo',
    inscricoesAbertas: true,
    maxAlunos: 40,
    alunosInscritos: 35,
    diasSemana: ['segunda', 'quarta', 'sexta'],
    turmas: [],
    createdAt: '2025-01-15T10:00:00Z',
    updatedAt: '2025-01-20T15:30:00Z'
  },
  {
    id: '2',
    nome: 'ESCALI Capacitação de Líderes 2025.2',
    descricao: 'Curso de capacitação para desenvolvimento de líderes cristãos da turma 2025.2.',
    tipo: 'capacitacao',
    ano: '2025',
    periodo: '2',
    dataInicio: '2025-08-01',
    dataFim: '2025-10-30',
    totalAulas: 8,
    cargaHoraria: 32,
    status: 'planejado',
    inscricoesAbertas: false,
    maxAlunos: 40,
    alunosInscritos: 0,
    diasSemana: ['terca', 'quinta'],
    turmas: [],
    createdAt: '2025-01-15T10:00:00Z',
    updatedAt: '2025-01-15T10:00:00Z'
  }
];

export const useCourseStore = create<CourseStore>()(
  persist(
    (set, get) => ({
      courses: mockCourses,
      loading: false,
      error: null,
      searchTerm: '',
      filterType: 'all',
      
      setCourses: (courses) => set({ courses }),
      addCourse: (course) => set((state) => ({ 
        courses: [...state.courses, course] 
      })),
      updateCourse: (id, updatedCourse) => set((state) => ({
        courses: state.courses.map(course => 
          course.id === id ? { ...course, ...updatedCourse, updatedAt: new Date().toISOString() } : course
        )
      })),
      deleteCourse: (id) => set((state) => ({
        courses: state.courses.filter(course => course.id !== id)
      })),
      getCourseById: (id) => {
        const { courses } = get();
        return courses.find(course => course.id === id);
      },
      toggleInscricoes: (id) => set((state) => ({
        courses: state.courses.map(course => 
          course.id === id ? { 
            ...course, 
            inscricoesAbertas: !course.inscricoesAbertas,
            updatedAt: new Date().toISOString()
          } : course
        )
      })),
      setLoading: (loading) => set({ loading }),
      setError: (error) => set({ error }),
      setSearchTerm: (searchTerm) => set({ searchTerm }),
      setFilterType: (filterType) => set({ filterType }),
      
      getFilteredCourses: () => {
        const { courses, searchTerm, filterType } = get();
        return courses.filter(course => {
          const matchesSearch = course.nome.toLowerCase().includes(searchTerm.toLowerCase()) ||
                               course.descricao?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                               `${course.ano}.${course.periodo}`.includes(searchTerm);
          
          const matchesFilter = filterType === 'all' || course.tipo === filterType;
          
          return matchesSearch && matchesFilter;
        });
      },

      getAllCourses: () => {
        const { courses } = get();
        return courses;
      }
    }),
    {
      name: 'course-store',
    }
  )
);
