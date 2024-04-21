import Url from './Url.js';
import User from './User.js';

Url.belongsTo(User, {
    foreignKey: 'user_id',
    as: 'user',
    onDelete: 'CASCADE',
});

User.hasMany(Url, {
    foreignKey: 'user_id',
    as: 'urls',
});