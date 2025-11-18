import { z } from 'zod';

// This file is a placeholder for reusable Zod schemas and validation helpers.
// As the application grows, common validation patterns can be centralized here.

/**
 * @summary A basic string validator for names (1-100 characters).
 */
export const zName = z
  .string()
  .min(1, 'Name cannot be empty.')
  .max(100, 'Name cannot exceed 100 characters.');

/**
 * @summary A validator for optional descriptions (max 500 characters).
 */
export const zNullableDescription = z
  .string()
  .max(500, 'Description cannot exceed 500 characters.')
  .nullable();

/**
 * @summary A validator for positive integer IDs.
 */
export const zId = z.coerce
  .number()
  .int('ID must be an integer.')
  .positive('ID must be a positive number.');
