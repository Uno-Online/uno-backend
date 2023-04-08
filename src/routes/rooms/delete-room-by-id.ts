import { Request, Response } from 'express';
import { prisma } from '../../prisma';
import { paramIdValidationSchema } from './param-id.validation';
import { BadRequest, Forbidden } from '../../exceptions';

export const deleteRoomById = async (req: Request, res: Response) => {
  const id = paramIdValidationSchema.parse(req.params?.id);
  const { id: userId } = req.user!;

  const room = await prisma.room.findUnique({
    where: {
      id,
    },
    select: {
      id: true,
      creatorId: true,
    },
  });

  if (room === null) {
    throw new BadRequest(req.__internalize('room_not_found'));
  }

  if (room.creatorId !== userId) {
    throw new Forbidden(req.__internalize('player_is_not_owner_of_the_room'));
  }

  await prisma.$transaction(async (tx) => {
    await tx.roomCard.deleteMany({ where: { roomId: room.id } });
    await tx.roomPlayer.deleteMany({ where: { roomId: room.id } });
    await tx.roomRound.deleteMany({ where: { roomId: room.id } });
    await tx.room.delete({ where: { id: room.id } });
  });

  res.json({ success: true });
};
