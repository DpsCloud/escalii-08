
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
    instrutor: course.instrutor,
    aulas_selecionadas: course.aulasSelecionadas
  };
};

export const mapSupabaseToCourse = (supabaseCourse: SupabaseCourse): Course => {
  return {
    id: supabaseCourse.id,
    nome: supabaseCourse.nome,
    descricao: supabaseCourse.descricao || '',
    dataInicio: supabaseCourse.data_inicio,
    dataFim: supabaseCourse.data_fim,
    diasSemana: supabaseCourse.dias_semana,
    cargaHoraria: supabaseCourse.carga_horaria,
    totalAulas: supabaseCourse.total_aulas,
    status: supabaseCourse.status,
    instrutor: supabaseCourse.instrutor,
    aulasSelecionadas: supabaseCourse.aulas_selecionadas
  };
};

// Mappers para Aula
export const mapAulaToSupabase = (aula: Aula): SupabaseAulaInsert => {
  return {
    titulo: aula.titulo,
    descricao: aula.descricao,
    data: aula.data,
    horario_inicio: aula.horarioInicio,
    horario_fim: aula.horarioFim,
    duracao: aula.duracao,
    status: aula.status,
    instrutor: aula.instrutor,
    categoria: aula.categoria,
    material_url: aula.materialUrl,
    video_url: aula.videoUrl,
    observacoes: aula.observacoes
  };
};

export const mapSupabaseToAula = (supabaseAula: SupabaseAula): Aula => {
  return {
    id: supabaseAula.id,
    titulo: supabaseAula.titulo,
    descricao: supabaseAula.descricao || '',
    data: supabaseAula.data,
    horarioInicio: supabaseAula.horario_inicio,
    horarioFim: supabaseAula.horario_fim,
    duracao: supabaseAula.duracao,
    status: supabaseAula.status,
    instrutor: supabaseAula.instrutor,
    categoria: supabaseAula.categoria,
    materialUrl: supabaseAula.material_url,
    videoUrl: supabaseAula.video_url,
    observacoes: supabaseAula.observacoes
  };
};
