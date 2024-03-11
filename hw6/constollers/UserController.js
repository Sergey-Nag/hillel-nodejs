import { Router } from 'express';
import UserService from '../services/UserService.js';
import authMiddleware from '../middlewares/authMiddleware.js';

export default class UserController extends Router {
    constructor() {
        super();

        this.userService = new UserService();

        this.get('/', authMiddleware, this.getAll);
        this.post('/create', this.create);
    }

    create = (req, res) => {
        const { name, password } = req.body;

        this.userService.create(name, password);

        res.send('Created!');
    };

    getAll = (req, res) => {
        const users = this.userService.getAll();

        res.send(users);
    };
}
