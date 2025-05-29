import { supabase } from '@/integrations/supabase/client';
import { Student, SupabaseStudent } from '@/types/student';
import { Course, SupabaseCourse } from '@/types/course';
import { Aula, SupabaseAula } from '@/types/course';

export const alunosService = {
  async getAllAlunos(): Promise<Student[]> {
    try {
      const { data, error } = await supabase
        .from('students')
        .select('*');

      if (error) {
        console.error("Erro ao buscar alunos:", error);
        throw error;
      }

      // Map Supabase data to Student type
      const alunos: Student[] = data.map(aluno => ({
        id: aluno.id,
        nome: aluno.nome,
        email: aluno.email,
        telefone: aluno.telefone,
        cursoId: aluno.curso_id,
        presencaGeral: aluno.presenca_geral,
        aulasAssistidas: aluno.aulas_assistidas,
        aproveitamento: aluno.aproveitamento,
        certificadoDisponivel: aluno.certificado_disponivel,
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
            nome: student.nome,
            email: student.email,
            telefone: student.telefone,
            curso_id: student.cursoId,
            presenca_geral: student.presencaGeral,
            aulas_assistidas: student.aulasAssistidas,
            aproveitamento: student.aproveitamento,
            certificado_disponivel: student.certificadoDisponivel,
          }
        ])
        .select()
        .single();

      if (error) {
        console.error("Erro ao criar aluno:", error);
        throw error;
      }

      // Map Supabase data to Student type
      const newStudent: Student = {
        id: data.id,
        nome: data.nome,
        email: data.email,
        telefone: data.telefone,
        cursoId: data.curso_id,
        presencaGeral: data.presenca_geral,
        aulasAssistidas: data.aulas_assistidas,
        aproveitamento: data.aproveitamento,
        certificadoDisponivel: data.certificado_disponivel,
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
          nome: student.nome,
          email: student.email,
          telefone: student.telefone,
          curso_id: student.cursoId,
          presenca_geral: student.presencaGeral,
          aulas_assistidas: student.aulasAssistidas,
          aproveitamento: student.aproveitamento,
          certificado_disponivel: student.certificadoDisponivel,
        })
        .eq('id', id)
        .select()
        .single();

      if (error) {
        console.error("Erro ao atualizar aluno:", error);
        throw error;
      }

      // Directly return the updated data
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

      // Map Supabase data to Course type
      const courses: Course[] = data.map(course => ({
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
        })
        .eq('id', id)
        .select()
        .single();

      if (error) {
        console.error("Erro ao atualizar curso:", error);
        throw error;
      }

      // Directly return the updated data
      return data;
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
  async getAllAulas(): Promise<SupabaseAula[]> {
    try {
      const { data, error } = await supabase
        .from('aulas')
        .select('*');

      if (error) {
        console.error("Erro ao buscar aulas:", error);
        throw error;
      }

      return data || [];
    } catch (error) {
      console.error("Erro ao buscar aulas:", error);
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
        tags: data.tags,
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
        })
        .eq('id', id)
        .select()
        .single();

      if (error) {
        console.error("Erro ao atualizar aula:", error);
        throw error;
      }

      // Directly return the updated data
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

// Export the new services
export { statisticsService } from './statisticsService';
export { turmasService } from './turmasService';
export { materialsService } from './materialsService';
