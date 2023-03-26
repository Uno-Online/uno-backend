import { Server } from 'socket.io';
import http from 'http';
import { handshake } from './events/handshake';
import * as incomingEvents from './events';
import type { IncomingEvents } from './types';

export class SocketServer {
  public static io: Server<IncomingEvents>;

  static init(
    server: http.Server<typeof http.IncomingMessage, typeof http.ServerResponse>
  ) {
    this.io = new Server(server, {
      cors: {
        // TODO: Change to whitelisted domains
        origin: '*',
      },
    });

    this.io.on('connection', (socket) => {
      handshake(this.io, socket);

      Object.entries(incomingEvents).forEach(([key, handler]) => {
        socket.on(key as keyof IncomingEvents, handler(this.io, socket));
      });
    });
  }
}
