
export interface Aluno {
  id: string;
  nome: string;
  cpf: string;
  telefone: string;
  dataNascimento: string;
  email: string;
  cursoId?: string;
  createdAt: string;
  updatedAt: string;
}

export interface Curso {
  id: string;
  nome: string;
  descricao: string;
  ano: number;
  turma: string;
  dataInicio: string;
  dataFim: string;
  vagasMaximas: number;
  vagasMinimas: number;
  vagasOcupadas: number;
  status: 'planejado' | 'ativo' | 'finalizado';
  aulaAtual: number;
  totalAulas: number;
  createdAt: string;
  updatedAt: string;
}

export interface Aula {
  id: string;
  cursoId: string;
  numero: number;
  titulo: string;
  descricao: string;
  data: string;
  horarioInicio: string;
  horarioFim: string;
  conteudo?: string;
  materialUrl?: string;
  status: 'agendada' | 'realizada' | 'cancelada';
  createdAt: string;
  updatedAt: string;
}

export interface Inscricao {
  id: string;
  alunoId: string;
  cursoId: string;
  dataInscricao: string;
  status: 'ativa' | 'cancelada' | 'concluida';
}
