import { useState } from 'react';
import { Sidebar } from '@/components/Sidebar';
import { Header } from '@/components/Header';
import { useIsMobile } from '@/hooks/use-mobile';
import { useAuth } from '@/contexts/SupabaseAuthContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Eye, Edit, Trash2, Plus, Search, Phone, User } from 'lucide-react';
import { Progress } from '@/components/ui/progress';
import { useStudentStore } from '@/stores/useStudentStore';
import { StudentForm } from '@/components/StudentForm';
import { StudentDetailsModal } from '@/components/StudentDetailsModal';
import { toast } from '@/components/ui/use-toast';

const Alunos = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [showStudentForm, setShowStudentForm] = useState(false);
  const [showStudentDetails, setShowStudentDetails] = useState(false);
  const [editingStudent, setEditingStudent] = useState<any>(null);
  const [selectedStudent, setSelectedStudent] = useState<any>(null);
  const isMobile = useIsMobile();
  const { isAdmin } = useAuth();

  const { 
    getFilteredStudents, 
    searchTerm, 
    setSearchTerm, 
    filterStatus, 
    setFilterStatus,
    deleteStudent 
  } = useStudentStore();

  const students = getFilteredStudents();

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  const handleAddStudent = () => {
    setEditingStudent(null);
    setShowStudentForm(true);
  };

  const handleEditStudent = (student: any) => {
    setEditingStudent(student);
    setShowStudentForm(true);
  };

  const handleViewStudent = (student: any) => {
    setSelectedStudent(student);
    setShowStudentDetails(true);
  };

  const handleDeleteStudent = (student: any) => {
    if (window.confirm(`Tem certeza que deseja excluir o aluno ${student.nome}?`)) {
      deleteStudent(student.id);
      toast({
        title: "Aluno excluído",
        description: "O aluno foi excluído com sucesso.",
      });
    }
  };

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
                <Button onClick={handleAddStudent} className="flex items-center gap-2">
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
                <Select value={filterStatus} onValueChange={setFilterStatus}>
                  <SelectTrigger className="w-full sm:w-48">
                    <SelectValue placeholder="Filtrar por status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Todos os status</SelectItem>
                    <SelectItem value="ativo">Ativo</SelectItem>
                    <SelectItem value="pendente">Pendente</SelectItem>
                    <SelectItem value="formado">Formado</SelectItem>
                    <SelectItem value="inativo">Inativo</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            {/* Versão Mobile - Cards */}
            <div className="md:hidden space-y-4">
              {students.map((student) => (
                <div key={student.id} className="border rounded-lg p-4 space-y-3">
                  <div className="flex items-center space-x-3">
                    <Avatar className="h-12 w-12">
                      <AvatarImage src={student.foto} alt={student.nome} />
                      <AvatarFallback>
                        {student.nome.split(' ').map(n => n[0]).join('').substring(0, 2)}
                      </AvatarFallback>
                    </Avatar>
                    <div className="flex-1">
                      <button 
                        onClick={() => handleViewStudent(student)}
                        className="text-left hover:text-blue-600 transition-colors"
                      >
                        <h3 className="font-semibold">{student.nome}</h3>
                      </button>
                      <p className="text-sm text-gray-600">{student.cpf}</p>
                    </div>
                    <Badge className={getStatusColor(student.status)}>
                      {getStatusText(student.status)}
                    </Badge>
                  </div>
                  
                  <div className="space-y-2">
                    <div className="flex items-center text-sm text-gray-600">
                      <Phone className="h-4 w-4 mr-2" />
                      {student.telefone}
                    </div>
                    {student.curso && (
                      <div className="flex items-center text-sm text-gray-600">
                        <User className="h-4 w-4 mr-2" />
                        {student.curso} - {student.turma}
                      </div>
                    )}
                  </div>

                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>Progresso do Curso</span>
                      <span>{student.progresso}%</span>
                    </div>
                    <Progress value={student.progresso} className="h-2" />
                  </div>

                  <div className="flex gap-2 pt-2">
                    <Button 
                      variant="ghost" 
                      size="sm" 
                      className="flex-1"
                      onClick={() => handleViewStudent(student)}
                    >
                      <Eye className="h-4 w-4 mr-1" />
                      Ver
                    </Button>
                    {isAdmin && (
                      <>
                        <Button 
                          variant="ghost" 
                          size="sm" 
                          className="flex-1"
                          onClick={() => handleEditStudent(student)}
                        >
                          <Edit className="h-4 w-4 mr-1" />
                          Editar
                        </Button>
                        <Button 
                          variant="ghost" 
                          size="sm" 
                          className="text-red-600 hover:text-red-700"
                          onClick={() => handleDeleteStudent(student)}
                        >
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
                  {students.map((student) => (
                    <TableRow key={student.id}>
                      <TableCell className="font-medium">
                        <div className="flex items-center space-x-3">
                          <Avatar className="h-10 w-10">
                            <AvatarImage src={student.foto} alt={student.nome} />
                            <AvatarFallback>
                              {student.nome.split(' ').map(n => n[0]).join('').substring(0, 2)}
                            </AvatarFallback>
                          </Avatar>
                          <div>
                            <button 
                              onClick={() => handleViewStudent(student)}
                              className="font-medium hover:text-blue-600 transition-colors text-left"
                            >
                              {student.nome}
                            </button>
                            <div className="text-sm text-gray-500">{student.email}</div>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>{student.cpf}</TableCell>
                      <TableCell>{student.telefone}</TableCell>
                      <TableCell>
                        {student.curso ? (
                          <div>
                            <div className="font-medium">{student.curso}</div>
                            <div className="text-sm text-gray-500">{student.turma}</div>
                          </div>
                        ) : (
                          <span className="text-gray-500">Sem curso</span>
                        )}
                      </TableCell>
                      <TableCell>
                        <div className="space-y-1">
                          <div className="flex justify-between text-sm">
                            <span>{student.progresso}%</span>
                          </div>
                          <Progress value={student.progresso} className="h-2" />
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge className={getStatusColor(student.status)}>
                          {getStatusText(student.status)}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <div className="flex gap-2">
                          <Button 
                            variant="ghost" 
                            size="sm"
                            onClick={() => handleViewStudent(student)}
                          >
                            <Eye className="h-4 w-4" />
                          </Button>
                          {isAdmin && (
                            <>
                              <Button 
                                variant="ghost" 
                                size="sm"
                                onClick={() => handleEditStudent(student)}
                              >
                                <Edit className="h-4 w-4" />
                              </Button>
                              <Button 
                                variant="ghost" 
                                size="sm" 
                                className="text-red-600 hover:text-red-700"
                                onClick={() => handleDeleteStudent(student)}
                              >
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

            {students.length === 0 && (
              <div className="text-center py-8">
                <p className="text-gray-500">Nenhum aluno encontrado</p>
              </div>
            )}
          </div>
        </main>
      </div>

      {/* Modal de Formulário */}
      <Dialog open={showStudentForm} onOpenChange={setShowStudentForm}>
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
          <StudentForm 
            onClose={() => setShowStudentForm(false)}
            editingStudent={editingStudent}
          />
        </DialogContent>
      </Dialog>

      {/* Modal de Detalhes */}
      <Dialog open={showStudentDetails} onOpenChange={setShowStudentDetails}>
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Detalhes do Aluno</DialogTitle>
          </DialogHeader>
          {selectedStudent && (
            <StudentDetailsModal student={selectedStudent} />
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Alunos;
