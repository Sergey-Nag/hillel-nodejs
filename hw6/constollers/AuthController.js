import { Router } from 'express';
import UserService from '../services/UserService.js';
import authMiddleware from '../middlewares/authMiddleware.js';

export default class AuthController extends Router {
    constructor() {
        super();

        this.userService = new UserService();

        this.get('/login', this.getLoginPage);
        this.get('/logout', this.logout);

        this.post('/login', this.login);

        this.get('/', authMiddleware, (req, res) => {
            res.redirect('/users');
        });
    }

    login = async (req, res) => {
        const { name, password } = req.body;
        const user = await this.userService.getByNameAndPassword(
            name,
            password
        );

        if (user) {
            req.session.userId = user.id;
            res.send('Logged in!');
        } else {
            res.status(401).send('Unauthorized!');
        }
    };

    logout = (req, res) => {
        req.session.destroy();
        res.redirect('/login');
    };

    getLoginPage = (req, res) => {
        res.render('login.ejs');
    };
}
