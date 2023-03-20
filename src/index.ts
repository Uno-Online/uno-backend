import express from 'express';
import http from 'http';
import { SocketServer } from './socket-server';
import { router } from './routes';
import swaggerUi from 'swagger-ui-express';
import fs from 'fs';

const app = express();
const server = http.createServer(app);

app.use(express.json());
app.use('/', express.static('public'));
app.use(router);

const swaggerDocument = JSON.parse(fs.readFileSync('./src/swagger.json', 'utf-8'));
app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));


SocketServer.init(server);

const port = process.env.PORT || 3000;
server.listen(port, () => {
    console.log(`
        Running at: http://localhost:${port}
        Documentation: http://localhost:${port}/docs
    `);
});
