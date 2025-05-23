
import { useState } from 'react';
import { Sidebar } from '@/components/Sidebar';
import { Header } from '@/components/Header';
import { useIsMobile } from '@/hooks/use-mobile';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Eye, Edit, Trash2, Plus, Search } from 'lucide-react';

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
      status: 'ativo'
    },
    {
      id: '2',
      nome: 'Maria Santos',
      cpf: '222.222.222-22',
      telefone: '(11) 88888-8888',
      email: 'maria@email.com',
      dataNascimento: '1988-03-20',
      curso: 'ESCALI 2025.1',
      status: 'ativo'
    },
    {
      id: '3',
      nome: 'Pedro Costa',
      cpf: '333.333.333-33',
      telefone: '(11) 77777-7777',
      email: 'pedro@email.com',
      dataNascimento: '1992-08-10',
      curso: null,
      status: 'pendente'
    }
  ];

  const filteredAlunos = alunos.filter(aluno =>
    aluno.nome.toLowerCase().includes(searchTerm.toLowerCase()) ||
    aluno.cpf.includes(searchTerm) ||
    aluno.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

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

            {/* Tabela */}
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Nome</TableHead>
                    <TableHead>CPF</TableHead>
                    <TableHead className="hidden md:table-cell">Telefone</TableHead>
                    <TableHead className="hidden lg:table-cell">Email</TableHead>
                    <TableHead>Curso</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Ações</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredAlunos.map((aluno) => (
                    <TableRow key={aluno.id}>
                      <TableCell className="font-medium">{aluno.nome}</TableCell>
                      <TableCell>{aluno.cpf}</TableCell>
                      <TableCell className="hidden md:table-cell">{aluno.telefone}</TableCell>
                      <TableCell className="hidden lg:table-cell">{aluno.email}</TableCell>
                      <TableCell>
                        {aluno.curso ? (
                          <Badge variant="secondary">{aluno.curso}</Badge>
                        ) : (
                          <span className="text-gray-500">Sem curso</span>
                        )}
                      </TableCell>
                      <TableCell>
                        <Badge variant={aluno.status === 'ativo' ? 'default' : 'secondary'}>
                          {aluno.status === 'ativo' ? 'Ativo' : 'Pendente'}
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
