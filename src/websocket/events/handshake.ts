import type { Server, Socket } from 'socket.io';
import { JwtPayload } from 'jsonwebtoken';
import { JwtService } from '../../services';
import { prisma } from '../../prisma';
import { logger } from '../../logger';

/**
 * Autenticação do usuário no WebSocket
 * */
export const handshake = async (io: Server, socket: Socket) => {
  try {
    const payload = JwtService.decrypt<JwtPayload>(socket.handshake.auth.token);

    const count = await prisma.user.count({
      where: {
        id: Number(payload.userId),
      },
    });

    if (count === 0) throw new Error('no user found');

    io.sockets.sockets.forEach((_socket) => {
      if (_socket.data.userId === payload.userId) {
        _socket.disconnect();
      }
    });

    socket.data.userId = payload.userId;

    logger.info(`Player ${payload.userId} connected to the socket`);
  } catch (err) {
    socket.disconnect();
    logger.error('Player failed to handshake');
  }
};
