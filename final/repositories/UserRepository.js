import User from '../models/sequelize/User.js';
import UserMongo from '../models/mongoose/User.js';
import Repository from './base/Repository.js';
import RepositoryMongo from './base/RepositoryMongo.js';

class UserRepository extends Repository {
    constructor() {
        super(User);
    }
}

class UserRepositoryMongo extends RepositoryMongo {
    constructor() {
        super(UserMongo);
    }
}

const dbProvider = process.env.DATABASE_PROVIDER || 'POSTGRESS';

export default dbProvider === 'MONGO' ? UserRepositoryMongo : UserRepository;