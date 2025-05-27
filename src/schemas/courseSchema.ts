
import { z } from 'zod';

export const courseSchema = z.object({
  nome: z.string()
    .min(5, 'Nome deve ter pelo menos 5 caracteres')
    .max(100, 'Nome deve ter no máximo 100 caracteres'),
  
  descricao: z.string()
    .min(10, 'Descrição deve ter pelo menos 10 caracteres')
    .max(500, 'Descrição deve ter no máximo 500 caracteres'),
  
  tipo: z.enum(['capacitacao', 'revalidacao'], {
    errorMap: () => ({ message: 'Tipo deve ser capacitação ou revalidação' })
  }),
  
  periodo: z.string()
    .min(1, 'Período é obrigatório')
    .regex(/^\d{4}\.\d+$/, 'Período deve estar no formato YYYY.N (ex: 2025.1)'),
  
  dataInicio: z.string()
    .min(1, 'Data de início é obrigatória'),
  
  dataFim: z.string()
    .min(1, 'Data de fim é obrigatória'),
  
  totalAulas: z.number()
    .min(1, 'Deve ter pelo menos 1 aula')
    .max(20, 'Máximo de 20 aulas'),
  
  cargaHoraria: z.number()
    .min(2, 'Carga horária mínima de 2 horas')
    .max(100, 'Carga horária máxima de 100 horas'),
  
  maxAlunos: z.number()
    .min(5, 'Mínimo de 5 alunos')
    .max(100, 'Máximo de 100 alunos'),
  
  status: z.enum(['planejado', 'ativo', 'finalizado', 'cancelado'], {
    errorMap: () => ({ message: 'Status deve ser planejado, ativo, finalizado ou cancelado' })
  })
});

export type CourseFormData = z.infer<typeof courseSchema>;
