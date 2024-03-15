import express from 'express';
import cookieParser from 'cookie-parser';
import UserController from './constollers/UserController.js';
import UrlController from './constollers/UrlController.js';
import CodeController from './constollers/CodeController.js';
import AuthController from './constollers/AuthController.js';
import session from 'cookie-session';
import { PORT, baseUrl } from './config.js';

const app = express();

app.use(express.static('static'));
app.use(express.json());

app.use(cookieParser());
app.use(session({
    secret: 'QwErTy123456',
    resave: false,
    saveUninitialized: true,
    cookie: {
        httpOnly: true,
        domain: 'localhost',
    }
}));

app.set('view engine', 'ejs');

app.use('/users', new UserController());
app.use('/urls', new UrlController());
app.use('/code', new CodeController());
app.use('/', new AuthController());

app.listen(PORT, () => {
    console.log(`Server is running on ${baseUrl}`);
});
