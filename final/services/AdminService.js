import UserService from './UserService.js';

export default class AdminService {
    constructor() {
        this.userService = new UserService();
    }

    async createUser({ name, surname, email, password, role }) {
        return await this.userService.create({ name, surname, email, password, role });
    }
}
