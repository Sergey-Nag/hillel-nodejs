import config from "../config.js";
import { CSV_HEADERS } from "../constants.js";
import { formatDate } from "./utils.js";
import { Transform } from "stream";

class CsvFormatTransform extends Transform {
    constructor() {
        super({ objectMode: true });
    }
    _transform({ date, level, category, messages, fileName }, _e, callback) {
        const formattedDate = formatDate(date);
        const message = messages.map((msg) => {
            if (msg instanceof Error) {
                return `Error: ${msg.message}`;
            } else if (typeof msg === "object") {
                return JSON.stringify(msg);
            }

            return msg.toString();
        }).join(config.delimeter);

        callback(
            null,
            `${CSV_HEADERS}\n${fileName},${formattedDate},${level},${category},${message}\n`,
        );
    }
}

export { CsvFormatTransform };
