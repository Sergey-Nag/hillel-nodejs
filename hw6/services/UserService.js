import UserRepository from '../repositories/UserRepository.js';

export default class UserService {
    constructor() {
        this.repository = new UserRepository();
    }

    async create(name, password) {
        await this.repository.create({
            name,
            password,
        });
    }

    async getByNameAndPassword(name, password) {
        const [user] = await this.repository.getByField('name', name);

        if (user && user.password === password) {
            return user;
        }

        return null;
    }

    async getById( value) {
        const [user] = await this.repository.getByField('id', value);
        return user;
    }

    getAll() {
        return this.repository.getAll();
    }
}
