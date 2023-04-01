import type { Response } from 'express';
import { paramIdValidationSchema } from '../rooms/param-id.validation';
import { RequestWithUser } from '../../types/request-with-user';
import { prisma } from '../../prisma';
import { BadRequest } from '../../exceptions';
import { generateAvatarUrl } from '../../utils/generate-avatar-url';

/**
 * Retorna informações buscadas de um usuário
 * */
export const getUserById = async (req: RequestWithUser, res: Response) => {
  const id = paramIdValidationSchema.parse(req.params?.id);

  const user = await prisma.user.findUnique({
    where: {
      id,
    },
    select: {
      id: true,
      username: true,
      avatarSeed: true,
    },
  });

  if (!user) {
    throw new BadRequest('User not found');
  }

  const [, avatarUrl] = generateAvatarUrl(user.avatarSeed);

  res.json({ ...user, avatarUrl });
};
