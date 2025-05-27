import { useState } from 'react';
import { Sidebar } from '@/components/Sidebar';
import { Header } from '@/components/Header';
import { useIsMobile } from '@/hooks/use-mobile';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Users, BookOpen, Calendar, GraduationCap, TrendingUp, CheckCircle } from 'lucide-react';

const Dashboard = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const isMobile = useIsMobile();
  const { isAdmin } = useAuth();

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  const cards = [
    {
      title: "Progresso do Curso",
      value: "62%",
      description: "5/8 Aulas",
      icon: <TrendingUp className="h-4 w-4 text-muted-foreground" />
    },
    {
      title: "Presença",
      value: "100%",
      description: "5 aulas assistidas",
      icon: <CheckCircle className="h-4 w-4 text-muted-foreground" />
    },
    {
      title: "Próxima Aula",
      value: "Aula 6",
      description: "9 Dimensões da Imaturidade",
      icon: <Calendar className="h-4 w-4 text-muted-foreground" />
    },
    {
      title: "Certificado",
      value: "Em andamento",
      description: "3 aulas restantes",
      icon: <GraduationCap className="h-4 w-4 text-muted-foreground" />
    }
  ];

  const aulas = [
    {
      data: "JUN 15",
      hora: "19:30",
      titulo: "9 Dimensões da Imaturidade",
      numero: 6
    },
    {
      data: "JUN 22",
      hora: "19:30",
      titulo: "Propósito da Mesa",
      numero: 7
    }
  ];

  const modulos = [
    { nome: "Módulo 1: Fundamentos", progresso: 100 },
    { nome: "Módulo 2: Liderança", progresso: 75 },
    { nome: "Módulo 3: Comunicação", progresso: 40 },
    { nome: "Módulo 4: Gestão", progresso: 0 }
  ];

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
        
        <main className="flex-1 overflow-y-auto p-0 sm:p-4 md:p-6">
          <div className="max-w-7xl mx-auto px-4 space-y-6 w-full">
            <div>
              <h1 className="text-xl sm:text-2xl font-bold text-gray-800 mb-1">Dashboard</h1>
              <p className="text-sm sm:text-base text-gray-600">Bem-vindo ao seu dashboard do curso ESCALI</p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {cards.map((card, index) => (
                <Card key={index} className="w-full min-w-[200px]">
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">{card.title}</CardTitle>
                    {card.icon}
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">{card.value}</div>
                    <p className="text-xs text-muted-foreground">{card.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
              <Card className="w-full min-w-[300px]">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle>Próximas Aulas</CardTitle>
                    <Button variant="outline" size="sm">Ver todas</Button>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {aulas.map((aula, index) => (
                      <div key={index} className="flex items-center space-x-4 p-3 bg-muted/50 rounded-lg">
                        <div className="flex-shrink-0 w-16 text-center">
                          <div className="text-sm font-semibold">{aula.data}</div>
                          <div className="text-xs text-muted-foreground">{aula.hora}</div>
                        </div>
                        <div className="flex-1 min-w-0">
                          <h4 className="text-sm font-medium truncate">{aula.titulo}</h4>
                          <p className="text-xs text-muted-foreground">Aula {aula.numero}</p>
                        </div>
                        <Button variant="outline" size="sm" className="flex-shrink-0">
                          Detalhes
                        </Button>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card className="w-full min-w-[300px]">
                <CardHeader>
                  <CardTitle>Progresso do Curso</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {modulos.map((modulo, index) => (
                      <div key={index} className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span className="font-medium text-gray-700 truncate pr-2">{modulo.nome}</span>
                          <span className="font-medium whitespace-nowrap">{modulo.progresso}%</span>
                        </div>
                        <div className="w-full bg-muted rounded-full h-2">
                          <div
                            className="bg-primary h-2 rounded-full transition-all"
                            style={{ width: `${modulo.progresso}%` }}
                          />
                        </div>
                      </div>
                    ))}
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
