import UserService from './UserService.js';

export default class AuthService {
    constructor() {
        this.userService = new UserService();
    }

    async registerUser({ name, surname, email, password, confirm_password }) {
        name = name?.trim();
        surname = surname?.trim();
        email = email?.trim();
        password = password?.trim();
        confirm_password = confirm_password?.trim();

        const errors = this.#validateSignupFields({ name, email, password, confirm_password });

        if (errors.length) {
            throw new Error(errors.join('\n'));
        }

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

        const errors = this.#validateLoginFields({ email, password });

        if (errors.length) {
            throw new Error(errors.join('\n'));
        }

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
        const result = [];

        if (!email) {
            result.push('Email is required');
        }

        if (!password) {
            result.push('Password is required');
        }

        return result;
    }

    #validateSignupFields({ email, name, password, confirm_password }) {
        const result = [];

        if (!name) {
            result.push('Name is required');
        }

        if (!email) {
            result.push('Email is required');
        }

        if (!password) {
            result.push('Password is required');
        } else if (password !== confirm_password) {
            result.push('Passwords do not match');
        }

        return result;
    }
}
