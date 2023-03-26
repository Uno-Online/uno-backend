import { RoomState } from '@prisma/client';
import { Response } from 'express';
import { BadRequest } from '../../exceptions';
import { prisma } from '../../prisma';
import type { RequestWithUser } from '../../types/request-with-user';
import { paramsPaginationValidation } from './params-pagination.validation';

/**
 * Retorna uma lista paginada de salas abertas
 * */
export const getRooms = async (req: RequestWithUser, res: Response) => {
  const params = paramsPaginationValidation.safeParse(req.query);

  if (!params.success) {
    throw new BadRequest('Invalid param');
  }

  const [take, skip] = [Number(params.data.take), Number(params.data.skip)];

  const [totalRooms, roomsResult] = await prisma.$transaction([
    prisma.room.count({
      where: {
        state: RoomState.WAITING_FOR_PLAYERS,
      },
    }),
    prisma.room.findMany({
      include: {
        _count: {
          select: { players: true },
        },
      },
      where: {
        state: RoomState.WAITING_FOR_PLAYERS,
      },
      take,
      skip,
    }),
  ]);

  const totalPage = totalRooms > 0 ? Math.ceil(totalRooms / take) : 1;
  const currentPage = Math.floor(skip / take) + 1;

  const rooms = roomsResult.map((obj) => {
    const { _count: count, ...room } = obj;
    return Object.assign(room, { players: count.players });
  });

  return res.json({ totalRooms, currentPage, totalPage, rooms });
};
