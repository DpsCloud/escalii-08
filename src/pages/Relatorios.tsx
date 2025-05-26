
import { useState } from 'react';
import { Sidebar } from '@/components/Sidebar';
import { Header } from '@/components/Header';
import { useIsMobile } from '@/hooks/use-mobile';
import { useAuth } from '@/contexts/AuthContext';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Download, FileText, Users, Calendar, TrendingUp } from 'lucide-react';

const Relatorios = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [selectedCourse, setSelectedCourse] = useState('escali-2025-1');
  const [selectedClass, setSelectedClass] = useState('aula-5');
  const isMobile = useIsMobile();
  const { isAdmin } = useAuth();

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  // Mock data
  const presencaAula = [
    { nome: 'João Silva', status: 'presente', horario: '19:30' },
    { nome: 'Maria Santos', status: 'presente', horario: '19:35' },
    { nome: 'Pedro Costa', status: 'ausente', horario: '-' },
    { nome: 'Ana Oliveira', status: 'presente', horario: '19:28' },
  ];

  const relatorioanual = {
    totalAlunos: 156,
    alunosFormados: 89,
    mediaPresenca: 87,
    cursosConcluidos: 3,
    proximasFormaturas: 1
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
    <div className="min-h-screen bg-muted flex">
      <Sidebar isOpen={sidebarOpen} toggleSidebar={toggleSidebar} />

      <div className={`flex-1 flex flex-col transition-all duration-300 ${isMobile ? 'w-full' : (sidebarOpen ? 'ml-64' : 'ml-[70px]')}`}>
        <Header toggleSidebar={toggleSidebar} />

        <main className="flex-1 overflow-y-auto p-4 md:p-6">
          <div className="mb-6 sm:mb-8">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
              <div>
                <h1 className="text-xl sm:text-2xl font-bold text-gray-800 mb-1">Relatórios</h1>
                <p className="text-sm sm:text-base text-gray-600">Acompanhe informações detalhadas sobre alunos e cursos</p>
              </div>
              
              <Button className="flex items-center gap-2">
                <Download className="h-4 w-4" />
                Exportar Relatório
              </Button>
            </div>
          </div>

          <Tabs defaultValue="presenca" className="space-y-6">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="presenca">Presença</TabsTrigger>
              <TabsTrigger value="alunos">Informações de Alunos</TabsTrigger>
              <TabsTrigger value="anual">Relatório Anual</TabsTrigger>
            </TabsList>

            {/* Aba de Presença */}
            <TabsContent value="presenca">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Calendar className="h-5 w-5" />
                    Relatório de Presença
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                    <div>
                      <label className="block text-sm font-medium mb-2">Curso</label>
                      <Select value={selectedCourse} onValueChange={setSelectedCourse}>
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="escali-2025-1">ESCALI 2025.1</SelectItem>
                          <SelectItem value="escali-2024-2">ESCALI 2024.2</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-2">Aula</label>
                      <Select value={selectedClass} onValueChange={setSelectedClass}>
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="aula-5">Aula 5: Honra e Lealdade</SelectItem>
                          <SelectItem value="aula-4">Aula 4: O DNA de Cristo</SelectItem>
                          <SelectItem value="aula-3">Aula 3: Ouvir, Confiar e Obedecer</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                    <Card>
                      <CardContent className="p-4">
                        <div className="text-2xl font-bold text-green-600">32</div>
                        <p className="text-sm text-gray-600">Presentes</p>
                      </CardContent>
                    </Card>
                    <Card>
                      <CardContent className="p-4">
                        <div className="text-2xl font-bold text-red-600">3</div>
                        <p className="text-sm text-gray-600">Ausentes</p>
                      </CardContent>
                    </Card>
                    <Card>
                      <CardContent className="p-4">
                        <div className="text-2xl font-bold text-blue-600">91%</div>
                        <p className="text-sm text-gray-600">Taxa de Presença</p>
                      </CardContent>
                    </Card>
                  </div>

                  <div className="overflow-x-auto">
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Nome do Aluno</TableHead>
                          <TableHead>Status</TableHead>
                          <TableHead>Horário de Chegada</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {presencaAula.map((aluno, index) => (
                          <TableRow key={index}>
                            <TableCell className="font-medium">{aluno.nome}</TableCell>
                            <TableCell>
                              <Badge variant={aluno.status === 'presente' ? 'default' : 'destructive'}>
                                {aluno.status === 'presente' ? 'Presente' : 'Ausente'}
                              </Badge>
                            </TableCell>
                            <TableCell>{aluno.horario}</TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Aba de Informações de Alunos */}
            <TabsContent value="alunos">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Users className="h-5 w-5" />
                    Informações Detalhadas dos Alunos
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="mb-4">
                    <Input placeholder="Buscar aluno..." className="max-w-sm" />
                  </div>
                  
                  <div className="overflow-x-auto">
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Nome</TableHead>
                          <TableHead>Curso</TableHead>
                          <TableHead>Presença</TableHead>
                          <TableHead>Progresso</TableHead>
                          <TableHead>Status</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        <TableRow>
                          <TableCell className="font-medium">João Silva</TableCell>
                          <TableCell>ESCALI 2025.1</TableCell>
                          <TableCell>100%</TableCell>
                          <TableCell>62%</TableCell>
                          <TableCell>
                            <Badge>Ativo</Badge>
                          </TableCell>
                        </TableRow>
                        <TableRow>
                          <TableCell className="font-medium">Maria Santos</TableCell>
                          <TableCell>ESCALI 2025.1</TableCell>
                          <TableCell>95%</TableCell>
                          <TableCell>62%</TableCell>
                          <TableCell>
                            <Badge>Ativo</Badge>
                          </TableCell>
                        </TableRow>
                      </TableBody>
                    </Table>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Aba de Relatório Anual */}
            <TabsContent value="anual">
              <div className="grid gap-6">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                  <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                      <CardTitle className="text-sm font-medium">Total de Alunos</CardTitle>
                      <Users className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                      <div className="text-2xl font-bold">{relatorioanual.totalAlunos}</div>
                      <p className="text-xs text-muted-foreground">
                        Cadastrados em 2024
                      </p>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                      <CardTitle className="text-sm font-medium">Alunos Formados</CardTitle>
                      <TrendingUp className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                      <div className="text-2xl font-bold">{relatorioanual.alunosFormados}</div>
                      <p className="text-xs text-muted-foreground">
                        {Math.round((relatorioanual.alunosFormados / relatorioanual.totalAlunos) * 100)}% taxa de conclusão
                      </p>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                      <CardTitle className="text-sm font-medium">Média de Presença</CardTitle>
                      <Calendar className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                      <div className="text-2xl font-bold">{relatorioanual.mediaPresenca}%</div>
                      <p className="text-xs text-muted-foreground">
                        Todas as turmas
                      </p>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                      <CardTitle className="text-sm font-medium">Cursos Concluídos</CardTitle>
                      <FileText className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                      <div className="text-2xl font-bold">{relatorioanual.cursosConcluidos}</div>
                      <p className="text-xs text-muted-foreground">
                        Em 2024
                      </p>
                    </CardContent>
                  </Card>
                </div>

                <Card>
                  <CardHeader>
                    <CardTitle>Evolução Anual</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-center py-8 text-gray-500">
                      <p>Gráfico de evolução anual será implementado aqui</p>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
          </Tabs>
        </main>
      </div>
    </div>
  );
};

export default Relatorios;
