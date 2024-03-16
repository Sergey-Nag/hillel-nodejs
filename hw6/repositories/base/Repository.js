import HashService from '../../services/HashService.js';

export default class Repository {
    constructor(model, data) {
        this.model = model;
        this.data = data;

        this.hashService = new HashService();
    }

    create(data, key) {
        data.id = this.hashService.generate(8);

        const model = new this.model(data);
        this.data.set(key ?? data.id, model);

        return model;
    }

    update(key, data) {
        this.data.set(key, data);
    }

    getByKey(key) {
        return this.data.get(key);
    }

    get(callback) {
        return [...this.data.values()].find(callback);
    }

    filter(callback) {
        return [...this.data.values()].filter(callback);
    }

    getAll() {
        return [...this.data.values()];
    }
}
