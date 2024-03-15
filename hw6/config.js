const PORT = process.env.PORT || 3000;
const HOST = process.env.HOST || '127.0.0.1';

const baseUrl = `http://${HOST}:${PORT}`;

export { PORT, HOST, baseUrl };
