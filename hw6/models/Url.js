import { Model, DataTypes } from 'sequelize';
import sequelize from '../db/sequelize.js';

export default class Url extends Model {
    constructor(data) {
        super(data);
    }
}

Url.init({
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false,
        unique: true,
    },
    code: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    url: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    visits: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 0,
    },
    create_time: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
        allowNull: false,
    },
    user_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
    }
}, { 
    sequelize,
    modelName: 'Url',
    tableName: 'urls',
    timestamps: false,
});
