import pkg from 'pg';
import { POSTGRESS_CONFIG } from '../config.js';
const { Client } = pkg;

const client = new Client(POSTGRESS_CONFIG);

client.connect();

client.on('connect', () => {
    console.log('Connected to Postgress');
});

client.on('error', (error) => {
    console.error(error);
});

export default client;
