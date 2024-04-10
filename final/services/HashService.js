import { generateHash } from '../utils.js';

export default class HashService {
    static instance;

    constructor() {
        if (HashService.instance) {
            return HashService.instance;
        }

        this.generatedHashesMap = new Map();
        HashService.instance = this;
    }

    generate(length) {
        const hash = generateHash(length);

        const generated = this.generatedHashesMap.get(length) ?? new Set();

        if (generated.has(hash)) {
            return this.generate(length);
        }

        generated.add(hash);
        this.generatedHashesMap.set(length, generated);

        return hash;
    }
}
