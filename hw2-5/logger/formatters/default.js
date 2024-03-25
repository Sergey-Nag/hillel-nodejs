import { createStringColorizer, formatDate, formatMessage } from './utils.js';
import { Transform } from 'stream';
class DefaultFormatTransform extends Transform {
    constructor() {
        super({ objectMode: true });
    }

    _transform(
        { date, level, category, messages, fileName, setColor },
        _e,
        callback
    ) {
        const formattedDate = formatDate(date);
        const message = formatMessage(...messages);
        const colorize = createStringColorizer(setColor ? level : null);

        callback(
            null,
            colorize(
                `File Name: ${fileName}, Date: ${formattedDate}, Category: ${category}, Level: ${level}, Message: ${message}\n`
            )
        );
    }
}

export { DefaultFormatTransform };
