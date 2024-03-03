import config from "../config.js";
import { formatDate } from "./utils.js";

function format(date, level, category, ...messages) {
    const formattedDate = formatDate(date);
    const message = messages.map((msg) => {
        if (msg instanceof Error) {
            return `Error: ${msg.message}`;
        } else if (typeof msg === "object") {
            return JSON.stringify(msg);
        }

        return msg.toString();
    }).join(config.delimeter);

    return `Date,Level,Category,Messages\n${formattedDate},${level},${category},${message}`;
}

export { format };
