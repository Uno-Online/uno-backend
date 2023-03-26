import { z } from 'zod';

export const paramsPaginationValidation = z.object({
  take: z.coerce.bigint().nonnegative().default(BigInt(50)),
  skip: z.coerce.bigint().nonnegative().default(BigInt(0)),
});
