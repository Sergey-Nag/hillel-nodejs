import { Router } from 'express';
import CodeService from '../services/CodeService.js';

export default class CodeController extends Router {
    constructor() {
        super();

        this.codeService = new CodeService();

        this.get('/:code', this.redirect);
    }

    redirect = (req, res) => {
        const code = req.params.code;
        const url = this.codeService.getRedirectUrl(code);

        if (url) {
            res.redirect(url);
        } else {
            res.status(404).send('Not found');
        }
    }
}
