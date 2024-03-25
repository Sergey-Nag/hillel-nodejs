import HashService from '../../services/HashService.js';
import postgressClient from '../../db/postgressClient.js';

export default class Repository {
    constructor(model, tableName) {
        this.model = model;
        this.tableName = tableName;
        this.postgressClient = postgressClient;
        this.hashService = new HashService();
    }

    async create(data) {
        const [fields, values] = this.#getFieldsAndValues(data);

        await this.postgressClient.query(
            `INSERT INTO ${this.tableName} (${fields}) VALUES (${values.map((_, i) => `$${i + 1}`).join(', ')})`,
            values
        );
    }

    async updateById(id, where) {
        const [whereFields, whereValues] = this.#getFieldsAndValues(where);

        await this.postgressClient.query(
            `UPDATE ${this.tableName} SET ${whereFields.map((field, i) => `${field} = $${i + 1}`).join(', ')} WHERE id = ${id}`,
            [...whereValues]
        );
    }

    async getByField(field, value) {
        const result = await this.postgressClient.query(
            `SELECT * FROM ${this.tableName} WHERE ${field} = $1`,
            [value]
        );
        return result.rows.map(row => new this.model(row));
    }

    // async findWhere({ field, value }) {
    //     const result = await this.postgressClient.query(
    //         `SELECT * FROM ${this.tableName} WHERE ${field} = $1`,
    //         [value]
    //     );
    //     return result.rows.map(row => new this.model(row));
    // }

    async getAll() {
        const result = await this.postgressClient.query(`SELECT * FROM ${this.tableName}`);
        return result.rows.map(row => new this.model(row));
    }

    #getFieldsAndValues(data) {
        const entries = Object.entries(data);
        return entries.reduce((acc, [key, value]) => {
            acc[0].push(key);
            acc[1].push(value);
            return acc;
        }, [[], []]);
    }
}
