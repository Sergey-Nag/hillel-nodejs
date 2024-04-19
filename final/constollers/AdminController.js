import { Router } from 'express';
import AdminService from '../services/AdminService.js';
import authMiddleware from '../middlewares/authMiddleware.js';
import { allowAccessMiddleware } from '../middlewares/allowAccessMiddleware.js';
import { verifyCsrfTokenMiddleware } from '../middlewares/csrfTokenMiddleware.js';
import UserService from '../services/UserService.js';
import Logger from 'my-logger';

const log = new Logger('AdminController.js');

export default class AdminController extends Router {
    constructor() {
        super();

        this.adminService = new AdminService();
        this.userService = new UserService();

        this.use(authMiddleware, allowAccessMiddleware('Admin'));

        this.get('/', this.getAdminPage);
        this.post('/create-user', verifyCsrfTokenMiddleware, this.createUser);
        this.get('/delete-user/:id', this.deleteUser);
        this.get('/rate-limits', this.getRateLimitsPage);
    }

    getAdminPage = async (req, res) => {
        const users = await this.userService.getAll();

        res.render('admin.ejs', {
            user: req.user,
            csrfToken: req.session.csrfToken,
            users,
        });
    };

    createUser = async (req, res) => {
        const { name, surname, email, password, role } = req.body;

        try {
            await this.adminService.createUser({ name, surname, email, password, role });
        } catch (e) {
            return res.status(400).render('admin.ejs', {
                error: e.message,
                user: req.user,
                values: req.body,
                csrfToken: req.session.csrfToken,
            });
        }

        res.redirect('/admin');
    };

    deleteUser = async (req, res) => {
        const { id } = req.params;

        try {
            await this.adminService.deleteUser(id);
            log.info(`Admin ${req.user.id} has deleted user ${id}`);
        } catch(e) {
            res.status(404).send('User not found!');
            return;
        }

        res.redirect('/admin');
    };

    getRateLimitsPage = async (req, res) => {
        const data = await this.adminService.getRateLimits();
        res.render('rate-limits.ejs', {
            user: req.user, users: [],
            ...data,
        });
    };
}
