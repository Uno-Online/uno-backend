import type { Server, Socket } from 'socket.io';
import { JwtService } from '../../services';
import { JwtPayload } from 'jsonwebtoken';
import { prisma } from '../../prisma';

export const handshake = async (io: Server, socket: Socket) => {
  try {
    const token = JwtService.decrypt(
      socket.handshake.auth.token
    ) as JwtPayload & { userId: string };
    const count = await prisma.user.count({
      where: {
        id: Number(token.userId),
      },
    });

    if (count === 0) throw new Error('no user found');

    socket.data.userId = token.userId;
  } catch (error) {
    socket.disconnect();
  }
};
