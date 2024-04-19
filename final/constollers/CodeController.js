import { Router } from 'express';
import CodeService from '../services/CodeService.js';
import { rateLimitByCodeMiddleware, rateLimitByIpMiddleware, rateLimitByUserMiddleware } from '../middlewares/rateLimitMiddleware.js';

export default class CodeController extends Router {
    constructor() {
        super();

        this.codeService = new CodeService();

        this.get('/:code',
            rateLimitByUserMiddleware(),
            rateLimitByCodeMiddleware(),
            rateLimitByIpMiddleware(),
            this.redirect
        );
    }

    redirect = async (req, res) => {
        const code = req.params.code;
        const url = await this.codeService.getRedirectUrl(code);

        if (url) {
            res.redirect(url);
        } else {
            res.status(404).render('error.ejs', {
                code: 404,
            });     
        }
    };
}
