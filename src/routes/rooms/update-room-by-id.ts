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
  const param = paramIdValidationSchema.safeParse(req.params?.id);
  const body = roomNameValidatorSchema.safeParse(req.body);
  const userId = req.user?.id;

  if (!param.success) {
    return res.status(400).json({ success: false, message: 'Invalid param' });
  }

  if (!body.success) {
    return res
      .status(400)
      .json({ success: false, message: 'Invalid room request body' });
  }

  const room = await prisma.room.findUnique({
    where: {
      id: param.data,
    },
  });

  if (!room) {
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
        id: param.data,
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
    return res.status(500).json({ success: false });
  }

  const resRoom = {
    id: room.id,
    name: body.data.name,
    flow: room.flow,
    state: room.state,
    createdAt: room.createdAt,
    updatedAt: room.updatedAt,
  };

  return res.json(resRoom);
};
