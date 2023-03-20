import type { User } from '@prisma/client';
import type { Request } from 'express';

export interface RequestWithUser extends Request {
  user?: User;
}
