import { NextFunction, Response } from 'express';
import { prisma } from '../../prisma';
import { RequestWithUser } from '../../types/request-with-user';
import { usernameValidationSchema } from './username.validation';

export const changeUsername = async (
  req: RequestWithUser,
  res: Response,
  next: NextFunction
) => {
  const data = usernameValidationSchema.parse(req.body);
  const { id } = req.user!;

  try {
    await prisma.user.update({
      where: {
        id,
      },
      data: {
        username: data.username,
      },
    });

    const user = await prisma.user.findUnique({
      where: {
        id,
      },
      select: {
        id: true,
        username: true,
        email: true,
        createdAt: true,
        updatedAt: true,
      },
    });

    res.json(user);
  } catch (err) {
    next(err);
  }
};
