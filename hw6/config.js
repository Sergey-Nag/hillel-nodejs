const PORT = process.env.PORT || 3000;
const HOST = process.env.HOST || '127.0.0.1';
const PROTOCOL = process.env.PROTOCOL || 'http';
const SECRET = process.env.SECRET || 'QwErTy123456';

const baseUrl = `${PROTOCOL}://${HOST}:${PORT}`;

export { PORT, HOST, PROTOCOL, SECRET, baseUrl };
