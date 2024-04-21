import User from '../models/User.js';
import Repository from './base/Repository.js';

export default class UserRepository extends Repository {
    constructor() {
        super(User);
    }
}
