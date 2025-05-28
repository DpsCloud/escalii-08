
// Tipos preparados para migração Supabase
// Estes tipos seguem a estrutura que será usada no banco de dados

export interface SupabaseStudent {
  id: string;
  created_at?: string;
  updated_at?: string;
  nome: string;
  cpf: string;
  telefone: string;
  email: string;
  data_nascimento: string;
  endereco_rua?: string;
  endereco_numero?: string;
  endereco_bairro?: string;
  endereco_cidade?: string;
  endereco_cep?: string;
  endereco_estado?: string;
  curso_id?: string;
  turma_id?: string;
  progresso: number;
  status: 'ativo' | 'pendente' | 'formado' | 'inativo';
  foto?: string;
  data_matricula: string;
  presenca_geral: number;
  aulas_assistidas: number;
  aproveitamento: number;
  certificado_disponivel: boolean;
  observacoes?: string;
}

export interface SupabaseCourse {
  id: string;
  created_at?: string;
  updated_at?: string;
  nome: string;
  descricao?: string;
  data_inicio: string;
  data_fim: string;
  dias_semana: string[];
  carga_horaria: number;
  total_aulas: number;
  status: 'ativo' | 'planejado' | 'finalizado' | 'cancelado';
  instrutor?: string;
  aulas_selecionadas: string[];
}

export interface SupabaseAula {
  id: string;
  created_at?: string;
  updated_at?: string;
  titulo: string;
  descricao?: string;
  data: string;
  horario_inicio: string;
  horario_fim: string;
  duracao: number;
  status: 'agendada' | 'em_andamento' | 'finalizada' | 'cancelada';
  instrutor?: string;
  categoria: string;
  material_url?: string;
  video_url?: string;
  observacoes?: string;
}

export interface SupabaseUser {
  id: string;
  created_at?: string;
  updated_at?: string;
  email: string;
  nome?: string;
  role: 'admin' | 'user';
  ativo: boolean;
  ultimo_acesso?: string;
}

export interface SupabasePresenca {
  id: string;
  created_at?: string;
  student_id: string;
  aula_id: string;
  presente: boolean;
  data_presenca: string;
  observacoes?: string;
}

// Tipos para relacionamentos
export interface SupabaseStudentWithCourse extends SupabaseStudent {
  course?: SupabaseCourse;
  turma?: any; // Definir quando implementar turmas
}

export interface SupabaseCourseWithAulas extends SupabaseCourse {
  aulas?: SupabaseAula[];
  students?: SupabaseStudent[];
}

// Tipos para inserção (sem campos auto-gerados)
export type SupabaseStudentInsert = Omit<SupabaseStudent, 'id' | 'created_at' | 'updated_at'>;
export type SupabaseCourseInsert = Omit<SupabaseCourse, 'id' | 'created_at' | 'updated_at'>;
export type SupabaseAulaInsert = Omit<SupabaseAula, 'id' | 'created_at' | 'updated_at'>;
export type SupabaseUserInsert = Omit<SupabaseUser, 'id' | 'created_at' | 'updated_at'>;
export type SupabasePresencaInsert = Omit<SupabasePresenca, 'id' | 'created_at'>;

// Tipos para atualização (todos os campos opcionais exceto ID)
export type SupabaseStudentUpdate = Partial<Omit<SupabaseStudent, 'id'>> & { updated_at?: string };
export type SupabaseCourseUpdate = Partial<Omit<SupabaseCourse, 'id'>> & { updated_at?: string };
export type SupabaseAulaUpdate = Partial<Omit<SupabaseAula, 'id'>> & { updated_at?: string };
export type SupabaseUserUpdate = Partial<Omit<SupabaseUser, 'id'>> & { updated_at?: string };
