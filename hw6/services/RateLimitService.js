import redisClient from '../db/redisClient.js';

export default class RateLimitService {
    constructor({ prefix, allowedCalls, secondsGap }) {
        this.prefix = prefix;
        this.allowedCalls = allowedCalls;
        this.secondsGap = secondsGap;
    }

    #getKey(key) {
        return `${this.prefix}:${key}`;
    }

    async isKeyExceedLimit(key) {
        const value = +(await redisClient.get(this.#getKey(key)));

        return value >= this.allowedCalls;
    }

    async incrementKey(key) {
        const requests = await redisClient.incr(this.#getKey(key));

        if (requests === 1) {
            await redisClient.expire(this.#getKey(key), this.secondsGap);
        }

        return requests;
    }

    async getTTL(key) {
        return await redisClient.ttl(this.#getKey(key));
    }
}