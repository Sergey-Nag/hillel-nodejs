import redisClient from '../redisClient.js';

export default class RateLimitService {
    constructor({ allowedCalls, secondsGap }) {
        this.allowedCalls = allowedCalls;
        this.secondsGap = secondsGap;
    }

    async isKeyExceedLimit(key) {
        const value = +(await redisClient.get(key));

        return value >= this.allowedCalls;
    }

    async incrementKey(key) {
        const requests = await redisClient.incr(key);

        if (requests === 1) {
            await redisClient.expire(key, this.secondsGap);
        }

        return requests;
    }

    async getTTL(key) {
        return await redisClient.ttl(key);
    }
}