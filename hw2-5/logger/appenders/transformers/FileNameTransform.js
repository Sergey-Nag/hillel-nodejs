import { Transform } from 'stream';

export default class FileNameTransform extends Transform {
    constructor() {
        super({ objectMode: true });
    }
    _transform(chunk, _e, callback) {
        callback(null, {
            ...chunk,
            fileName: process.argv[1].split('/').pop(),
        });
    }
}
