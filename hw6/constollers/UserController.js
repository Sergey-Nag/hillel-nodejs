import { Router } from 'express';
import UserService from '../services/UserService.js';
import authMiddleware from '../middlewares/authMiddleware.js';
import { baseUrl } from '../config.js';

export default class UserController extends Router {
    constructor() {
        super();

        this.userService = new UserService();
        
        this.use(authMiddleware);

        this.get('/', this.getUsersPage);
        this.get('/all', this.getAll);
        this.post('/create', this.create);

        this.userService.create('admin', 'admin');
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

    getUsersPage = (req, res) => {
        const users = this.userService.getAll();

        res.render('users.ejs', { users, user: req.user, baseUrl: baseUrl });
    }
}
