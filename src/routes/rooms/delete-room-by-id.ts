import { Response } from 'express';
import { RequestWithUser } from '../../types/request-with-user';
import { prisma } from '../../prisma';
import { paramIdValidationSchema } from './param-id.validation';
import { BadRequest, Forbidden } from '../../exceptions';

export const deleteRoomById = async (req: RequestWithUser, res: Response) => {
  const id = paramIdValidationSchema.parse(req.params?.id);
  const userId = req.user?.id;

  const room = await prisma.room.findUnique({
    where: {
      id: id,
    },
    select: {
      id: true,
      creatorId: true,
    },
  });

  if (room === null) {
    throw new BadRequest('Room does not exist');
  }

  if (room.creatorId !== userId) {
    throw new Forbidden('Player is not the owner of the room');
  }

  await prisma.$transaction(async (tx) => {
    await tx.roomCard.deleteMany({ where: { roomId: room.id } });
    await tx.roomPlayer.deleteMany({ where: { roomId: room.id } });
    await tx.roomRound.deleteMany({ where: { roomId: room.id } });
    await tx.room.delete({ where: { id: room.id } });
  });

  return res.json({ success: true });
};
