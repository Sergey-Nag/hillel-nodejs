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
        validate: {
            len: [4, 20],
            isAlphanumeric: {
                msg: 'Code must contain only letters and numbers',
            }
        }
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    url: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            isUrl: {
                msg: 'Invalid URL format',
            }
        }
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
    expire_time: {
        type: DataTypes.DATE,
        allowNull: true,
    },
    type: {
        type: DataTypes.ENUM('Temporary', 'Permanent', 'One-time'),
        defaultValue: 'Permanent',
        allowNull: false,
    },
    user_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    enabled: {
        type: DataTypes.BOOLEAN,
        defaultValue: true,
        allowNull: false,
    }
}, { 
    sequelize,
    modelName: 'Url',
    timestamps: false,
});
