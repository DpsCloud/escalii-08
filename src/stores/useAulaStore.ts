
import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { Aula, CursoAula } from '@/types/course';

interface AulaStore {
  aulas: Aula[];
  cursoAulas: CursoAula[];
  loading: boolean;
  error: string | null;
  searchTerm: string;
  selectedCategory: string;
  
  setAulas: (aulas: Aula[]) => void;
  addAula: (aula: Aula) => void;
  updateAula: (id: string, aula: Partial<Aula>) => void;
  deleteAula: (id: string) => void;
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
}

// Dados mock para aulas independentes
const mockAulas: Aula[] = [
  {
    id: 'aula-1',
    titulo: 'Fundamentos da Liderança Cristã',
    descricao: 'Introdução aos princípios básicos da liderança bíblica e desenvolvimento de caráter cristão',
    duracao: 90,
    videoUrl: 'https://example.com/video1',
    materiais: [],
    status: 'ativa',
    categoria: 'Fundamentos',
    tags: ['liderança', 'fundamentos', 'caráter'],
    createdAt: '2025-01-15T10:00:00Z',
    updatedAt: '2025-01-15T10:00:00Z'
  },
  {
    id: 'aula-2',
    titulo: 'Caráter do Líder',
    descricao: 'Desenvolvimento do caráter cristão na liderança e integridade pessoal',
    duracao: 90,
    materiais: [],
    status: 'ativa',
    categoria: 'Caráter',
    tags: ['caráter', 'integridade', 'desenvolvimento'],
    createdAt: '2025-01-15T10:00:00Z',
    updatedAt: '2025-01-15T10:00:00Z'
  },
  {
    id: 'aula-3',
    titulo: 'Comunicação Eficaz',
    descricao: 'Técnicas de comunicação para líderes cristãos e pregação eficaz',
    duracao: 120,
    materiais: [],
    status: 'planejada',
    categoria: 'Comunicação',
    tags: ['comunicação', 'pregação', 'técnicas'],
    createdAt: '2025-01-16T10:00:00Z',
    updatedAt: '2025-01-16T10:00:00Z'
  }
];

// Relacionamentos entre cursos e aulas
const mockCursoAulas: CursoAula[] = [
  {
    id: 'ca-1',
    cursoId: '1',
    aulaId: 'aula-1',
    ordem: 1,
    dataAula: '2025-05-05',
    obrigatoria: true,
    createdAt: '2025-01-15T10:00:00Z'
  },
  {
    id: 'ca-2',
    cursoId: '1',
    aulaId: 'aula-2',
    ordem: 2,
    dataAula: '2025-05-12',
    obrigatoria: true,
    createdAt: '2025-01-15T10:00:00Z'
  },
  {
    id: 'ca-3',
    cursoId: '3',
    aulaId: 'aula-1',
    ordem: 1,
    dataAula: '2025-06-05',
    obrigatoria: true,
    createdAt: '2025-01-10T14:00:00Z'
  }
];

export const useAulaStore = create<AulaStore>()(
  persist(
    (set, get) => ({
      aulas: mockAulas,
      cursoAulas: mockCursoAulas,
      loading: false,
      error: null,
      searchTerm: '',
      selectedCategory: 'all',
      
      setAulas: (aulas) => set({ aulas }),
      addAula: (aula) => set((state) => ({ 
        aulas: [...state.aulas, aula] 
      })),
      updateAula: (id, updatedAula) => set((state) => ({
        aulas: state.aulas.map(aula => 
          aula.id === id ? { ...aula, ...updatedAula, updatedAt: new Date().toISOString() } : aula
        )
      })),
      deleteAula: (id) => set((state) => ({
        aulas: state.aulas.filter(aula => aula.id !== id),
        cursoAulas: state.cursoAulas.filter(ca => ca.aulaId !== id)
      })),
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
            aula.descricao.toLowerCase().includes(searchTerm.toLowerCase()) ||
            aula.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));
          
          const matchesCategory = selectedCategory === 'all' || aula.categoria === selectedCategory;
          
          return matchesSearch && matchesCategory;
        });
      }
    }),
    {
      name: 'aula-store',
    }
  )
);
