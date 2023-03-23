import type { Response } from 'express';
import { RequestWithUser } from '../../types/request-with-user';
import { prisma } from '../../prisma';

/**
 * Retorna informações buscadas de um usuário
 * */
export const getUserById = async (req: RequestWithUser, res: Response) => {
  const { id } = req.params;

  const userFound = await prisma.user.findUnique({
    where: {
      id: Number(id),
    },
    select: {
      id: true,
      username: true,
    },
  });

  if (!userFound) {
    return res.status(400).json({ success: false, message: 'User not found' });
  }

  return res.json(userFound);
};
