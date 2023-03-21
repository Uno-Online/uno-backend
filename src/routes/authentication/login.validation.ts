import { z } from 'zod';

export const loginValidationSchema = z.object({
  username: z.string(),
  password: z.string().min(7).max(20),
});
