import { Router } from 'express';
import UrlService from '../services/UrlService.js';
import authMiddleware from '../middlewares/authMiddleware.js';

export default class UrlController extends Router {
    constructor() {
        super();

        this.urlService = new UrlService();

        this.use(authMiddleware);

        this.get('/', this.getAll);
        this.post('/create', this.create);
    }

    create = (req, res) => {
        const { url, name } = req.body;

        this.urlService.create({ url, name, user: req.user });

        res.send('Created!');
    };

    getAll = (req, res) => {
        const urls = this.urlService.getAll();

        res.send(urls);
    };
}
