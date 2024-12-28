import UrlRepository from '../repositories/UrlRepository.js';
import User from '../models/sequelize/User.js';
import UrlService from './UrlService.js';
import UserService from './UserService.js';
import RateLimitService from './RateLimitService.js';
import { CODE_RATE_LIMIT } from '../config.js';

export default class DashboardService {
    constructor() {
        this.urlRepo = new UrlRepository();
        this.userService = new UserService();
        this.urlService = new UrlService();
        this.codeRateLimitService = new RateLimitService(CODE_RATE_LIMIT);
    }

    async getDashboardDataByUser(user) {
        try {
            const totalVisits = await this.getAllVisitsSumByUser(user.id);
            const totalUrls = await this.getTotalUrlsCountByUser(user.id);
            const topUserUrls = await this.getTop5UserUrls(user.id);
            const topAllUrls = await this.getTop5Urls();
            const rateLimits = await this.getRateLimits(topUserUrls.map((url) => url.code));

            return {
                totalVisits: totalVisits ?? 0,
                totalUrls,
                topUserUrls,
                topAllUrls,
                rateLimits,
            };
        } catch (error) {
            console.error(error);
            throw new Error('An error occurred while fetching URLs');
        }
    }

    getTop5UserUrls(userId) {
        return this.urlRepo.getByField('user_id', userId, {
            order: [['visits', 'DESC']],
            attributes: ['name', 'code', 'url', 'visits'],
            limit: 5,
        });
    }

    getTop5Urls() {
        return this.urlRepo.getAll({
            order: [['visits', 'DESC']],
            attributes: ['name', 'code', 'url', 'visits'],
            include: [
                {
                    model: User,
                    as: 'user',
                    attributes: ['name'],
                },
            ],
            limit: 5,
        });
    }

    getTotalUrlsCountByUser(userId) {
        return this.urlRepo.count({
            where: { user_id: userId },
        });
    }

    getAllVisitsSumByUser(userId) {
        return this.urlRepo.sum('visits', {
            where: { user_id: userId },
        });
    }

    async getRateLimits(keys) {
        const rateLimits = keys.map(async (key) => {
            const ttl = await this.codeRateLimitService.getTTL(key);

            return ttl && ttl > 0 ? {
                key,
                ttl,
            } : null;
        });

        return (await Promise.all(rateLimits)).filter(Boolean);
    }
}
