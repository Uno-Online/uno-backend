import type { Server, Socket } from 'socket.io';
import { prisma } from '../../prisma';

export function joinRoom(io: Server, socket: Socket) {
  return async (roomId: string) => {
    try {
      // Validação da sala e do user
      const id = parseInt(roomId);
      const playerId = socket.data.userId;
      const lastPlayer = await prisma.roomPlayer.findFirst({
        where: {
          roomId: id,
        },
        orderBy: {
          index: 'desc',
        },
      });

      if (
        !(await prisma.room.count({
          where: {
            state: 'WAITING_FOR_PLAYERS',
            id,
          },
        }))
      )
        throw new Error();

      await prisma.roomPlayer.create({
        data: {
          index: lastPlayer?.index || 0,
          playerId,
          roomId: id,
        },
      });

      socket.join(`room-${roomId}`);
      io.to(`room-${roomId}`).emit('playerJoinedRoom', { playerId, roomId });
    } catch (error) {
      return;
    }
  };
}
