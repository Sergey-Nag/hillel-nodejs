import config from '../config.js';
import { CSV_HEADERS } from '../constants.js';
import { createStringColorizer, formatDate } from './utils.js';
import { Transform } from 'stream';

class CsvFormatTransform extends Transform {
    constructor() {
        super({ objectMode: true });
    }
    _transform(
        { date, level, category, messages, fileName, setColor },
        _e,
        callback
    ) {
        const formattedDate = formatDate(date);
        const message = messages
            .map((msg) => {
                if (msg instanceof Error) {
                    return `Error: ${msg.message}`;
                } else if (typeof msg === 'object') {
                    return JSON.stringify(msg);
                }

                return msg.toString();
            })
            .join(config.delimeter);
        const colorize = createStringColorizer(setColor ? level : null);

        callback(
            null,
            colorize(
                `${CSV_HEADERS}\n${fileName},${formattedDate},${level},${category},${message}\n`
            )
        );
    }
}

export { CsvFormatTransform };
