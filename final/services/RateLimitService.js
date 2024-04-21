import redisClient from '../db/redisClient.js';

export default class RateLimitService {
    static prefix = 'rl';

    constructor({ prefix, allowedCalls, secondsGap }) {
        this.prefix = `${RateLimitService.prefix}:${prefix}`;
        this.allowedCalls = allowedCalls;
        this.secondsGap = secondsGap;
    }

    static getAll() {
        return redisClient.keys(`${RateLimitService.prefix}:*`);
    }

    static delete(key) {
        return redisClient.del(key);
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

    async getAll() {
        const keys = await redisClient.keys(`${this.prefix}:*`);

        return keys;
    }

    async delete(key) {
        return await redisClient.del(key);
    }
}
