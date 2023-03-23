import { z } from 'zod';

export const usernameValidationSchema = z.object({
  username: z.string().max(20),
});