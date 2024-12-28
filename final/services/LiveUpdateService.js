import EventEmitter from 'events';

export default class LiveUpdateService {
    static instance;

    constructor() {
        if (LiveUpdateService.instance) {
            return LiveUpdateService.instance;
        }

        this.events = new EventEmitter();

        LiveUpdateService.instance = this;
    }

    emitUrlsUpdated(userId) {
        this.events.emit('urls-updated', userId);
    }

    onUrlsUpdated(callback) {
        return this.events.on('urls-updated', callback);
    }
    offUrlsUpdated(callback) {
        return this.events.off('urls-updated', callback);
    }
}
