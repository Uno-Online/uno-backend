import express from 'express';
import http from 'http';
import { SocketServer } from './socket-server';
import { router } from './routes';

const app = express();

app.use(express.json());
app.use(router);

const server = http.createServer(app);

SocketServer.init(server);

server.listen(process.env.PORT || 3000);
