import { z } from 'zod';

export const registerUserValidationSchema = z.object({
  username: z.string(),
  email: z.string().email(),
  password: z.string().min(7).max(20),
});
