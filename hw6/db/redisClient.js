import redis from 'redis';
import { REDIS_URL } from '../config.js';

const redisClient = redis.createClient({
    url: REDIS_URL,
});

redisClient.connect();

redisClient.on('connect', () => {
    console.log('Connected to Redis');
});

redisClient.on('error', (error) => {
    console.error(error);
});

export default redisClient;
