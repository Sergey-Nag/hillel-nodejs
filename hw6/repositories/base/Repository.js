import { generateHash } from '../../utils.js';

export default class Repository {
    constructor(model, data) {
        this.model = model;
        this.data = data;
    }

    create(data, key) {
        data.id = generateHash(8);

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

    getAll() {
        return [...this.data.values()];
    }
}
