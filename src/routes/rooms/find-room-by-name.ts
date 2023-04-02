import { Request, Response } from 'express';
import { prisma } from '../../prisma';
import { paramRoomName } from './param-room-name';

export const findRoomByName = async (req: Request, res: Response) => {
  const data = paramRoomName.parse(req.query);

  const rooms = await prisma.room.findMany({
    where: {
      name: {
        contains: data.name,
      },
    },
    select: {
      id: true,
      name: true,
    },
  });

  res.json({ success: true, rooms });
};
