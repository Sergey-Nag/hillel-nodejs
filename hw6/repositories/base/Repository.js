export default class Repository {
    constructor(model) {
        this.model = model;
    }

    async create(data) {
        await this.model.create(data);
    }

    async getByField(field, value) {
        return this.model.findAll({
            where: {
                [field]: value,
            },
            raw: true,
        });
    }

    async getAll() {
        return this.model.findAll({ raw: true });
    }

    async isExist(field, value) {
        const count = await this.model.count({
            where: {
                [field]: value,
            },
        });

        return count > 0;
    }
}
