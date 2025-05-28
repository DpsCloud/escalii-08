
import { supabase } from '@/integrations/supabase/client';
import type { Database } from '@/integrations/supabase/types';

// Tipos do Supabase
type Profile = Database['public']['Tables']['profiles']['Row'];
type ProfileInsert = Database['public']['Tables']['profiles']['Insert'];
type ProfileUpdate = Database['public']['Tables']['profiles']['Update'];

type Student = Database['public']['Tables']['students']['Row'];
type StudentInsert = Database['public']['Tables']['students']['Insert'];
type StudentUpdate = Database['public']['Tables']['students']['Update'];

type Course = Database['public']['Tables']['courses']['Row'];
type CourseInsert = Database['public']['Tables']['courses']['Insert'];
type CourseUpdate = Database['public']['Tables']['courses']['Update'];

type Aula = Database['public']['Tables']['aulas']['Row'];
type AulaInsert = Database['public']['Tables']['aulas']['Insert'];
type AulaUpdate = Database['public']['Tables']['aulas']['Update'];

type Turma = Database['public']['Tables']['turmas']['Row'];
type TurmaInsert = Database['public']['Tables']['turmas']['Insert'];
type TurmaUpdate = Database['public']['Tables']['turmas']['Update'];

type Material = Database['public']['Tables']['materials']['Row'];
type MaterialInsert = Database['public']['Tables']['materials']['Insert'];

type Notification = Database['public']['Tables']['notifications']['Row'];
type NotificationInsert = Database['public']['Tables']['notifications']['Insert'];

type Presenca = Database['public']['Tables']['presencas']['Row'];
type PresencaInsert = Database['public']['Tables']['presencas']['Insert'];

// ===================================
// PROFILES SERVICES
// ===================================

export const profilesService = {
  // Buscar perfil do usuário atual
  async getCurrentProfile() {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) throw new Error('Usuário não autenticado');

    const { data, error } = await supabase
      .from('profiles')
      .select('*')
      .eq('id', user.id)
      .single();

    if (error) throw error;
    return data;
  },

  // Atualizar perfil
  async updateProfile(id: string, updates: ProfileUpdate) {
    const { data, error } = await supabase
      .from('profiles')
      .update(updates)
      .eq('id', id)
      .select()
      .single();

    if (error) throw error;
    return data;
  },

  // Buscar todos os perfis (apenas admins)
  async getAllProfiles() {
    const { data, error } = await supabase
      .from('profiles')
      .select('*')
      .order('nome');

    if (error) throw error;
    return data;
  }
};

// ===================================
// STUDENTS SERVICES (Alunos)
// ===================================

export const alunosService = {
  // Buscar todos os alunos
  async getAllAlunos() {
    const { data, error } = await supabase
      .from('students')
      .select(`
        *,
        profiles:profile_id (
          id,
          nome,
          cpf,
          telefone
        ),
        turmas:turma_id (
          id,
          nome,
          courses:course_id (
            id,
            nome
          )
        )
      `)
      .order('created_at', { ascending: false });

    if (error) throw error;
    return data;
  },

  // Buscar dados do aluno atual
  async getCurrentAlunoData() {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) throw new Error('Usuário não autenticado');

    const { data, error } = await supabase
      .from('students')
      .select(`
        *,
        profiles:profile_id (
          id,
          nome,
          cpf,
          telefone
        ),
        turmas:turma_id (
          id,
          nome,
          courses:course_id (
            id,
            nome,
            descricao
          )
        )
      `)
      .eq('profile_id', user.id)
      .single();

    if (error && error.code !== 'PGRST116') throw error;
    return data;
  },

  // Criar dados de aluno
  async createAluno(alunoData: Omit<StudentInsert, 'profile_id'>) {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) throw new Error('Usuário não autenticado');

    const { data, error } = await supabase
      .from('students')
      .insert({
        ...alunoData,
        profile_id: user.id
      })
      .select()
      .single();

    if (error) throw error;
    return data;
  },

  // Atualizar dados de aluno
  async updateAluno(id: string, updates: StudentUpdate) {
    const { data, error } = await supabase
      .from('students')
      .update(updates)
      .eq('id', id)
      .select()
      .single();

    if (error) throw error;
    return data;
  },

  // Buscar aniversariantes do mês
  async getAniversariantes() {
    const { data, error } = await supabase
      .from('aniversariantes_mes')
      .select('*');

    if (error) throw error;
    return data;
  }
};

// ===================================
// COURSES SERVICES
// ===================================

export const coursesService = {
  // Buscar todos os cursos
  async getAllCourses() {
    const { data, error } = await supabase
      .from('courses')
      .select(`
        *,
        instructors:instructor_id (
          id,
          profiles:profile_id (
            nome
          )
        )
      `)
      .order('created_at', { ascending: false });

    if (error) throw error;
    return data;
  },

  // Buscar cursos ativos
  async getActiveCourses() {
    const { data, error } = await supabase
      .from('courses')
      .select('*')
      .eq('status', 'ativo')
      .eq('inscricoes_abertas', true)
      .order('data_inicio');

    if (error) throw error;
    return data;
  },

  // Criar curso
  async createCourse(courseData: CourseInsert) {
    const { data, error } = await supabase
      .from('courses')
      .insert(courseData)
      .select()
      .single();

    if (error) throw error;
    return data;
  },

  // Atualizar curso
  async updateCourse(id: string, updates: CourseUpdate) {
    const { data, error } = await supabase
      .from('courses')
      .update(updates)
      .eq('id', id)
      .select()
      .single();

    if (error) throw error;
    return data;
  },

  // Deletar curso
  async deleteCourse(id: string) {
    const { error } = await supabase
      .from('courses')
      .delete()
      .eq('id', id);

    if (error) throw error;
  }
};

// ===================================
// TURMAS SERVICES
// ===================================

export const turmasService = {
  // Buscar todas as turmas
  async getAllTurmas() {
    const { data, error } = await supabase
      .from('turmas')
      .select(`
        *,
        courses:course_id (
          id,
          nome,
          descricao
        ),
        instructors:instructor_id (
          id,
          profiles:profile_id (
            nome
          )
        )
      `)
      .order('created_at', { ascending: false });

    if (error) throw error;
    return data;
  },

  // Buscar turma ativa
  async getTurmaAtiva() {
    const { data, error } = await supabase
      .from('turmas')
      .select(`
        *,
        courses:course_id (
          id,
          nome,
          descricao,
          total_aulas
        )
      `)
      .eq('status', 'ativo')
      .single();

    if (error && error.code !== 'PGRST116') throw error;
    return data;
  },

  // Criar turma
  async createTurma(turmaData: TurmaInsert) {
    const { data, error } = await supabase
      .from('turmas')
      .insert(turmaData)
      .select()
      .single();

    if (error) throw error;
    return data;
  },

  // Ativar turma (automaticamente desativa as outras)
  async ativarTurma(id: string) {
    const { data, error } = await supabase
      .from('turmas')
      .update({ status: 'ativo' })
      .eq('id', id)
      .select()
      .single();

    if (error) throw error;
    return data;
  }
};

// ===================================
// AULAS SERVICES
// ===================================

export const aulasService = {
  // Buscar todas as aulas
  async getAllAulas() {
    const { data, error } = await supabase
      .from('aulas')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) throw error;
    return data;
  },

  // Buscar aulas por categoria
  async getAulasByCategoria(categoria?: string) {
    let query = supabase
      .from('aulas')
      .select('*');

    if (categoria) {
      query = query.eq('categoria', categoria);
    }

    const { data, error } = await query.order('titulo');

    if (error) throw error;
    return data;
  },

  // Criar aula
  async createAula(aulaData: AulaInsert) {
    const { data, error } = await supabase
      .from('aulas')
      .insert(aulaData)
      .select()
      .single();

    if (error) throw error;
    return data;
  },

  // Atualizar aula
  async updateAula(id: string, updates: AulaUpdate) {
    const { data, error } = await supabase
      .from('aulas')
      .update(updates)
      .eq('id', id)
      .select()
      .single();

    if (error) throw error;
    return data;
  },

  // Deletar aula
  async deleteAula(id: string) {
    const { error } = await supabase
      .from('aulas')
      .delete()
      .eq('id', id);

    if (error) throw error;
  }
};

// ===================================
// MATERIALS SERVICES
// ===================================

export const materialsService = {
  // Buscar materiais recentes
  async getRecentMaterials(limit = 10) {
    const { data, error } = await supabase
      .from('materials')
      .select(`
        *,
        aulas:aula_id (
          id,
          titulo
        )
      `)
      .eq('publico', true)
      .order('created_at', { ascending: false })
      .limit(limit);

    if (error) throw error;
    return data;
  },

  // Buscar todos os materiais
  async getAllMaterials() {
    const { data, error } = await supabase
      .from('materials')
      .select(`
        *,
        aulas:aula_id (
          id,
          titulo
        )
      `)
      .order('created_at', { ascending: false });

    if (error) throw error;
    return data;
  },

  // Criar material
  async createMaterial(materialData: MaterialInsert) {
    const { data, error } = await supabase
      .from('materials')
      .insert(materialData)
      .select()
      .single();

    if (error) throw error;
    return data;
  }
};

// ===================================
// NOTIFICATIONS SERVICES
// ===================================

export const notificationsService = {
  // Buscar notificações do usuário atual
  async getUserNotifications(limit = 10) {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) throw new Error('Usuário não autenticado');

    const { data, error } = await supabase
      .from('notifications')
      .select('*')
      .eq('profile_id', user.id)
      .order('created_at', { ascending: false })
      .limit(limit);

    if (error) throw error;
    return data;
  },

  // Marcar notificação como lida
  async markAsRead(id: string) {
    const { data, error } = await supabase
      .from('notifications')
      .update({ 
        lida: true, 
        data_leitura: new Date().toISOString() 
      })
      .eq('id', id)
      .select()
      .single();

    if (error) throw error;
    return data;
  },

  // Criar notificação
  async createNotification(notificationData: NotificationInsert) {
    const { data, error } = await supabase
      .from('notifications')
      .insert(notificationData)
      .select()
      .single();

    if (error) throw error;
    return data;
  }
};

// ===================================
// PRESENCAS SERVICES
// ===================================

export const presencasService = {
  // Registrar presença
  async registrarPresenca(presencaData: PresencaInsert) {
    const { data, error } = await supabase
      .from('presencas')
      .insert(presencaData)
      .select()
      .single();

    if (error) throw error;
    return data;
  },

  // Buscar presenças do aluno
  async getPresencasAluno(studentId: string) {
    const { data, error } = await supabase
      .from('presencas')
      .select(`
        *,
        course_aulas:course_aula_id (
          id,
          data_aula,
          horario_inicio,
          aulas:aula_id (
            titulo
          )
        )
      `)
      .eq('student_id', studentId)
      .order('created_at', { ascending: false });

    if (error) throw error;
    return data;
  },

  // Marcar aula como concluída
  async marcarAulaConcluida(presencaId: string) {
    const { data, error } = await supabase
      .from('presencas')
      .update({ aula_concluida: true })
      .eq('id', presencaId)
      .select()
      .single();

    if (error) throw error;
    return data;
  }
};

// ===================================
// INSTRUCTORS SERVICES
// ===================================

export const instructorsService = {
  // Buscar todos os instrutores
  async getAllInstructors() {
    const { data, error } = await supabase
      .from('instructors')
      .select(`
        *,
        profiles:profile_id (
          id,
          nome,
          cpf,
          telefone
        )
      `)
      .order('created_at', { ascending: false });

    if (error) throw error;
    return data;
  },

  // Criar instrutor
  async createInstructor(instructorData: any) {
    const { data, error } = await supabase
      .from('instructors')
      .insert(instructorData)
      .select()
      .single();

    if (error) throw error;
    return data;
  }
};

// ===================================
// STATISTICS SERVICES
// ===================================

export const statisticsService = {
  // Estatísticas para admin
  async getAdminStats() {
    const [alunos, cursos, turmaAtiva, aniversariantes] = await Promise.all([
      alunosService.getAllAlunos(),
      coursesService.getAllCourses(),
      turmasService.getTurmaAtiva(),
      alunosService.getAniversariantes()
    ]);

    const totalAlunos = alunos.length;
    const totalCursos = cursos.length;
    const turmasAtivas = turmaAtiva ? 1 : 0;
    const proximasFormaturas = alunos.filter(a => a.progresso >= 90).length;
    
    const presencaMedia = alunos.length > 0 
      ? Math.round(alunos.reduce((sum, a) => sum + (a.presenca_geral || 0), 0) / alunos.length)
      : 0;
    
    const aproveitamento = alunos.length > 0
      ? Math.round(alunos.reduce((sum, a) => sum + (a.aproveitamento || 0), 0) / alunos.length)
      : 0;

    return {
      totalAlunos,
      totalCursos,
      turmasAtivas,
      proximasFormaturas,
      presencaMedia,
      aproveitamento,
      aniversariantes: aniversariantes.length
    };
  },

  // Estatísticas para aluno
  async getStudentStats() {
    const alunoData = await alunosService.getCurrentAlunoData();
    
    if (!alunoData) {
      return {
        progresso: 0,
        presencaGeral: 0,
        aulasAssistidas: 0,
        certificadoDisponivel: false,
        turma: null
      };
    }

    return {
      progresso: alunoData.progresso || 0,
      presencaGeral: alunoData.presenca_geral || 0,
      aulasAssistidas: alunoData.aulas_assistidas || 0,
      certificadoDisponivel: alunoData.certificado_disponivel || false,
      turma: alunoData.turmas
    };
  }
};

// ===================================
// AUTH SERVICES
// ===================================

export const authService = {
  // Expor o cliente supabase para uso interno
  supabase,

  // Login
  async signIn(email: string, password: string) {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) throw error;
    return data;
  },

  // Registro
  async signUp(email: string, password: string, metadata?: any) {
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: metadata
      }
    });

    if (error) throw error;
    return data;
  },

  // Logout
  async signOut() {
    const { error } = await supabase.auth.signOut();
    if (error) throw error;
  },

  // Buscar usuário atual
  async getCurrentUser() {
    const { data: { user }, error } = await supabase.auth.getUser();
    if (error) throw error;
    return user;
  },

  // Escutar mudanças de autenticação
  onAuthStateChange(callback: (event: string, session: any) => void) {
    return supabase.auth.onAuthStateChange(callback);
  }
};

// ===================================
// UTILS
// ===================================

export const supabaseUtils = {
  // Verificar se usuário é admin
  async isAdmin() {
    try {
      const profile = await profilesService.getCurrentProfile();
      return profile.role === 'admin';
    } catch {
      return false;
    }
  },

  // Verificar se usuário é instrutor
  async isInstructor() {
    try {
      const profile = await profilesService.getCurrentProfile();
      return profile.role === 'instructor';
    } catch {
      return false;
    }
  },

  // Verificar se usuário é estudante
  async isStudent() {
    try {
      const profile = await profilesService.getCurrentProfile();
      return profile.role === 'student';
    } catch {
      return false;
    }
  }
};

// Backward compatibility - mantém as exportações antigas
export const studentsService = alunosService;
