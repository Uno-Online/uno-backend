import type { Request, Response } from 'express';
import { prisma } from '../../prisma';

/**
 * Retorna uma lista paginada de salas abertas
 * */
export const getRoomById = async (req: Request, res: Response) => {
  const { id } = req.params;

  const room = await prisma.room.findUnique({
    include: {
      _count: {
        select: { players: true },
      },
    },
    where: { id: Number(id) },
  });

  if (room) {
    res.json(room);
  } else {
    res.json({ success: false });
  }
};
