const PORT = process.env.PORT || 3000;
const HOST = process.env.HOST || '127.0.0.1';
const PROTOCOL = process.env.PROTOCOL || 'http';
const SECRET = process.env.SECRET || 'QwErTy123456';
const REDIS_URL = process.env.REDIS_URL || 'redis://localhost:6379';
const CODE_RATE_LIMIT = {
    allowedCalls: +process.env.CODE_RATE_LIMIT_ALLOWED_CALLS || 100,
    secondsGap: +process.env.CODE_RATE_LIMIT_SECONDS_GAP || 60 * 60,
};
const USER_RATE_LIMIT = {
    allowedCalls: +process.env.USER_RATE_LIMIT_ALLOWED_CALLS || 1000,
    secondsGap: +process.env.USER_RATE_LIMIT_SECONDS_GAP || 24 * 60 * 60,
};

const baseUrl = `${PROTOCOL}://${HOST}:${PORT}`;

export {
    PORT,
    HOST,
    PROTOCOL,
    SECRET,
    baseUrl,
    REDIS_URL,
    CODE_RATE_LIMIT,
    USER_RATE_LIMIT,
};
