import UrlRepository from '../repositories/UrlRepository.js';
import HashService from './HashService.js';

export default class UrlService {
    constructor() {
        this.repository = new UrlRepository();
        this.hashService = new HashService();
    }

    create(url, alias, user ) {
        const code = this.hashService.generate(5);
        const create_time = new Date().toISOString();
        const name = alias ?? new URL(url).hostname;
        const visits = 0;

        return this.repository.create({
            url,
            code,
            name,
            visits,
            user: user.id,
            create_time,
        }, code);
    }

    getAll() {
        return this.repository.getAll();
    }
}
