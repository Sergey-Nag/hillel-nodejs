import express from 'express';
import ApiController from '../constollers/ApiController.js';

function initMiddlewares(app) {
    app.use(express.json());
}

function initControllers(app) {
    app.use('/api', new ApiController());
}

function apiContext(app) {
    initMiddlewares(app);
    initControllers(app);
}

export default apiContext;