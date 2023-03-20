import 'dotenv/config';
import cookieParser from 'cookie-parser';
import express from 'express';
import http from 'http';
import { SocketServer } from './socket-server';
import { router } from './routes';
import { authMiddleware } from './middlewares/auth.middleware';

const app = express();

app.use(express.json());
app.use(cookieParser());
app.use(authMiddleware);
app.use(router);

const server = http.createServer(app);

SocketServer.init(server);

server.listen(process.env.PORT || 3000);
