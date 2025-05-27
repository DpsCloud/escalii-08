
import { Badge } from '@/components/ui/badge';
import { Calendar, Users, Clock, BookOpen, GraduationCap } from 'lucide-react';

interface CourseDetailsModalProps {
  course: any;
}

export const CourseDetailsModal = ({ course }: CourseDetailsModalProps) => {
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
      case 'ativo': return 'Ativo';
      case 'planejado': return 'Planejado';
      case 'finalizado': return 'Finalizado';
      case 'cancelado': return 'Cancelado';
      default: return status;
    }
  };

  const getTipoText = (tipo: string) => {
    return tipo === 'capacitacao' ? 'Capacitação' : 'Revalidação';
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-semibold mb-2">{course.nome}</h2>
        <div className="flex gap-2 mb-4">
          <Badge className={getStatusColor(course.status)}>
            {getStatusText(course.status)}
          </Badge>
          <Badge variant="outline">
            {getTipoText(course.tipo)}
          </Badge>
          {course.inscricoesAbertas && (
            <Badge className="bg-green-100 text-green-800">
              Inscrições Abertas
            </Badge>
          )}
        </div>
        <p className="text-gray-600">{course.descricao}</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Informações Gerais */}
        <div className="space-y-4">
          <h3 className="font-semibold text-lg border-b pb-2">Informações Gerais</h3>
          
          <div className="space-y-3">
            <div className="flex items-center gap-3">
              <Calendar className="h-4 w-4 text-gray-500" />
              <div>
                <p className="text-sm text-gray-600">Período</p>
                <p className="font-medium">{course.periodo}</p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <Calendar className="h-4 w-4 text-gray-500" />
              <div>
                <p className="text-sm text-gray-600">Duração</p>
                <p className="font-medium">
                  {new Date(course.dataInicio).toLocaleDateString('pt-BR')} - {new Date(course.dataFim).toLocaleDateString('pt-BR')}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <BookOpen className="h-4 w-4 text-gray-500" />
              <div>
                <p className="text-sm text-gray-600">Total de Aulas</p>
                <p className="font-medium">{course.totalAulas} aulas</p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <Clock className="h-4 w-4 text-gray-500" />
              <div>
                <p className="text-sm text-gray-600">Carga Horária</p>
                <p className="font-medium">{course.cargaHoraria} horas</p>
              </div>
            </div>
          </div>
        </div>

        {/* Alunos e Turmas */}
        <div className="space-y-4">
          <h3 className="font-semibold text-lg border-b pb-2">Alunos e Turmas</h3>
          
          <div className="space-y-3">
            <div className="flex items-center gap-3">
              <Users className="h-4 w-4 text-gray-500" />
              <div>
                <p className="text-sm text-gray-600">Alunos</p>
                <p className="font-medium">{course.alunosInscritos}/{course.maxAlunos} inscritos</p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <GraduationCap className="h-4 w-4 text-gray-500" />
              <div>
                <p className="text-sm text-gray-600">Turmas</p>
                <p className="font-medium">{course.turmas.length} turma(s) criada(s)</p>
              </div>
            </div>
          </div>

          {/* Barra de Progresso de Vagas */}
          <div className="mt-4">
            <div className="flex justify-between text-xs text-gray-500 mb-1">
              <span>Ocupação</span>
              <span>{course.alunosInscritos}/{course.maxAlunos}</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div 
                className="h-2 rounded-full bg-blue-600"
                style={{ width: `${(course.alunosInscritos / course.maxAlunos) * 100}%` }}
              ></div>
            </div>
          </div>
        </div>
      </div>

      {/* Turmas */}
      {course.turmas.length > 0 && (
        <div className="space-y-4">
          <h3 className="font-semibold text-lg border-b pb-2">Turmas do Curso</h3>
          <div className="space-y-3">
            {course.turmas.map((turma: any, index: number) => (
              <div key={turma.id} className="p-4 bg-gray-50 rounded-lg">
                <div className="flex justify-between items-start mb-2">
                  <h4 className="font-medium">{turma.nome}</h4>
                  <Badge className={turma.status === 'ativa' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'}>
                    {turma.status}
                  </Badge>
                </div>
                <div className="grid grid-cols-2 gap-4 text-sm text-gray-600">
                  <div>
                    <span className="font-medium">Alunos:</span> {turma.alunos}/{turma.maxAlunos}
                  </div>
                  <div>
                    <span className="font-medium">Aulas:</span> {turma.aulas}/{turma.maxAulas}
                  </div>
                  {turma.professorNome && (
                    <div className="col-span-2">
                      <span className="font-medium">Professor:</span> {turma.professorNome}
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Datas de Criação/Atualização */}
      <div className="space-y-2 text-xs text-gray-500">
        <p>Criado em: {new Date(course.createdAt).toLocaleString('pt-BR')}</p>
        <p>Última atualização: {new Date(course.updatedAt).toLocaleString('pt-BR')}</p>
      </div>
    </div>
  );
};
