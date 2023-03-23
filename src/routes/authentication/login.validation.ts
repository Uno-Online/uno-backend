import * as z from 'zod';

// Defina o esquema para a validação do objeto do usuário.
export const loginValidationSchema = z.object({
  email: z.string().email(),
  password: z.string().max(20),
});
