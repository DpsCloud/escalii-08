
import { z } from 'zod';
import { TURMAS_DISPONIVEIS } from '@/types/course';

export const courseSchema = z.object({
  tipo: z.enum(['capacitacao', 'revalidacao'], {
    required_error: "Tipo do curso é obrigatório",
    errorMap: () => ({ message: "Selecione 'Capacitação' ou 'Revalidação'" })
  }),
  turma: z.enum(TURMAS_DISPONIVEIS, {
    required_error: "Turma é obrigatória",
    errorMap: () => ({ message: "Selecione uma turma disponível (ex: 2025.1, 2025.2)" })
  }),
  dataInicio: z.string().min(1, "Data de início é obrigatória"),
  dataFim: z.string().min(1, "Data de fim é obrigatória"),
  totalAulas: z.number().min(1, "Total de aulas deve ser maior que 0"),
  cargaHoraria: z.number().min(1, "Carga horária deve ser maior que 0"),
  maxAlunos: z.number().min(1, "Máximo de alunos deve ser maior que 0"),
  status: z.enum(['planejado', 'ativo', 'finalizado', 'cancelado'], {
    required_error: "Status é obrigatório",
  }),
});

export type CourseFormData = z.infer<typeof courseSchema>;

// Validação para consistência de terminologia
export const validateCourseData = (data: any) => {
  // Validar que o tipo está correto
  if (!['capacitacao', 'revalidacao'].includes(data.tipo)) {
    throw new Error('Tipo deve ser "capacitacao" ou "revalidacao"');
  }
  
  // Validar que a turma está no formato correto
  if (!TURMAS_DISPONIVEIS.includes(data.turma)) {
    throw new Error('Turma deve estar no formato YYYY.N (ex: 2025.1)');
  }
  
  return true;
};
