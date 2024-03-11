import Url from '../models/Url.js';
import Repository from './base/Repository.js';
import urls from '../db/urls.js';

export default class UrlRepository extends Repository {
    constructor() {
        super(Url, urls);
    }
}
