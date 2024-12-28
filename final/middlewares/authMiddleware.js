import UserService from '../services/UserService.js';

const userService = new UserService();

const authMiddleware = async (req, res, next) => {
    if (!req.session?.userId) {
        return res.status(401).render('error.ejs', { code: 401 })
    }

    const user = await userService.getById(req.session.userId);

    if (!user) {
        req.session = null;
        return res.status(401).render('error.ejs', { code: 401 });
    }

    req.user = user;

    next();
};

export default authMiddleware;
