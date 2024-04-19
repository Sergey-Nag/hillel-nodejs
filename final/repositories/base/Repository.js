export default class Repository {
    constructor(model) {
        this.model = model;
    }

    async create(data) {
        return await this.model.create(data)
            .then((result) => result.get({ plain: true }));
    }

    async getByField(field, value, options = {}) {
        return this.model.findAll({
            where: {
                [field]: value,
            },
            raw: true,
            ...options,
        });
    }

    async getAll(options = {}) {
        return this.model.findAll({ raw: true, ...options });
    }

    async findOne(field, value) {
        return this.model.findOne({
            where: {
                [field]: value,
            },
            raw: true,
        });
    }

    async isExist(field, value) {
        const count = await this.model.count({
            where: {
                [field]: value,
            },
        });

        return count > 0;
    }

    async count(options) {
        return this.model.count(options);
    }

    async sum(field, options) {
        return this.model.sum(field, options);
    }

    async delete(field, value, options = {}) {
        console.log('delete', field, value, options);
        return this.model.destroy({
            where: {
                [field]: value,
            },
            ...options,
        });
    }

    async transaction(callback) {
        return this.model.sequelize.transaction(callback);
    }
}
