import express from 'express';
import Logger from 'my-logger';
import webContext from './app-context/webContext.js';
import { PORT, baseUrl } from './config.js';
import sequelize from './db/sequelize.js';
import './models/initRelations.js';
import apiContext from './app-context/apiContext.js';

const logger = new Logger('index.js');

const app = express();

app.use(express.json());

webContext(app);
apiContext(app);

try {
    await sequelize.sync();
    logger.info('Database is synchronized');
} catch (e) {
    logger.error('Database synchronization error', e);
}

app.listen(PORT, () => {
    logger.info(`Server is running on ${baseUrl}`);
});

process.on('SIGINT', () => {
    process.exit();
});
