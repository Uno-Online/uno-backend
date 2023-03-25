import 'dotenv/config';
import 'express-async-errors';
import cookieParser from 'cookie-parser';
import express from 'express';
import http from 'http';
import { SocketServer } from './socket-server';
import { router } from './routes';
import errorHandlingMiddleware from './middlewares/error-handling-middleware';
import { authMiddleware } from './middlewares/auth.middleware';
import { logger } from './logger';

const app = express();

app.use(express.json());
app.use(cookieParser());
app.use(authMiddleware);
app.use(router);
app.use(errorHandlingMiddleware);

const server = http.createServer(app);

SocketServer.init(server);

const PORT = process.env.PORT || 3000;

server.listen(PORT, () => logger.info(`🚀 Servidor iniciado na porta ${PORT}`));
