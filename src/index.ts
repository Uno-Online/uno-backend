import 'dotenv/config';
import 'express-async-errors';
import cookieParser from 'cookie-parser';
import express from 'express';
import http from 'http';
import { SocketServer } from './socket-server';
import { router } from './routes';
import errorHandlingMiddleware from './middlewares/error-handling-middleware';
import { authMiddleware } from './middlewares/auth.middleware';

const app = express();

app.use(express.json());
app.use(cookieParser());
app.use(authMiddleware);
app.use(router);
app.use(errorHandlingMiddleware);

const server = http.createServer(app);

SocketServer.init(server);

server.listen(process.env.PORT || 5000, () =>
  process.stdout.write('Server started\n')
);
