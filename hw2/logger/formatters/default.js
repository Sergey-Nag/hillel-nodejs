import { formatDate, formatMessage } from "./utils.js";

function format(date, level, category, ...messages) {
    const formattedDate = formatDate(date);
    const message = formatMessage(...messages);

    return `Date: ${formattedDate}, Category: ${category}, Level: ${level}, Message: ${message}`;
}

export { format };
