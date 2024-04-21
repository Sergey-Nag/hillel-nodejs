import { Model, DataTypes } from 'sequelize';
import sequelize from '../db/sequelize.js';
import { HASH_CHARACTERS } from '../utils.js';

export default class Url extends Model {}

Url.init(
    {
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
                is: {
                    args: [`^[${HASH_CHARACTERS}_\-]+$`],
                    msg: `Code must contain only letters, numbers, hyphens, and underscores without spaces`,
                },
                notEmpty: {
                    msg: 'Code is required',
                },
                len: {
                    args: [4, 20],
                    msg: 'Code must be between 4 and 20 characters long',
                },
            },
        },
        name: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        url: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                isUrl: {
                    msg: 'Invalid URL format',
                },
            },
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
            validate: {
                isAfter: {
                    args: new Date().toISOString(),
                    msg: 'Expire time must be in the future',
                },
                validateIfNotPermanent(value) {
                    if (this.type === 'Temporary' && !value) {
                        throw new Error(
                            'Expire time is required for temporary URLs'
                        );
                    }
                },
            },
        },
        type: {
            type: DataTypes.ENUM('Temporary', 'Permanent', 'One-time'),
            defaultValue: 'Permanent',
            allowNull: false,
            validate: {
                isIn: {
                    args: [['Temporary', 'Permanent', 'One-time']],
                    msg: 'Invalid type',
                },
            },
        },
        user_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: 'User',
                key: 'id',
            },
        },
        enabled: {
            type: DataTypes.BOOLEAN,
            defaultValue: true,
            allowNull: false,
        },
    },
    {
        sequelize,
        modelName: 'Url',
        tableName: 'Urls',
        timestamps: false,
    }
);
