import { generateHash } from "../utils.js";

export function createCsrfTokenMiddleware(req, res, next) {
    if (!req.session?.csrfToken) {
        req.session.csrfToken = generateHash(16);
    }

    next();
}

export function verifyCsrfTokenMiddleware(req, res, next) {
    if (req.method === 'POST' && req.body.__csrfToken !== req.session.csrfToken) {
        return res.status(403).render('error.ejs', { code: 403 });
    }

    next();
}