import { Server } from 'socket.io';
import http from 'http';

export class SocketServer {
  public static io: Server;

  static init(
    server: http.Server<typeof http.IncomingMessage, typeof http.ServerResponse>
  ) {
    this.io = new Server(server);
  }
}
