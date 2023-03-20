import express from 'express';
import http from 'http';
import { SocketServer } from './socket-server';
import { router } from './routes';

const app = express();

app.use(express.json());
app.use('/', express.static('public'));
app.use(router);

const server = http.createServer(app);

SocketServer.init(server);

const port = process.env.PORT || 3000;
server.listen(port, () => {
    // eslint-disable-next-line no-console
    console.log(`
        Running at: http://localhost:${port}
        Documentation: http://localhost:${port}/docs
    `);
});
