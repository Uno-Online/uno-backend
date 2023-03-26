import type { Server, Socket } from 'socket.io';

export function joinRoom(io: Server, socket: Socket) {
  return async (roomId: number) => {
    // Validação da sala e do user
    const playerId = 1;

    socket.join(`room-${roomId}`);
    io.to(`room-${roomId}`).emit('playerJoinedRoom', { playerId, roomId });
  };
}
