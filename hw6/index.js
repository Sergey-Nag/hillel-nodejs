import cookieParser from 'cookie-parser';
import session from 'cookie-session';
import express from 'express';
import { HOST, PORT, SECRET, baseUrl } from './config.js';
import AuthController from './constollers/AuthController.js';
import CodeController from './constollers/CodeController.js';
import UrlController from './constollers/UrlController.js';
import UserController from './constollers/UserController.js';

const app = express();

app.use(express.static('static'));
app.use(express.json());

app.use(cookieParser());
app.use(session({
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

app.listen(PORT, () => {
    console.log(`Server is running on ${baseUrl}`);
});
