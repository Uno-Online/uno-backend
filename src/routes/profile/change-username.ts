import { NextFunction, Response } from 'express';
import { prisma } from '../../prisma';
import { RequestWithUser } from '../../types/request-with-user';
import { usernameValidationSchema } from './username.validation';
import { BadRequest } from '../../exceptions';

export const changeUsername = async (
  req: RequestWithUser,
  res: Response,
  next: NextFunction
) => {
  const data = usernameValidationSchema.parse(req.body);

  try {
    if (req.user?.username === data.username) {
      res.json({
        id: req.user?.id,
        username: data.username,
        email: req.user?.email,
        createdAt: req.user?.createdAt,
        updatedAt: req.user?.updatedAt,
      });
      return;
    }

    const usernameInUse = await prisma.user.count({
      where: {
        username: data.username,
      },
    });

    if (usernameInUse >= 1) {
      throw new BadRequest('Username is already being used');
    }

    await prisma.user.update({
      where: {
        id: req.user?.id,
      },
      data: {
        username: data.username,
      },
    });

    res.json({
      id: req.user?.id,
      username: data.username,
      email: req.user?.email,
      createdAt: req.user?.createdAt,
      updatedAt: req.user?.updatedAt,
    });
  } catch (err) {
    next(err);
  }
};
