import UrlRepository from '../repositories/UrlRepository.js';

export default class CodeService {
    constructor() {
        this.urlRepository = new UrlRepository();
    }

    async getRedirectUrl(code) {
        const [url] = await this.urlRepository.getByField('code', code);

        if (this.isRedirectAllowed(url)) {
            await this.urlRepository.updateVisitsByCode(code);

            if (url.type === 'One-time') {
                await this.urlRepository.update(url.id, { enabled: false });
            }

            return url.url;
        }

        return '';
    }

    isRedirectAllowed(url) {
        if (!url) {
            return false;
        }

        if (url.type === 'Temporary') {
            return url.expire_time > new Date();
        }

        if (url.type === 'One-time' && url.enabled) {
            return url.visits === 0;
        }
        
        return url.enabled;
    }
}
