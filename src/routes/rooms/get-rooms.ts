import { RoomState } from '@prisma/client';
import { Response } from 'express';
import { BadRequestException } from '../../exceptions';
import { prisma } from '../../prisma';
import type { RequestWithUser } from '../../types/request-with-user';
import { paramsPaginationValidation } from './params-pagination.validation';

/**
 * Retorna uma lista paginada de salas abertas
 * */
export const getRooms = async (req: RequestWithUser, res: Response) => {
  const params = paramsPaginationValidation.safeParse(req.query);

  if (!params.success) {
    throw new BadRequestException('Invalid param');
  }

  const take = params.data.take ?? 50;
  const skip = params.data.skip ?? 0;

  const result = await prisma.$transaction([
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

  const totalRooms = result[0];

  const totalPage = totalRooms > 0 ? Math.ceil(totalRooms / take) : 1;
  const currentPage = Math.floor(skip / take) + 1;

  const rooms = result[1].map((obj) => {
    // eslint-disable-next-line @typescript-eslint/naming-convention
    const { _count, ...room } = obj;
    return Object.assign(room, { players: _count.players });
  });

  return res.json({ totalRooms, currentPage, totalPage, rooms });
};
