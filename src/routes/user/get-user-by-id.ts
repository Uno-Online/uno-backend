import type { Response } from 'express';
import { paramIdValidationSchema } from '../rooms/param-id.validation';
import { RequestWithUser } from '../../types/request-with-user';
import { prisma } from '../../prisma';
import { BadRequest } from '../../exceptions';

/**
 * Retorna informações buscadas de um usuário
 * */
export const getUserById = async (req: RequestWithUser, res: Response) => {
  const id = paramIdValidationSchema.parse(req.params?.id);

  const userFound = await prisma.user.findUnique({
    where: {
      id,
    },
    select: {
      id: true,
      username: true,
    },
  });

  if (!userFound) {
    throw new BadRequest('User not found');
  }

  return res.json(userFound);
};
