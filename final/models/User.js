import { Model, DataTypes } from 'sequelize';
import sequelize from '../db/sequelize.js';
import bcrypt from 'bcrypt';

export default class User extends Model {
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
        validate: {
            notEmpty: {
                msg: 'Name is required',
            }
        }
    },
    surname: {
        type: DataTypes.STRING,
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: {
            isEmail: {
                msg: 'Invalid email format',
            }
        }
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    role: {
        type: DataTypes.ENUM('Admin', 'User'),
        defaultValue: 'User',
        allowNull: false,
        validate: {
            isIn: {
                args: [['Admin', 'User']],
                msg: 'Invalid role',
            }
        }
    },
    create_time: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
        allowNull: false,
    }
}, { 
    sequelize,
    modelName: 'User',
    timestamps: false,
});
