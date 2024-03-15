import UserService from '../services/UserService.js';

const userService = new UserService();

const authMiddleware = (req, res, next) => {
    if (!req.session.userId) {
        return res.status(401).render('401.ejs');
    }

    const user = userService.getById(req.session.userId);

    if (!user) {
        req.session = null;
        return res.status(401).render('401.ejs');
    }

    req.user = user;

    next();
};

export default authMiddleware;
