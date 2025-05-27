export type TipoCurso = 'capacitacao' | 'revalidacao' | 'custom';
export type AnoDisponivel = '2024' | '2025' | '2026' | '2027' | 'custom';
export type PeriodoDisponivel = '1' | '2' | '3' | '4' | 'revalida' | 'custom';

export const ANOS_DISPONIVEIS: AnoDisponivel[] = ['2024', '2025', '2026', '2027'];
export const PERIODOS_DISPONIVEIS: PeriodoDisponivel[] = ['1', '2', '3', '4', 'revalida'];
export const DIAS_SEMANA = ['segunda', 'terca', 'quarta', 'quinta', 'sexta', 'sabado', 'domingo'] as const;
export type DiaSemana = typeof DIAS_SEMANA[number];

export interface Course {
  id: string;
  nome: string;
  descricao: string;
  tipo: TipoCurso;
  ano: AnoDisponivel;
  periodo: PeriodoDisponivel;
  turma: string;
  dataInicio: string;
  dataFim: string;
  totalAulas: number;
  cargaHoraria: number;
  maxAlunos: number;
  status: 'planejado' | 'ativo' | 'finalizado' | 'cancelado';
  inscricoesAbertas: boolean;
  alunosInscritos: number;
  diasSemana: DiaSemana[];
  aulasSelecionadas: string[];
  turmas: string[];
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
