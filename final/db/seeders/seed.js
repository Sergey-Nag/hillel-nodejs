import { ADMIN_EMAIL, ADMIN_PASSWORD } from '../../config.js';
import bcrypt from 'bcrypt';

const dbProvider = process.env.DATABASE_PROVIDER || 'POSTGRESS';

if (dbProvider === 'MONGO') {
    const run = (await import('../mongoClient.js')).default;

    let connection;
    try {
        connection = await run();
    } catch (e) {
        console.error('Database connection error', e);
    }

    const User = (await import('../../models/mongoose/User.js')).default;

    try {
        const password = await bcrypt.hash(ADMIN_PASSWORD, 10);
        const admin = await User({
            name: 'admin',
            email: ADMIN_EMAIL,
            role: 'Admin',
            password,
        });
        
        await admin.save();
        console.log('Admin created');
        await connection.close();
    } catch (error) {
        console.error(error);
    }
    
} else {
    await import('../../models/sequelize/initRelations.js');
    const User = (await import('../../models/sequelize/User.js')).default;

    try {
        const password = await bcrypt.hash(ADMIN_PASSWORD, 10);
        await User.create({
            name: 'admin',
            email: ADMIN_EMAIL,
            role: 'Admin',
            password,
        });
        console.log('Admin created');
    } catch (error) {
        console.error(error);
    }
}
