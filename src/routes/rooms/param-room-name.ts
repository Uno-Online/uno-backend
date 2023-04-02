import { z } from 'zod';

export const paramRoomName = z.object({
  name: z.string().default(''),
});
