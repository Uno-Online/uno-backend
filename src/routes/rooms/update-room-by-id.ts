import { Prisma } from '@prisma/client';
import { NextFunction, Response } from 'express';
import { BadRequest } from '../../exceptions';
import ForbiddenException from '../../exceptions/forbidden.exception';
import { prisma } from '../../prisma';
import { RequestWithUser } from '../../types/request-with-user';
import { paramIdValidationSchema } from './param-id.validation';
import { roomNameValidatorSchema } from './room.validation';

export const updateRoomNameById = async (
  req: RequestWithUser,
  res: Response,
  next: NextFunction
) => {
  const id = paramIdValidationSchema.parse(req.params?.id);
  const body = roomNameValidatorSchema.parse(req.body);
  const userId = req.user?.id;

  const room = await prisma.room.findUnique({
    where: {
      id,
    },
    select: {
      creatorId: true,
    },
  });

  if (!room) {
    throw new BadRequest('Room does not exist');
  }

  if (room.creatorId !== userId) {
    throw new ForbiddenException('Player is not the owner of the room');
  }

  try {
    await prisma.room.update({
      where: {
        id,
      },
      data: {
        name: body.name,
      },
    });
  } catch (err) {
    if (err instanceof Prisma.PrismaClientKnownRequestError) {
      if (err.code === 'P2002') {
        throw new BadRequest('Room name already in use');
      }
    }
    next(err);
  }

  const resRoom = await prisma.room.findUnique({
    where: {
      id,
    },
    select: {
      id: true,
      name: true,
      creatorId: false,
      flow: true,
      state: true,
      createdAt: true,
      updatedAt: true,
    },
  });

  return res.json(resRoom);
};
