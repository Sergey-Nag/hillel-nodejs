import { Router, json } from 'express';
import UrlService from '../services/UrlService.js';
import authMiddleware from '../middlewares/authMiddleware.js';

export default class ApiController extends Router {
    constructor() {
        super();
    
        this.use(authMiddleware);

        this.urlService = new UrlService();
    
        this.patch('/urls/:id', json(), this.updateUrl);
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

}
