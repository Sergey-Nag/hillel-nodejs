export default class RepositoryMongo {
    constructor(model) {
        this.model = model;
    }

    async create(data) {
        return this.model.create(data);
    }

    async getByField(field, value, options = {}) {
        field = field === 'id' ? '_id' : field;
        return (await this.model.find({
            [field]: value,
            ...options,
        })).map((doc) => doc.toJSON());
    }

    async findOne(field, value) {
        return (await this.model.findOne({
            [field]: value,
        })).toJSON();
    }

    async count(options = {}) {
        return this.model.estimatedDocumentCount(options.where);
    }

    async sum(field, options = {}) {
        const { where = options } = options;
        
        const result = await this.model.aggregate([{
            $group: {
                _id: null,
                total: { $sum: `$${field}` },
            },
        }]);

        return result[0]?.total ?? 0;
    }

    async getAll(options = {}) {
        return (await this.model.find(options)).map((doc) => doc.toJSON());
    }

    async update(id, data) {
        return this.model.updateOne({ _id: id }, data);
    }
}