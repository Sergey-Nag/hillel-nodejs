import Url from '../models/sequelize/Url.js';
import UrlMongo from '../models/mongoose/Url.js';
import Repository from './base/Repository.js';
import RepositoryMongo from './base/RepositoryMongo.js';

class UrlRepository extends Repository {
    constructor() {
        super(Url);
    }

    async updateVisitsByCode(code) {
        await this.model.increment('visits', {
            where: { code }, returning: false
        });
    }
}

class UrlRepositoryMongo extends RepositoryMongo {
    constructor() {
        super(UrlMongo);
    }

    async updateVisitsByCode(code) {
        await this.model.updateOne({ code }, { $inc: { visits: 1 } });
    }
}

const dbProvider = process.env.DATABASE_PROVIDER || 'POSTGRESS';

export default dbProvider === 'MONGO' ? UrlRepositoryMongo : UrlRepository;