
import { useState } from 'react';
import { Sidebar } from '@/components/Sidebar';
import { Header } from '@/components/Header';
import { useIsMobile } from '@/hooks/use-mobile';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Eye, Edit, Trash2, Plus, Search, Users, Calendar } from 'lucide-react';

const Cursos = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const isMobile = useIsMobile();
  const { isAdmin } = useAuth();

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  // Mock data - em produção viria da API
  const cursos = [
    {
      id: '1',
      nome: 'ESCALI Capacitação de Líderes',
      descricao: 'Curso completo de capacitação para líderes cristãos',
      ano: 2025,
      turma: '2025.1',
      dataInicio: '2025-05-01',
      dataFim: '2025-07-31',
      vagasMaximas: 50,
      vagasMinimas: 30,
      vagasOcupadas: 35,
      status: 'ativo',
      aulaAtual: 6,
      totalAulas: 8
    },
    {
      id: '2',
      nome: 'ESCALI Capacitação de Líderes',
      descricao: 'Curso completo de capacitação para líderes cristãos',
      ano: 2025,
      turma: '2025.2',
      dataInicio: '2025-08-01',
      dataFim: '2025-10-31',
      vagasMaximas: 50,
      vagasMinimas: 30,
      vagasOcupadas: 0,
      status: 'planejado',
      aulaAtual: 0,
      totalAulas: 8
    }
  ];

  const filteredCursos = cursos.filter(curso =>
    curso.nome.toLowerCase().includes(searchTerm.toLowerCase()) ||
    curso.turma.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'ativo': return 'bg-green-100 text-green-800';
      case 'planejado': return 'bg-blue-100 text-blue-800';
      case 'finalizado': return 'bg-gray-100 text-gray-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'ativo': return 'Em Andamento';
      case 'planejado': return 'Planejado';
      case 'finalizado': return 'Finalizado';
      default: return status;
    }
  };

  const canEnroll = (curso: any) => {
    if (curso.status !== 'ativo') return false;
    if (curso.vagasOcupadas >= curso.vagasMaximas) return false;
    if (curso.aulaAtual > 3) return false; // Só até a 3ª aula
    return true;
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
                <h1 className="text-xl sm:text-2xl font-bold text-gray-800 mb-1">Gestão de Cursos</h1>
                <p className="text-sm sm:text-base text-gray-600">Visualize e gerencie todos os cursos do sistema</p>
              </div>
              
              {isAdmin && (
                <Button className="flex items-center gap-2">
                  <Plus className="h-4 w-4" />
                  Novo Curso
                </Button>
              )}
            </div>
          </div>

          {/* Filtros */}
          <div className="mb-6">
            <div className="bg-white rounded-xl shadow-sm p-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                <Input
                  placeholder="Buscar por nome ou turma..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
          </div>

          {/* Grid de Cursos */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {filteredCursos.map((curso) => (
              <div key={curso.id} className="bg-white rounded-xl shadow-sm p-6 hover:shadow-md transition-shadow">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h3 className="text-lg font-semibold text-gray-800 mb-1">{curso.nome}</h3>
                    <p className="text-sm text-gray-600 mb-2">Turma: {curso.turma}</p>
                    <span className={`text-xs font-medium px-2 py-1 rounded-full ${getStatusColor(curso.status)}`}>
                      {getStatusText(curso.status)}
                    </span>
                  </div>
                  
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
                </div>

                <p className="text-sm text-gray-600 mb-4">{curso.descricao}</p>

                {/* Informações do Curso */}
                <div className="space-y-3 mb-4">
                  <div className="flex items-center gap-2 text-sm">
                    <Calendar className="h-4 w-4 text-gray-400" />
                    <span>{new Date(curso.dataInicio).toLocaleDateString('pt-BR')} - {new Date(curso.dataFim).toLocaleDateString('pt-BR')}</span>
                  </div>
                  
                  <div className="flex items-center gap-2 text-sm">
                    <Users className="h-4 w-4 text-gray-400" />
                    <span>{curso.vagasOcupadas}/{curso.vagasMaximas} vagas ocupadas</span>
                  </div>

                  {curso.status === 'ativo' && (
                    <div className="text-sm">
                      <span className="text-gray-500">Progresso: </span>
                      <span className="font-medium">{curso.aulaAtual}/{curso.totalAulas} aulas</span>
                    </div>
                  )}
                </div>

                {/* Barra de Progresso de Vagas */}
                <div className="mb-4">
                  <div className="flex justify-between text-xs text-gray-500 mb-1">
                    <span>Vagas</span>
                    <span>{curso.vagasOcupadas}/{curso.vagasMaximas}</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div 
                      className={`h-2 rounded-full ${
                        curso.vagasOcupadas >= curso.vagasMinimas ? 'bg-green-600' : 'bg-yellow-600'
                      }`}
                      style={{ width: `${(curso.vagasOcupadas / curso.vagasMaximas) * 100}%` }}
                    ></div>
                  </div>
                  <div className="text-xs text-gray-500 mt-1">
                    {curso.vagasOcupadas < curso.vagasMinimas && (
                      <span className="text-yellow-600">
                        Mínimo {curso.vagasMinimas} alunos para iniciar
                      </span>
                    )}
                  </div>
                </div>

                {/* Status de Inscrições */}
                <div className="border-t pt-4">
                  {canEnroll(curso) ? (
                    <Badge className="bg-green-100 text-green-800">
                      Inscrições Abertas
                    </Badge>
                  ) : curso.aulaAtual > 3 ? (
                    <Badge variant="secondary">
                      Inscrições para próxima turma
                    </Badge>
                  ) : curso.vagasOcupadas >= curso.vagasMaximas ? (
                    <Badge variant="secondary">
                      Vagas Esgotadas
                    </Badge>
                  ) : (
                    <Badge variant="secondary">
                      Inscrições Fechadas
                    </Badge>
                  )}
                </div>
              </div>
            ))}
          </div>

          {filteredCursos.length === 0 && (
            <div className="bg-white rounded-xl shadow-sm p-8 text-center">
              <p className="text-gray-500">Nenhum curso encontrado</p>
            </div>
          )}
        </main>
      </div>
    </div>
  );
};

export default Cursos;
