import { generateHash } from '../../utils.js';

export default class Repository {
    constructor(model, data) {
        this.model = model;
        this.data = data;
    }

    create(data, key) {
        data.id = generateHash(8);

        this.data.set(key ?? data.id, new this.model(data));
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
