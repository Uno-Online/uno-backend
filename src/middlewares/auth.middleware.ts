import { Response, NextFunction } from 'express';
import { date } from 'zod';
import { CookieKey } from '../constants/cookie-key';
import { prisma } from '../prisma';
import { JwtService } from '../services';
import type { RequestWithUser } from '../types/request-with-user';

export const authMiddleware = async (
  req: RequestWithUser,
  res: Response,
  next: NextFunction
) => {
  const { [CookieKey.AuthToken]: authToken } = req.cookies;
    if (!req.url.startsWith('/authentication')) {
        try {
          const user = JwtService.securedDecrypt<{
                      id: number;
                      username: string;
                      email: string | null;
                      createdAt: Date;
                      updatedAt: Date;
                }>(authToken);
            
            req.user = user;
            next();
            return
        } catch (err) {
            res.json({ success: false, message: 'invalid jwt' });
            return;
          }
    }

    next()
};
