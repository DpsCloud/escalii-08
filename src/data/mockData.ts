
// Mock data centralizado para todo o aplicativo
export const mockCourse = {
  id: 'escali-2025-1',
  nome: 'ESCALI Capacitação de Líderes - Turma 2025.1',
  periodo: '2025.1',
  dataInicio: '2025-05-01',
  dataFim: '2025-07-30',
  totalAulas: 8,
  aulasRealizadas: 5,
  progresso: 62,
  status: 'Em andamento'
};

export const mockAulas = [
  {
    id: 1,
    numero: 1,
    titulo: 'Comunicação',
    data: '2025-05-08',
    horario: '19:30 - 21:30',
    status: 'Concluída',
    presente: true,
    materiais: [
      { id: 1, nome: 'Aula 1 - Comunicação.pdf', tipo: 'pdf', url: '#' }
    ],
    videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ'
  },
  {
    id: 2,
    numero: 2,
    titulo: 'Atributos da Liderança',
    data: '2025-05-15',
    horario: '19:30 - 21:30',
    status: 'Concluída',
    presente: true,
    materiais: [
      { id: 2, nome: 'Aula 2 - Atributos da Liderança.pdf', tipo: 'pdf', url: '#' }
    ],
    videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ'
  },
  {
    id: 3,
    numero: 3,
    titulo: 'Ouvir, Confiar e Obedecer',
    data: '2025-05-22',
    horario: '19:30 - 21:30',
    status: 'Concluída',
    presente: true,
    materiais: [
      { id: 3, nome: 'Aula 3 - Ouvir, Confiar e Obedecer.pdf', tipo: 'pdf', url: '#' }
    ],
    videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ'
  },
  {
    id: 4,
    numero: 4,
    titulo: 'O DNA de Cristo',
    data: '2025-05-29',
    horario: '19:30 - 21:30',
    status: 'Concluída',
    presente: true,
    materiais: [
      { id: 4, nome: 'Aula 4 - O DNA de Cristo.pdf', tipo: 'pdf', url: '#' }
    ],
    videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ'
  },
  {
    id: 5,
    numero: 5,
    titulo: 'Honra e Lealdade',
    data: '2025-06-05',
    horario: '19:30 - 21:30',
    status: 'Concluída',
    presente: true,
    materiais: [
      { id: 5, nome: 'Aula 5 - Honra e Lealdade.pdf', tipo: 'pdf', url: '#' }
    ],
    videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ'
  },
  {
    id: 6,
    numero: 6,
    titulo: '9 Dimensões da Imaturidade',
    data: '2025-06-12',
    horario: '19:30 - 21:30',
    status: 'Próxima',
    presente: false,
    materiais: [
      { id: 6, nome: 'Aula 6 - 9 Dimensões da Imaturidade.pdf', tipo: 'pdf', url: '#' }
    ],
    videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ'
  },
  {
    id: 7,
    numero: 7,
    titulo: 'Propósito da Mesa',
    data: '2025-06-19',
    horario: '19:30 - 21:30',
    status: 'Agendada',
    presente: false,
    materiais: [
      { id: 7, nome: 'Aula 7 - Propósito da Mesa.pdf', tipo: 'pdf', url: '#' }
    ],
    videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ'
  },
  {
    id: 8,
    numero: 8,
    titulo: '8 Características de um Líder',
    data: '2025-06-26',
    horario: '19:30 - 21:30',
    status: 'Agendada',
    presente: false,
    materiais: [
      { id: 8, nome: 'Aula 8 - 8 Características de um Líder.pdf', tipo: 'pdf', url: '#' }
    ],
    videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ'
  }
];

export const mockAluno = {
  id: '1',
  nome: 'João Silva',
  email: 'joao.silva@email.com',
  telefone: '(11) 99999-9999',
  cursoId: 'escali-2025-1',
  presencaGeral: 100,
  aulasAssistidas: 5,
  aproveitamento: 92,
  certificadoDisponivel: false
};

export const mockMateriais = mockAulas.flatMap(aula => 
  aula.materiais.map(material => ({
    ...material,
    aulaId: aula.id,
    aulaNumero: aula.numero,
    aulaTitulo: aula.titulo
  }))
);

export const mockNotificacoes = [
  {
    id: 1,
    titulo: 'Nova aula disponível',
    descricao: 'Aula 6 - 9 Dimensões da Imaturidade foi adicionada',
    data: '2025-06-10',
    lida: false,
    tipo: 'aula'
  },
  {
    id: 2,
    titulo: 'Material adicionado',
    descricao: 'PDF da Aula 5 foi disponibilizado',
    data: '2025-06-08',
    lida: false,
    tipo: 'material'
  },
  {
    id: 3,
    titulo: 'Lembrete de aula',
    descricao: 'Próxima aula amanhã às 19:30h',
    data: '2025-06-11',
    lida: true,
    tipo: 'lembrete'
  }
];

// Dados administrativos para o dashboard admin
export const mockDashboardAdmin = {
  totalAlunos: 156,
  totalCursos: 4,
  turmasAtivas: 2,
  proximasFormaturas: 1,
  presencaMedia: 87,
  aproveitamento: 92,
  cursosRecentes: [
    {
      nome: 'ESCALI 2025.1',
      alunos: 35,
      status: 'Em andamento',
      progresso: 62
    },
    {
      nome: 'ESCALI 2024.2',
      alunos: 48,
      status: 'Finalizado',
      progresso: 100
    }
  ]
};
