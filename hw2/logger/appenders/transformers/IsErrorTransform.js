import { LEVEL } from "../../constants.js";
import { Transform } from "stream";

export default class IsErrorTransform extends Transform {
    constructor() {
        super({ objectMode: true });
    }
    _transform(chunk, _e, callback) {
        callback(null, chunk.level === LEVEL.ERROR ? chunk : null);
    }
}
