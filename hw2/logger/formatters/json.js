import { formatDate, formatMessage } from "./utils.js";

function format(date, level, category, ...messages) {
    const formattedDate = formatDate(date);
    const message = formatMessage(...messages);

    return JSON.stringify({
        date: formattedDate,
        category,
        level,
        message,
    });
}

export { format };
