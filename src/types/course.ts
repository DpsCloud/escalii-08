
export type TipoCurso = 'capacitacao' | 'revalidacao';
export type StatusCurso = 'planejado' | 'ativo' | 'finalizado' | 'cancelado';
export type StatusTurma = 'ativa' | 'inativa' | 'finalizada';

// Anos e períodos disponíveis
export const ANOS_DISPONIVEIS = ['2024', '2025', '2026', '2027'] as const;
export const PERIODOS_DISPONIVEIS = ['1', '2', '3', '4', 'revalida'] as const;

export type AnoDisponivel = typeof ANOS_DISPONIVEIS[number];
export type PeriodoDisponivel = typeof PERIODOS_DISPONIVEIS[number];

// Turmas padronizadas disponíveis no sistema (mantidas para compatibilidade)
export const TURMAS_DISPONIVEIS = [
  '2024.1',
  '2024.2', 
  '2025.1',
  '2025.2',
  '2026.1',
  '2026.2',
  '2027.1',
  '2027.2'
] as const;

export type TurmaDisponivel = typeof TURMAS_DISPONIVEIS[number];

export interface Course {
  id: string;
  nome: string;
  descricao: string;
  tipo: TipoCurso;
  ano: AnoDisponivel;
  periodo: PeriodoDisponivel;
  turma: string; // Gerado automaticamente ou customizado
  dataInicio: string;
  dataFim: string;
  totalAulas: number;
  cargaHoraria: number; // Calculado automaticamente
  status: StatusCurso;
  inscricoesAbertas: boolean;
  maxAlunos: number;
  alunosInscritos: number;
  diasSemana: string[]; // Ex: ['segunda', 'quarta', 'sexta']
  aulasSelecionadas: string[]; // IDs das aulas selecionadas
  turmas: Turma[];
  createdAt: string;
  updatedAt: string;
}

export interface Turma {
  id: string;
  nome: string;
  cursoId: string;
  status: StatusTurma;
  alunos: number;
  maxAlunos: number;
  dataInicio: string;
  dataFim: string;
  professorId?: string;
  professorNome?: string;
  aulas: number;
  maxAulas: number;
}

// Aula agora é independente de curso
export interface Aula {
  id: string;
  titulo: string;
  descricao: string;
  duracao: number; // em minutos
  videoUrl?: string;
  materiais: Material[];
  status: 'planejada' | 'ativa' | 'concluida';
  categoria?: string; // Para organizar as aulas por categoria
  tags: string[]; // Para facilitar busca e reutilização
  createdAt: string;
  updatedAt: string;
}

// Relacionamento entre curso e aula
export interface CursoAula {
  id: string;
  cursoId: string;
  aulaId: string;
  ordem: number; // A ordem é específica do curso
  dataAula?: string; // Data específica para este curso
  obrigatoria: boolean;
  createdAt: string;
}

export interface Material {
  id: string;
  nome: string;
  tipo: 'pdf' | 'video' | 'link' | 'documento';
  url: string;
  tamanho?: string;
  descricao?: string;
  aulaId: string;
}

// Funções para geração automática padronizada
export const gerarNomeCurso = (tipo: TipoCurso, turma: string): string => {
  const tipoTexto = tipo === 'capacitacao' ? 'Capacitação de Líderes' : 'Revalidação';
  return `ESCALI ${tipoTexto} ${turma}`;
};

export const gerarDescricaoCurso = (tipo: TipoCurso, turma: string): string => {
  if (tipo === 'capacitacao') {
    return `Curso de capacitação para desenvolvimento de líderes cristãos da turma ${turma}. Este curso aborda os fundamentos da liderança bíblica, desenvolvimento de caráter e habilidades práticas para o ministério.`;
  } else {
    return `Curso de revalidação para líderes já capacitados da turma ${turma}. Atualização e aprofundamento dos conceitos de liderança cristã, com foco em novos desafios e metodologias.`;
  }
};

export const gerarTurma = (ano: AnoDisponivel, periodo: PeriodoDisponivel): string => {
  return `${ano}.${periodo}`;
};

export const validarTipoCurso = (tipo: string): tipo is TipoCurso => {
  return ['capacitacao', 'revalidacao'].includes(tipo);
};

export const validarTurma = (turma: string): turma is TurmaDisponivel => {
  return TURMAS_DISPONIVEIS.includes(turma as TurmaDisponivel);
};

export const getTipoTexto = (tipo: TipoCurso): string => {
  return tipo === 'capacitacao' ? 'Capacitação' : 'Revalidação';
};

export const getStatusColor = (status: StatusCurso): string => {
  switch (status) {
    case 'ativo': return 'bg-green-100 text-green-800';
    case 'planejado': return 'bg-blue-100 text-blue-800';
    case 'finalizado': return 'bg-gray-100 text-gray-800';
    case 'cancelado': return 'bg-red-100 text-red-800';
    default: return 'bg-gray-100 text-gray-800';
  }
};

export const getStatusTexto = (status: StatusCurso): string => {
  switch (status) {
    case 'ativo': return 'Em Andamento';
    case 'planejado': return 'Planejado';
    case 'finalizado': return 'Finalizado';
    case 'cancelado': return 'Cancelado';
    default: return status;
  }
};

export const DIAS_SEMANA = [
  'segunda',
  'terça',
  'quarta',
  'quinta',
  'sexta',
  'sábado',
  'domingo'
] as const;

export type DiaSemana = typeof DIAS_SEMANA[number];
