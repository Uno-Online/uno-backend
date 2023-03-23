import type { Response } from 'express';
import { RequestWithUser } from '../../types/request-with-user';
import { prisma } from '../../prisma';
import { CookieKey } from '../../constants/cookie-key';

/**
 * Retorna informações sobre o usuário logado
 * */
export const getUserLogged = async (req: RequestWithUser, res: Response) => {
  const userId = req.user?.id;
  const token = req.cookies[CookieKey.AuthToken]

  if (!userId || !token) {
    return res.json({ success: false, message: 'user not logged' });
  }

  const userSession = await prisma.userSession.findFirst({
    where: {
       AND: [
        {
          userId: Number(userId)
        },
        {
          token
        }
       ]
    },
  });

  if (!userSession) {
    return res.json({ success: false, message: 'error find session' });
  } 

  const userLogged = await prisma.user.findUnique({
    where: {
      id: userSession.userId
    },
    select: {
      id: true,
      username: true,
      email: true
    }
  })

  if (!userLogged) {
    return res.json({ success: false, message: 'user not found' });
  } 

  return res.json(userLogged);
};
