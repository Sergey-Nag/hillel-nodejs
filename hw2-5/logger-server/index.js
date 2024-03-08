import httpServer from './httpServer.js';
import socketServer from './socketServer.js';
import { HTTP_PORT, SOCKET_PORT } from './constants.js';

httpServer.listen(HTTP_PORT, () => {
    console.log(`HTTP server port ${HTTP_PORT}`);
});

socketServer.listen(SOCKET_PORT, () => {
    console.log(`Socket server port ${SOCKET_PORT}`);
});
