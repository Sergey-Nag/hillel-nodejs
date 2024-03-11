import UrlRepository from '../repositories/UrlRepository.js';

export default class CodeService {
    constructor() {
        this.urlRepository = new UrlRepository();
    }
    
    getRedirectUrl(code) {
        const url = this.urlRepository.getByKey(code);

        if (url) {
            url.visits++;

            return url.url;
        }

        return '';
    }
}
