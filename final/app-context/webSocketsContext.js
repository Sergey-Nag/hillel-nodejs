import expressWs from 'express-ws';
import DashboardController from '../constollers/DashboardController.js';

function initControllers(app) {
    app.ws('/ws', new DashboardController());
}

function webSocketsContext(app) {
    expressWs(app);

    initControllers(app);
}

export default webSocketsContext;
