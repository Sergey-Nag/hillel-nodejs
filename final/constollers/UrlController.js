import { Router } from 'express';
import UrlService from '../services/UrlService.js';
import authMiddleware from '../middlewares/authMiddleware.js';
import { baseUrl } from '../config.js';
import Logger from 'my-logger';
import UserRepository from '../repositories/UserRepository.js';

const logger = new Logger('UrlController.js');

export default class UrlController extends Router {
    constructor() {
        super();

        this.urlService = new UrlService();
        this.userRepo = new UserRepository();

        this.use(authMiddleware);

        this.get('/', this.getUrlsPage);
        this.get('/create', this.getCreatePage);
        this.post('/create', this.create);
        this.get('/delete/:id', this.deleteUrl);
    }

    create = async (req, res) => {
        if (!req.body) {
            return;
        }

        try {
            await this.urlService.create(req.body, req.user.id);
        } catch (e) {
            logger.error(e);
            return res.status(400).render('urls-create.ejs', {
                error: e.message,
                user: req.user,
                baseUrl: baseUrl,
                values: req.body,
                csrfToken: req.session.csrfToken,
            });
        }

        res.redirect('/urls');
    };

    deleteUrl = async (req, res) => {
        const { id } = req.params;

        try {
            await this.urlService.delete(id);
        } catch (e) {
            logger.error(e);
            return res.status(400).render('urls.ejs', {
                error: e.message,
                user: req.user,
                baseUrl: baseUrl,
            });
        }

        res.redirect('/urls');
    };

    getUrlsPage = async (req, res) => {
        const urls = await this.urlService.getAll(req.user.id);

        res.render('urls.ejs', { urls, user: req.user, baseUrl: baseUrl });
    };

    getCreatePage = (req, res) => {
        res.render('urls-create.ejs', { user: req.user, baseUrl: baseUrl, csrfToken: req.session.csrfToken });
    };
}
