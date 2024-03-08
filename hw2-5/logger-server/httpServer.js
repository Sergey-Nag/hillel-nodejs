import http from 'http';
import logs from './logs.js';

const httpServer = http.createServer((req, res) => {
    const {url, method} = req;

    if (method === 'GET' && url === '/logs') {
        res.setHeader('Content-Type', 'application/json');
        res.write(JSON.stringify(logs));
    } else {
        res.statusCode = 404;
    }

    res.end();
});

export default httpServer;