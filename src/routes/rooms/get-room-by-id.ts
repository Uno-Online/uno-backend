import { RoomPlayerStatus } from '@prisma/client';
import type { Request, Response } from 'express';
import { BadRequest } from '../../exceptions';
import { prisma } from '../../prisma';
import { paramIdValidationSchema } from './param-id.validation';

export const getRoomById = async (req: Request, res: Response) => {
  const data = paramIdValidationSchema.parse(req.params?.id);

  const room = await prisma.room.findFirst({
    where: {
      id: data,
    },
    select: {
      id: true,
      name: true,
      flow: true,
      state: true,
      players: {
        select: {
          status: true,
          player: {
            select: {
              id: true,
              username: true,
            },
          },
        },
        where: {
          status: RoomPlayerStatus.CONNECTED,
        },
      },
    },
  });

  if (!room) throw new BadRequest('Room id not found');

  res.json({
    ...room,
    players: room.players.flatMap(({ player, status }) => ({
      ...player,
      status,
    })),
  });
};
