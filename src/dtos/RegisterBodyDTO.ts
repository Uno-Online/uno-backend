import { z } from 'zod';

const regiterBodyDto = z.object({
  username: z.string(),
  email: z.string().email(),
  password: z.string().min(7).max(20),
});

export type RegisterBodyType = z.infer<typeof regiterBodyDto>;
export default regiterBodyDto;
