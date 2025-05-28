export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  public: {
    Tables: {
      aulas: {
        Row: {
          categoria: string
          conteudo_texto: string | null
          created_at: string | null
          descricao: string | null
          duracao: number
          id: string
          nivel_dificuldade: number | null
          objetivos: string[] | null
          prerequisitos: string[] | null
          status: Database["public"]["Enums"]["aula_status"]
          tags: string[] | null
          titulo: string
          updated_at: string | null
          video_url: string | null
        }
        Insert: {
          categoria: string
          conteudo_texto?: string | null
          created_at?: string | null
          descricao?: string | null
          duracao?: number
          id?: string
          nivel_dificuldade?: number | null
          objetivos?: string[] | null
          prerequisitos?: string[] | null
          status?: Database["public"]["Enums"]["aula_status"]
          tags?: string[] | null
          titulo: string
          updated_at?: string | null
          video_url?: string | null
        }
        Update: {
          categoria?: string
          conteudo_texto?: string | null
          created_at?: string | null
          descricao?: string | null
          duracao?: number
          id?: string
          nivel_dificuldade?: number | null
          objetivos?: string[] | null
          prerequisitos?: string[] | null
          status?: Database["public"]["Enums"]["aula_status"]
          tags?: string[] | null
          titulo?: string
          updated_at?: string | null
          video_url?: string | null
        }
        Relationships: []
      }
      course_aulas: {
        Row: {
          aula_id: string
          course_id: string
          created_at: string | null
          data_aula: string | null
          horario_fim: string | null
          horario_inicio: string | null
          id: string
          obrigatoria: boolean | null
          ordem: number
        }
        Insert: {
          aula_id: string
          course_id: string
          created_at?: string | null
          data_aula?: string | null
          horario_fim?: string | null
          horario_inicio?: string | null
          id?: string
          obrigatoria?: boolean | null
          ordem: number
        }
        Update: {
          aula_id?: string
          course_id?: string
          created_at?: string | null
          data_aula?: string | null
          horario_fim?: string | null
          horario_inicio?: string | null
          id?: string
          obrigatoria?: boolean | null
          ordem?: number
        }
        Relationships: [
          {
            foreignKeyName: "course_aulas_aula_id_fkey"
            columns: ["aula_id"]
            isOneToOne: false
            referencedRelation: "aulas"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "course_aulas_course_id_fkey"
            columns: ["course_id"]
            isOneToOne: false
            referencedRelation: "courses"
            referencedColumns: ["id"]
          },
        ]
      }
      courses: {
        Row: {
          ano: string
          carga_horaria: number
          created_at: string | null
          data_fim: string
          data_inicio: string
          descricao: string | null
          dias_semana: string[] | null
          id: string
          inscricoes_abertas: boolean | null
          instructor_id: string | null
          max_alunos: number
          nome: string
          periodo: string
          status: Database["public"]["Enums"]["status_type"]
          tipo: string
          total_aulas: number
          updated_at: string | null
        }
        Insert: {
          ano: string
          carga_horaria?: number
          created_at?: string | null
          data_fim: string
          data_inicio: string
          descricao?: string | null
          dias_semana?: string[] | null
          id?: string
          inscricoes_abertas?: boolean | null
          instructor_id?: string | null
          max_alunos?: number
          nome: string
          periodo: string
          status?: Database["public"]["Enums"]["status_type"]
          tipo: string
          total_aulas?: number
          updated_at?: string | null
        }
        Update: {
          ano?: string
          carga_horaria?: number
          created_at?: string | null
          data_fim?: string
          data_inicio?: string
          descricao?: string | null
          dias_semana?: string[] | null
          id?: string
          inscricoes_abertas?: boolean | null
          instructor_id?: string | null
          max_alunos?: number
          nome?: string
          periodo?: string
          status?: Database["public"]["Enums"]["status_type"]
          tipo?: string
          total_aulas?: number
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "courses_instructor_id_fkey"
            columns: ["instructor_id"]
            isOneToOne: false
            referencedRelation: "instructors"
            referencedColumns: ["id"]
          },
        ]
      }
      instructors: {
        Row: {
          biografia: string | null
          certificacoes: string[] | null
          created_at: string | null
          especialidade: string | null
          experiencia_anos: number | null
          id: string
          profile_id: string
          updated_at: string | null
        }
        Insert: {
          biografia?: string | null
          certificacoes?: string[] | null
          created_at?: string | null
          especialidade?: string | null
          experiencia_anos?: number | null
          id?: string
          profile_id: string
          updated_at?: string | null
        }
        Update: {
          biografia?: string | null
          certificacoes?: string[] | null
          created_at?: string | null
          especialidade?: string | null
          experiencia_anos?: number | null
          id?: string
          profile_id?: string
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "instructors_profile_id_fkey"
            columns: ["profile_id"]
            isOneToOne: true
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      materials: {
        Row: {
          aula_id: string
          created_at: string | null
          descricao: string | null
          id: string
          nome: string
          ordem: number | null
          publico: boolean | null
          tamanho_arquivo: number | null
          tipo: Database["public"]["Enums"]["material_type"]
          updated_at: string | null
          url: string
        }
        Insert: {
          aula_id: string
          created_at?: string | null
          descricao?: string | null
          id?: string
          nome: string
          ordem?: number | null
          publico?: boolean | null
          tamanho_arquivo?: number | null
          tipo: Database["public"]["Enums"]["material_type"]
          updated_at?: string | null
          url: string
        }
        Update: {
          aula_id?: string
          created_at?: string | null
          descricao?: string | null
          id?: string
          nome?: string
          ordem?: number | null
          publico?: boolean | null
          tamanho_arquivo?: number | null
          tipo?: Database["public"]["Enums"]["material_type"]
          updated_at?: string | null
          url?: string
        }
        Relationships: [
          {
            foreignKeyName: "materials_aula_id_fkey"
            columns: ["aula_id"]
            isOneToOne: false
            referencedRelation: "aulas"
            referencedColumns: ["id"]
          },
        ]
      }
      notifications: {
        Row: {
          created_at: string | null
          data_leitura: string | null
          id: string
          lida: boolean | null
          link_acao: string | null
          mensagem: string
          metadata: Json | null
          profile_id: string
          tipo: Database["public"]["Enums"]["notification_type"]
          titulo: string
        }
        Insert: {
          created_at?: string | null
          data_leitura?: string | null
          id?: string
          lida?: boolean | null
          link_acao?: string | null
          mensagem: string
          metadata?: Json | null
          profile_id: string
          tipo?: Database["public"]["Enums"]["notification_type"]
          titulo: string
        }
        Update: {
          created_at?: string | null
          data_leitura?: string | null
          id?: string
          lida?: boolean | null
          link_acao?: string | null
          mensagem?: string
          metadata?: Json | null
          profile_id?: string
          tipo?: Database["public"]["Enums"]["notification_type"]
          titulo?: string
        }
        Relationships: [
          {
            foreignKeyName: "notifications_profile_id_fkey"
            columns: ["profile_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      presencas: {
        Row: {
          course_aula_id: string
          created_at: string | null
          data_presenca: string | null
          horario_chegada: string | null
          id: string
          observacoes: string | null
          presente: boolean
          student_id: string
        }
        Insert: {
          course_aula_id: string
          created_at?: string | null
          data_presenca?: string | null
          horario_chegada?: string | null
          id?: string
          observacoes?: string | null
          presente: boolean
          student_id: string
        }
        Update: {
          course_aula_id?: string
          created_at?: string | null
          data_presenca?: string | null
          horario_chegada?: string | null
          id?: string
          observacoes?: string | null
          presente?: boolean
          student_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "presencas_course_aula_id_fkey"
            columns: ["course_aula_id"]
            isOneToOne: false
            referencedRelation: "course_aulas"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "presencas_student_id_fkey"
            columns: ["student_id"]
            isOneToOne: false
            referencedRelation: "students"
            referencedColumns: ["id"]
          },
        ]
      }
      profiles: {
        Row: {
          avatar_url: string | null
          cpf: string
          created_at: string | null
          id: string
          nome: string
          role: Database["public"]["Enums"]["user_role"]
          status: Database["public"]["Enums"]["status_type"]
          telefone: string
          ultimo_acesso: string | null
          updated_at: string | null
        }
        Insert: {
          avatar_url?: string | null
          cpf: string
          created_at?: string | null
          id: string
          nome: string
          role?: Database["public"]["Enums"]["user_role"]
          status?: Database["public"]["Enums"]["status_type"]
          telefone: string
          ultimo_acesso?: string | null
          updated_at?: string | null
        }
        Update: {
          avatar_url?: string | null
          cpf?: string
          created_at?: string | null
          id?: string
          nome?: string
          role?: Database["public"]["Enums"]["user_role"]
          status?: Database["public"]["Enums"]["status_type"]
          telefone?: string
          ultimo_acesso?: string | null
          updated_at?: string | null
        }
        Relationships: []
      }
      students: {
        Row: {
          aproveitamento: number | null
          aulas_assistidas: number | null
          certificado_disponivel: boolean | null
          created_at: string | null
          data_matricula: string | null
          data_nascimento: string
          endereco_bairro: string | null
          endereco_cep: string | null
          endereco_cidade: string | null
          endereco_estado: string | null
          endereco_numero: string | null
          endereco_rua: string | null
          id: string
          observacoes: string | null
          presenca_geral: number | null
          profile_id: string
          progresso: number | null
          status: Database["public"]["Enums"]["student_status"]
          turma_id: string | null
          updated_at: string | null
        }
        Insert: {
          aproveitamento?: number | null
          aulas_assistidas?: number | null
          certificado_disponivel?: boolean | null
          created_at?: string | null
          data_matricula?: string | null
          data_nascimento: string
          endereco_bairro?: string | null
          endereco_cep?: string | null
          endereco_cidade?: string | null
          endereco_estado?: string | null
          endereco_numero?: string | null
          endereco_rua?: string | null
          id?: string
          observacoes?: string | null
          presenca_geral?: number | null
          profile_id: string
          progresso?: number | null
          status?: Database["public"]["Enums"]["student_status"]
          turma_id?: string | null
          updated_at?: string | null
        }
        Update: {
          aproveitamento?: number | null
          aulas_assistidas?: number | null
          certificado_disponivel?: boolean | null
          created_at?: string | null
          data_matricula?: string | null
          data_nascimento?: string
          endereco_bairro?: string | null
          endereco_cep?: string | null
          endereco_cidade?: string | null
          endereco_estado?: string | null
          endereco_numero?: string | null
          endereco_rua?: string | null
          id?: string
          observacoes?: string | null
          presenca_geral?: number | null
          profile_id?: string
          progresso?: number | null
          status?: Database["public"]["Enums"]["student_status"]
          turma_id?: string | null
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "students_profile_id_fkey"
            columns: ["profile_id"]
            isOneToOne: true
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "students_turma_id_fkey"
            columns: ["turma_id"]
            isOneToOne: false
            referencedRelation: "turmas"
            referencedColumns: ["id"]
          },
        ]
      }
      turmas: {
        Row: {
          course_id: string
          created_at: string | null
          data_fim: string
          data_inicio: string
          horario_fim: string | null
          horario_inicio: string | null
          id: string
          instructor_id: string | null
          max_alunos: number
          nome: string
          status: Database["public"]["Enums"]["status_type"]
          updated_at: string | null
        }
        Insert: {
          course_id: string
          created_at?: string | null
          data_fim: string
          data_inicio: string
          horario_fim?: string | null
          horario_inicio?: string | null
          id?: string
          instructor_id?: string | null
          max_alunos?: number
          nome: string
          status?: Database["public"]["Enums"]["status_type"]
          updated_at?: string | null
        }
        Update: {
          course_id?: string
          created_at?: string | null
          data_fim?: string
          data_inicio?: string
          horario_fim?: string | null
          horario_inicio?: string | null
          id?: string
          instructor_id?: string | null
          max_alunos?: number
          nome?: string
          status?: Database["public"]["Enums"]["status_type"]
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "turmas_course_id_fkey"
            columns: ["course_id"]
            isOneToOne: false
            referencedRelation: "courses"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "turmas_instructor_id_fkey"
            columns: ["instructor_id"]
            isOneToOne: false
            referencedRelation: "instructors"
            referencedColumns: ["id"]
          },
        ]
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      get_student_turma_id: {
        Args: { user_id: string }
        Returns: string
      }
      get_user_role: {
        Args: { user_id: string }
        Returns: Database["public"]["Enums"]["user_role"]
      }
      is_admin: {
        Args: { user_id?: string }
        Returns: boolean
      }
      is_instructor: {
        Args: { user_id?: string }
        Returns: boolean
      }
      is_student: {
        Args: { user_id?: string }
        Returns: boolean
      }
    }
    Enums: {
      aula_status: "agendada" | "em_andamento" | "finalizada" | "cancelada"
      material_type: "pdf" | "video" | "link" | "documento" | "imagem"
      notification_type: "info" | "warning" | "success" | "error"
      status_type:
        | "ativo"
        | "inativo"
        | "pendente"
        | "finalizado"
        | "cancelado"
        | "planejado"
      student_status: "ativo" | "pendente" | "formado" | "inativo"
      user_role: "admin" | "instructor" | "student"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DefaultSchema = Database[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof (Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        Database[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? (Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      Database[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof Database },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof Database },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends { schema: keyof Database }
  ? Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {
      aula_status: ["agendada", "em_andamento", "finalizada", "cancelada"],
      material_type: ["pdf", "video", "link", "documento", "imagem"],
      notification_type: ["info", "warning", "success", "error"],
      status_type: [
        "ativo",
        "inativo",
        "pendente",
        "finalizado",
        "cancelado",
        "planejado",
      ],
      student_status: ["ativo", "pendente", "formado", "inativo"],
      user_role: ["admin", "instructor", "student"],
    },
  },
} as const
