import UrlRepository from '../repositories/UrlRepository.js';
import HashService from './HashService.js';

export default class UrlService {
    constructor() {
        this.repository = new UrlRepository();
        this.hashService = new HashService();
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
    }

    update(id, data) {
        return this.repository.transaction(async (t) => {
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
                    throw new Error('One-time URL has already been visited');
                }

                await url.update(data, { transaction: t });
            }
        });
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

    delete(id) {
        return this.repository.delete('id', id);
    }
}
