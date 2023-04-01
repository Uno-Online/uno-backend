import { RoomState } from '@prisma/client';
import { Response } from 'express';
import { RequestWithUser } from '../../types/request-with-user';
import { roomNameValidatorSchema } from './room.validation';
import { prisma } from '../../prisma';

export const createRoom = async (req: RequestWithUser, res: Response) => {
  const data = roomNameValidatorSchema.parse(req.body);
  const { id: userId } = req.user!;

  const { creatorId, ...room } = await prisma.room.create({
    data: {
      name: data.name,
      creatorId: userId,
      state: RoomState.WAITING_FOR_PLAYERS,
    },
  });

  res.json(room);
};
