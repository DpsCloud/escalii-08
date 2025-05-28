
import { z } from 'zod';

export const courseSchema = z.object({
  tipo: z.enum(['capacitacao', 'revalidacao', 'custom']),
  ano: z.enum(['2024', '2025', '2026', '2027', 'custom']),
  periodo: z.enum(['1', '2', '3', '4', 'revalida', 'custom']),
  turmaCustomizada: z.string().optional(),
  dataInicio: z.string().min(1, 'Data de início é obrigatória'),
  dataFim: z.string().min(1, 'Data de fim é obrigatória'),
  totalAulas: z.number().min(1, 'Total de aulas deve ser maior que 0'),
  maxAlunos: z.number().min(1, 'Máximo de alunos deve ser maior que 0'),
  status: z.enum(['ativo', 'planejado', 'finalizado', 'cancelado']),
  diasSemana: z.array(z.enum(['segunda', 'terca', 'quarta', 'quinta', 'sexta', 'sabado', 'domingo'])),
  aulasSelecionadas: z.array(z.string())
});

export type CourseFormData = z.infer<typeof courseSchema>;
