import RateLimitService from '../services/RateLimitService.js';
import { CODE_RATE_LIMIT, USER_RATE_LIMIT } from '../config.js';

// export function createRateLimitMiddleware() {
//     const codeRateLimitService = new RateLimitService(CODE_RATE_LIMIT);
//     const userRateLimitService = new RateLimitService(USER_RATE_LIMIT);

//     return async (req, res, next) => {
//         const service = req.session?.userId ? userRateLimitService : codeRateLimitService;
//         const key = req.session?.userId ?? req.params.code;

//         const isExceed = await service.isKeyExceedLimit(key.toString());

//         if (isExceed) {
//             const ttl = await service.getTTL(key);
//             return res.status(429).render('error.ejs', { code: 429, ttl });
//         }

//         await service.incrementKey(key);

//         next();
//     };
// }

export function rateLimitByCodeMiddleware() {
    const rateLimitService = new RateLimitService(CODE_RATE_LIMIT);

    return async (req, res, next) => {
        const isExceed = await rateLimitService.isKeyExceedLimit(req.params.code);

        if (isExceed) {
            const ttl = await rateLimitService.getTTL(req.params.code);
            return res.status(429).render('error.ejs', { code: 429, ttl, user: req.user});
        }

        await rateLimitService.incrementKey(req.params.code);

        next();
    };
}

export function rateLimitByUserMiddleware() {
    const rateLimitService = new RateLimitService(USER_RATE_LIMIT);

    return async (req, res, next) => {
        const isExceed = await rateLimitService.isKeyExceedLimit(req.session.userId);

        if (isExceed) {
            const ttl = await rateLimitService.getTTL(req.session.userId);
            return res.status(429).render('error.ejs', { code: 429, ttl, user: req.user });
        }

        await rateLimitService.incrementKey(req.session.userId);

        next();
    };
}