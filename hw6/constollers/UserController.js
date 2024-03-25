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

        // this.userService.create('admin', 'admin');
    }

    create = async (req, res) => {
        const { name, password } = req.body;

        try {
            await this.userService.create(name, password);
        } catch (e) {
            res.status(400).send('Error! Try again');
            return;
        }

        res.send('Created!');
    };

    getAll = async (req, res) => {
        const users = await this.userService.getAll();

        res.send(users);
    };

    getUsersPage = async(req, res) => {
        const users = await this.userService.getAll();

        res.render('users.ejs', { users, user: req.user, baseUrl: baseUrl });
    }
}
