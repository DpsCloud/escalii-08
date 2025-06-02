import { useState, useEffect } from 'react';
import { Sidebar } from '@/components/Sidebar';
import { Header } from '@/components/Header';
import { useIsMobile } from '@/hooks/use-mobile';
import { useAuth } from '@/contexts/SupabaseAuthContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Eye, Edit, Trash2, Plus, Search, Users, Calendar, ToggleLeft, ToggleRight } from 'lucide-react';
import { useCourseStore } from '@/stores/useCourseStore';
import { CourseFormExtended } from '@/components/CourseFormExtended';
import { CourseDetailsModal } from '@/components/CourseDetailsModal';
import { toast } from '@/components/ui/use-toast';

const Cursos = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [showCourseForm, setShowCourseForm] = useState(false);
  const [showCourseDetails, setShowCourseDetails] = useState(false);
  const [editingCourse, setEditingCourse] = useState<any>(null);
  const [selectedCourse, setSelectedCourse] = useState<any>(null);
  const isMobile = useIsMobile();
  const { isAdmin } = useAuth();

  const { 
    getFilteredCourses, 
    searchTerm, 
    setSearchTerm, 
    filterType, 
    setFilterType,
    deleteCourse,
    toggleInscricoes,
    fetchCourses,
    loading
  } = useCourseStore();

  const courses = getFilteredCourses();

  // Carregar cursos ao montar o componente
  useEffect(() => {
    fetchCourses();
  }, [fetchCourses]);

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  const handleAddCourse = () => {
    setEditingCourse(null);
    setShowCourseForm(true);
  };

  const handleEditCourse = (course: any) => {
    setEditingCourse(course);
    setShowCourseForm(true);
  };

  const handleViewCourse = (course: any) => {
    setSelectedCourse(course);
    setShowCourseDetails(true);
  };

  const handleDeleteCourse = (course: any) => {
    if (window.confirm(`Tem certeza que deseja excluir o curso ${course.nome}?`)) {
      deleteCourse(course.id);
      toast({
        title: "Curso excluído",
        description: "O curso foi excluído com sucesso.",
      });
    }
  };

  const handleToggleInscricoes = (course: any) => {
    toggleInscricoes(course.id);
    toast({
      title: course.inscricoesAbertas ? "Inscrições fechadas" : "Inscrições abertas",
      description: `As inscrições para ${course.nome} foram ${course.inscricoesAbertas ? 'fechadas' : 'abertas'}.`,
    });
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'ativo': return 'bg-green-100 text-green-800';
      case 'planejado': return 'bg-blue-100 text-blue-800';
      case 'finalizado': return 'bg-gray-100 text-gray-800';
      case 'cancelado': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'ativo': return 'Em Andamento';
      case 'planejado': return 'Planejado';
      case 'finalizado': return 'Finalizado';
      case 'cancelado': return 'Cancelado';
      default: return status;
    }
  };

  const getTipoText = (tipo: string) => {
    return tipo === 'capacitacao' ? 'Capacitação' : 'Revalidação';
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-muted flex">
        <Sidebar isOpen={sidebarOpen} toggleSidebar={toggleSidebar} />
        <div className={`flex-1 flex flex-col transition-all duration-300 ${isMobile ? 'w-full' : (sidebarOpen ? 'ml-64' : 'ml-[70px]')}`}>
          <Header toggleSidebar={toggleSidebar} />
          <main className="flex-1 overflow-y-auto p-4 md:p-6">
            <div className="animate-pulse space-y-6">
              <div className="h-8 bg-gray-200 rounded w-1/3"></div>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {[...Array(4)].map((_, i) => (
                  <div key={i} className="h-64 bg-gray-200 rounded"></div>
                ))}
              </div>
            </div>
          </main>
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
                <h1 className="text-xl sm:text-2xl font-bold text-gray-800 mb-1">Gestão de Cursos</h1>
                <p className="text-sm sm:text-base text-gray-600">Visualize e gerencie todos os cursos do sistema</p>
              </div>
              
              {isAdmin && (
                <Button onClick={handleAddCourse} className="flex items-center gap-2">
                  <Plus className="h-4 w-4" />
                  Novo Curso
                </Button>
              )}
            </div>
          </div>

          <div className="mb-6">
            <div className="bg-white rounded-xl shadow-sm p-4">
              <div className="flex flex-col sm:flex-row gap-4">
                <div className="relative flex-1">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                  <Input
                    placeholder="Buscar por nome ou turma..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10"
                  />
                </div>
                <Select value={filterType} onValueChange={setFilterType}>
                  <SelectTrigger className="w-full sm:w-48">
                    <SelectValue placeholder="Filtrar por tipo" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Todos os tipos</SelectItem>
                    <SelectItem value="capacitacao">Capacitação</SelectItem>
                    <SelectItem value="revalidacao">Revalidação</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>

          {/* Grid de Cursos */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {courses.map((course) => (
              <div key={course.id} className="bg-white rounded-xl shadow-sm p-6 hover:shadow-md transition-shadow">
                <div className="flex justify-between items-start mb-4">
                  <div className="flex-1">
                    <button 
                      onClick={() => handleViewCourse(course)}
                      className="text-left hover:text-blue-600 transition-colors"
                    >
                      <h3 className="text-lg font-semibold text-gray-800 mb-1">{course.nome}</h3>
                    </button>
                    <p className="text-sm text-gray-600 mb-2">Turma: {course.turma || `${course.ano}.${course.periodo}`}</p>
                    <div className="flex gap-2 mb-2">
                      <span className={`text-xs font-medium px-2 py-1 rounded-full ${getStatusColor(course.status)}`}>
                        {getStatusText(course.status)}
                      </span>
                      <Badge variant="outline">
                        {getTipoText(course.tipo)}
                      </Badge>
                    </div>
                  </div>
                  
                  <div className="flex gap-2">
                    <Button variant="ghost" size="sm" onClick={() => handleViewCourse(course)}>
                      <Eye className="h-4 w-4" />
                    </Button>
                    {isAdmin && (
                      <>
                        <Button variant="ghost" size="sm" onClick={() => handleEditCourse(course)}>
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button 
                          variant="ghost" 
                          size="sm" 
                          className="text-red-600 hover:text-red-700"
                          onClick={() => handleDeleteCourse(course)}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </>
                    )}
                  </div>
                </div>

                <p className="text-sm text-gray-600 mb-4">{course.descricao}</p>

                {/* Informações do Curso */}
                <div className="space-y-3 mb-4">
                  <div className="flex items-center gap-2 text-sm">
                    <Calendar className="h-4 w-4 text-gray-400" />
                    <span>{new Date(course.dataInicio).toLocaleDateString('pt-BR')} - {new Date(course.dataFim).toLocaleDateString('pt-BR')}</span>
                  </div>
                  
                  <div className="flex items-center gap-2 text-sm">
                    <Users className="h-4 w-4 text-gray-400" />
                    <span>{course.alunosInscritos}/{course.maxAlunos} vagas ocupadas</span>
                  </div>

                  <div className="text-sm">
                    <span className="text-gray-500">Carga horária: </span>
                    <span className="font-medium">{course.cargaHoraria}h ({course.totalAulas} aulas)</span>
                  </div>
                </div>

                {/* Barra de Progresso de Vagas */}
                <div className="mb-4">
                  <div className="flex justify-between text-xs text-gray-500 mb-1">
                    <span>Vagas</span>
                    <span>{course.alunosInscritos || 0}/{course.maxAlunos}</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div 
                      className="h-2 rounded-full bg-blue-600"
                      style={{ width: `${((course.alunosInscritos || 0) / course.maxAlunos) * 100}%` }}
                    ></div>
                  </div>
                </div>

                {/* Controle de Inscrições */}
                {isAdmin && course.status === 'ativo' && (
                  <div className="border-t pt-4">
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium">Inscrições</span>
                      <button
                        onClick={() => handleToggleInscricoes(course)}
                        className="flex items-center gap-2 text-sm"
                      >
                        {course.inscricoesAbertas ? (
                          <>
                            <ToggleRight className="h-5 w-5 text-green-600" />
                            <span className="text-green-600">Abertas</span>
                          </>
                        ) : (
                          <>
                            <ToggleLeft className="h-5 w-5 text-gray-400" />
                            <span className="text-gray-500">Fechadas</span>
                          </>
                        )}
                      </button>
                    </div>
                  </div>
                )}

                {/* Status de Inscrições para não-admin */}
                {!isAdmin && (
                  <div className="border-t pt-4">
                    {course.inscricoesAbertas ? (
                      <Badge className="bg-green-100 text-green-800">
                        Inscrições Abertas
                      </Badge>
                    ) : (
                      <Badge variant="secondary">
                        Inscrições Fechadas
                      </Badge>
                    )}
                  </div>
                )}
              </div>
            ))}
          </div>

          {courses.length === 0 && (
            <div className="bg-white rounded-xl shadow-sm p-8 text-center">
              <p className="text-gray-500">Nenhum curso encontrado</p>
            </div>
          )}
        </main>
      </div>

      <Dialog open={showCourseForm} onOpenChange={setShowCourseForm}>
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
          <CourseFormExtended 
            onClose={() => setShowCourseForm(false)}
            editingCourse={editingCourse}
          />
        </DialogContent>
      </Dialog>

      <Dialog open={showCourseDetails} onOpenChange={setShowCourseDetails}>
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Detalhes do Curso</DialogTitle>
          </DialogHeader>
          {selectedCourse && (
            <CourseDetailsModal course={selectedCourse} />
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Cursos;
