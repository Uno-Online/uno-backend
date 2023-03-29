import { NextFunction, Response } from 'express';
import { RequestWithUser } from '../../types/request-with-user';
import { avatarSeedValidationSchema } from './avatar-seed.validation';
import { BadRequest } from '../../exceptions';
import { prisma } from '../../prisma';
import { AVATAR_SVG_URL } from '../../constants';

export const updateAvatar = async (
  req: RequestWithUser,
  res: Response,
  next: NextFunction
) => {
  const body = avatarSeedValidationSchema.safeParse(req.body);

  if (!body.success) {
    throw new BadRequest('Invalid request body');
  }

  const id = req.user?.id;
  const { avatarSeed } = body.data;

  try {
    await prisma.user.update({
      where: {
        id,
      },
      data: {
        avatarSeed,
      },
    });

    const url = new URL('', AVATAR_SVG_URL);
    url.searchParams.set('seed', String(avatarSeed));

    return res.json({
      url,
      avatarSeed,
    });
  } catch (error) {
    next(error);
  }
};
