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

  /**
   * Retorna dados de uma sala por ID
   * */
  public async getById(req: Request, res: Response) {
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
  }
}
