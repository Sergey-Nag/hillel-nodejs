import { CODE_RATE_LIMIT, IP_RATE_LIMIT, USER_RATE_LIMIT } from '../config.js';
import RateLimitService from './RateLimitService.js';
import UserService from './UserService.js';

export default class AdminService {
    constructor() {
        this.userService = new UserService();
        this.codeRTLService = new RateLimitService(CODE_RATE_LIMIT);
        this.userRTLService = new RateLimitService(USER_RATE_LIMIT);
        this.ipRTLService = new RateLimitService(IP_RATE_LIMIT);
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
        const codeRateLimits = await RateLimitService.getAll();

        return codeRateLimits;
    }

    async deleteUser(id) {
        const user = await this.userService.getById(id, { raw: false });

        if (!user) {
            throw new Error('User not found!');
        }

        await this.userService.delete(id, true);
    }

    async deleteRtl(id) {
        await RateLimitService.delete(id);
    }
}
