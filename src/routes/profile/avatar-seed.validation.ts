import { z } from 'zod';

export const avatarSeedValidationSchema = z.object({
  avatarSeed: z.number().nonnegative().int(),
});
