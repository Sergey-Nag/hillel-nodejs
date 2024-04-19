import { Router } from 'express';
import authMiddleware from '../middlewares/authMiddleware.js';
import DashboardService from '../services/DashboardService.js';
import { baseUrl } from '../config.js';
import LiveUpdateService from '../services/LiveUpdateService.js';

export default class DashboardController extends Router {
    constructor() {
        super();

        this.dashboardService = new DashboardService();
        this.liveDataService = new LiveUpdateService();

        this.use(authMiddleware);
        this.get('/', this.getDashboardPage);
        this.ws('/', this.getDashboardData);
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

    getDashboardData = async (ws, req) => {
        const sendData = () => {
            this.sendDashboardData(ws, req);
        }
        this.liveDataService.onUrlsUpdated(sendData);
        ws.on('connection', () => {
            console.log('Connection opened');
            this.sendDashboardData(ws, req); 
        });
        ws.on('message', async (message) => {
            console.log('Received message:', message)
            if (message === 'refresh') {
                this.sendDashboardData(ws, req);
            }

            if (message === 'close') {
                ws.close();
            }

            if (message === 'ping') {
                ws.send('pong');
            }
        });

        ws.on('close', () => {
            console.log('Connection closed');
            this.liveDataService.offUrlsUpdated(sendData);
        });
    }

    sendDashboardData = async (ws, req) => {
        try {
            const data = await this.dashboardService.getDashboardDataByUser(req.user);

            ws.send(JSON.stringify(data));
        } catch (error) {
            console.error(error);
            ws.send(JSON.stringify({ error: 'An error occurred while fetching URLs' }));
        }
    }
}
