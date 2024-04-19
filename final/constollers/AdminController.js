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
        this.get('/create-user', this.getCreateUserPage);
        this.post('/create-user', verifyCsrfTokenMiddleware, this.createUser);
        this.get('/delete-user/:id', this.deleteUser);
        this.get('/delete-rtl/:id', this.deleteRtl);
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
            return res.status(400).render('admin-create-user.ejs', {
                error: e.message,
                user: req.user,
                values: req.body,
                csrfToken: req.session.csrfToken,
            });
        }

        res.redirect('/admin');
    };

    getCreateUserPage = (req, res) => {
        res.render('admin-create-user.ejs', {
            user: req.user,
            csrfToken: req.session.csrfToken,
        });
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
        const rtls = await this.adminService.getRateLimits();
        res.render('rate-limits.ejs', {
            user: req.user, users: [],
            rtls,
        });
    };

    deleteRtl = async (req, res) => {
        const { id } = req.params;

        try {
            await this.adminService.deleteRtl(id);
            log.info(`Admin ${req.user.id} has deleted rate limit ${id}`);
        } catch(e) {
            res.status(404).send('Rate limit not found!');
            return;
        }

        res.redirect('/admin/rate-limits');
    };
}
