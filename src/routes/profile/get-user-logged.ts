import type { Response } from 'express';
import { RequestWithUser } from '../../types/request-with-user';
import { prisma } from '../../prisma';

/**
 * Retorna informações sobre o usuário logado
 * */
export const getUserLogged = async (req: RequestWithUser, res: Response) => {
  const user = await prisma.user.findUnique({
    where: {
      id: req.user?.id,
    },
    select: {
      avatarSeed: true,
    },
  });

  const userLogged = {
    id: req.user?.id,
    avatarSeed: user?.avatarSeed,
    username: req.user?.username,
    email: req.user?.email,
  };

  return res.json(userLogged);
};
