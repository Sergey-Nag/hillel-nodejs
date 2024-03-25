import Url from '../models/Url.js';
import Repository from './base/Repository.js';

export default class UrlRepository extends Repository {
    constructor() {
        super(Url, 'Urls');
    }

    async updateVisitsByCode(code) {
        await this.postgressClient.query(
            `UPDATE ${this.tableName} SET visits = visits + 1 WHERE code = $1`,
            [code]
        );
    }
}
