import { Prisma, RoomState } from '@prisma/client';
import { NextFunction, Response } from 'express';
import { RequestWithUser } from '../../types/request-with-user';
import { roomNameValidatorSchema } from './room.validation';
import { BadRequest } from '../../exceptions';
import { prisma } from '../../prisma';

export const createRoom = async (
  req: RequestWithUser,
  res: Response,
  next: NextFunction
) => {
  const data = roomNameValidatorSchema.parse(req.body);
  const { id: userId } = req.user!;

  try {
    const { creatorId, ...room } = await prisma.room.create({
      data: {
        name: data.name,
        creatorId: userId,
        state: RoomState.WAITING_FOR_PLAYERS,
      },
    });
    res.status(200).json(room);
  } catch (err) {
    if (err instanceof Prisma.PrismaClientKnownRequestError) {
      if (err.code === 'P2002') {
        throw new BadRequest('Room name already in use');
      }
    }
    next(err);
  }
};
