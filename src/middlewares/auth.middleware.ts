import { Request, Response, NextFunction } from 'express';
import { CookieKey } from '../constants/cookie-key';
import { Forbidden } from '../exceptions';
import { prisma } from '../prisma';
import { JwtService } from '../services';

/**
 * Middleware para validar o cookie `auth_token`
 * Se a validação ocorrer com sucesso, o `req.user` irá conter os dados do usuário autorizado
 * */
export const authMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { [CookieKey.AuthToken]: authToken } = req.cookies;

  if (
    !req.url.startsWith('/authentication') &&
    !req.url.startsWith('/avatars')
  ) {
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

      throw new Forbidden('no user found with this token');
    } catch (err) {
      // res.json({ success: false, message: 'invalid jwt' });
      // return;
      next(err);
    }
  }

  next();
};
