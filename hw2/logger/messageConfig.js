export function formatMessage(date, level, category, ...messages) {
    const formattedDate = new Date(date).toISOString();
    const message = messages.map((msg) => {
        if (msg instanceof Error) {
            return msg.stack;
        }

        return JSON.stringify(msg);
    }).join(' ');

    return `Date: ${formattedDate}, Category: ${category}, Level: ${level}, Message: ${message}`;
}
