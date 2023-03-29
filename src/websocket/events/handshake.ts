import type { Server, Socket } from 'socket.io';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const handshake = (io: Server, socket: Socket) => {
  // Valida o token do usuário `socket.handshake.auth.token`
  // Desconecta caso o token seja inválido pelo `socket.disconnect()`
};
