import { Model, DataTypes } from 'sequelize';
import sequelize from '../db/sequelize.js';

class User extends Model {
    constructor(data) {
        super(data);
    }
}

User.init({
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false,
        unique: true,
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    create_time: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
        allowNull: false,
    }
}, { 
    sequelize,
    modelName: 'User',
    tableName: 'users',
    timestamps: false,
});
