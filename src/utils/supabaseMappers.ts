
import { Student } from '@/types/student';
import { Course, Aula } from '@/types/course';
import { SupabaseStudent, SupabaseCourse, SupabaseAula, SupabaseStudentInsert, SupabaseCourseInsert, SupabaseAulaInsert } from '@/types/supabase';

// Mappers para Student
export const mapStudentToSupabase = (student: Student): SupabaseStudentInsert => {
  return {
    nome: student.nome,
    cpf: student.cpf,
    telefone: student.telefone,
    email: student.email,
    data_nascimento: student.dataNascimento,
    endereco_rua: student.endereco?.rua,
    endereco_numero: student.endereco?.numero,
    endereco_bairro: student.endereco?.bairro,
    endereco_cidade: student.endereco?.cidade,
    endereco_cep: student.endereco?.cep,
    endereco_estado: student.endereco?.estado,
    progresso: student.progresso,
    status: student.status,
    foto: student.foto,
    data_matricula: student.dataMatricula,
    presenca_geral: student.presencaGeral,
    aulas_assistidas: student.aulasAssistidas,
    aproveitamento: student.aproveitamento,
    certificado_disponivel: student.certificadoDisponivel,
    observacoes: student.observacoes
  };
};

export const mapSupabaseToStudent = (supabaseStudent: SupabaseStudent): Student => {
  return {
    id: supabaseStudent.id,
    nome: supabaseStudent.nome,
    cpf: supabaseStudent.cpf,
    telefone: supabaseStudent.telefone,
    email: supabaseStudent.email,
    dataNascimento: supabaseStudent.data_nascimento,
    endereco: (supabaseStudent.endereco_rua || supabaseStudent.endereco_numero || 
               supabaseStudent.endereco_bairro || supabaseStudent.endereco_cidade || 
               supabaseStudent.endereco_cep || supabaseStudent.endereco_estado) ? {
      rua: supabaseStudent.endereco_rua,
      numero: supabaseStudent.endereco_numero,
      bairro: supabaseStudent.endereco_bairro,
      cidade: supabaseStudent.endereco_cidade,
      cep: supabaseStudent.endereco_cep,
      estado: supabaseStudent.endereco_estado
    } : undefined,
    curso: undefined, // Será preenchido via JOIN
    turma: undefined, // Será preenchido via JOIN
    progresso: supabaseStudent.progresso,
    status: supabaseStudent.status,
    foto: supabaseStudent.foto,
    dataMatricula: supabaseStudent.data_matricula,
    presencaGeral: supabaseStudent.presenca_geral,
    aulasAssistidas: supabaseStudent.aulas_assistidas,
    aproveitamento: supabaseStudent.aproveitamento,
    certificadoDisponivel: supabaseStudent.certificado_disponivel,
    observacoes: supabaseStudent.observacoes
  };
};

// Mappers para Course
export const mapCourseToSupabase = (course: Course): SupabaseCourseInsert => {
  return {
    nome: course.nome,
    descricao: course.descricao,
    data_inicio: course.dataInicio,
    data_fim: course.dataFim,
    dias_semana: course.diasSemana,
    carga_horaria: course.cargaHoraria,
    total_aulas: course.totalAulas,
    status: course.status,
    instrutor: undefined, // Course type doesn't have instrutor
    aulas_selecionadas: course.aulasSelecionadas
  };
};

export const mapSupabaseToCourse = (supabaseCourse: SupabaseCourse): Course => {
  return {
    id: supabaseCourse.id,
    nome: supabaseCourse.nome,
    descricao: supabaseCourse.descricao || '',
    tipo: 'capacitacao', // Default value since Supabase doesn't have this field
    ano: '2025', // Default value since Supabase doesn't have this field
    periodo: '1', // Default value since Supabase doesn't have this field
    turma: '', // Default value since Supabase doesn't have this field
    dataInicio: supabaseCourse.data_inicio,
    dataFim: supabaseCourse.data_fim,
    diasSemana: supabaseCourse.dias_semana as any, // Type assertion for compatibility
    cargaHoraria: supabaseCourse.carga_horaria,
    totalAulas: supabaseCourse.total_aulas,
    maxAlunos: 30, // Default value since Supabase doesn't have this field
    status: supabaseCourse.status,
    inscricoesAbertas: true, // Default value since Supabase doesn't have this field
    alunosInscritos: 0, // Default value since Supabase doesn't have this field
    aulasSelecionadas: supabaseCourse.aulas_selecionadas,
    turmas: [], // Default value since Supabase doesn't have this field
    createdAt: supabaseCourse.created_at || new Date().toISOString(),
    updatedAt: supabaseCourse.updated_at || new Date().toISOString()
  };
};

// Mappers para Aula
export const mapAulaToSupabase = (aula: Aula): SupabaseAulaInsert => {
  // Map status from Aula to Supabase format
  const statusMap: Record<string, 'agendada' | 'em_andamento' | 'finalizada' | 'cancelada'> = {
    'planejada': 'agendada',
    'ativa': 'em_andamento',
    'concluida': 'finalizada'
  };

  return {
    titulo: aula.titulo,
    descricao: aula.descricao,
    data: new Date().toISOString().split('T')[0], // Default to today since Aula doesn't have data
    horario_inicio: '09:00', // Default value since Aula doesn't have horarioInicio
    horario_fim: '10:00', // Default value since Aula doesn't have horarioFim
    duracao: aula.duracao,
    status: statusMap[aula.status] || 'agendada',
    instrutor: undefined, // Aula type doesn't have instrutor
    categoria: aula.categoria || 'geral',
    material_url: undefined, // Aula type doesn't have materialUrl
    video_url: aula.videoUrl,
    observacoes: undefined // Aula type doesn't have observacoes
  };
};

export const mapSupabaseToAula = (supabaseAula: SupabaseAula): Aula => {
  // Map status from Supabase to Aula format
  const statusMap: Record<string, 'planejada' | 'ativa' | 'concluida'> = {
    'agendada': 'planejada',
    'em_andamento': 'ativa',
    'finalizada': 'concluida',
    'cancelada': 'concluida' // Map cancelada to concluida as fallback
  };

  return {
    id: supabaseAula.id,
    titulo: supabaseAula.titulo,
    descricao: supabaseAula.descricao || '',
    duracao: supabaseAula.duracao,
    videoUrl: supabaseAula.video_url,
    materiais: [], // Default empty array since this is a separate relationship
    status: statusMap[supabaseAula.status] || 'planejada',
    categoria: supabaseAula.categoria,
    tags: [], // Default empty array since Supabase doesn't have this field
    createdAt: supabaseAula.created_at || new Date().toISOString(),
    updatedAt: supabaseAula.updated_at || new Date().toISOString()
  };
};
