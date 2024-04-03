import Url from '../models/Url.js';
import Repository from './base/Repository.js';

export default class UrlRepository extends Repository {
    constructor() {
        super(Url);
    }

    async updateVisitsByCode(code) {
        await this.model.increment('visits', {
            where: { code }, returning: false
        });
    }
}
