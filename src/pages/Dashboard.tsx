
import { useState } from 'react';
import { Sidebar } from '@/components/Sidebar';
import { Header } from '@/components/Header';
import { useIsMobile } from '@/hooks/use-mobile';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Users, BookOpen, Calendar, GraduationCap, TrendingUp, CheckCircle, UserCheck, Download, MessageSquare, Cake } from 'lucide-react';

const Dashboard = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const isMobile = useIsMobile();
  const { isAdmin } = useAuth();

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  // Mock data para o dashboard do administrador
  const dashboardData = {
    visaoGeral: {
      alunosCadastrados: 156,
      professoresAtivos: 8,
      turmasAtivas: 3,
      turmasInativas: 2
    },
    engajamento: {
      downloadsMateriais: 342,
      comentariosPorAula: 128
    },
    aniversariantes: [
      { nome: 'João Silva', data: '15 Jun' },
      { nome: 'Maria Santos', data: '18 Jun' },
      { nome: 'Pedro Costa', data: '22 Jun' }
    ]
  };

  const cards = [
    {
      title: "Alunos Cadastrados",
      value: dashboardData.visaoGeral.alunosCadastrados.toString(),
      description: "Total de alunos no sistema",
      icon: <Users className="h-4 w-4 text-muted-foreground" />,
      color: "text-blue-600"
    },
    {
      title: "Professores Ativos",
      value: dashboardData.visaoGeral.professoresAtivos.toString(),
      description: "Professores em atividade",
      icon: <UserCheck className="h-4 w-4 text-muted-foreground" />,
      color: "text-green-600"
    },
    {
      title: "Turmas Ativas",
      value: dashboardData.visaoGeral.turmasAtivas.toString(),
      description: `${dashboardData.visaoGeral.turmasInativas} turmas inativas`,
      icon: <BookOpen className="h-4 w-4 text-muted-foreground" />,
      color: "text-purple-600"
    },
    {
      title: "Downloads Materiais",
      value: dashboardData.engajamento.downloadsMateriais.toString(),
      description: "Este mês",
      icon: <Download className="h-4 w-4 text-muted-foreground" />,
      color: "text-orange-600"
    }
  ];

  const turmasStatus = [
    { nome: 'ESCALI 2025.1', status: 'ativa', alunos: 35, aulas: 6 },
    { nome: 'ESCALI 2025.2', status: 'planejada', alunos: 0, aulas: 0 },
    { nome: 'Revalidação 2025.1', status: 'ativa', alunos: 12, aulas: 2 },
    { nome: 'ESCALI 2024.2', status: 'finalizada', alunos: 28, aulas: 8 }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'ativa': return 'bg-green-100 text-green-800';
      case 'planejada': return 'bg-blue-100 text-blue-800';
      case 'finalizada': return 'bg-gray-100 text-gray-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  if (!isAdmin) {
    return (
      <div className="min-h-screen bg-muted flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-800 mb-4">Acesso Negado</h1>
          <p className="text-gray-600">Você não tem permissão para acessar esta página.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-muted flex max-w-full">
      <Sidebar isOpen={sidebarOpen} toggleSidebar={toggleSidebar} />
      
      <div className={`flex-1 flex flex-col min-w-0 transition-all duration-300 ${
        isMobile ? 'w-full' : (sidebarOpen ? 'ml-64' : 'ml-[70px]')
      }`}>
        <Header toggleSidebar={toggleSidebar} />
        
        <main className="flex-1 overflow-y-auto p-4 md:p-6">
          <div className="max-w-7xl mx-auto space-y-6 w-full">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
              <div>
                <h1 className="text-xl sm:text-2xl font-bold text-gray-800 mb-1">Dashboard Administrativo</h1>
                <p className="text-sm sm:text-base text-gray-600">Visão geral do sistema ESCALI</p>
              </div>
              <Button>
                <Calendar className="h-4 w-4 mr-2" />
                Ver Relatórios Completos
              </Button>
            </div>

            {/* Cards de métricas principais */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {cards.map((card, index) => (
                <Card key={index} className="w-full">
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">{card.title}</CardTitle>
                    {card.icon}
                  </CardHeader>
                  <CardContent>
                    <div className={`text-2xl font-bold ${card.color}`}>{card.value}</div>
                    <p className="text-xs text-muted-foreground">{card.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Status das Turmas */}
              <Card className="lg:col-span-2">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle>Status das Turmas</CardTitle>
                    <Button variant="outline" size="sm">Gerenciar</Button>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {turmasStatus.map((turma, index) => (
                      <div key={index} className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
                        <div className="flex-1">
                          <h4 className="text-sm font-medium">{turma.nome}</h4>
                          <p className="text-xs text-muted-foreground">
                            {turma.alunos} alunos • {turma.aulas} aulas
                          </p>
                        </div>
                        <Badge className={getStatusColor(turma.status)}>
                          {turma.status}
                        </Badge>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Aniversariantes */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Cake className="h-4 w-4" />
                    Aniversariantes
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {dashboardData.aniversariantes.map((aniversariante, index) => (
                      <div key={index} className="flex items-center justify-between">
                        <span className="text-sm font-medium">{aniversariante.nome}</span>
                        <span className="text-xs text-muted-foreground">{aniversariante.data}</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Engajamento e Atividades Recentes */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Métricas de Engajamento</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Download className="h-4 w-4 text-blue-600" />
                        <span className="text-sm">Downloads de Materiais</span>
                      </div>
                      <span className="font-bold text-blue-600">{dashboardData.engajamento.downloadsMateriais}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <MessageSquare className="h-4 w-4 text-green-600" />
                        <span className="text-sm">Comentários por Aula</span>
                      </div>
                      <span className="font-bold text-green-600">{dashboardData.engajamento.comentariosPorAula}</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Ações Rápidas</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <Button className="w-full justify-start" variant="outline">
                      <Users className="h-4 w-4 mr-2" />
                      Cadastrar Novo Aluno
                    </Button>
                    <Button className="w-full justify-start" variant="outline">
                      <BookOpen className="h-4 w-4 mr-2" />
                      Criar Nova Turma
                    </Button>
                    <Button className="w-full justify-start" variant="outline">
                      <Calendar className="h-4 w-4 mr-2" />
                      Agendar Aula
                    </Button>
                    <Button className="w-full justify-start" variant="outline">
                      <TrendingUp className="h-4 w-4 mr-2" />
                      Gerar Relatório
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Dashboard;
