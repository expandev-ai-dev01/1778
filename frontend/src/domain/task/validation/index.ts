import { z } from 'zod';
import { PRIORITIES } from '../constants';

export const createTaskSchema = z.object({
  title: z
    .string()
    .min(1, { message: 'O campo título é obrigatório.' })
    .max(150, { message: 'O título não pode ter mais de 150 caracteres.' }),
  description: z
    .string()
    .max(1000, { message: 'A descrição não pode ter mais de 1000 caracteres.' })
    .optional(),
  due_date: z
    .string()
    .optional()
    .refine(
      (date) => {
        if (!date) return true; // Optional field
        return new Date(date) >= new Date();
      },
      { message: 'A data de vencimento não pode ser uma data passada.' }
    ),
  priority: z.enum(PRIORITIES, { message: 'Prioridade inválida.' }),
});
