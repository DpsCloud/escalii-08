
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
import { Download, FileText, Users, Calendar, TrendingUp, UserCheck, MessageSquare, CheckCircle, XCircle, Cake } from 'lucide-react';

const Relatorios = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [selectedCourse, setSelectedCourse] = useState('escali-2025-1');
  const [selectedClass, setSelectedClass] = useState('aula-5');
  const [selectedPeriod, setSelectedPeriod] = useState('junho-2025');
  const isMobile = useIsMobile();
  const { isAdmin } = useAuth();

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  // Mock data mais completo para os relatórios
  const relatoriosData = {
    presenca: {
      aula5: [
        { nome: 'João Silva', status: 'presente', horario: '19:30', faltas: 0 },
        { nome: 'Maria Santos', status: 'presente', horario: '19:35', faltas: 1 },
        { nome: 'Pedro Costa', status: 'ausente', horario: '-', faltas: 3 },
        { nome: 'Ana Oliveira', status: 'presente', horario: '19:28', faltas: 0 },
        { nome: 'Carlos Mendes', status: 'presente', horario: '19:32', faltas: 2 },
        { nome: 'Lucia Ferreira', status: 'ausente', horario: '-', faltas: 4 }
      ]
    },
    engajamento: {
      downloads: [
        { material: 'Apostila Módulo 1', downloads: 45, aula: 'Aula 1' },
        { material: 'Slides Liderança', downloads: 38, aula: 'Aula 3' },
        { material: 'Exercícios Práticos', downloads: 52, aula: 'Aula 5' },
        { material: 'Material Complementar', downloads: 23, aula: 'Aula 2' }
      ],
      comentarios: [
        { aula: 'Aula 1: Fundamentos', comentarios: 15 },
        { aula: 'Aula 2: Propósito', comentarios: 22 },
        { aula: 'Aula 3: Liderança', comentarios: 18 },
        { aula: 'Aula 4: DNA de Cristo', comentarios: 31 },
        { aula: 'Aula 5: Honra e Lealdade', comentarios: 25 }
      ]
    },
    aniversariantes: [
      { nome: 'João Silva', data: '15/06/2025', turma: 'ESCALI 2025.1', telefone: '(11) 99999-9999' },
      { nome: 'Maria Santos', data: '18/06/2025', turma: 'ESCALI 2025.1', telefone: '(11) 88888-8888' },
      { nome: 'Pedro Costa', data: '22/06/2025', turma: 'Revalidação 2025.1', telefone: '(11) 77777-7777' },
      { nome: 'Ana Oliveira', data: '25/06/2025', turma: 'ESCALI 2025.1', telefone: '(11) 66666-6666' }
    ],
    historico: [
      {
        nome: 'João Silva',
        contato: '(11) 99999-9999',
        email: 'joao@email.com',
        turmaAtual: 'ESCALI 2025.1',
        turmasAnteriores: ['ESCALI 2023.1'],
        totalFaltas: 0,
        certificado: 'Em andamento'
      },
      {
        nome: 'Maria Santos',
        contato: '(11) 88888-8888',
        email: 'maria@email.com',
        turmaAtual: 'ESCALI 2025.1',
        turmasAnteriores: [],
        totalFaltas: 1,
        certificado: 'Em andamento'
      },
      {
        nome: 'Carlos Mendes',
        contato: '(11) 77777-7777',
        email: 'carlos@email.com',
        turmaAtual: '-',
        turmasAnteriores: ['ESCALI 2024.1', 'ESCALI 2024.2'],
        totalFaltas: 2,
        certificado: 'Concluído'
      }
    ]
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
                <h1 className="text-xl sm:text-2xl font-bold text-gray-800 mb-1">Relatórios Administrativos</h1>
                <p className="text-sm sm:text-base text-gray-600">Acompanhe todas as métricas e informações detalhadas</p>
              </div>
              
              <Button className="flex items-center gap-2">
                <Download className="h-4 w-4" />
                Exportar Relatório
              </Button>
            </div>
          </div>

          <Tabs defaultValue="presenca" className="space-y-6">
            <TabsList className="grid w-full grid-cols-2 lg:grid-cols-5">
              <TabsTrigger value="presenca">Presença</TabsTrigger>
              <TabsTrigger value="engajamento">Engajamento</TabsTrigger>
              <TabsTrigger value="aniversariantes">Aniversariantes</TabsTrigger>
              <TabsTrigger value="historico">Histórico</TabsTrigger>
              <TabsTrigger value="geral">Visão Geral</TabsTrigger>
            </TabsList>

            {/* Aba de Presença e Faltas */}
            <TabsContent value="presenca">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Calendar className="h-5 w-5" />
                    Relatório de Presença e Faltas
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
                          <SelectItem value="revalidacao-2025-1">Revalidação 2025.1</SelectItem>
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
                          <SelectItem value="aula-3">Aula 3: Liderança</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
                    <Card>
                      <CardContent className="p-4">
                        <div className="text-2xl font-bold text-green-600">4</div>
                        <p className="text-sm text-gray-600">Presentes</p>
                      </CardContent>
                    </Card>
                    <Card>
                      <CardContent className="p-4">
                        <div className="text-2xl font-bold text-red-600">2</div>
                        <p className="text-sm text-gray-600">Ausentes</p>
                      </CardContent>
                    </Card>
                    <Card>
                      <CardContent className="p-4">
                        <div className="text-2xl font-bold text-blue-600">67%</div>
                        <p className="text-sm text-gray-600">Taxa de Presença</p>
                      </CardContent>
                    </Card>
                    <Card>
                      <CardContent className="p-4">
                        <div className="text-2xl font-bold text-orange-600">10</div>
                        <p className="text-sm text-gray-600">Total de Faltas</p>
                      </CardContent>
                    </Card>
                  </div>

                  <div className="overflow-x-auto">
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Nome do Aluno</TableHead>
                          <TableHead>Status</TableHead>
                          <TableHead>Horário</TableHead>
                          <TableHead>Total Faltas</TableHead>
                          <TableHead>Ações</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {relatoriosData.presenca.aula5.map((aluno, index) => (
                          <TableRow key={index}>
                            <TableCell className="font-medium">{aluno.nome}</TableCell>
                            <TableCell>
                              <Badge variant={aluno.status === 'presente' ? 'default' : 'destructive'}>
                                {aluno.status === 'presente' ? 'Presente' : 'Ausente'}
                              </Badge>
                            </TableCell>
                            <TableCell>{aluno.horario}</TableCell>
                            <TableCell>
                              <span className={aluno.faltas > 2 ? 'text-red-600 font-bold' : 'text-gray-600'}>
                                {aluno.faltas}
                              </span>
                            </TableCell>
                            <TableCell>
                              {aluno.status === 'ausente' && (
                                <Button variant="outline" size="sm">
                                  Abonar Falta
                                </Button>
                              )}
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Aba de Engajamento */}
            <TabsContent value="engajamento">
              <div className="grid gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Download className="h-5 w-5" />
                      Downloads de Materiais
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="overflow-x-auto">
                      <Table>
                        <TableHeader>
                          <TableRow>
                            <TableHead>Material</TableHead>
                            <TableHead>Aula</TableHead>
                            <TableHead>Downloads</TableHead>
                            <TableHead>% Engajamento</TableHead>
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          {relatoriosData.engajamento.downloads.map((item, index) => (
                            <TableRow key={index}>
                              <TableCell className="font-medium">{item.material}</TableCell>
                              <TableCell>{item.aula}</TableCell>
                              <TableCell>{item.downloads}</TableCell>
                              <TableCell>
                                <span className={item.downloads > 40 ? 'text-green-600' : item.downloads > 25 ? 'text-yellow-600' : 'text-red-600'}>
                                  {Math.round((item.downloads / 60) * 100)}%
                                </span>
                              </TableCell>
                            </TableRow>
                          ))}
                        </TableBody>
                      </Table>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <MessageSquare className="h-5 w-5" />
                      Comentários por Aula
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {relatoriosData.engajamento.comentarios.map((item, index) => (
                        <div key={index} className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
                          <span className="font-medium">{item.aula}</span>
                          <div className="flex items-center gap-2">
                            <span className="text-lg font-bold">{item.comentarios}</span>
                            <span className="text-sm text-muted-foreground">comentários</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            {/* Aba de Aniversariantes */}
            <TabsContent value="aniversariantes">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Cake className="h-5 w-5" />
                    Aniversariantes por Período
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="mb-4">
                    <label className="block text-sm font-medium mb-2">Período</label>
                    <Select value={selectedPeriod} onValueChange={setSelectedPeriod}>
                      <SelectTrigger className="w-[200px]">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="junho-2025">Junho 2025</SelectItem>
                        <SelectItem value="julho-2025">Julho 2025</SelectItem>
                        <SelectItem value="agosto-2025">Agosto 2025</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="overflow-x-auto">
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Nome</TableHead>
                          <TableHead>Data</TableHead>
                          <TableHead>Turma</TableHead>
                          <TableHead>Contato</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {relatoriosData.aniversariantes.map((person, index) => (
                          <TableRow key={index}>
                            <TableCell className="font-medium">{person.nome}</TableCell>
                            <TableCell>{person.data}</TableCell>
                            <TableCell>{person.turma}</TableCell>
                            <TableCell>{person.telefone}</TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Aba de Histórico de Alunos */}
            <TabsContent value="historico">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Users className="h-5 w-5" />
                    Histórico Completo de Alunos
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
                          <TableHead>Contato</TableHead>
                          <TableHead>Turma Atual</TableHead>
                          <TableHead>Turmas Anteriores</TableHead>
                          <TableHead>Total Faltas</TableHead>
                          <TableHead>Certificado</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {relatoriosData.historico.map((aluno, index) => (
                          <TableRow key={index}>
                            <TableCell className="font-medium">{aluno.nome}</TableCell>
                            <TableCell>
                              <div>
                                <div>{aluno.contato}</div>
                                <div className="text-xs text-muted-foreground">{aluno.email}</div>
                              </div>
                            </TableCell>
                            <TableCell>{aluno.turmaAtual}</TableCell>
                            <TableCell>
                              {aluno.turmasAnteriores.length > 0 ? aluno.turmasAnteriores.join(', ') : '-'}
                            </TableCell>
                            <TableCell>
                              <span className={aluno.totalFaltas > 2 ? 'text-red-600 font-bold' : 'text-gray-600'}>
                                {aluno.totalFaltas}
                              </span>
                            </TableCell>
                            <TableCell>
                              <Badge variant={aluno.certificado === 'Concluído' ? 'default' : 'secondary'}>
                                {aluno.certificado}
                              </Badge>
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Aba de Visão Geral */}
            <TabsContent value="geral">
              <div className="grid gap-6">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                  <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                      <CardTitle className="text-sm font-medium">Total de Alunos</CardTitle>
                      <Users className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                      <div className="text-2xl font-bold">156</div>
                      <p className="text-xs text-muted-foreground">+12% vs mês anterior</p>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                      <CardTitle className="text-sm font-medium">Taxa de Conclusão</CardTitle>
                      <TrendingUp className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                      <div className="text-2xl font-bold">87%</div>
                      <p className="text-xs text-muted-foreground">Acima da meta de 85%</p>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                      <CardTitle className="text-sm font-medium">Média de Presença</CardTitle>
                      <CheckCircle className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                      <div className="text-2xl font-bold">92%</div>
                      <p className="text-xs text-muted-foreground">Todas as turmas</p>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                      <CardTitle className="text-sm font-medium">Professores Ativos</CardTitle>
                      <UserCheck className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                      <div className="text-2xl font-bold">8</div>
                      <p className="text-xs text-muted-foreground">100% de atividade</p>
                    </CardContent>
                  </Card>
                </div>

                <Card>
                  <CardHeader>
                    <CardTitle>Resumo Mensal</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-center py-8 text-gray-500">
                      <p>Gráfico de evolução mensal será implementado aqui</p>
                      <p className="text-sm">Mostrando tendências de presença, engajamento e conclusões</p>
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
