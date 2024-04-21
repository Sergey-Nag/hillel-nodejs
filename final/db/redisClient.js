import redis from 'redis';
import { REDIS_URL } from '../config.js';
import Logger from 'my-logger';

const logger = new Logger('redisClient.js');

const redisClient = redis.createClient({
    url: REDIS_URL,
});

redisClient.connect();

redisClient.on('connect', () => {
    logger.info('Connected to Redis');
});

redisClient.on('error', (error) => {
    logger.error(error);
});

export default redisClient;
