
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Sidebar } from '@/components/Sidebar';
import { Header } from '@/components/Header';
import { useIsMobile } from '@/hooks/use-mobile';
import { useCourseStore } from '@/stores/useCourseStore';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogTrigger } from '@/components/ui/dialog';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Input } from '@/components/ui/input';
import { AulaForm } from '@/components/AulaForm';
import { Plus, Search, BookOpen, Clock, FileText, Video, Edit, Trash2 } from 'lucide-react';
import { Course, Aula } from '@/types/course';

const AulasAdmin = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [aulaDialogOpen, setAulaDialogOpen] = useState(false);
  const [editingAula, setEditingAula] = useState<Aula | undefined>();
  const [selectedCourse, setSelectedCourse] = useState<string>('');
  const [searchTerm, setSearchTerm] = useState('');
  const isMobile = useIsMobile();
  const navigate = useNavigate();
  const { courses } = useCourseStore();

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  const filteredCourses = courses.filter(course => 
    selectedCourse === '' || course.id === selectedCourse
  );

  const handleEditAula = (aula: Aula) => {
    setEditingAula(aula);
    setAulaDialogOpen(true);
  };

  const handleCloseDialog = () => {
    setAulaDialogOpen(false);
    setEditingAula(undefined);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'ativa': return 'bg-green-100 text-green-800';
      case 'planejada': return 'bg-blue-100 text-blue-800';
      case 'concluida': return 'bg-gray-100 text-gray-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="min-h-screen bg-muted flex">
      <Sidebar isOpen={sidebarOpen} toggleSidebar={toggleSidebar} />

      <div className={`flex-1 flex flex-col transition-all duration-300 ${
        isMobile ? 'w-full' : (sidebarOpen ? 'ml-64' : 'ml-[70px]')
      }`}>
        <Header toggleSidebar={toggleSidebar} />

        <main className="flex-1 overflow-y-auto p-4 md:p-6">
          <div className="max-w-7xl mx-auto space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
              <div>
                <h1 className="text-xl sm:text-2xl font-bold text-gray-800 mb-1">Gerenciamento de Aulas</h1>
                <p className="text-sm sm:text-base text-gray-600">Adicione e gerencie as aulas dos cursos</p>
              </div>
              <Dialog open={aulaDialogOpen} onOpenChange={setAulaDialogOpen}>
                <DialogTrigger asChild>
                  <Button className="hover-scale">
                    <Plus className="h-4 w-4 mr-2" />
                    Nova Aula
                  </Button>
                </DialogTrigger>
                <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
                  <AulaForm 
                    onClose={handleCloseDialog} 
                    editingAula={editingAula}
                    courses={courses}
                  />
                </DialogContent>
              </Dialog>
            </div>

            {/* Filtros */}
            <Card className="animate-fade-in">
              <CardHeader>
                <CardTitle>Filtros</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium mb-2">Curso</label>
                    <Select value={selectedCourse} onValueChange={setSelectedCourse}>
                      <SelectTrigger>
                        <SelectValue placeholder="Todos os cursos" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="">Todos os cursos</SelectItem>
                        {courses.map((course) => (
                          <SelectItem key={course.id} value={course.id}>
                            {course.nome}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">Buscar</label>
                    <div className="relative">
                      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                      <Input
                        placeholder="Buscar por título da aula..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="pl-10"
                      />
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Lista de Cursos e Aulas */}
            <div className="space-y-6">
              {filteredCourses.map((course) => (
                <Card key={course.id} className="animate-fade-in">
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <div>
                        <CardTitle className="flex items-center gap-2">
                          <BookOpen className="h-5 w-5" />
                          {course.nome}
                        </CardTitle>
                        <p className="text-sm text-muted-foreground mt-1">
                          {course.descricao}
                        </p>
                      </div>
                      <Badge className={getStatusColor(course.status)}>
                        {course.status}
                      </Badge>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                      {course.aulas && course.aulas.length > 0 ? (
                        course.aulas
                          .filter(aula => 
                            searchTerm === '' || 
                            aula.titulo.toLowerCase().includes(searchTerm.toLowerCase())
                          )
                          .sort((a, b) => a.ordem - b.ordem)
                          .map((aula) => (
                            <div key={aula.id} className="bg-white border rounded-lg p-4 hover:shadow-md transition-shadow">
                              <div className="flex items-start justify-between mb-2">
                                <h4 className="font-medium text-sm">{aula.titulo}</h4>
                                <div className="flex gap-1">
                                  <Button
                                    size="sm"
                                    variant="ghost"
                                    onClick={() => handleEditAula(aula)}
                                    className="h-6 w-6 p-0"
                                  >
                                    <Edit className="h-3 w-3" />
                                  </Button>
                                  <Button
                                    size="sm"
                                    variant="ghost"
                                    className="h-6 w-6 p-0 text-red-600 hover:text-red-800"
                                  >
                                    <Trash2 className="h-3 w-3" />
                                  </Button>
                                </div>
                              </div>
                              <p className="text-xs text-gray-600 mb-3 line-clamp-2">
                                {aula.descricao}
                              </p>
                              <div className="space-y-2">
                                <div className="flex items-center justify-between text-xs">
                                  <span className="text-gray-500">Ordem:</span>
                                  <span className="font-medium">#{aula.ordem}</span>
                                </div>
                                <div className="flex items-center justify-between text-xs">
                                  <span className="text-gray-500">Duração:</span>
                                  <span className="font-medium flex items-center gap-1">
                                    <Clock className="h-3 w-3" />
                                    {aula.duracao}min
                                  </span>
                                </div>
                                <div className="flex items-center justify-between text-xs">
                                  <span className="text-gray-500">Materiais:</span>
                                  <span className="font-medium flex items-center gap-1">
                                    <FileText className="h-3 w-3" />
                                    {aula.materiais?.length || 0}
                                  </span>
                                </div>
                                <div className="flex items-center justify-between text-xs">
                                  <span className="text-gray-500">Status:</span>
                                  <Badge className={`${getStatusColor(aula.status)} text-xs px-1 py-0`}>
                                    {aula.status}
                                  </Badge>
                                </div>
                                {aula.videoUrl && (
                                  <div className="flex items-center gap-1 text-xs text-blue-600">
                                    <Video className="h-3 w-3" />
                                    <span>Vídeo disponível</span>
                                  </div>
                                )}
                              </div>
                            </div>
                          ))
                      ) : (
                        <div className="col-span-full text-center py-8 text-gray-500">
                          <BookOpen className="h-12 w-12 mx-auto mb-3 opacity-50" />
                          <p>Nenhuma aula cadastrada neste curso</p>
                          <Dialog open={aulaDialogOpen} onOpenChange={setAulaDialogOpen}>
                            <DialogTrigger asChild>
                              <Button className="mt-3" variant="outline" size="sm">
                                <Plus className="h-4 w-4 mr-2" />
                                Adicionar primeira aula
                              </Button>
                            </DialogTrigger>
                            <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
                              <AulaForm 
                                onClose={handleCloseDialog} 
                                editingAula={editingAula}
                                courses={courses}
                                preSelectedCourse={course.id}
                              />
                            </DialogContent>
                          </Dialog>
                        </div>
                      )}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default AulasAdmin;
