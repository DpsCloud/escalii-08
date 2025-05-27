
export interface Student {
  id: string;
  nome: string;
  cpf: string;
  telefone: string;
  email: string;
  dataNascimento: string;
  endereco?: {
    rua: string;
    numero: string;
    bairro: string;
    cidade: string;
    cep: string;
    estado: string;
  };
  curso?: string;
  turma?: string;
  progresso: number;
  status: 'ativo' | 'pendente' | 'formado' | 'inativo';
  foto?: string;
  dataMatricula: string;
  presencaGeral: number;
  aulasAssistidas: number;
  aproveitamento: number;
  certificadoDisponivel: boolean;
  observacoes?: string;
}
