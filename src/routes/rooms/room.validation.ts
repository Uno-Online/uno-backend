import { z } from 'zod';

export const roomNameValidatorSchema = z.object({
  name: z.string().nonempty(),
});
