import type { Request, Response } from 'express';
import { BadRequest } from '../../exceptions';
import { prisma } from '../../prisma';
import { paramIdValidationSchema } from './param-id.validation';

export const getRoomById = async (req: Request, res: Response) => {
  const data = paramIdValidationSchema.parse(req.params?.id);

  const room = await prisma.room.findUnique({
    where: {
      id: data,
    },
    select: {
      id: true,
      name: true,
      players: {
        select: {
          player: {
            select: {
              id: true,
              username: true,
            },
          },
        },
      },
    },
  });

  if (!room) {
    throw new BadRequest('Room id not fould');
  }

  return res.json({
    ...room,
    players: room.players.flatMap((obj) => obj.player),
  });
};
