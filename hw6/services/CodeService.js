import UrlRepository from '../repositories/UrlRepository.js';

export default class CodeService {
    constructor() {
        this.urlRepository = new UrlRepository();
    }
    
    async getRedirectUrl(code) {
        const [url] = await this.urlRepository.getByField('code', code);

        if (url) {
            await this.urlRepository.updateVisitsByCode(code);

            return url.url;
        }

        return '';
    }
}
