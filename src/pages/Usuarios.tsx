
import { useState, useEffect } from 'react';
import { Sidebar } from '@/components/Sidebar';
import { Header } from '@/components/Header';
import { useIsMobile } from '@/hooks/use-mobile';
import { useAuth } from '@/contexts/SupabaseAuthContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Eye, Edit, Trash2, Plus, Search, Filter } from 'lucide-react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { UserForm } from '@/components/UserForm';
import { toast } from '@/components/ui/use-toast';
import { profilesService } from '@/services/supabaseServices';

const Usuarios = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingUser, setEditingUser] = useState(null);
  const [usuarios, setUsuarios] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState('all');
  const isMobile = useIsMobile();
  const { isAdmin } = useAuth();

  useEffect(() => {
    const fetchUsuarios = async () => {
      try {
        setLoading(true);
        const data = await profilesService.getAllProfiles();
        setUsuarios(data || []);
      } catch (error) {
        console.error('Erro ao carregar usuários:', error);
        toast({
          title: "Erro",
          description: "Não foi possível carregar os usuários.",
          variant: "destructive"
        });
      } finally {
        setLoading(false);
      }
    };

    if (isAdmin) {
      fetchUsuarios();
    }
  }, [isAdmin]);

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  const handleEdit = (usuario: any) => {
    setEditingUser(usuario);
    setIsFormOpen(true);
  };

  const handleDelete = async (usuario: any) => {
    if (window.confirm(`Tem certeza que deseja excluir o usuário ${usuario.nome}?`)) {
      try {
        // Note: Implementar delete no profilesService se necessário
        toast({
          title: "Aviso",
          description: "Funcionalidade de exclusão será implementada em breve.",
        });
      } catch (error) {
        toast({
          title: "Erro",
          description: "Não foi possível excluir o usuário.",
          variant: "destructive"
        });
      }
    }
  };

  const handleCloseForm = () => {
    setIsFormOpen(false);
    setEditingUser(null);
  };

  const getFilteredUsuarios = () => {
    return usuarios.filter(usuario => {
      const matchesSearch = usuario.nome?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           usuario.cpf?.includes(searchTerm) ||
                           usuario.id?.toLowerCase().includes(searchTerm.toLowerCase());
      
      const matchesFilter = filterType === 'all' || usuario.role === filterType;
      
      return matchesSearch && matchesFilter;
    });
  };

  const filteredUsuarios = getFilteredUsuarios();

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
                <h1 className="text-xl sm:text-2xl font-bold text-gray-800 mb-1">Gestão de Usuários</h1>
                <p className="text-sm sm:text-base text-gray-600">Gerencie administradores e instrutores do sistema</p>
              </div>
              
              <Button 
                className="flex items-center gap-2"
                onClick={() => setIsFormOpen(true)}
              >
                <Plus className="h-4 w-4" />
                Novo Usuário
              </Button>
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
                <div className="flex items-center gap-2">
                  <Filter className="h-4 w-4 text-gray-400" />
                  <Select value={filterType} onValueChange={setFilterType}>
                    <SelectTrigger className="w-[180px]">
                      <SelectValue placeholder="Filtrar por tipo" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">Todos os tipos</SelectItem>
                      <SelectItem value="admin">Administradores</SelectItem>
                      <SelectItem value="instructor">Instrutores</SelectItem>
                      <SelectItem value="student">Estudantes</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </div>

            {/* Tabela */}
            {loading ? (
              <div className="text-center py-8">
                <p className="text-gray-500">Carregando usuários...</p>
              </div>
            ) : (
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Nome</TableHead>
                      <TableHead>CPF</TableHead>
                      <TableHead className="hidden md:table-cell">Telefone</TableHead>
                      <TableHead>Tipo</TableHead>
                      <TableHead className="hidden lg:table-cell">Último Acesso</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Ações</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredUsuarios.map((usuario) => (
                      <TableRow key={usuario.id}>
                        <TableCell className="font-medium">{usuario.nome}</TableCell>
                        <TableCell>{usuario.cpf}</TableCell>
                        <TableCell className="hidden md:table-cell">{usuario.telefone}</TableCell>
                        <TableCell>
                          <Badge variant={usuario.role === 'admin' ? 'default' : usuario.role === 'instructor' ? 'secondary' : 'outline'}>
                            {usuario.role === 'admin' ? 'Administrador' : usuario.role === 'instructor' ? 'Instrutor' : 'Estudante'}
                          </Badge>
                        </TableCell>
                        <TableCell className="hidden lg:table-cell">
                          {usuario.ultimo_acesso ? new Date(usuario.ultimo_acesso).toLocaleDateString('pt-BR') : 'Nunca'}
                        </TableCell>
                        <TableCell>
                          <Badge variant={usuario.status === 'ativo' ? 'default' : 'secondary'}>
                            {usuario.status === 'ativo' ? 'Ativo' : 'Inativo'}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <div className="flex gap-2">
                            <Button variant="ghost" size="sm">
                              <Eye className="h-4 w-4" />
                            </Button>
                            <Button 
                              variant="ghost" 
                              size="sm"
                              onClick={() => handleEdit(usuario)}
                            >
                              <Edit className="h-4 w-4" />
                            </Button>
                            <Button 
                              variant="ghost" 
                              size="sm" 
                              className="text-red-600 hover:text-red-700"
                              onClick={() => handleDelete(usuario)}
                            >
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            )}

            {!loading && filteredUsuarios.length === 0 && (
              <div className="text-center py-8">
                <p className="text-gray-500">Nenhum usuário encontrado</p>
              </div>
            )}
          </div>
        </main>
      </div>

      <Dialog open={isFormOpen} onOpenChange={setIsFormOpen}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>
              {editingUser ? 'Editar Usuário' : 'Novo Usuário'}
            </DialogTitle>
          </DialogHeader>
          <UserForm onClose={handleCloseForm} editingUser={editingUser} />
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Usuarios;
