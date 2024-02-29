import config from "../config.js";

export function formatDate(dateString) {
    return new Date(dateString).toISOString();
}

export function formatMessage(...messages) {
    return messages
        .map((msg) => {
            if (msg instanceof Error) {
                return msg.stack;
            }

            return JSON.stringify(msg);
        })
        .join(config.delimeter);
}
