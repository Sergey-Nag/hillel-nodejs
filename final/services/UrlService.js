import UrlRepository from '../repositories/UrlRepository.js';
import HashService from './HashService.js';
import LiveUpdateService from './LiveUpdateService.js';

export default class UrlService {
    constructor() {
        this.repository = new UrlRepository();
        this.hashService = new HashService();

        this.eventService = new LiveUpdateService();
    }

    async create(
        { url, name, type, expire, length, code: userCode, codeType },
        userId
    ) {
        const code =
            codeType === 'random'
                ? this.hashService.generate(length || 6)
                : userCode.trim();

        await this.repository.create({
            code,
            name: name?.trim(),
            url: url.trim(),
            expire_time: expire,
            type: type.trim(),
            user_id: userId,
            enabled: true,
        });

        this.eventService.emitUrlsUpdated();
    }

    async update(id, data) {
        let result;
        if (process.env.DATABASE_PROVIDER === 'POSTGRESS') {
            result = await this.repository.transaction(async (t) => {
                const [url] = await this.repository.getByField('id', id, {
                    transaction: t,
                    raw: false,
                });

                if (url) {
                    if (
                        data.enabled === 'true' &&
                        url.dataValues.type === 'One-time' &&
                        url.dataValues.visits === 1
                    ) {
                        throw new Error(
                            'One-time URL has already been visited'
                        );
                    }

                    await url.update(data, { transaction: t });
                }
            });
        } else {
            const [url] = await this.repository.getByField('id', id);

            if (url) {
                if (
                    data.enabled === 'true' &&
                    url.type === 'One-time' &&
                    url.visits === 1
                ) {
                    throw new Error('One-time URL has already been visited');
                }

                result = await this.repository.update(id, data);
            }
        }

        this.eventService.emitUrlsUpdated();

        return result;
    }

    getAll(userId) {
        if (userId) {
            return this.repository.getByField('user_id', userId);
        }

        return this.repository.getAll();
    }

    getTop5UserUrls(userId) {
        return this.repository.getByField('user_id', userId, {
            order: [['visits', 'DESC']],
            attributes: ['name', 'code', 'url', 'visits'],
            limit: 5,
        });
    }

    async delete(id) {
        const result = await this.repository.delete('id', id);
        this.eventService.emitUrlsUpdated();
        return result;
    }
}
