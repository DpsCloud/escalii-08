
import { useState } from 'react';
import { Sidebar } from '@/components/Sidebar';
import { Header } from '@/components/Header';
import { StatusCards } from '@/components/StatusCards';
import { CourseProgress } from '@/components/CourseProgress';
import { UpcomingClasses } from '@/components/UpcomingClasses';
import { RecentMaterials } from '@/components/RecentMaterials';
import { useIsMobile } from '@/hooks/use-mobile';
import { useStudentStore } from '@/stores/useStudentStore';
import { useCourseStore } from '@/stores/useCourseStore';
import { useAulaStore } from '@/stores/useAulaStore';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Users, BookOpen, Calendar, Award, TrendingUp, Clock } from 'lucide-react';

const Dashboard = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const isMobile = useIsMobile();
  const { students } = useStudentStore();
  const { courses } = useCourseStore();
  const { aulas } = useAulaStore();

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  // Calcular estatísticas
  const totalStudents = students.length;
  const activeStudents = students.filter(s => s.status === 'ativo').length;
  const graduatedStudents = students.filter(s => s.status === 'formado').length;
  const totalCourses = courses.length;
  const activeCourses = courses.filter(c => c.status === 'ativo').length;
  const totalClasses = aulas.length;
  
  // Aniversariantes do mês
  const currentMonth = new Date().getMonth();
  const birthdayStudents = students.filter(student => {
    if (student.dataNascimento) {
      const birthMonth = new Date(student.dataNascimento).getMonth();
      return birthMonth === currentMonth;
    }
    return false;
  });

  // Turmas ativas
  const activeTurmas = courses.filter(c => c.status === 'ativo').map(course => ({
    nome: course.turma,
    curso: course.nome,
    alunos: course.alunosInscritos,
    maxAlunos: course.maxAlunos
  }));

  return (
    <div className="min-h-screen bg-muted flex">
      <Sidebar isOpen={sidebarOpen} toggleSidebar={toggleSidebar} />

      <div className={`flex-1 flex flex-col transition-all duration-300 ${isMobile ? 'w-full' : (sidebarOpen ? 'ml-64' : 'ml-[70px]')}`}>
        <Header toggleSidebar={toggleSidebar} />

        <main className="flex-1 overflow-y-auto p-4 md:p-6">
          <div className="mb-6 sm:mb-8">
            <h1 className="text-xl sm:text-2xl font-bold text-gray-800 mb-1">Dashboard</h1>
            <p className="text-sm sm:text-base text-gray-600">Visão geral do sistema ESCALI</p>
          </div>

          {/* Cards de Estatísticas */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 mb-8">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Total de Alunos</CardTitle>
                <Users className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{totalStudents}</div>
                <p className="text-xs text-muted-foreground">
                  {activeStudents} ativos
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Cursos Ativos</CardTitle>
                <BookOpen className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{activeCourses}</div>
                <p className="text-xs text-muted-foreground">
                  de {totalCourses} cursos
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Total de Aulas</CardTitle>
                <Clock className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{totalClasses}</div>
                <p className="text-xs text-muted-foreground">
                  Aulas cadastradas
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Formados</CardTitle>
                <Award className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{graduatedStudents}</div>
                <p className="text-xs text-muted-foreground">
                  Alunos certificados
                </p>
              </CardContent>
            </Card>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
            {/* Turmas Ativas */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <TrendingUp className="h-5 w-5" />
                  Turmas Ativas
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {activeTurmas.length > 0 ? activeTurmas.map((turma, index) => (
                    <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                      <div>
                        <p className="font-medium">{turma.nome}</p>
                        <p className="text-sm text-gray-600">{turma.curso}</p>
                      </div>
                      <div className="text-right">
                        <p className="font-medium">{turma.alunos}/{turma.maxAlunos}</p>
                        <p className="text-sm text-gray-600">alunos</p>
                      </div>
                    </div>
                  )) : (
                    <p className="text-gray-500 text-center py-4">Nenhuma turma ativa</p>
                  )}
                </div>
              </CardContent>
            </Card>

            {/* Aniversariantes do Mês */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Calendar className="h-5 w-5" />
                  Aniversariantes do Mês
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {birthdayStudents.length > 0 ? birthdayStudents.map((student) => (
                    <div key={student.id} className="flex items-center gap-3 p-3 bg-blue-50 rounded-lg">
                      <div className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center text-white font-medium">
                        {student.nome.charAt(0)}
                      </div>
                      <div>
                        <p className="font-medium">{student.nome}</p>
                        <p className="text-sm text-gray-600">
                          {new Date(student.dataNascimento).toLocaleDateString('pt-BR', { day: '2-digit', month: 'long' })}
                        </p>
                      </div>
                    </div>
                  )) : (
                    <p className="text-gray-500 text-center py-4">Nenhum aniversariante este mês</p>
                  )}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Componentes Existentes */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2">
              <CourseProgress />
            </div>
            <div className="space-y-6">
              <UpcomingClasses />
              <RecentMaterials />
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Dashboard;
