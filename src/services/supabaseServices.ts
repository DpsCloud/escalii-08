
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
// STUDENTS SERVICES
// ===================================

export const studentsService = {
  // Buscar todos os alunos
  async getAllStudents() {
    const { data, error } = await supabase
      .from('students')
      .select(`
        *,
        profiles:profile_id (
          id,
          nome,
          cpf,
          telefone,
          email:id
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

  // Buscar dados do estudante atual
  async getCurrentStudentData() {
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

  // Criar dados de estudante
  async createStudent(studentData: Omit<StudentInsert, 'profile_id'>) {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) throw new Error('Usuário não autenticado');

    const { data, error } = await supabase
      .from('students')
      .insert({
        ...studentData,
        profile_id: user.id
      })
      .select()
      .single();

    if (error) throw error;
    return data;
  },

  // Atualizar dados de estudante
  async updateStudent(id: string, updates: StudentUpdate) {
    const { data, error } = await supabase
      .from('students')
      .update(updates)
      .eq('id', id)
      .select()
      .single();

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
// AUTH SERVICES
// ===================================

export const authService = {
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
