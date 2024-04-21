import { ADMIN_EMAIL, ADMIN_PASSWORD } from '../../config.js';
import bcrypt from 'bcrypt';
import User from '../../models/User.js';

try {
    const password = await bcrypt.hash(ADMIN_PASSWORD, 10);
    await User.create({
        name: 'admin',
        email: ADMIN_EMAIL,
        role: 'Admin',
        password,
    });
} catch (error) {
    console.error(error);
}
