import { Router } from 'express';
import authMiddleware from '../middlewares/authMiddleware.js';
import { verifyCsrfTokenMiddleware } from '../middlewares/csrfTokenMiddleware.js';
import AuthService from '../services/AuthService.js';

export default class AuthController extends Router {
    constructor() {
        super();

        this.authService = new AuthService();

        this.get('/login', this.getLoginPage);
        this.get('/signup', this.getSignUpPage);
        this.get('/logout', this.logout);

        this.post('/login', verifyCsrfTokenMiddleware, this.login);
        this.post('/signup', verifyCsrfTokenMiddleware, this.signUp);

        this.get('/', authMiddleware, (req, res) => {
            res.redirect('/users');
        });
    }

    login = async (req, res) => {
        try {
            const user = await this.authService.loginUser(req.body);
            req.session.userId = user.id;
        } catch (e) {
            return res.status(400).render('login.ejs', {
                csrfToken: req.session.csrfToken,
                error: e.message,
                values: req.body,
            });
        }

        res.redirect('/');
    };

    logout = (req, res) => {
        req.session.destroy();
        res.redirect('/login');
    };

    signUp = async (req, res) => {
        try {
            const user = await this.authService.registerUser(req.body);
            req.session.userId = user.id;
        } catch (e) {
            return res.status(400).render('sign-up.ejs', {
                csrfToken: req.session.csrfToken,
                error: e.message,
                values: req.body,
            });
        }

        res.redirect('/');
    };

    getLoginPage = (req, res) => {
        res.render('login.ejs', {
            csrfToken: req.session.csrfToken,
            error: null,
        });
    };

    getSignUpPage = (req, res) => {
        res.render('sign-up.ejs', {
            csrfToken: req.session.csrfToken,
            error: null,
        });
    };

    #signUpErrorHandler = async (req, res, next) => {
        try {
            await next();
        } catch (e) {
            res.status(400);
            return res.render('sign-up.ejs', {
                csrfToken: req.session.csrfToken,
                error: e.message,
                fields: req.body,
            });
        }
    };
}
