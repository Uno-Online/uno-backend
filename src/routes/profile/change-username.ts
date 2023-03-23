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
    return res.json({ success: false, message: 'Invalid request body' });
  }

  const { data } = body;

  if (req.user?.username === data.username) {
    return res.json({
      id: req.user?.id,
      username: data.username,
      email: req.user?.email,
    });
  }

  const usernameInUse = await prisma.user.findFirst({
    where: {
      username: data.username,
    },
  });

  if (usernameInUse) {
    return res.json({
      success: false,
      message: 'Username is already being used',
    });
  }

  await prisma.user.update({
    where: {
      username: req.user?.username,
    },
    data: {
      username: data.username,
    },
  });

  return res.json({
    id: req.user?.id,
    username: data.username,
    email: req.user?.email,
  });
};
