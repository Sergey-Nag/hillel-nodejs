import { Router } from 'express';
import authMiddleware from '../middlewares/authMiddleware.js';
import DashboardService from '../services/DashboardService.js';
import { baseUrl } from '../config.js';

export default class DashboardController extends Router {
    constructor() {
        super();

        this.dashboardService = new DashboardService();

        this.use(authMiddleware);
        this.get('/', this.getDashboardPage);
    }
    
    getDashboardPage = async (req, res) => {
        try {
            const data = await this.dashboardService.getDashboardDataByUser(req.user);

            res.render('dashboard', {
                user: req.user,
                baseUrl,
                ...data,
            });
        } catch (error) {
            console.error(error);
            res.render('dashboard', {
                user: req.user,
                baseUrl,
                error: 'An error occurred while fetching URLs',
            });
        }
    }
}
