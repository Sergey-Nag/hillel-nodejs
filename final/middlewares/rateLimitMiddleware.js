import RateLimitService from '../services/RateLimitService.js';
import { CODE_RATE_LIMIT, USER_RATE_LIMIT } from '../config.js';

export function createRateLimitMiddleware() {
    const codeRateLimitService = new RateLimitService(CODE_RATE_LIMIT);
    const userRateLimitService = new RateLimitService(USER_RATE_LIMIT);

    return async (req, res, next) => {
        const service = req.session?.userId ? userRateLimitService : codeRateLimitService;
        const key = req.session?.userId ?? req.params.code;

        const isExceed = await service.isKeyExceedLimit(key.toString());

        if (isExceed) {
            const ttl = await service.getTTL(key);
            return res.status(429).render('error.ejs', { code: 429, ttl });
        }

        await service.incrementKey(key);

        next();
    };
}
