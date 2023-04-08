import { Prisma } from '@prisma/client';
import { Request, NextFunction, Response } from 'express';
import { BadRequest, Forbidden } from '../../exceptions';
import { prisma } from '../../prisma';
import { paramIdValidationSchema } from './param-id.validation';
import { roomNameValidatorSchema } from './room.validation';

export const updateRoomNameById = async (
  req: Request,
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
    throw new BadRequest(req.__internalize('room_not_found'));
  }

  if (room.creatorId !== userId) {
    throw new Forbidden(req.__internalize('player_is_not_owner_of_the_room'));
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
        throw new BadRequest(req.__internalize('room_name_already_exists'));
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
