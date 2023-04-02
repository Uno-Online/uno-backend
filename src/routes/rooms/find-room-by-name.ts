import { Request, Response } from 'express';
import { prisma } from '../../prisma';

export const findRoomByName = async (req: Request, res: Response) => {
  const data = req.query;
  const name = String(data.name);

  const rooms = await prisma.room.findMany({
    where: {
      name: {
        contains: name,
      },
    },
    select: {
      id: true,
      name: true,
    },
  });

  res.json({ success: true, rooms });
};
