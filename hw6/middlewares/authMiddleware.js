import UserService from '../services/UserService.js';

const userService = new UserService();

const authMiddleware = (req, res, next) => {
    const [method, creds] = req.headers?.authorization?.split(' ') ?? []
    
    if (!method || !creds || method !== 'Basic') {
        return res.status(401).send('Unauthorized');
    }

    const [name, password] = creds.split(':');
    const user = userService.getByNameAndPassword(name, password);

    if (!user) {
        return res.status(401).send('Unauthorized');
    }

    req.user = user;

    next();
};

export default authMiddleware;
