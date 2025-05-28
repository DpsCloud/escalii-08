
import { Aula, Material, Course, Student } from '@/types/course';
import type { Database } from '@/integrations/supabase/types';

type SupabaseAula = Database['public']['Tables']['aulas']['Row'];
type SupabaseMaterial = Database['public']['Tables']['materials']['Row'] & {
  aulas?: { titulo: string } | null;
};
type SupabaseCourse = Database['public']['Tables']['courses']['Row'];
type SupabaseStudent = Database['public']['Tables']['students']['Row'] & {
  profiles?: { nome: string; cpf: string; telefone: string } | null;
  turmas?: { nome: string; courses?: { nome: string } | null } | null;
};

export function mapSupabaseAulaToAula(supabaseAula: SupabaseAula): Aula {
  return {
    id: supabaseAula.id,
    titulo: supabaseAula.titulo,
    descricao: supabaseAula.descricao || undefined,
    duracao: supabaseAula.duracao,
    status: supabaseAula.status,
    categoria: supabaseAula.categoria,
    tags: supabaseAula.tags || [],
    videoUrl: supabaseAula.video_url || undefined,
    createdAt: supabaseAula.created_at || '',
    updatedAt: supabaseAula.updated_at || '',
    objetivos: supabaseAula.objetivos || [],
    prerequisitos: supabaseAula.prerequisitos || [],
    conteudoTexto: supabaseAula.conteudo_texto || undefined,
    nivelDificuldade: supabaseAula.nivel_dificuldade || 1,
    materiais: []
  };
}

export function mapSupabaseMaterialToMaterial(supabaseMaterial: SupabaseMaterial): Material {
  return {
    id: supabaseMaterial.id,
    nome: supabaseMaterial.nome,
    tipo: supabaseMaterial.tipo,
    url: supabaseMaterial.url,
    descricao: supabaseMaterial.descricao || undefined,
    aulaId: supabaseMaterial.aula_id,
    tamanhoArquivo: supabaseMaterial.tamanho_arquivo || undefined,
    publico: supabaseMaterial.publico || false,
    ordem: supabaseMaterial.ordem || 0
  };
}

export function mapSupabaseCourseToC(supabaseCourse: SupabaseCourse): Course {
  return {
    id: supabaseCourse.id,
    nome: supabaseCourse.nome,
    descricao: supabaseCourse.descricao || undefined,
    tipo: supabaseCourse.tipo,
    ano: supabaseCourse.ano,
    periodo: supabaseCourse.periodo,
    dataInicio: supabaseCourse.data_inicio,
    dataFim: supabaseCourse.data_fim,
    totalAulas: supabaseCourse.total_aulas,
    cargaHoraria: supabaseCourse.carga_horaria,
    maxAlunos: supabaseCourse.max_alunos,
    status: supabaseCourse.status,
    inscricoesAbertas: supabaseCourse.inscricoes_abertas || false,
    diasSemana: supabaseCourse.dias_semana || [],
    instructorId: supabaseCourse.instructor_id || undefined,
    createdAt: supabaseCourse.created_at || '',
    updatedAt: supabaseCourse.updated_at || ''
  };
}

export function mapSupabaseStudentToStudent(supabaseStudent: SupabaseStudent): Student {
  return {
    id: supabaseStudent.id,
    profileId: supabaseStudent.profile_id,
    nome: supabaseStudent.profiles?.nome || '',
    cpf: supabaseStudent.profiles?.cpf || '',
    telefone: supabaseStudent.profiles?.telefone || '',
    email: '', // Email vem do auth.users, não disponível neste contexto
    dataNascimento: supabaseStudent.data_nascimento,
    endereco: {
      rua: supabaseStudent.endereco_rua || undefined,
      numero: supabaseStudent.endereco_numero || undefined,
      bairro: supabaseStudent.endereco_bairro || undefined,
      cidade: supabaseStudent.endereco_cidade || undefined,
      cep: supabaseStudent.endereco_cep || undefined,
      estado: supabaseStudent.endereco_estado || undefined
    },
    turmaId: supabaseStudent.turma_id || undefined,
    progresso: supabaseStudent.progresso || 0,
    status: supabaseStudent.status || 'pendente',
    dataMatricula: supabaseStudent.data_matricula || '',
    presencaGeral: supabaseStudent.presenca_geral || 0,
    aulasAssistidas: supabaseStudent.aulas_assistidas || 0,
    aproveitamento: supabaseStudent.aproveitamento || 0,
    certificadoDisponivel: supabaseStudent.certificado_disponivel || false,
    observacoes: supabaseStudent.observacoes || undefined,
    inscricaoAutomatica: supabaseStudent.inscricao_automatica || true,
    createdAt: supabaseStudent.created_at || '',
    updatedAt: supabaseStudent.updated_at || ''
  };
}
