import { createStringColorizer, formatDate, formatMessage } from "./utils.js";
import { Transform } from "stream";

class JsonFormatTransform extends Transform {
    constructor() {
        super({ objectMode: true });
    }

    _transform({ date, level, category, messages, fileName, setColor }, _e, callback) {
        const formattedDate = formatDate(date);
        const message = formatMessage(...messages);
        const colorize = createStringColorizer(setColor ? level : null);

        const formatted = JSON.stringify({
            date: formattedDate,
            level,
            category,
            fileName,
            message,
        });
        callback(null, colorize(`${formatted}\n`));
    }
}

export { JsonFormatTransform };
