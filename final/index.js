import express from 'express';
import Logger from 'my-logger';
import webContext from './app-context/webContext.js';
import { PORT, baseUrl } from './config.js';
import sequelize from './db/sequelize.js';
import './models/initRelations.js';
import apiContext from './app-context/apiContext.js';
import expressWs from 'express-ws';

const logger = new Logger('index.js');

const app = express();

expressWs(app);
webContext(app);
apiContext(app);

try {
    await sequelize.sync();
    logger.info('Database is synchronized');

    app.listen(PORT, () => {
        logger.info(`Server is running on ${baseUrl}`);
    });
} catch (e) {
    logger.error('Database synchronization error', e);
}


process.on('SIGINT', () => {
    process.exit();
});
