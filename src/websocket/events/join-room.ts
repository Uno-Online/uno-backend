import { RoomPlayerStatus, RoomState } from '@prisma/client';
import type { Server, Socket } from 'socket.io';
import { SocketError } from '../../constants/socket-error';
import { logger } from '../../logger';
import { prisma } from '../../prisma';
import type { AcknowledgeCallback } from '../types';

/**
 * Evento para entar em uma sala
 * */
export function joinRoom(io: Server, socket: Socket) {
  return async (roomId: string, ack: AcknowledgeCallback) => {
    try {
      const id = Number(roomId);
      const playerId = socket.data.userId;

      await prisma.$transaction(async (tx) => {
        const room = await tx.room.findFirst({
          select: {
            _count: {
              select: { players: true },
            },
          },
          where: {
            state: RoomState.WAITING_FOR_PLAYERS,
            id,
          },
        });

        if (!room) throw new Error('no room found with conditions');
        if (room._count.players === 4) throw new Error('room is already full');

        const lastPlayer = await tx.roomPlayer.findFirst({
          where: {
            roomId: id,
          },
          orderBy: {
            index: 'desc',
          },
        });

        const nextIndex = (lastPlayer?.index || 0) + 1;

        await tx.roomPlayer.upsert({
          where: {
            playerId_roomId: {
              playerId,
              roomId: id,
            },
          },
          update: {
            status: RoomPlayerStatus.CONNECTED,
          },
          create: {
            index: nextIndex,
            playerId,
            roomId: id,
          },
        });
      });

      socket.join(`room-${roomId}`);

      io.to(`room-${roomId}`).emit('playerJoinedRoom', { playerId, roomId });
      logger.info(`User ${playerId} joined room ${roomId}`);
    } catch (err: unknown) {
      if (err instanceof Error) {
        if (err.message === 'room not found') {
          ack({ code: SocketError.RoomNotFound });
          return;
        }

        if (err.message === 'room is already full') {
          ack({ code: SocketError.RoomIsFull });
          return;
        }
      }

      ack({ code: SocketError.FailedToJoinRoom });
    }
  };
}
