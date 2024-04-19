import { CODE_RATE_LIMIT, USER_RATE_LIMIT } from '../config.js';
import RateLimitService from './RateLimitService.js';
import UserService from './UserService.js';

export default class AdminService {
    constructor() {
        this.userService = new UserService();
        this.codeRateLimitService = new RateLimitService(CODE_RATE_LIMIT);
        this.userRateLimitService = new RateLimitService(USER_RATE_LIMIT);
    }

    async createUser({ name, surname, email, password, role }) {
        return await this.userService.create({
            name,
            surname,
            email,
            password,
            role,
        });
    }

    async getRateLimits() {
        const codeRateLimits = await this.codeRateLimitService.getAll();
        const userRateLimits = await this.userRateLimitService.getAll();

        return {
            codeRateLimits,
            userRateLimits,
        };
    }

    async deleteUser(id) {
        const user = await this.userService.getById(id, { raw: false });

        if (!user) {
            throw new Error('User not found!');
        }

        await this.userService.delete(id, true);
    }
}
