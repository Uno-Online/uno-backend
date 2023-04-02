import { NextFunction, Response } from 'express';
import { RequestWithUser } from '../../types/request-with-user';
import { avatarSeedValidationSchema } from './avatar-seed.validation';
import { prisma } from '../../prisma';
import { AVATAR_SVG_URL } from '../../constants';

export const updateAvatar = async (
  req: RequestWithUser,
  res: Response,
  next: NextFunction
) => {
  const body = avatarSeedValidationSchema.parse(req.body);

  const { id } = req.user!;
  const { avatarSeed } = body;

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
    res.json({
      url,
      avatarSeed,
    });
  } catch (error) {
    next(error);
  }
};
