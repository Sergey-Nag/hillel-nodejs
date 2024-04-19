import express from 'express';
import UserApiController from '../constollers/UserApiController.js';

function initMiddlewares(app) {
    app.use(express.json());
}

function initControllers(app) {
    app.use('/api/users', new UserApiController());
}

function apiContext(app) {
    initMiddlewares(app);
    initControllers(app);
}

export default apiContext;