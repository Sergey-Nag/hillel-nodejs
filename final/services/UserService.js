import { ADMIN_PASSWORD } from '../config.js';
import UserRepository from '../repositories/UserRepository.js';
import bcrypt from 'bcrypt';

export default class UserService {
    constructor() {
        this.repository = new UserRepository();
    }

    async create({ name, surname, email, password }) {
        const hashedPassword = await bcrypt.hash(password, 10);

        return await this.repository.create({
            name,
            email,
            surname,
            password: hashedPassword,
        });
    }

    async getByEmailAndPassword(email, password) {
        const user = await this.repository.findOne('email', email);
        if (user) {
            const isPasswordCorrect = await bcrypt.compare(
                password,
                user.password
            );
            if (isPasswordCorrect) {
                return user;
            }
        }

        return null;
    }

    async getById(value) {
        const [user] = await this.repository.getByField('id', value);
        return user;
    }

    getAll() {
        return this.repository.getAll();
    }

    async createAdmin() {
        const isExist = await this.repository.isExist('name', 'admin');

        if (isExist) {
            return;
        }

        await this.create('admin', ADMIN_PASSWORD);
    }
}
