import RedisStore from 'connect-redis';
import cookieParser from 'cookie-parser';
import express from 'express';
import session from 'express-session';
import helmet from 'helmet';
import { HOST, SECRET } from '../config.js';
import AuthController from '../constollers/AuthController.js';
import CodeController from '../constollers/CodeController.js';
import UrlController from '../constollers/UrlController.js';
import UserController from '../constollers/UserController.js';
import redisClient from '../db/redisClient.js';
import { createCsrfTokenMiddleware } from '../middlewares/csrfTokenMiddleware.js';
import AdminController from '../constollers/AdminController.js';
import DashboardController from '../constollers/DashboardController.js';

const redisStore = new RedisStore({
    client: redisClient,
    prefix: 'session:',
});

function initMiddlewares(app) {
    app.use(cookieParser());
    app.use(helmet({
        contentSecurityPolicy: false,
    }));
    app.use(express.urlencoded({ extended: true }));
    app.use(
        session({
            store: redisStore,
            secret: SECRET,
            resave: false,
            saveUninitialized: true,
            cookie: {
                httpOnly: true,
                domain: HOST,
            },
        })
    );
    app.use(createCsrfTokenMiddleware);
}

function initErrorHandling(app) {
    console.log('smth');
    app.use((err, req, res, next) => {
        console.log('>>', err);
        // if (err) {
        //     res.status(500).send(err.message);
        // }

        // try {
        //     next();
        // } catch (e) {
        //     console.log(e);
        // }

        // res.status(500).render('error.ejs', { code: 500, })
    });
}

function initControllers(app) {
    app.use(express.static('static'));
    app.use('/users', new UserController());
    app.use('/urls', new UrlController());
    app.use('/code', new CodeController());
    app.use('/admin', new AdminController());
    app.use('/dashboard', new DashboardController());
    app.use('/', new AuthController());
}

function initViews(app) {
    app.set('view engine', 'ejs');
    app.get('*', (req, res) => {
        res.status(404).render('error.ejs', { code: 404, user: req.user });
    });
}

function webContext(app) {
    initMiddlewares(app);
    initControllers(app);
    initViews(app);
    initErrorHandling(app);
}

export default webContext;
