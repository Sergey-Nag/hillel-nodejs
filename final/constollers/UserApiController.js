import { Router } from 'express';
import UserService from '../services/UserService.js';
import authMiddleware from '../middlewares/authMiddleware.js';
import { allowAccessMiddleware } from '../middlewares/allowAccessMiddleware.js';

export default class UserApiController extends Router {
    constructor() {
        super();

        this.userService = new UserService();
        
        this.use(authMiddleware);
        this.get('/all', this.getAll);
        this.delete('/:id', allowAccessMiddleware('Admin'), this.deleteUser);
    }

    createUser = async (req, res) => {
        const { name, surname, email, password, role } = req.body;

        try {
            const user = await this.userService.create({ name, surname, password, email, role, });
            res.send(user);
        } catch (e) {
            logger.error(e);
            return res.status(400).json({ error: e.message });
        }
    };

    deleteUser = async (req, res) => {
        const { id } = req.params;
        const user = await this.userService.getById(id);

        if (!user) {
            res.status(404).send('User not found!');
            return;
        }

        const usr = await this.userService.delete(user);
        console.log(usr);
        res.send('User deleted!');
    };

    getAll = async (req, res) => {
        const users = await this.userService.getAll();

        res.send(users);
    };


}
