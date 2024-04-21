import { Router, json } from 'express';
import UrlService from '../services/UrlService.js';
import authMiddleware from '../middlewares/authMiddleware.js';
import UserService from '../services/UserService.js';
import { allowAccessMiddleware } from '../middlewares/allowAccessMiddleware.js';

export default class ApiController extends Router {
    constructor() {
        super();
    
        this.use(authMiddleware);

        this.urlService = new UrlService();
        this.userService = new UserService();
    
        this.patch('/urls/:id', this.updateUrl);
        this.patch('/users/:id',  allowAccessMiddleware('Admin'), this.updateUser);
    }

    updateUrl = async (req, res) => {
        const { id } = req.params;

        try {
            await this.urlService.update(id, req.body);
        } catch (e) {
            return res.status(400).json({ error: e.message });
        }

        res.json({ success: true });
    }

    updateUser = async (req, res) => {
        const { id } = req.params;

        try {
            await this.userService.update(id, req.body);
        } catch (e) {
            return res.status(400).json({ error: e.message });
        }

        res.json({ success: true });
    }

}
