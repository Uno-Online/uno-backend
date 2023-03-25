import { z } from 'zod';

export const paramsPaginationValidation = z.object({
  take: z.union([z.undefined(), z.string().regex(/^\d+$/).transform(Number)]),
  skip: z.union([z.undefined(), z.string().regex(/^\d+$/).transform(Number)]),
});
