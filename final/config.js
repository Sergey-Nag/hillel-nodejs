const PORT = process.env.PORT || 3000;
const HOST = process.env.HOST || '127.0.0.1';
const PROTOCOL = process.env.PROTOCOL || 'http';
const SECRET = process.env.SECRET || 'QwErTy123456';
const REDIS_URL = process.env.REDIS_URL || 'redis://localhost:6379';
const CODE_RATE_LIMIT = {
    prefix: process.env.CODE_RATE_LIMIT_PREFIX || 'code',
    allowedCalls: +process.env.CODE_RATE_LIMIT_ALLOWED_CALLS || 100,
    secondsGap: +process.env.CODE_RATE_LIMIT_SECONDS_GAP || 60 * 60,
};
const USER_RATE_LIMIT = {
    prefix: process.env.USER_RATE_LIMIT_PREFIX || 'user',
    allowedCalls: +process.env.USER_RATE_LIMIT_ALLOWED_CALLS || 1000,
    secondsGap: +process.env.USER_RATE_LIMIT_SECONDS_GAP || 24 * 60 * 60,
};
const IP_RATE_LIMIT = {
    prefix: process.env.IP_RATE_LIMIT_PREFIX || 'ip',
    allowedCalls: +process.env.IP_RATE_LIMIT_ALLOWED_CALLS || 1000,
    secondsGap: +process.env.IP_RATE_LIMIT_SECONDS_GAP || 24 * 60 * 60,
};

const baseUrl = `${PROTOCOL}://${HOST}:${PORT}`;

const POSTGRESS_CONFIG = {
    user: process.env.POSTGRESS_USER || 'postgres',
    host: process.env.POSTGRESS_HOST || 'localhost',
    database: process.env.POSTGRESS_DATABASE || 'postgres',
    password: process.env.POSTGRESS_PASSWORD || 'password',
    port: process.env.POSTGRESS_PORT || 5432,
};

const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || 'admin';
const ADMIN_EMAIL = process.env.ADMIN_EMAIL || 'admin@admin.aa';

export {
    PORT,
    HOST,
    PROTOCOL,
    SECRET,
    baseUrl,
    REDIS_URL,
    CODE_RATE_LIMIT,
    USER_RATE_LIMIT,
    IP_RATE_LIMIT,
    POSTGRESS_CONFIG,
    ADMIN_PASSWORD,
    ADMIN_EMAIL,
};
