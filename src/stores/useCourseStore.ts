
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
}

// Dados mock expandidos para cursos
const mockCourses: Course[] = [
  {
    id: '1',
    nome: 'ESCALI Capacitação de Líderes 2025.1',
    descricao: 'Curso de capacitação para desenvolvimento de líderes cristãos',
    tipo: 'capacitacao',
    periodo: '2025.1',
    dataInicio: '2025-05-01',
    dataFim: '2025-07-30',
    totalAulas: 8,
    cargaHoraria: 32,
    status: 'ativo',
    inscricoesAbertas: true,
    maxAlunos: 40,
    alunosInscritos: 35,
    turmas: [
      {
        id: 't1',
        nome: 'Turma A',
        cursoId: '1',
        status: 'ativa',
        alunos: 35,
        maxAlunos: 40,
        dataInicio: '2025-05-01',
        dataFim: '2025-07-30',
        professorId: 'p1',
        professorNome: 'Pastor João',
        aulas: 5,
        maxAulas: 8
      }
    ],
    createdAt: '2025-01-15T10:00:00Z',
    updatedAt: '2025-01-20T15:30:00Z'
  },
  {
    id: '2',
    nome: 'ESCALI Capacitação de Líderes 2025.2',
    descricao: 'Segunda turma de capacitação do ano de 2025',
    tipo: 'capacitacao',
    periodo: '2025.2',
    dataInicio: '2025-08-01',
    dataFim: '2025-10-30',
    totalAulas: 8,
    cargaHoraria: 32,
    status: 'planejado',
    inscricoesAbertas: false,
    maxAlunos: 40,
    alunosInscritos: 0,
    turmas: [],
    createdAt: '2025-01-15T10:00:00Z',
    updatedAt: '2025-01-15T10:00:00Z'
  },
  {
    id: '3',
    nome: 'Revalidação 2025.1',
    descricao: 'Curso de revalidação para líderes já capacitados',
    tipo: 'revalidacao',
    periodo: '2025.1',
    dataInicio: '2025-06-01',
    dataFim: '2025-06-30',
    totalAulas: 4,
    cargaHoraria: 16,
    status: 'ativo',
    inscricoesAbertas: true,
    maxAlunos: 20,
    alunosInscritos: 12,
    turmas: [
      {
        id: 't2',
        nome: 'Revalidação A',
        cursoId: '3',
        status: 'ativa',
        alunos: 12,
        maxAlunos: 20,
        dataInicio: '2025-06-01',
        dataFim: '2025-06-30',
        professorId: 'p2',
        professorNome: 'Pastora Maria',
        aulas: 2,
        maxAulas: 4
      }
    ],
    createdAt: '2025-01-10T14:00:00Z',
    updatedAt: '2025-01-18T09:15:00Z'
  },
  {
    id: '4',
    nome: 'ESCALI Capacitação de Líderes 2024.2',
    descricao: 'Curso finalizado do segundo semestre de 2024',
    tipo: 'capacitacao',
    periodo: '2024.2',
    dataInicio: '2024-08-01',
    dataFim: '2024-10-30',
    totalAulas: 8,
    cargaHoraria: 32,
    status: 'finalizado',
    inscricoesAbertas: false,
    maxAlunos: 40,
    alunosInscritos: 38,
    turmas: [
      {
        id: 't3',
        nome: 'Turma B',
        cursoId: '4',
        status: 'finalizada',
        alunos: 38,
        maxAlunos: 40,
        dataInicio: '2024-08-01',
        dataFim: '2024-10-30',
        professorId: 'p1',
        professorNome: 'Pastor João',
        aulas: 8,
        maxAulas: 8
      }
    ],
    createdAt: '2024-06-15T10:00:00Z',
    updatedAt: '2024-10-30T18:00:00Z'
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
        courses: [...state.courses, { ...course, id: Date.now().toString() }] 
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
                               course.descricao.toLowerCase().includes(searchTerm.toLowerCase()) ||
                               course.periodo.includes(searchTerm);
          
          const matchesFilter = filterType === 'all' || course.tipo === filterType;
          
          return matchesSearch && matchesFilter;
        });
      }
    }),
    {
      name: 'course-store',
    }
  )
);
