import type { Request } from 'express';

export interface RequestWithUser extends Request {
  user?: {
    id: number;
    username: string;
    email: string | null;
    avatarSeed: number;
    avatarUrl: string;
    createdAt: Date;
    updatedAt: Date;
  };
}
