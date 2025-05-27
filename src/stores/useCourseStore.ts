
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

// Dados mock atualizados com terminologia padronizada
const mockCourses: Course[] = [
  {
    id: '1',
    nome: 'ESCALI Capacitação de Líderes 2025.1',
    descricao: 'Curso de capacitação para desenvolvimento de líderes cristãos da turma 2025.1. Este curso aborda os fundamentos da liderança bíblica, desenvolvimento de caráter e habilidades práticas para o ministério.',
    tipo: 'capacitacao',
    turma: '2025.1',
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
    aulas: [
      {
        id: 'a1',
        titulo: 'Fundamentos da Liderança Cristã',
        descricao: 'Introdução aos princípios básicos da liderança bíblica',
        cursoId: '1',
        ordem: 1,
        duracao: 90,
        dataAula: '2025-05-05',
        videoUrl: 'https://example.com/video1',
        materiais: [],
        status: 'concluida',
        createdAt: '2025-01-15T10:00:00Z',
        updatedAt: '2025-01-15T10:00:00Z'
      },
      {
        id: 'a2',
        titulo: 'Caráter do Líder',
        descricao: 'Desenvolvimento do caráter cristão na liderança',
        cursoId: '1',
        ordem: 2,
        duracao: 90,
        dataAula: '2025-05-12',
        materiais: [],
        status: 'ativa',
        createdAt: '2025-01-15T10:00:00Z',
        updatedAt: '2025-01-15T10:00:00Z'
      }
    ],
    createdAt: '2025-01-15T10:00:00Z',
    updatedAt: '2025-01-20T15:30:00Z'
  },
  {
    id: '2',
    nome: 'ESCALI Capacitação de Líderes 2025.2',
    descricao: 'Curso de capacitação para desenvolvimento de líderes cristãos da turma 2025.2. Este curso aborda os fundamentos da liderança bíblica, desenvolvimento de caráter e habilidades práticas para o ministério.',
    tipo: 'capacitacao',
    turma: '2025.2',
    dataInicio: '2025-08-01',
    dataFim: '2025-10-30',
    totalAulas: 8,
    cargaHoraria: 32,
    status: 'planejado',
    inscricoesAbertas: false,
    maxAlunos: 40,
    alunosInscritos: 0,
    turmas: [],
    aulas: [],
    createdAt: '2025-01-15T10:00:00Z',
    updatedAt: '2025-01-15T10:00:00Z'
  },
  {
    id: '3',
    nome: 'ESCALI Revalidação 2025.1',
    descricao: 'Curso de revalidação para líderes já capacitados da turma 2025.1. Atualização e aprofundamento dos conceitos de liderança cristã, com foco em novos desafios e metodologias.',
    tipo: 'revalidacao',
    turma: '2025.1',
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
    aulas: [
      {
        id: 'a3',
        titulo: 'Atualização em Liderança',
        descricao: 'Novas abordagens em liderança cristã',
        cursoId: '3',
        ordem: 1,
        duracao: 60,
        dataAula: '2025-06-05',
        materiais: [],
        status: 'ativa',
        createdAt: '2025-01-10T14:00:00Z',
        updatedAt: '2025-01-10T14:00:00Z'
      }
    ],
    createdAt: '2025-01-10T14:00:00Z',
    updatedAt: '2025-01-18T09:15:00Z'
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
                               course.descricao.toLowerCase().includes(searchTerm.toLowerCase()) ||
                               course.turma.includes(searchTerm);
          
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
