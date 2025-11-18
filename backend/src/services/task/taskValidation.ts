import { z } from 'zod';
import { priorities } from './taskTypes';

export const createTaskSchema = z.object({
  body: z.object({
    title: z
      .string({
        required_error: 'O campo título é obrigatório.',
      })
      .trim()
      .min(1, 'O campo título é obrigatório.')
      .max(150, 'O título não pode ter mais de 150 caracteres.'),
    description: z
      .string()
      .max(1000, 'A descrição não pode ter mais de 1000 caracteres.')
      .optional()
      .nullable(),
    due_date: z
      .string()
      .datetime({ message: 'O formato da data de vencimento é inválido.' })
      .optional()
      .nullable()
      .refine(
        (date) => {
          // Allow null or undefined dates
          if (!date) return true;
          // Check if the provided date is not in the past
          return new Date(date) >= new Date();
        },
        { message: 'A data de vencimento não pode ser uma data passada.' }
      ),
    priority: z.enum(priorities).optional(),
  }),
});
