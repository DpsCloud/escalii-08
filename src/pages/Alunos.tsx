
import { useState } from 'react';
import { Sidebar } from '@/components/Sidebar';
import { Header } from '@/components/Header';
import { useIsMobile } from '@/hooks/use-mobile';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Eye, Edit, Trash2, Plus, Search, Phone, User } from 'lucide-react';
import { Progress } from '@/components/ui/progress';

const Alunos = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const isMobile = useIsMobile();
  const { isAdmin } = useAuth();

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  // Mock data - em produção viria da API
  const alunos = [
    {
      id: '1',
      nome: 'João Silva',
      cpf: '111.111.111-11',
      telefone: '(11) 99999-9999',
      email: 'joao@email.com',
      dataNascimento: '1990-05-15',
      curso: 'ESCALI 2025.1',
      turma: 'Turma A',
      progresso: 75,
      status: 'ativo',
      foto: 'https://ui-avatars.com/api/?name=João+Silva&background=3b82f6&color=fff'
    },
    {
      id: '2',
      nome: 'Maria Santos',
      cpf: '222.222.222-22',
      telefone: '(11) 88888-8888',
      email: 'maria@email.com',
      dataNascimento: '1988-03-20',
      curso: 'ESCALI 2025.1',
      turma: 'Turma A',
      progresso: 62,
      status: 'ativo',
      foto: 'https://ui-avatars.com/api/?name=Maria+Santos&background=ec4899&color=fff'
    },
    {
      id: '3',
      nome: 'Pedro Costa',
      cpf: '333.333.333-33',
      telefone: '(11) 77777-7777',
      email: 'pedro@email.com',
      dataNascimento: '1992-08-10',
      curso: null,
      turma: null,
      progresso: 0,
      status: 'pendente',
      foto: 'https://ui-avatars.com/api/?name=Pedro+Costa&background=10b981&color=fff'
    },
    {
      id: '4',
      nome: 'Ana Oliveira',
      cpf: '444.444.444-44',
      telefone: '(11) 66666-6666',
      email: 'ana@email.com',
      dataNascimento: '1985-12-03',
      curso: 'ESCALI 2024.2',
      turma: 'Turma B',
      progresso: 100,
      status: 'formado',
      foto: 'https://ui-avatars.com/api/?name=Ana+Oliveira&background=f59e0b&color=fff'
    }
  ];

  const filteredAlunos = alunos.filter(aluno =>
    aluno.nome.toLowerCase().includes(searchTerm.toLowerCase()) ||
    aluno.cpf.includes(searchTerm) ||
    aluno.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'ativo': return 'bg-green-100 text-green-800';
      case 'pendente': return 'bg-yellow-100 text-yellow-800';
      case 'formado': return 'bg-blue-100 text-blue-800';
      case 'inativo': return 'bg-gray-100 text-gray-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'ativo': return 'Ativo';
      case 'pendente': return 'Pendente';
      case 'formado': return 'Formado';
      case 'inativo': return 'Inativo';
      default: return status;
    }
  };

  return (
    <div className="min-h-screen bg-muted flex">
      <Sidebar isOpen={sidebarOpen} toggleSidebar={toggleSidebar} />

      <div className={`flex-1 flex flex-col transition-all duration-300 ${isMobile ? 'w-full' : (sidebarOpen ? 'ml-64' : 'ml-[70px]')}`}>
        <Header toggleSidebar={toggleSidebar} />

        <main className="flex-1 overflow-y-auto p-4 md:p-6">
          <div className="mb-6 sm:mb-8">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
              <div>
                <h1 className="text-xl sm:text-2xl font-bold text-gray-800 mb-1">Gestão de Alunos</h1>
                <p className="text-sm sm:text-base text-gray-600">Visualize e gerencie todos os alunos do sistema</p>
              </div>
              
              {isAdmin && (
                <Button className="flex items-center gap-2">
                  <Plus className="h-4 w-4" />
                  Novo Aluno
                </Button>
              )}
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm p-4 sm:p-6">
            {/* Filtros */}
            <div className="mb-6">
              <div className="flex flex-col sm:flex-row gap-4">
                <div className="relative flex-1">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                  <Input
                    placeholder="Buscar por nome, CPF ou email..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10"
                  />
                </div>
              </div>
            </div>

            {/* Versão Mobile - Cards */}
            <div className="md:hidden space-y-4">
              {filteredAlunos.map((aluno) => (
                <div key={aluno.id} className="border rounded-lg p-4 space-y-3">
                  <div className="flex items-center space-x-3">
                    <Avatar className="h-12 w-12">
                      <AvatarImage src={aluno.foto} alt={aluno.nome} />
                      <AvatarFallback>
                        {aluno.nome.split(' ').map(n => n[0]).join('').substring(0, 2)}
                      </AvatarFallback>
                    </Avatar>
                    <div className="flex-1">
                      <h3 className="font-semibold">{aluno.nome}</h3>
                      <p className="text-sm text-gray-600">{aluno.cpf}</p>
                    </div>
                    <Badge className={getStatusColor(aluno.status)}>
                      {getStatusText(aluno.status)}
                    </Badge>
                  </div>
                  
                  <div className="space-y-2">
                    <div className="flex items-center text-sm text-gray-600">
                      <Phone className="h-4 w-4 mr-2" />
                      {aluno.telefone}
                    </div>
                    {aluno.curso && (
                      <div className="flex items-center text-sm text-gray-600">
                        <User className="h-4 w-4 mr-2" />
                        {aluno.curso} - {aluno.turma}
                      </div>
                    )}
                  </div>

                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>Progresso do Curso</span>
                      <span>{aluno.progresso}%</span>
                    </div>
                    <Progress value={aluno.progresso} className="h-2" />
                  </div>

                  <div className="flex gap-2 pt-2">
                    <Button variant="ghost" size="sm" className="flex-1">
                      <Eye className="h-4 w-4 mr-1" />
                      Ver
                    </Button>
                    {isAdmin && (
                      <>
                        <Button variant="ghost" size="sm" className="flex-1">
                          <Edit className="h-4 w-4 mr-1" />
                          Editar
                        </Button>
                        <Button variant="ghost" size="sm" className="text-red-600 hover:text-red-700">
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </>
                    )}
                  </div>
                </div>
              ))}
            </div>

            {/* Versão Desktop - Tabela */}
            <div className="hidden md:block overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Aluno</TableHead>
                    <TableHead>CPF</TableHead>
                    <TableHead>Telefone</TableHead>
                    <TableHead>Curso/Turma</TableHead>
                    <TableHead>Progresso</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Ações</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredAlunos.map((aluno) => (
                    <TableRow key={aluno.id}>
                      <TableCell className="font-medium">
                        <div className="flex items-center space-x-3">
                          <Avatar className="h-10 w-10">
                            <AvatarImage src={aluno.foto} alt={aluno.nome} />
                            <AvatarFallback>
                              {aluno.nome.split(' ').map(n => n[0]).join('').substring(0, 2)}
                            </AvatarFallback>
                          </Avatar>
                          <div>
                            <div className="font-medium">{aluno.nome}</div>
                            <div className="text-sm text-gray-500">{aluno.email}</div>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>{aluno.cpf}</TableCell>
                      <TableCell>{aluno.telefone}</TableCell>
                      <TableCell>
                        {aluno.curso ? (
                          <div>
                            <div className="font-medium">{aluno.curso}</div>
                            <div className="text-sm text-gray-500">{aluno.turma}</div>
                          </div>
                        ) : (
                          <span className="text-gray-500">Sem curso</span>
                        )}
                      </TableCell>
                      <TableCell>
                        <div className="space-y-1">
                          <div className="flex justify-between text-sm">
                            <span>{aluno.progresso}%</span>
                          </div>
                          <Progress value={aluno.progresso} className="h-2" />
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge className={getStatusColor(aluno.status)}>
                          {getStatusText(aluno.status)}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <div className="flex gap-2">
                          <Button variant="ghost" size="sm">
                            <Eye className="h-4 w-4" />
                          </Button>
                          {isAdmin && (
                            <>
                              <Button variant="ghost" size="sm">
                                <Edit className="h-4 w-4" />
                              </Button>
                              <Button variant="ghost" size="sm" className="text-red-600 hover:text-red-700">
                                <Trash2 className="h-4 w-4" />
                              </Button>
                            </>
                          )}
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>

            {filteredAlunos.length === 0 && (
              <div className="text-center py-8">
                <p className="text-gray-500">Nenhum aluno encontrado</p>
              </div>
            )}
          </div>
        </main>
      </div>
    </div>
  );
};

export default Alunos;
