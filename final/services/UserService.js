import { ADMIN_PASSWORD } from '../config.js';
import Url from '../models/sequelize/Url.js';
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

    async update(id, data) {
        return await this.repository.update(id, data);
    }

    async getById(value, options) {
        const [user] = await this.repository.getByField('id', value, options);
        return user;
    }

    getAll() {
        return this.repository.getAll();
    }

    delete(id, withUrls = false) {
        if (withUrls) {
            return this.repository.transaction(async (t) => {
                const [user] = await this.repository.getByField('id', id, {
                    transaction: t,
                    include: ['urls'],
                    raw: false,
                });
                await user.urls.forEach((url) => url.destroy({ transaction: t }));
                await user.destroy({ transaction: t });
            });
        }

        return this.repository.delete('id', id);
    }
}
