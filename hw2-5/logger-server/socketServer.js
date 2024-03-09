import net from 'net';
import logs from './logs.js';

const socketServer = net.createServer((socket) => {
    console.log('Client connected');
    socket.on('data', (chunk) => {
        let data = chunk.toString();
        try {
            data = JSON.parse(data);
        } catch (e) {}

        logs.push(data);
    });
    socket.on('end', () => {
        console.log('Client disconnected');
    });
});

export default socketServer;