import { Transform } from 'stream';
import config from '../../config.js';
import { FORMATTER } from '../../constants.js';

export default class CSVMessageTransform extends Transform {
    constructor() {
        super({ objectMode: true });
    }
    _transform(chunk, _e, callback) {
        if (config.formatter === FORMATTER.CSV) {
            callback(null, `${chunk.split('\n')[1]}\n`);
        } else {
            callback(null, chunk);
        }
    }
}
