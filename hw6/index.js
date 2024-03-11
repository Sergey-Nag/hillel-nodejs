import express from 'express';
import UserController from './constollers/UserController.js';
import UrlController from './constollers/UrlController.js';
import CodeController from './constollers/CodeController.js';

const app = express();

app.use(express.json());

app.use('/users', new UserController());
app.use('/url', new UrlController());
app.use('/code', new CodeController());

app.listen(3000, () => {
    console.log('Server is running  http://localhost:3000');
});
