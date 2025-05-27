
export type TipoCurso = 'capacitacao' | 'revalidacao';
export type StatusCurso = 'planejado' | 'ativo' | 'finalizado' | 'cancelado';
export type StatusTurma = 'ativa' | 'inativa' | 'finalizada';

export const TURMAS_DISPONIVEIS = [
  '2024.1',
  '2024.2', 
  '2025.1',
  '2025.2',
  '2026.1',
  '2026.2'
] as const;

export type TurmaDisponivel = typeof TURMAS_DISPONIVEIS[number];

export interface Course {
  id: string;
  nome: string;
  descricao: string;
  tipo: TipoCurso;
  turma: TurmaDisponivel; // Alterado de 'periodo' para 'turma'
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

// Funções para geração automática
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
