export default class User {
    constructor({ id, name, password, create_time }) {
        this.id = id;
        this.name = name;
        this.password = password;
        this.create_time = create_time;
    }
}
