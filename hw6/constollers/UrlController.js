import { Router } from 'express';
import UrlService from '../services/UrlService.js';
import authMiddleware from '../middlewares/authMiddleware.js';
import { baseUrl } from '../config.js';

export default class UrlController extends Router {
    constructor() {
        super();

        this.urlService = new UrlService();

        this.use(authMiddleware);

        this.get('/', this.getUrlsPage);
        this.get('/all', this.getAll);
        this.post('/create', this.create);
    }

    create = (req, res) => {
        const { url, name } = req.body;

        const newUrl = this.urlService.create(url, name, req.user);

        res.send(newUrl);
    };

    getAll = (req, res) => {
        const urls = this.urlService.getAll();

        res.send(urls);
    };

    getUrlsPage = (req, res) => {
        const urls = this.urlService.getAll(req.user.id);

        res.render('urls.ejs', { urls, user: req.user, baseUrl: baseUrl });
    }
}
