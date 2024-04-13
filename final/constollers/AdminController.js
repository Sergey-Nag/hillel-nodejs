import { Router } from 'express';
import AdminService from '../services/AdminService.js';
import authMiddleware from '../middlewares/authMiddleware.js';
import { allowAccessMiddleware } from '../middlewares/allowAccessMiddleware.js';

export default class AdminController extends Router {
    constructor(userService) {
        super();

        this.adminService = new AdminService();

        this.use(authMiddleware, allowAccessMiddleware('Admin'));

        this.get('/', this.getAdminPage);
        this.post('/create-user', this.createUser);
    }

    getAdminPage = async (req, res) => {
        // const users = await this.adminService.getAllUsers();

        res.render('admin.ejs', { user: req.user });
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
            });
        }

        res.redirect('/admin');
    };

}
