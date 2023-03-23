import type { Request, Response } from 'express';
import { prisma } from '../../prisma';
import { paramIdValidationSchema } from './param-id.validation';

export const getRoomById = async (req: Request, res: Response) => {
  const params = paramIdValidationSchema.safeParse(req.params?.id);

  if (!params.success) {
    return res.status(400).json({ success: false, message: 'Invalid param' });
  }

  const room = await prisma.room.findUnique({
    where: {
      id: params.data,
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
    return res.json({ success: false });
  }

  return res.json({
    ...room,
    players: room.players.flatMap((obj) => obj.player),
  });
};
