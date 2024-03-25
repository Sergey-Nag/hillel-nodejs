import { Router } from 'express';
import UrlService from '../services/UrlService.js';
import authMiddleware from '../middlewares/authMiddleware.js';
import { baseUrl } from '../config.js';
import Logger from 'my-logger';

const logger = new Logger('UrlController.js');

export default class UrlController extends Router {
    constructor() {
        super();

        this.urlService = new UrlService();

        this.use(authMiddleware);

        this.get('/', this.getUrlsPage);
        this.get('/all', this.getAll);
        this.post('/create', this.create);
    }

    create = async (req, res) => {
        const { url, name } = req.body;

        try {
            await this.urlService.create(url, name, req.user);
        } catch (e) {
            logger.error(e);
            res.status(400).send('Error! Try again');
            return;
        }

        res.send('Created!');
    };

    getAll = async (req, res) => {
        const urls = await this.urlService.getAll();

        res.send(urls);
    };

    getUrlsPage = async (req, res) => {
        const urls = await this.urlService.getAll(req.user.id);

        res.render('urls.ejs', { urls, user: req.user, baseUrl: baseUrl });
    };
}
