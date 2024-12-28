import sequelize from '../sequelize.js';
import User from '../../models/User.js';
import Url from '../../models/Url.js';
import Logger from 'my-logger';

const log = new Logger('migrate.js');

const queryInterface = sequelize.getQueryInterface();

try {
    await queryInterface.dropTable(User.getTableName(), { cascade: true });
    await queryInterface.dropTable(Url.getTableName(), { cascade: true });

    await queryInterface.createTable(User.getTableName(), User.getAttributes());

    const columns = Url.getAttributes();
    columns.user_id.references.model = User.getTableName();

    await queryInterface.createTable(Url.getTableName(), columns);
} catch (error) {
    log.error(error);
}
