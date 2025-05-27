
export type TipoCurso = 'capacitacao' | 'revalidacao';
export type StatusCurso = 'planejado' | 'ativo' | 'finalizado' | 'cancelado';
export type StatusTurma = 'ativa' | 'inativa' | 'finalizada';

// Turmas padronizadas disponíveis no sistema
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
  tipo: TipoCurso; // Sempre 'capacitacao' ou 'revalidacao'
  turma: TurmaDisponivel; // Sempre no formato YYYY.N
  dataInicio: string;
  dataFim: string;
  totalAulas: number;
  cargaHoraria: number;
  status: StatusCurso;
  inscricoesAbertas: boolean;
  maxAlunos: number;
  alunosInscritos: number;
  turmas: Turma[];
  aulas: Aula[];
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

export interface Aula {
  id: string;
  titulo: string;
  descricao: string;
  cursoId: string;
  ordem: number;
  duracao: number; // em minutos
  dataAula?: string;
  videoUrl?: string;
  materiais: Material[];
  status: 'planejada' | 'ativa' | 'concluida';
  createdAt: string;
  updatedAt: string;
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
export const gerarNomeCurso = (tipo: TipoCurso, turma: TurmaDisponivel): string => {
  const tipoTexto = tipo === 'capacitacao' ? 'Capacitação de Líderes' : 'Revalidação';
  return `ESCALI ${tipoTexto} ${turma}`;
};

export const gerarDescricaoCurso = (tipo: TipoCurso, turma: TurmaDisponivel): string => {
  if (tipo === 'capacitacao') {
    return `Curso de capacitação para desenvolvimento de líderes cristãos da turma ${turma}. Este curso aborda os fundamentos da liderança bíblica, desenvolvimento de caráter e habilidades práticas para o ministério.`;
  } else {
    return `Curso de revalidação para líderes já capacitados da turma ${turma}. Atualização e aprofundamento dos conceitos de liderança cristã, com foco em novos desafios e metodologias.`;
  }
};

// Funções de validação para garantir consistência
export const validarTipoCurso = (tipo: string): tipo is TipoCurso => {
  return ['capacitacao', 'revalidacao'].includes(tipo);
};

export const validarTurma = (turma: string): turma is TurmaDisponivel => {
  return TURMAS_DISPONIVEIS.includes(turma as TurmaDisponivel);
};

// Função para obter texto legível dos tipos
export const getTipoTexto = (tipo: TipoCurso): string => {
  return tipo === 'capacitacao' ? 'Capacitação' : 'Revalidação';
};

// Função para obter cor do status
export const getStatusColor = (status: StatusCurso): string => {
  switch (status) {
    case 'ativo': return 'bg-green-100 text-green-800';
    case 'planejado': return 'bg-blue-100 text-blue-800';
    case 'finalizado': return 'bg-gray-100 text-gray-800';
    case 'cancelado': return 'bg-red-100 text-red-800';
    default: return 'bg-gray-100 text-gray-800';
  }
};

// Função para obter texto legível do status
export const getStatusTexto = (status: StatusCurso): string => {
  switch (status) {
    case 'ativo': return 'Em Andamento';
    case 'planejado': return 'Planejado';
    case 'finalizado': return 'Finalizado';
    case 'cancelado': return 'Cancelado';
    default: return status;
  }
};
