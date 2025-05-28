
export interface Student {
  id: string;
  profileId: string;
  nome: string;
  cpf: string;
  telefone: string;
  email: string;
  dataNascimento: string;
  endereco?: {
    rua?: string;
    numero?: string;
    bairro?: string;
    cidade?: string;
    cep?: string;
    estado?: string;
  };
  turmaId?: string;
  progresso: number;
  status: 'ativo' | 'pendente' | 'formado' | 'inativo';
  dataMatricula: string;
  presencaGeral: number;
  aulasAssistidas: number;
  aproveitamento: number;
  certificadoDisponivel: boolean;
  observacoes?: string;
  inscricaoAutomatica: boolean;
  createdAt: string;
  updatedAt: string;
  // Campos computados para compatibilidade com UI
  foto?: string;
  curso?: string;
  turma?: string;
}
