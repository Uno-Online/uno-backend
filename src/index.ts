import 'dotenv/config';
import 'express-async-errors';
import cookieParser from 'cookie-parser';
import express from 'express';
import http from 'http';
import cors from 'cors';
import { SocketServer } from './websocket/socket-server';
import { router } from './routes';
import errorHandlingMiddleware from './middlewares/error-handling.middleware';
import { authMiddleware } from './middlewares/auth.middleware';
import { logger } from './logger';
import { internalize } from './middlewares/i18next';

const app = express();

app.use(cors());
app.use(express.json());
app.use(cookieParser());
app.use(internalize);
app.use(authMiddleware);
app.use(router);
app.use(errorHandlingMiddleware);

const server = http.createServer(app);

SocketServer.init(server);

server.listen(process.env.PORT || 3001, () => logger.info('Server started'));
