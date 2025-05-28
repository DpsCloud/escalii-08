import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { Aula, CursoAula } from '@/types/course';
import { aulasService } from '@/services/supabaseServices';

interface AulaStore {
  aulas: Aula[];
  cursoAulas: CursoAula[];
  loading: boolean;
  error: string | null;
  searchTerm: string;
  selectedCategory: string;
  
  setAulas: (aulas: Aula[]) => void;
  addAula: (aula: Aula) => Promise<void>;
  updateAula: (id: string, aula: Partial<Aula>) => Promise<void>;
  deleteAula: (id: string) => Promise<void>;
  getAulaById: (id: string) => Aula | undefined;
  
  setCursoAulas: (cursoAulas: CursoAula[]) => void;
  addAulaToCurso: (cursoAula: CursoAula) => void;
  removeAulaFromCurso: (cursoId: string, aulaId: string) => void;
  getAulasByCurso: (cursoId: string) => { aula: Aula; relacao: CursoAula }[];
  
  setLoading: (loading: boolean) => void;
  setError: (error: string | null) => void;
  setSearchTerm: (term: string) => void;
  setSelectedCategory: (category: string) => void;
  getFilteredAulas: () => Aula[];
  fetchAulas: () => Promise<void>;
}

export const useAulaStore = create<AulaStore>()(
  persist(
    (set, get) => ({
      aulas: [],
      cursoAulas: [],
      loading: false,
      error: null,
      searchTerm: '',
      selectedCategory: 'all',
      
      setAulas: (aulas) => set({ aulas }),
      
      addAula: async (aula) => {
        try {
          set({ loading: true });
          const newAula = await aulasService.createAula(aula);
          set((state) => ({ 
            aulas: [...state.aulas, newAula],
            loading: false 
          }));
        } catch (error) {
          set({ error: 'Erro ao criar aula', loading: false });
          throw error;
        }
      },
      
      updateAula: async (id, updatedAula) => {
        try {
          set({ loading: true });
          const updated = await aulasService.updateAula(id, updatedAula);
          set((state) => ({
            aulas: state.aulas.map(aula => 
              aula.id === id ? { ...aula, ...updated } : aula
            ),
            loading: false
          }));
        } catch (error) {
          set({ error: 'Erro ao atualizar aula', loading: false });
          throw error;
        }
      },
      
      deleteAula: async (id) => {
        try {
          set({ loading: true });
          await aulasService.deleteAula(id);
          set((state) => ({
            aulas: state.aulas.filter(aula => aula.id !== id),
            cursoAulas: state.cursoAulas.filter(ca => ca.aulaId !== id),
            loading: false
          }));
        } catch (error) {
          set({ error: 'Erro ao deletar aula', loading: false });
          throw error;
        }
      },
      
      getAulaById: (id) => {
        const { aulas } = get();
        return aulas.find(aula => aula.id === id);
      },
      
      setCursoAulas: (cursoAulas) => set({ cursoAulas }),
      
      addAulaToCurso: (cursoAula) => set((state) => ({
        cursoAulas: [...state.cursoAulas, cursoAula]
      })),
      
      removeAulaFromCurso: (cursoId, aulaId) => set((state) => ({
        cursoAulas: state.cursoAulas.filter(ca => 
          !(ca.cursoId === cursoId && ca.aulaId === aulaId)
        )
      })),
      
      getAulasByCurso: (cursoId) => {
        const { aulas, cursoAulas } = get();
        return cursoAulas
          .filter(ca => ca.cursoId === cursoId)
          .map(relacao => {
            const aula = aulas.find(a => a.id === relacao.aulaId);
            return { aula: aula!, relacao };
          })
          .filter(item => item.aula)
          .sort((a, b) => a.relacao.ordem - b.relacao.ordem);
      },
      
      setLoading: (loading) => set({ loading }),
      setError: (error) => set({ error }),
      setSearchTerm: (searchTerm) => set({ searchTerm }),
      setSelectedCategory: (selectedCategory) => set({ selectedCategory }),
      
      getFilteredAulas: () => {
        const { aulas, searchTerm, selectedCategory } = get();
        return aulas.filter(aula => {
          const matchesSearch = searchTerm === '' || 
            aula.titulo.toLowerCase().includes(searchTerm.toLowerCase()) ||
            aula.descricao?.toLowerCase().includes(searchTerm.toLowerCase()) ||
            aula.tags?.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));
          
          const matchesCategory = selectedCategory === 'all' || aula.categoria === selectedCategory;
          
          return matchesSearch && matchesCategory;
        });
      },

      fetchAulas: async () => {
        try {
          set({ loading: true });
          const data = await aulasService.getAllAulas();
          set({ aulas: data, loading: false });
        } catch (error) {
          set({ error: 'Erro ao carregar aulas', loading: false });
          throw error;
        }
      }
    }),
    {
      name: 'aula-store',
    }
  )
);