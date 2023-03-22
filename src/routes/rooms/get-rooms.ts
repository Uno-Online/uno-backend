import { RoomState } from '@prisma/client';
import { Response } from 'express';
import { prisma } from '../../prisma';
import type { RequestWithUser } from '../../types/request-with-user';

/**
 * Retorna uma lista paginada de salas abertas
 * */
export const getRooms = async (req: RequestWithUser, res: Response) => {
  const { take, skip } = req.query;

  res.json(
    await prisma.room.findMany({
      include: {
        _count: {
          select: { players: true },
        },
      },
      where: {
        state: RoomState.WAITING_FOR_PLAYERS,
      },
      take: Number(take ?? 50),
      skip: Number(skip ?? 0),
    })
  );
};
