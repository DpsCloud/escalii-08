
import { z } from 'zod';
import { ANOS_DISPONIVEIS, PERIODOS_DISPONIVEIS, DIAS_SEMANA } from '@/types/course';

export const courseSchema = z.object({
  tipo: z.enum(['capacitacao', 'revalidacao'], {
    errorMap: () => ({ message: "Selecione 'Capacitação' ou 'Revalidação'" })
  }),
  ano: z.enum(ANOS_DISPONIVEIS, {
    errorMap: () => ({ message: "Selecione um ano válido" })
  }),
  periodo: z.enum(PERIODOS_DISPONIVEIS, {
    errorMap: () => ({ message: "Selecione um período válido" })
  }),
  turmaCustomizada: z.string().optional(),
  dataInicio: z.string().min(1, "Data de início é obrigatória"),
  dataFim: z.string().min(1, "Data de fim é obrigatória"),
  totalAulas: z.number().min(1, "Total de aulas deve ser maior que 0"),
  maxAlunos: z.number().min(1, "Máximo de alunos deve ser maior que 0"),
  status: z.enum(['planejado', 'ativo', 'finalizado', 'cancelado'], {
    errorMap: () => ({ message: "Status é obrigatório" })
  }),
  diasSemana: z.array(z.enum(DIAS_SEMANA)).min(1, "Selecione pelo menos um dia da semana"),
  aulasSelecionadas: z.array(z.string()).min(1, "Selecione pelo menos uma aula"),
});

export type CourseFormData = z.infer<typeof courseSchema>;

// Validação para consistência de terminologia
export const validateCourseData = (data: any) => {
  // Validar que o tipo está correto
  if (!['capacitacao', 'revalidacao'].includes(data.tipo)) {
    throw new Error('Tipo deve ser "capacitacao" ou "revalidacao"');
  }
  
  return true;
};
