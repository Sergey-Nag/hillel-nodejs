import UserRepository from '../repositories/UserRepository.js';

export default class UserService {
    constructor() {
        this.repository = new UserRepository();
    }

    create(name, password) {
        const create_time = new Date().toISOString();

        this.repository.create({
            name,
            password,
            create_time,
        });
    }

    getByNameAndPassword(name, password) {
        return this.repository.get(u => u.name === name && u.password === password);
    }

    getById(id) {
        return this.repository.getByKey(id);
    }

    getAll() {
        return this.repository.getAll();
    }
}
