import { z } from 'zod';

export const paramIdValidationSchema = z
  .string()
  .regex(/^\d+$/)
  .transform(Number);
