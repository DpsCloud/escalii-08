
export type TipoCurso = 'capacitacao' | 'revalidacao' | 'custom';
export type AnoDisponivel = '2024' | '2025' | '2026' | '2027' | 'custom';
export type PeriodoDisponivel = '1' | '2' | '3' | '4' | 'revalida' | 'custom';

export const ANOS_DISPONIVEIS: AnoDisponivel[] = ['2024', '2025', '2026', '2027'];
export const PERIODOS_DISPONIVEIS: PeriodoDisponivel[] = ['1', '2', '3', '4', 'revalida'];
export const DIAS_SEMANA = ['segunda', 'terca', 'quarta', 'quinta', 'sexta', 'sabado', 'domingo'] as const;
export type DiaSemana = typeof DIAS_SEMANA[number];

export interface Material {
  id: string;
  nome: string;
  tipo: 'pdf' | 'video' | 'link' | 'documento' | 'imagem';
  url: string;
  descricao?: string;
  aulaId: string;
  tamanhoArquivo?: number;
  publico?: boolean;
  ordem?: number;
}

export interface Aula {
  id: string;
  titulo: string;
  descricao?: string;
  duracao: number;
  videoUrl?: string;
  materiais?: Material[];
  status: 'planejada' | 'ativa' | 'concluida' | 'agendada' | 'em_andamento' | 'finalizada' | 'cancelada';
  categoria: string;
  tags: string[];
  createdAt: string;
  updatedAt: string;
  objetivos?: string[];
  prerequisitos?: string[];
  conteudoTexto?: string;
  nivelDificuldade?: number;
}

export interface CursoAula {
  id: string;
  cursoId: string;
  aulaId: string;
  ordem: number;
  dataAula?: string;
  horarioInicio?: string;
  horarioFim?: string;
  obrigatoria: boolean;
  createdAt: string;
}

export interface Turma {
  id: string;
  nome: string;
  cursoId: string;
  status: 'ativo' | 'inativo' | 'planejado' | 'finalizado' | 'cancelado';
  dataInicio: string;
  dataFim: string;
  horarioInicio?: string;
  horarioFim?: string;
  maxAlunos: number;
  instructorId?: string;
  createdAt: string;
  updatedAt: string;
}

export interface Course {
  id: string;
  nome: string;
  descricao?: string;
  tipo: string;
  ano: string;
  periodo: string;
  dataInicio: string;
  dataFim: string;
  totalAulas: number;
  cargaHoraria: number;
  maxAlunos: number;
  status: 'planejado' | 'ativo' | 'finalizado' | 'cancelado';
  inscricoesAbertas: boolean;
  diasSemana: string[];
  instructorId?: string;
  createdAt: string;
  updatedAt: string;
}

export function gerarNomeCurso(tipo: TipoCurso, turma: string): string {
  return `ESCALI - ${tipo.charAt(0).toUpperCase() + tipo.slice(1)} - Turma ${turma}`;
}

export function gerarDescricaoCurso(tipo: TipoCurso, turma: string): string {
  return `Curso de ${tipo} da ESCALI, turma ${turma}, focado em...`;
}

export function gerarTurma(ano: AnoDisponivel, periodo: PeriodoDisponivel): string {
  return `${ano}.${periodo}`;
}
