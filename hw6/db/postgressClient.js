import pkg from 'pg';
import { POSTGRESS_CONFIG } from '../config.js';
const { Client } = pkg;
import Logger from 'my-logger';

const logger = new Logger('postgressClient.js');

const client = new Client(POSTGRESS_CONFIG);

client.connect();

client.on('connect', () => {
    logger.info('Connected to Postgress');
});

client.on('error', (error) => {
    logger.error(error);
});

export default client;
