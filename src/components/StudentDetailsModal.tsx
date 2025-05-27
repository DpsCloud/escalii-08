
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Progress } from '@/components/ui/progress';
import { Calendar, MapPin, Phone, Mail, User, GraduationCap } from 'lucide-react';

interface StudentDetailsModalProps {
  student: any;
}

export const StudentDetailsModal = ({ student }: StudentDetailsModalProps) => {
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
    <div className="space-y-6">
      <div className="text-center">
        <Avatar className="h-24 w-24 mx-auto mb-4">
          <AvatarImage src={student.foto} alt={student.nome} />
          <AvatarFallback className="text-lg">
            {student.nome.split(' ').map((n: string) => n[0]).join('').substring(0, 2)}
          </AvatarFallback>
        </Avatar>
        <h2 className="text-xl font-semibold mb-2">{student.nome}</h2>
        <Badge className={getStatusColor(student.status)}>
          {getStatusText(student.status)}
        </Badge>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Informações Pessoais */}
        <div className="space-y-4">
          <h3 className="font-semibold text-lg border-b pb-2">Informações Pessoais</h3>
          
          <div className="space-y-3">
            <div className="flex items-center gap-3">
              <User className="h-4 w-4 text-gray-500" />
              <div>
                <p className="text-sm text-gray-600">CPF</p>
                <p className="font-medium">{student.cpf}</p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <Mail className="h-4 w-4 text-gray-500" />
              <div>
                <p className="text-sm text-gray-600">Email</p>
                <p className="font-medium">{student.email}</p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <Phone className="h-4 w-4 text-gray-500" />
              <div>
                <p className="text-sm text-gray-600">Telefone</p>
                <p className="font-medium">{student.telefone}</p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <Calendar className="h-4 w-4 text-gray-500" />
              <div>
                <p className="text-sm text-gray-600">Data de Nascimento</p>
                <p className="font-medium">
                  {new Date(student.dataNascimento).toLocaleDateString('pt-BR')}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Informações Acadêmicas */}
        <div className="space-y-4">
          <h3 className="font-semibold text-lg border-b pb-2">Informações Acadêmicas</h3>
          
          <div className="space-y-3">
            <div className="flex items-center gap-3">
              <GraduationCap className="h-4 w-4 text-gray-500" />
              <div>
                <p className="text-sm text-gray-600">Curso</p>
                <p className="font-medium">{student.curso || 'Não matriculado'}</p>
              </div>
            </div>

            {student.turma && (
              <div className="flex items-center gap-3">
                <User className="h-4 w-4 text-gray-500" />
                <div>
                  <p className="text-sm text-gray-600">Turma</p>
                  <p className="font-medium">{student.turma}</p>
                </div>
              </div>
            )}

            <div className="flex items-center gap-3">
              <Calendar className="h-4 w-4 text-gray-500" />
              <div>
                <p className="text-sm text-gray-600">Data de Matrícula</p>
                <p className="font-medium">
                  {new Date(student.dataMatricula).toLocaleDateString('pt-BR')}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Endereço */}
      {student.endereco && (
        <div className="space-y-4">
          <h3 className="font-semibold text-lg border-b pb-2">Endereço</h3>
          <div className="flex items-start gap-3">
            <MapPin className="h-4 w-4 text-gray-500 mt-1" />
            <div>
              <p className="font-medium">
                {student.endereco.rua}, {student.endereco.numero}
              </p>
              <p className="text-gray-600">
                {student.endereco.bairro} - {student.endereco.cidade}/{student.endereco.estado}
              </p>
              <p className="text-gray-600">CEP: {student.endereco.cep}</p>
            </div>
          </div>
        </div>
      )}

      {/* Progresso */}
      {student.status === 'ativo' && (
        <div className="space-y-4">
          <h3 className="font-semibold text-lg border-b pb-2">Progresso do Curso</h3>
          
          <div className="space-y-4">
            <div>
              <div className="flex justify-between text-sm mb-2">
                <span>Progresso Geral</span>
                <span>{student.progresso}%</span>
              </div>
              <Progress value={student.progresso} className="h-3" />
            </div>

            <div className="grid grid-cols-3 gap-4 text-center">
              <div className="p-3 bg-gray-50 rounded-lg">
                <p className="text-2xl font-bold text-blue-600">{student.presencaGeral}%</p>
                <p className="text-sm text-gray-600">Presença</p>
              </div>
              <div className="p-3 bg-gray-50 rounded-lg">
                <p className="text-2xl font-bold text-green-600">{student.aulasAssistidas}</p>
                <p className="text-sm text-gray-600">Aulas Assistidas</p>
              </div>
              <div className="p-3 bg-gray-50 rounded-lg">
                <p className="text-2xl font-bold text-purple-600">{student.aproveitamento}%</p>
                <p className="text-sm text-gray-600">Aproveitamento</p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Observações */}
      {student.observacoes && (
        <div className="space-y-4">
          <h3 className="font-semibold text-lg border-b pb-2">Observações</h3>
          <p className="text-gray-700">{student.observacoes}</p>
        </div>
      )}
    </div>
  );
};
