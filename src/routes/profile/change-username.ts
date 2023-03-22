import { Response } from 'express';
import { prisma } from '../../prisma';
import { RequestWithUser } from '../../types/request-with-user';

export const changeUsername = async (req: RequestWithUser, res: Response ): Promise<Response> => {
  const username = req.body.username ? String(req.body.username).trim() : undefined;

  if(!username) {
    return res.json({ success: false, message: 'Invalid request body' })
  }

  if (req.user?.username === username) {
    return res.json({
      id: req.user?.id,
      username,
      email: req.user?.email,
    });
  }

  const usernameInUse = await prisma.user.findFirst({
    where: {
      username,
    },
  });

  if (usernameInUse) {
    return res.json({ success: false, message: 'Username is already being used' });
  }

  await prisma.user.update({
    where: {
      username: req.user?.username,
    },
    data: {
      username,
    },
  });

  return res.json({
    id: req.user?.id,
    username,
    email: req.user?.email,
  });
};
