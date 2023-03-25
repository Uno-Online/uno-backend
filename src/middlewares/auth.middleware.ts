import { Response, NextFunction } from 'express';
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

  if (!req.url.startsWith('/authentication' && '/avatars')) {
    try {
      const payload = JwtService.decrypt<{ userId: number }>(authToken);

      const user = await prisma.user.findFirst({
        select: {
          id: true,
          username: true,
          email: true,
          createdAt: true,
          updatedAt: true,
        },
        where: {
          id: payload.userId,
          sessions: {
            some: {
              token: authToken,
            },
          },
        },
      });

      if (user) {
        req.user = user;

        next();
        return;
      }

      res.json({ success: false, message: 'no user found with this token' });
    } catch (err) {
      res.json({ success: false, message: 'invalid jwt' });
      return;
    }
  }

  next();
};
