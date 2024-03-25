import RedisStore from "connect-redis";
import cookieParser from 'cookie-parser';
import express from 'express';
import session from 'express-session';
import helmet from 'helmet';
import { HOST, PORT, SECRET, baseUrl } from './config.js';
import AuthController from './constollers/AuthController.js';
import CodeController from './constollers/CodeController.js';
import UrlController from './constollers/UrlController.js';
import UserController from './constollers/UserController.js';
import redisClient from './db/redisClient.js';

const app = express();

app.use(express.static('static'));
app.use(express.json());
app.use(cookieParser());
app.use(helmet());

const redisStore = new RedisStore({
    client: redisClient,
    prefix: 'session:'
});

app.use(session({
    store: redisStore,
    secret: SECRET,
    resave: false,
    saveUninitialized: true,
    cookie: {
        httpOnly: true,
        domain: HOST,
    }
}));

app.set('view engine', 'ejs');

app.use('/users', new UserController());
app.use('/urls', new UrlController());
app.use('/code', new CodeController());
app.use('/', new AuthController());
app.get('*', (req, res) => {
    res.status(404).render('404.ejs');
});

app.listen(PORT, () => {
    console.log(`Server is running on ${baseUrl}`);
});
