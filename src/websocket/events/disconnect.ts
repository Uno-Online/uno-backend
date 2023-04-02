import { RoomPlayerStatus } from '@prisma/client';
import type { DisconnectReason, Server, Socket } from 'socket.io';
import { logger } from '../../logger';
import { prisma } from '../../prisma';

/**
 * Evento de desconexão de WebSocket
 * */
export function disconnect(_io: Server, socket: Socket) {
  return async (reason: DisconnectReason) => {
    await prisma.roomPlayer.updateMany({
      where: {
        playerId: socket.data.userId,
      },
      data: {
        status: RoomPlayerStatus.DISCONNECTED,
      },
    });

    logger.info(`Player disconnected with reason: ${reason}`);
  };
}
