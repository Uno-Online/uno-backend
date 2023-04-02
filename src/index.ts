import 'dotenv/config';
import 'express-async-errors';
import cookieParser from 'cookie-parser';
import express from 'express';
import http from 'http';
import cors from 'cors';
import { SocketServer } from './websocket/socket-server';
import { router } from './routes';
import { logger } from './logger';
import { authMiddleware, errorHandlingMiddleware } from './middlewares';

const app = express();

app.use(
  cors({
    credentials: true,
    // TODO: Change to whitelisted domains
    origin: '*',
  })
);
app.use(express.json());
app.use(cookieParser());
app.use(authMiddleware);
app.use(router);
app.use(errorHandlingMiddleware);

const server = http.createServer(app);

SocketServer.init(server);

const PORT = process.env.PORT || 3000;

server.listen(PORT, () => logger.info(`🚀 Server started at port ${PORT}`));
