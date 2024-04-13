export function allowAccessMiddleware(role) {
    return function (req, res, next) {
        if (req.user && req.user.role === role) {
            return next();
        }

        res.status(403).render('error.ejs', { code: 403 });
    }
}
