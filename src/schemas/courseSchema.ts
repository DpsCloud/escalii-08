
import { z } from 'zod';
import { TURMAS_DISPONIVEIS } from '@/types/course';

export const courseSchema = z.object({
  tipo: z.enum(['capacitacao', 'revalidacao'], {
    required_error: "Tipo do curso é obrigatório",
  }),
  turma: z.enum(TURMAS_DISPONIVEIS, {
    required_error: "Turma é obrigatória",
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
