import type { Server, Socket } from 'socket.io';
import { JwtPayload } from 'jsonwebtoken';
import { JwtService } from '../../services';
import { prisma } from '../../prisma';

export const handshake = async (io: Server, socket: Socket) => {
  try {
    const payload = JwtService.decrypt<JwtPayload>(socket.handshake.auth.token);

    const count = await prisma.user.count({
      where: {
        id: Number(payload.userId),
      },
    });

    if (count === 0) throw new Error('no user found');

    socket.data.userId = payload.userId;
  } catch (err) {
    socket.disconnect();
  }
};
