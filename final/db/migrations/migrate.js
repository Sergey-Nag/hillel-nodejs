import sequelize from '../sequelize.js';
import User from '../../models/User.js';
import Url from '../../models/Url.js';

const queryInterface = sequelize.getQueryInterface();

try {
    await queryInterface.dropTable(User.getTableName(), { cascade: true });
    await queryInterface.dropTable(Url.getTableName(), { cascade: true });

    await queryInterface.createTable(User.getTableName(), User.getAttributes());
    await queryInterface.createTable(Url.getTableName(), Url.getAttributes());
} catch (error) {
    console.error(error);
}
