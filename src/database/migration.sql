
-- Script SQL preparado para migração Supabase
-- Execute este script no SQL Editor do Supabase após conectar a integração

-- Tabela de usuários (extends auth.users do Supabase)
CREATE TABLE public.users (
  id UUID REFERENCES auth.users(id) PRIMARY KEY,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  email TEXT NOT NULL,
  nome TEXT,
  role TEXT CHECK (role IN ('admin', 'user')) DEFAULT 'user',
  ativo BOOLEAN DEFAULT true,
  ultimo_acesso TIMESTAMP WITH TIME ZONE
);

-- Tabela de cursos
CREATE TABLE public.courses (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  nome TEXT NOT NULL,
  descricao TEXT,
  data_inicio DATE NOT NULL,
  data_fim DATE NOT NULL,
  dias_semana TEXT[] DEFAULT '{}',
  carga_horaria INTEGER NOT NULL DEFAULT 0,
  total_aulas INTEGER NOT NULL DEFAULT 0,
  status TEXT CHECK (status IN ('ativo', 'planejado', 'finalizado', 'cancelado')) DEFAULT 'planejado',
  instrutor TEXT,
  aulas_selecionadas TEXT[] DEFAULT '{}'
);

-- Tabela de aulas
CREATE TABLE public.aulas (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  titulo TEXT NOT NULL,
  descricao TEXT,
  data DATE NOT NULL,
  horario_inicio TIME NOT NULL,
  horario_fim TIME NOT NULL,
  duracao INTEGER NOT NULL DEFAULT 0,
  status TEXT CHECK (status IN ('agendada', 'em_andamento', 'finalizada', 'cancelada')) DEFAULT 'agendada',
  instrutor TEXT,
  categoria TEXT NOT NULL,
  material_url TEXT,
  video_url TEXT,
  observacoes TEXT
);

-- Tabela de alunos
CREATE TABLE public.students (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  nome TEXT NOT NULL,
  cpf TEXT UNIQUE NOT NULL,
  telefone TEXT NOT NULL,
  email TEXT UNIQUE NOT NULL,
  data_nascimento DATE NOT NULL,
  endereco_rua TEXT,
  endereco_numero TEXT,
  endereco_bairro TEXT,
  endereco_cidade TEXT,
  endereco_cep TEXT,
  endereco_estado TEXT,
  curso_id UUID REFERENCES public.courses(id),
  turma_id UUID, -- Para futura implementação de turmas
  progresso INTEGER DEFAULT 0 CHECK (progresso >= 0 AND progresso <= 100),
  status TEXT CHECK (status IN ('ativo', 'pendente', 'formado', 'inativo')) DEFAULT 'pendente',
  foto TEXT,
  data_matricula DATE DEFAULT CURRENT_DATE,
  presenca_geral INTEGER DEFAULT 0 CHECK (presenca_geral >= 0 AND presenca_geral <= 100),
  aulas_assistidas INTEGER DEFAULT 0,
  aproveitamento INTEGER DEFAULT 0 CHECK (aproveitamento >= 0 AND aproveitamento <= 100),
  certificado_disponivel BOOLEAN DEFAULT false,
  observacoes TEXT
);

-- Tabela de presenças
CREATE TABLE public.presencas (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  student_id UUID REFERENCES public.students(id) ON DELETE CASCADE,
  aula_id UUID REFERENCES public.aulas(id) ON DELETE CASCADE,
  presente BOOLEAN NOT NULL,
  data_presenca DATE DEFAULT CURRENT_DATE,
  observacoes TEXT,
  UNIQUE(student_id, aula_id)
);

-- Índices para melhor performance
CREATE INDEX idx_students_cpf ON public.students(cpf);
CREATE INDEX idx_students_email ON public.students(email);
CREATE INDEX idx_students_status ON public.students(status);
CREATE INDEX idx_students_curso_id ON public.students(curso_id);
CREATE INDEX idx_presencas_student_id ON public.presencas(student_id);
CREATE INDEX idx_presencas_aula_id ON public.presencas(aula_id);
CREATE INDEX idx_aulas_data ON public.aulas(data);
CREATE INDEX idx_courses_status ON public.courses(status);

-- Triggers para updated_at
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

CREATE TRIGGER update_users_updated_at BEFORE UPDATE ON public.users
FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_courses_updated_at BEFORE UPDATE ON public.courses
FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_aulas_updated_at BEFORE UPDATE ON public.aulas
FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_students_updated_at BEFORE UPDATE ON public.students
FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- RLS (Row Level Security) policies
ALTER TABLE public.users ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.courses ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.aulas ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.students ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.presencas ENABLE ROW LEVEL SECURITY;

-- Policies básicas (ajustar conforme necessário)
-- Admins podem ver/editar tudo
CREATE POLICY "Admins can do everything" ON public.users
FOR ALL USING (
  EXISTS (
    SELECT 1 FROM public.users 
    WHERE id = auth.uid() AND role = 'admin'
  )
);

CREATE POLICY "Admins can do everything on courses" ON public.courses
FOR ALL USING (
  EXISTS (
    SELECT 1 FROM public.users 
    WHERE id = auth.uid() AND role = 'admin'
  )
);

CREATE POLICY "Admins can do everything on aulas" ON public.aulas
FOR ALL USING (
  EXISTS (
    SELECT 1 FROM public.users 
    WHERE id = auth.uid() AND role = 'admin'
  )
);

CREATE POLICY "Admins can do everything on students" ON public.students
FOR ALL USING (
  EXISTS (
    SELECT 1 FROM public.users 
    WHERE id = auth.uid() AND role = 'admin'
  )
);

CREATE POLICY "Admins can do everything on presencas" ON public.presencas
FOR ALL USING (
  EXISTS (
    SELECT 1 FROM public.users 
    WHERE id = auth.uid() AND role = 'admin'
  )
);

-- Usuários podem ver seus próprios dados
CREATE POLICY "Users can view their own data" ON public.users
FOR SELECT USING (id = auth.uid());

-- Usuários podem ver cursos e aulas públicas
CREATE POLICY "Users can view courses" ON public.courses
FOR SELECT USING (status = 'ativo');

CREATE POLICY "Users can view aulas" ON public.aulas
FOR SELECT USING (true);

-- Comentários para documentar a estrutura
COMMENT ON TABLE public.users IS 'Usuários do sistema (admins e alunos)';
COMMENT ON TABLE public.courses IS 'Cursos oferecidos';
COMMENT ON TABLE public.aulas IS 'Aulas individuais';
COMMENT ON TABLE public.students IS 'Dados dos alunos matriculados';
COMMENT ON TABLE public.presencas IS 'Registro de presença dos alunos nas aulas';
