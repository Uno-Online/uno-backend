import { Response } from 'express';
import { RequestWithUser } from '../../types/request-with-user';
import { prisma } from '../../prisma';
import { paramIdValidationSchema } from './param-id.validation';

export const deleteRoomById = async (req: RequestWithUser, res: Response) => {
  const id = paramIdValidationSchema.safeParse(req.params?.id);
  const userId = req.user?.id;

  if (!id.success) {
    return res.status(400).json({ success: false, message: 'Invalid param' });
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

  await prisma.$transaction(async (tx) => {
    await tx.roomCard.deleteMany({ where: { roomId: room.id } });
    await tx.roomPlayer.deleteMany({ where: { roomId: room.id } });
    await tx.roomRound.deleteMany({ where: { roomId: room.id } });
    await tx.room.delete({ where: { id: room.id } });
  });

  return res.json({ success: true });
};
