
import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { Course } from '@/types/course';
import { coursesService } from '@/services/supabaseServices';

interface CourseStore {
  courses: Course[];
  loading: boolean;
  error: string | null;
  searchTerm: string;
  filterType: string;
  
  setCourses: (courses: Course[]) => void;
  addCourse: (course: Course) => Promise<void>;
  updateCourse: (id: string, course: Partial<Course>) => Promise<void>;
  deleteCourse: (id: string) => Promise<void>;
  getCourseById: (id: string) => Course | undefined;
  toggleInscricoes: (id: string) => Promise<void>;
  setLoading: (loading: boolean) => void;
  setError: (error: string | null) => void;
  setSearchTerm: (term: string) => void;
  setFilterType: (type: string) => void;
  getFilteredCourses: () => Course[];
  getAllCourses: () => Course[];
  fetchCourses: () => Promise<void>;
}

export const useCourseStore = create<CourseStore>()(
  persist(
    (set, get) => ({
      courses: [],
      loading: false,
      error: null,
      searchTerm: '',
      filterType: 'all',
      
      setCourses: (courses) => set({ courses }),
      
      addCourse: async (course) => {
        try {
          set({ loading: true });
          const newCourse = await coursesService.createCourse(course);
          set((state) => ({ 
            courses: [...state.courses, newCourse],
            loading: false 
          }));
        } catch (error) {
          set({ error: 'Erro ao criar curso', loading: false });
          throw error;
        }
      },
      
      updateCourse: async (id, updatedCourse) => {
        try {
          set({ loading: true });
          const updated = await coursesService.updateCourse(id, updatedCourse);
          set((state) => ({
            courses: state.courses.map(course => 
              course.id === id ? { ...course, ...updated } : course
            ),
            loading: false
          }));
        } catch (error) {
          set({ error: 'Erro ao atualizar curso', loading: false });
          throw error;
        }
      },
      
      deleteCourse: async (id) => {
        try {
          set({ loading: true });
          await coursesService.deleteCourse(id);
          set((state) => ({
            courses: state.courses.filter(course => course.id !== id),
            loading: false
          }));
        } catch (error) {
          set({ error: 'Erro ao deletar curso', loading: false });
          throw error;
        }
      },
      
      getCourseById: (id) => {
        const { courses } = get();
        return courses.find(course => course.id === id);
      },
      
      toggleInscricoes: async (id) => {
        try {
          const course = get().courses.find(c => c.id === id);
          if (!course) throw new Error('Curso não encontrado');
          
          const updated = await coursesService.updateCourse(id, {
            inscricoesAbertas: !course.inscricoesAbertas
          });
          
          set((state) => ({
            courses: state.courses.map(course => 
              course.id === id ? { ...course, inscricoesAbertas: !course.inscricoesAbertas } : course
            )
          }));
        } catch (error) {
          set({ error: 'Erro ao atualizar inscrições' });
          throw error;
        }
      },
      
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
      },

      fetchCourses: async () => {
        try {
          set({ loading: true });
          const data = await coursesService.getAllCourses();
          set({ courses: data, loading: false });
        } catch (error) {
          set({ error: 'Erro ao carregar cursos', loading: false });
          throw error;
        }
      }
    }),
    {
      name: 'course-store',
    }
  )
);
