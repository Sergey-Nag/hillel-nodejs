import { ADMIN_PASSWORD } from '../config.js';
import UserRepository from '../repositories/UserRepository.js';
import bcrypt from 'bcrypt';

export default class UserService {
    constructor() {
        this.repository = new UserRepository();
    }

    async create({ name, surname, email, password, role }) {
        const hashedPassword = await bcrypt.hash(password.trim(), 10);

        return await this.repository.create({
            name: name?.trim(),
            email: email?.trim(),
            surname: surname?.trim(),
            role,
            password: hashedPassword,
        });
    }

    async getByEmailAndPassword(email, password) {
        const user = await this.repository.findOne('email', email.trim());
        if (user) {
            const isPasswordCorrect = await bcrypt.compare(
                password.trim(),
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
