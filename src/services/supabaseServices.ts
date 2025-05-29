import { supabase } from '@/integrations/supabase/client';
import { Student } from '@/types/student';
import { Course } from '@/types/course';
import { Aula } from '@/types/course';

export const alunosService = {
  async getAllAlunos(): Promise<Student[]> {
    try {
      const { data, error } = await supabase
        .from('students')
        .select(`
          *,
          profiles:profile_id (
            nome,
            telefone
          )
        `);

      if (error) {
        console.error("Erro ao buscar alunos:", error);
        throw error;
      }

      // Map Supabase data to Student type
      const alunos: Student[] = data.map(aluno => ({
        id: aluno.id,
        nome: aluno.profiles?.nome || '',
        email: '', // Email vem do auth, não do profiles
        telefone: aluno.profiles?.telefone || '',
        profileId: aluno.profile_id,
        cpf: '',
        dataNascimento: aluno.data_nascimento,
        progresso: aluno.progresso || 0,
        presencaGeral: aluno.presenca_geral || 0,
        aulasAssistidas: aluno.aulas_assistidas || 0,
        aproveitamento: aluno.aproveitamento || 0,
        certificadoDisponivel: aluno.certificado_disponivel || false,
        turmaId: aluno.turma_id,
        status: aluno.status || 'pendente',
        dataMatricula: aluno.data_matricula,
        inscricaoAutomatica: aluno.inscricao_automatica || true,
        createdAt: aluno.created_at || '',
        updatedAt: aluno.updated_at || ''
      }));

      return alunos;
    } catch (error) {
      console.error("Erro ao buscar alunos:", error);
      throw error;
    }
  },

  async createAluno(student: Omit<Student, 'id'>): Promise<Student> {
    try {
      const { data, error } = await supabase
        .from('students')
        .insert([
          {
            profile_id: student.profileId,
            data_nascimento: student.dataNascimento,
            turma_id: student.turmaId,
            presenca_geral: student.presencaGeral,
            aulas_assistidas: student.aulasAssistidas,
            aproveitamento: student.aproveitamento,
            certificado_disponivel: student.certificadoDisponivel,
            progresso: student.progresso,
            status: student.status,
            data_matricula: student.dataMatricula,
            inscricao_automatica: student.inscricaoAutomatica
          }
        ])
        .select()
        .single();

      if (error) {
        console.error("Erro ao criar aluno:", error);
        throw error;
      }

      // Map back to Student type
      const newStudent: Student = {
        id: data.id,
        nome: '',
        email: '',
        telefone: '',
        profileId: data.profile_id,
        cpf: '',
        dataNascimento: data.data_nascimento,
        progresso: data.progresso,
        presencaGeral: data.presenca_geral,
        aulasAssistidas: data.aulas_assistidas,
        aproveitamento: data.aproveitamento,
        certificadoDisponivel: data.certificado_disponivel,
        turmaId: data.turma_id,
        status: data.status,
        dataMatricula: data.data_matricula,
        inscricaoAutomatica: data.inscricao_automatica || true,
        createdAt: data.created_at || '',
        updatedAt: data.updated_at || ''
      };

      return newStudent;
    } catch (error) {
      console.error("Erro ao criar aluno:", error);
      throw error;
    }
  },

  async updateAluno(id: string, student: Partial<Student>): Promise<Partial<Student>> {
    try {
      const { data, error } = await supabase
        .from('students')
        .update({
          profile_id: student.profileId,
          data_nascimento: student.dataNascimento,
          turma_id: student.turmaId,
          presenca_geral: student.presencaGeral,
          aulas_assistidas: student.aulasAssistidas,
          aproveitamento: student.aproveitamento,
          certificado_disponivel: student.certificadoDisponivel,
          progresso: student.progresso,
          status: student.status,
          inscricao_automatica: student.inscricaoAutomatica
        })
        .eq('id', id)
        .select()
        .single();

      if (error) {
        console.error("Erro ao atualizar aluno:", error);
        throw error;
      }

      return data;
    } catch (error) {
      console.error("Erro ao atualizar aluno:", error);
      throw error;
    }
  },

  async deleteAluno(id: string): Promise<void> {
    try {
      const { error } = await supabase
        .from('students')
        .delete()
        .eq('id', id);

      if (error) {
        console.error("Erro ao deletar aluno:", error);
        throw error;
      }
    } catch (error) {
      console.error("Erro ao deletar aluno:", error);
      throw error;
    }
  }
};

export const coursesService = {
  async getAllCourses(): Promise<Course[]> {
    try {
      const { data, error } = await supabase
        .from('courses')
        .select('*');

      if (error) {
        console.error("Erro ao buscar cursos:", error);
        throw error;
      }

      // Map Supabase data to Course type, filtering out 'inativo' status
      const courses: Course[] = data
        .filter(course => course.status !== 'inativo')
        .map(course => ({
          id: course.id,
          nome: course.nome,
          descricao: course.descricao,
          tipo: course.tipo,
          ano: course.ano,
          periodo: course.periodo,
          dataInicio: course.data_inicio,
          dataFim: course.data_fim,
          totalAulas: course.total_aulas,
          inscricoesAbertas: course.inscricoes_abertas,
          cargaHoraria: course.carga_horaria,
          maxAlunos: course.max_alunos,
          status: course.status as 'ativo' | 'planejado' | 'finalizado' | 'cancelado',
          diasSemana: course.dias_semana || [],
          instructorId: course.instructor_id,
          createdAt: course.created_at,
          updatedAt: course.updated_at
        }));

      return courses;
    } catch (error) {
      console.error("Erro ao buscar cursos:", error);
      throw error;
    }
  },

  async createCourse(course: Omit<Course, 'id'>): Promise<Course> {
    try {
      const { data, error } = await supabase
        .from('courses')
        .insert([
          {
            nome: course.nome,
            descricao: course.descricao,
            tipo: course.tipo,
            ano: course.ano,
            periodo: course.periodo,
            data_inicio: course.dataInicio,
            data_fim: course.dataFim,
            total_aulas: course.totalAulas,
            inscricoes_abertas: course.inscricoesAbertas,
            carga_horaria: course.cargaHoraria,
            max_alunos: course.maxAlunos,
            status: course.status,
            dias_semana: course.diasSemana,
            instructor_id: course.instructorId
          }
        ])
        .select()
        .single();

      if (error) {
        console.error("Erro ao criar curso:", error);
        throw error;
      }

      // Map Supabase data to Course type
      const newCourse: Course = {
        id: data.id,
        nome: data.nome,
        descricao: data.descricao,
        tipo: data.tipo,
        ano: data.ano,
        periodo: data.periodo,
        dataInicio: data.data_inicio,
        dataFim: data.data_fim,
        totalAulas: data.total_aulas,
        inscricoesAbertas: data.inscricoes_abertas,
        cargaHoraria: data.carga_horaria,
        maxAlunos: data.max_alunos,
        status: data.status as 'ativo' | 'planejado' | 'finalizado' | 'cancelado',
        diasSemana: data.dias_semana || [],
        instructorId: data.instructor_id,
        createdAt: data.created_at,
        updatedAt: data.updated_at
      };

      return newCourse;
    } catch (error) {
      console.error("Erro ao criar curso:", error);
      throw error;
    }
  },

  async updateCourse(id: string, course: Partial<Course>): Promise<Partial<Course>> {
    try {
      const { data, error } = await supabase
        .from('courses')
        .update({
          nome: course.nome,
          descricao: course.descricao,
          tipo: course.tipo,
          ano: course.ano,
          periodo: course.periodo,
          data_inicio: course.dataInicio,
          data_fim: course.dataFim,
          total_aulas: course.totalAulas,
          inscricoes_abertas: course.inscricoesAbertas,
          carga_horaria: course.cargaHoraria,
          max_alunos: course.maxAlunos,
          status: course.status,
          dias_semana: course.diasSemana,
          instructor_id: course.instructorId
        })
        .eq('id', id)
        .select()
        .single();

      if (error) {
        console.error("Erro ao atualizar curso:", error);
        throw error;
      }

      return {
        id: data.id,
        nome: data.nome,
        descricao: data.descricao,
        tipo: data.tipo,
        ano: data.ano,
        periodo: data.periodo,
        dataInicio: data.data_inicio,
        dataFim: data.data_fim,
        totalAulas: data.total_aulas,
        inscricoesAbertas: data.inscricoes_abertas,
        cargaHoraria: data.carga_horaria,
        maxAlunos: data.max_alunos,
        status: data.status as 'ativo' | 'planejado' | 'finalizado' | 'cancelado',
        diasSemana: data.dias_semana || [],
        instructorId: data.instructor_id,
        createdAt: data.created_at,
        updatedAt: data.updated_at
      };
    } catch (error) {
      console.error("Erro ao atualizar curso:", error);
      throw error;
    }
  },

  async deleteCourse(id: string): Promise<void> {
    try {
      const { error } = await supabase
        .from('courses')
        .delete()
        .eq('id', id);

      if (error) {
        console.error("Erro ao deletar curso:", error);
        throw error;
      }
    } catch (error) {
      console.error("Erro ao deletar curso:", error);
      throw error;
    }
  }
};

export const aulasService = {
  async getAllAulas(): Promise<Aula[]> {
    try {
      const { data, error } = await supabase
        .from('aulas')
        .select('*');

      if (error) {
        console.error("Erro ao buscar aulas:", error);
        throw error;
      }

      // Map Supabase data to Aula type
      const aulas: Aula[] = data.map(aula => ({
        id: aula.id,
        titulo: aula.titulo,
        descricao: aula.descricao,
        categoria: aula.categoria,
        videoUrl: aula.video_url,
        tags: aula.tags || [],
        duracao: aula.duracao,
        status: aula.status,
        conteudoTexto: aula.conteudo_texto,
        prerequisitos: aula.prerequisitos || [],
        objetivos: aula.objetivos || [],
        nivelDificuldade: aula.nivel_dificuldade,
        createdAt: aula.created_at,
        updatedAt: aula.updated_at
      }));

      return aulas;
    } catch (error) {
      console.error("Erro ao buscar aulas:", error);
      throw error;
    }
  },

  async getByCourse(courseId: string): Promise<Aula[]> {
    try {
      const { data, error } = await supabase
        .from('course_aulas')
        .select(`
          aulas:aula_id (*)
        `)
        .eq('course_id', courseId);

      if (error) {
        console.error("Erro ao buscar aulas do curso:", error);
        throw error;
      }

      // Map and return aulas
      return data.map(item => ({
        id: item.aulas.id,
        titulo: item.aulas.titulo,
        descricao: item.aulas.descricao,
        categoria: item.aulas.categoria,
        videoUrl: item.aulas.video_url,
        tags: item.aulas.tags || [],
        duracao: item.aulas.duracao,
        status: item.aulas.status,
        conteudoTexto: item.aulas.conteudo_texto,
        prerequisitos: item.aulas.prerequisitos || [],
        objetivos: item.aulas.objetivos || [],
        nivelDificuldade: item.aulas.nivel_dificuldade,
        createdAt: item.aulas.created_at,
        updatedAt: item.aulas.updated_at
      }));
    } catch (error) {
      console.error("Erro ao buscar aulas do curso:", error);
      throw error;
    }
  },

  async createAula(aula: Omit<Aula, 'id'>): Promise<Aula> {
    try {
      const { data, error } = await supabase
        .from('aulas')
        .insert([
          {
            titulo: aula.titulo,
            descricao: aula.descricao,
            categoria: aula.categoria,
            video_url: aula.videoUrl,
            tags: aula.tags,
            duracao: aula.duracao,
            status: aula.status,
            conteudo_texto: aula.conteudoTexto,
            prerequisitos: aula.prerequisitos,
            objetivos: aula.objetivos,
            nivel_dificuldade: aula.nivelDificuldade
          }
        ])
        .select()
        .single();

      if (error) {
        console.error("Erro ao criar aula:", error);
        throw error;
      }

      // Map Supabase data to Aula type
      const newAula: Aula = {
        id: data.id,
        titulo: data.titulo,
        descricao: data.descricao,
        categoria: data.categoria,
        videoUrl: data.video_url,
        tags: data.tags || [],
        duracao: data.duracao,
        status: data.status,
        conteudoTexto: data.conteudo_texto,
        prerequisitos: data.prerequisitos || [],
        objetivos: data.objetivos || [],
        nivelDificuldade: data.nivel_dificuldade,
        createdAt: data.created_at,
        updatedAt: data.updated_at
      };

      return newAula;
    } catch (error) {
      console.error("Erro ao criar aula:", error);
      throw error;
    }
  },

  async updateAula(id: string, aula: Partial<Aula>): Promise<Partial<Aula>> {
    try {
      const { data, error } = await supabase
        .from('aulas')
        .update({
          titulo: aula.titulo,
          descricao: aula.descricao,
          categoria: aula.categoria,
          video_url: aula.videoUrl,
          tags: aula.tags,
          duracao: aula.duracao,
          status: aula.status,
          conteudo_texto: aula.conteudoTexto,
          prerequisitos: aula.prerequisitos,
          objetivos: aula.objetivos,
          nivel_dificuldade: aula.nivelDificuldade
        })
        .eq('id', id)
        .select()
        .single();

      if (error) {
        console.error("Erro ao atualizar aula:", error);
        throw error;
      }

      return data;
    } catch (error) {
      console.error("Erro ao atualizar aula:", error);
      throw error;
    }
  },

  async deleteAula(id: string): Promise<void> {
    try {
      const { error } = await supabase
        .from('aulas')
        .delete()
        .eq('id', id);

      if (error) {
        console.error("Erro ao deletar aula:", error);
        throw error;
      }
    } catch (error) {
      console.error("Erro ao deletar aula:", error);
      throw error;
    }
  }
};

// Export auth and profiles services
export { authService } from './authService';
export { profilesService } from './profilesService';

// Export the new services
export { statisticsService } from './statisticsService';
export { turmasService } from './turmasService';
export { materialsService } from './materialsService';
