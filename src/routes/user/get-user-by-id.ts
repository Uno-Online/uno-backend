import { Request, Response } from 'express';
import { paramIdValidationSchema } from '../rooms/param-id.validation';
import { prisma } from '../../prisma';
import { BadRequest } from '../../exceptions';

/**
 * Retorna informações buscadas de um usuário
 * */
export const getUserById = async (req: Request, res: Response) => {
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
    throw new BadRequest(req.__internalize('user_not_found'));
  }

  res.json(userFound);
};
