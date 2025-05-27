
export interface Course {
  id: string;
  nome: string;
  descricao: string;
  tipo: 'capacitacao' | 'revalidacao';
  periodo: string;
  dataInicio: string;
  dataFim: string;
  totalAulas: number;
  cargaHoraria: number;
  status: 'planejado' | 'ativo' | 'finalizado' | 'cancelado';
  inscricoesAbertas: boolean;
  maxAlunos: number;
  alunosInscritos: number;
  turmas: Turma[];
  createdAt: string;
  updatedAt: string;
}

export interface Turma {
  id: string;
  nome: string;
  cursoId: string;
  status: 'ativa' | 'inativa' | 'finalizada';
  alunos: number;
  maxAlunos: number;
  dataInicio: string;
  dataFim: string;
  professorId?: string;
  professorNome?: string;
  aulas: number;
  maxAulas: number;
}
