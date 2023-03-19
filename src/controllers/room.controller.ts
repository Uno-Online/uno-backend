import { RoomState } from '@prisma/client';
import type { Request, Response } from 'express';
import { prisma } from '../prisma';
import type { Controller } from '../types';

export class RoomController implements Controller {
  /**
   * Retorna uma lista paginada de salas abertas
   * */
  public async index(req: Request, res: Response) {
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
  }
}
