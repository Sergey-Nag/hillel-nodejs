import users from '../db/users.js';

const authMiddleware = (req, res, next) => {
    const [method, creds] = req.headers?.authorization?.split(' ') ?? []

    if (!method || !creds || method !== 'Basic') {
        return res.status(401).send('Unauthorized');
    }

    const [name, password] = creds.split(':');
    const user = [...users.values()].find(u => u.name === name && u.password === password);

    if (!user) {
        return res.status(401).send('Unauthorized');
    }
    
    req.user = user;

    next();
};

export default authMiddleware;
