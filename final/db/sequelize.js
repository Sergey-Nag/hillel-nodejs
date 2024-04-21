import { Sequelize } from 'sequelize';
import { POSTGRESS_CONFIG } from '../config.js';
import Logger from 'my-logger';

const log = new Logger('sequelize.js');
console.log(POSTGRESS_CONFIG);
const sequelize = new Sequelize({
    dialect: 'postgres',
    host: POSTGRESS_CONFIG.host,
    username: POSTGRESS_CONFIG.user,
    password: POSTGRESS_CONFIG.password,
    database: POSTGRESS_CONFIG.database,
    port: POSTGRESS_CONFIG.port,
    logging: (message) => {
        log.debug(message)
    },
});

// try {
//     await sequelize.authenticate();
//     log.info('Connected to Postgress via Sequelize');
// } catch(e) {
//     log.error(e)
// }

export default sequelize;