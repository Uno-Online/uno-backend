import { Prisma } from '@prisma/client';
import { Response } from 'express';
import { prisma } from '../../prisma';
import { RequestWithUser } from '../../types/request-with-user';
import { paramIdValidationSchema } from './param-id.validation';
import { roomNameValidatorSchema } from './room.validation';

export const updateRoomNameById = async (
  req: RequestWithUser,
  res: Response
) => {
  const id = paramIdValidationSchema.safeParse(req.params?.id);
  const body = roomNameValidatorSchema.safeParse(req.body);
  const userId = req.user?.id;

  if (!id.success) {
    return res.status(400).json({ success: false, message: 'Invalid param' });
  }

  if (!body.success) {
    return res
      .status(400)
      .json({ success: false, message: 'Invalid room request body' });
  }

  const room = await prisma.room.findUnique({
    where: {
      id: id.data,
    },
    select: {
      id: true,
      creatorId: true,
    },
  });

  if (room === null) {
    return res
      .status(400)
      .json({ success: false, message: 'Room does not exist' });
  }

  if (room.creatorId !== userId) {
    return res
      .status(403)
      .json({ success: false, message: 'Player is not the owner of the room' });
  }

  try {
    await prisma.room.update({
      where: {
        id: id.data,
      },
      data: {
        name: body.data.name,
      },
    });
  } catch (err) {
    if (err instanceof Prisma.PrismaClientKnownRequestError) {
      if (err.code === 'P2002') {
        return res
          .status(400)
          .json({ success: false, message: 'Room name already in use' });
      }
    }
  }
  return res.json({ success: true });
};
