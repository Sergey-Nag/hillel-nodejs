import UrlRepository from '../repositories/UrlRepository.js';

export default class CodeService {
    constructor() {
        this.urlRepository = new UrlRepository();
    }
    
    getRedirectUrl(code) {
        const url = this.urlRepository.getByKey(code);

        if (url) {
            url.visits++;
            this.urlRepository.update(code, url);

            return url.url;
        }

        return null;
    }
}
