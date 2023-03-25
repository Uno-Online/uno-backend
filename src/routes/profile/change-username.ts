import { Response } from 'express';
import { prisma } from '../../prisma';
import { RequestWithUser } from '../../types/request-with-user';
import { usernameValidationSchema } from './username.validation';

export const changeUsername = async (
  req: RequestWithUser,
  res: Response
): Promise<Response> => {
  const body = usernameValidationSchema.safeParse(req.body);

  if (!body.success) {
    return res.status(400).json({ success: false, message: 'Invalid request body' });
  }

  const { data } = body;

  if (req.user?.username === data.username) {
    return res.json({
      id: req.user?.id,
      username: data.username,
      email: req.user?.email,
      createdAt: req.user?.createdAt,
      updatedAt: req.user?.updatedAt,
    });
  }

  const usernameInUse = await prisma.user.count({
    where: {
      username: data.username,
    },
  });

  if (usernameInUse >= 1) {
    return res.status(400).json({
      success: false,
      message: 'Username is already being used',
    });
  }

  await prisma.user.update({
    where: {
      id: req.user?.id,
    },
    data: {
      username: data.username,
    },
  });

  return res.json({
    id: req.user?.id,
    username: data.username,
    email: req.user?.email,
    createdAt: req.user?.createdAt,
    updatedAt: req.user?.updatedAt,
  });
};
