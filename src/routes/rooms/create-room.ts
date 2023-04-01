import { RoomCardState, RoomState } from '@prisma/client';
import { NextFunction, Response } from 'express';
import { RequestWithUser } from '../../types/request-with-user';
import { roomNameValidatorSchema } from './room.validation';
import { prisma } from '../../prisma';

export const createRoom = async (
  req: RequestWithUser,
  res: Response,
  next: NextFunction
) => {
  const data = roomNameValidatorSchema.parse(req.body);
  const { id: userId } = req.user!;

  try {
    const { creatorId, ...room } = await prisma.$transaction(async (tx) => {
      const roomData = await tx.room.create({
        data: {
          name: data.name,
          creatorId: userId,
          state: RoomState.WAITING_FOR_PLAYERS,
        },
      });

      const roomCard = (await tx.card.findMany({ select: { id: true } }))
        .sort(() => Math.random() - 0.5)
        .map((obj) => ({
          cardId: obj.id,
          roomId: roomData.id,
          state: RoomCardState.ON_DECK,
        }));

      await tx.roomCard.createMany({
        data: roomCard,
      });

      return roomData;
    });

    res.json(room);
  } catch (err) {
    next(err);
  }
};
