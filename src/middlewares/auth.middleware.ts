import { Response, NextFunction } from 'express';
import { CookieKey } from '../constants/cookie-key';
import { Forbidden } from '../exceptions';
import { prisma } from '../prisma';
import { JwtService } from '../services';
import type { RequestWithUser } from '../types/request-with-user';
import { generateAvatarUrl } from '../utils';
import type { JwtPayload } from '../types/jwt-payload';

/**
 * Middleware para validar o cookie `auth_token`
 * Se a validação ocorrer com sucesso, o `req.user` irá conter os dados do usuário autorizado
 * */
export const authMiddleware = async (
  req: RequestWithUser,
  res: Response,
  next: NextFunction
) => {
  const { [CookieKey.AuthToken]: authToken } = req.cookies;

  if (
    !req.url.startsWith('/authentication') &&
    !req.url.startsWith('/avatars')
  ) {
    try {
      const payload = JwtService.decrypt<JwtPayload>(authToken);

      const user = await prisma.user.findFirst({
        select: {
          id: true,
          username: true,
          email: true,
          avatarSeed: true,
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
        const [, avatarUrl] = generateAvatarUrl(user.avatarSeed);
        req.user = { ...user, avatarUrl };

        next();
        return;
      }

      throw new Forbidden('no user found with this token');
    } catch (err) {
      next(err);
    }
  }

  next();
};
