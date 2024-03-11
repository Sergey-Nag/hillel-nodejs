export default class Url {
    constructor({ id, code, name, url, visits, create_time, user }) {
        this.id = id;
        this.code = code;
        this.name = name;
        this.url = url;
        this.visits = visits;
        this.create_time = create_time;
        this.user = user;
    }
}
