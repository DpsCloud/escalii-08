
import { z } from 'zod';

const cpfRegex = /^\d{3}\.\d{3}\.\d{3}-\d{2}$/;
const phoneRegex = /^\(\d{2}\) \d{4,5}-\d{4}$/;

export const userSchema = z.object({
  nome: z.string()
    .min(2, 'Nome deve ter pelo menos 2 caracteres')
    .max(100, 'Nome deve ter no máximo 100 caracteres')
    .regex(/^[a-zA-ZÀ-ÿ\s]+$/, 'Nome deve conter apenas letras'),
  
  cpf: z.string()
    .regex(cpfRegex, 'CPF deve estar no formato 000.000.000-00')
    .refine((cpf) => {
      // Validação básica de CPF
      const digits = cpf.replace(/\D/g, '');
      if (digits.length !== 11) return false;
      if (/^(.)\1*$/.test(digits)) return false;
      return true;
    }, 'CPF inválido'),
  
  email: z.string()
    .email('Email inválido')
    .max(100, 'Email deve ter no máximo 100 caracteres'),
  
  telefone: z.string()
    .regex(phoneRegex, 'Telefone deve estar no formato (00) 00000-0000'),
  
  tipoUsuario: z.enum(['admin', 'instrutor'], {
    errorMap: () => ({ message: 'Tipo de usuário deve ser admin ou instrutor' })
  }),
  
  status: z.enum(['ativo', 'inativo'], {
    errorMap: () => ({ message: 'Status deve ser ativo ou inativo' })
  })
});

export type UserFormData = z.infer<typeof userSchema>;
