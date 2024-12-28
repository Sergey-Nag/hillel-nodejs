import express from 'express';
import Logger from 'my-logger';
import webContext from './app-context/webContext.js';
import { PORT, baseUrl } from './config.js';
import apiContext from './app-context/apiContext.js';
import expressWs from 'express-ws';

const logger = new Logger('index.js');

const app = express();

expressWs(app);
webContext(app);
apiContext(app);

const databaseProvider = process.env.DATABASE_PROVIDER || 'POSTGRESS';

if (databaseProvider === 'POSTGRESS') {
    await import('./models/sequelize/initRelations.js');
    const sequelize = (await import('./db/sequelize.js')).default;

    try {
        await sequelize.sync();
        logger.info('Database is synchronized');
    } catch (e) {
        logger.error('Database synchronization error', e);
    }
} else if (databaseProvider === 'MONGO') {
    const run = (await import('./db/mongoClient.js')).default;
    try {
        await run();
        logger.info('Connected to MongoDB');
    } catch (e) {
        logger.error('Database connection error', e);
    }
}


app.listen(PORT, () => {
    logger.info(`Server is running on ${baseUrl}`);
});

process.on('SIGINT', () => {
    process.exit();
});
