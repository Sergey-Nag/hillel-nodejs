import { Router } from 'express';
import UserService from '../services/UserService.js';
import authMiddleware from '../middlewares/authMiddleware.js';
import { baseUrl } from '../config.js';
import Logger from 'my-logger';
import { allowAccessMiddleware } from '../middlewares/allowAccessMiddleware.js';

const logger = new Logger('UserController.js');

export default class UserController extends Router {
    constructor() {
        super();

        this.userService = new UserService();

        this.use(authMiddleware);

        this.get('/', this.getUsersPage);
        this.get('/all', this.getAll);
        this.post('/create', allowAccessMiddleware('Admin'), this.create);
    }

    create = async (req, res) => {
        const { name, surname, email, password, role } = req.body;

        try {
            await this.userService.create({ name, surname, password, email, role, });
        } catch (e) {
            logger.error(e);
            return res.status(400).render('users.ejs', {
                error: e.message,
                user: req.user,
                baseUrl: baseUrl,
                values: req.body,
            });
        }

        res.redirect('/users');
    };

    getAll = async (req, res) => {
        const users = await this.userService.getAll();

        res.send(users);
    };

    getUsersPage = async (req, res) => {
        const users = await this.userService.getAll();

        res.render('users.ejs', { users, user: req.user, baseUrl: baseUrl });
    };
}
