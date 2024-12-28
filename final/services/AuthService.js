import UserService from './UserService.js';

export default class AuthService {
    constructor() {
        this.userService = new UserService();
    }

    async registerUser({ name, surname, email, password, confirm_password }) {
        this.#validateSignupFields({ name, email, password, confirm_password });

        const user = await this.userService.create({
            name,
            surname,
            email,
            password,
        });

        return user;
    }

    async loginUser({email, password}) {
        email = email?.trim();
        password = password?.trim();

        this.#validateLoginFields({ email, password });

        const user = await this.userService.getByEmailAndPassword(
            email,
            password
        );

        if (!user) {
            throw new Error('User not found');
        }

        return user;
    }

    #validateLoginFields({ email, password }) {
        if (!email) {
            throw new Error('Email is required');
        }

        if (!password) {
            throw new Error('Password is required');
        }
    }

    #validateSignupFields({ email, name, password, confirm_password }) {
        if (!password) {
            throw new Error('Password is required');
        } else if (password !== confirm_password) {
            throw new Error('Passwords do not match');
        }
    }
}
