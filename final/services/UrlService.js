import UrlRepository from '../repositories/UrlRepository.js';
import HashService from './HashService.js';

export default class UrlService {
    constructor() {
        this.repository = new UrlRepository();
        this.hashService = new HashService();
    }

    async create(url, alias, user) {
        const code = this.hashService.generate(5);
        const name = !!alias ? alias : new URL(url).hostname;

        await this.repository.create({
            url,
            code,
            name,
            user_id: user.id,
        });
    }

    getAll(userId) {
        if (userId) {
            return this.repository.getByField('user_id', userId);
        }

        return this.repository.getAll();
    }
}
