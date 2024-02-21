import { level } from '../constants.js';

const consoleColors = {
    [level.INFO]: '\x1b[32m%s\x1b[0m',
    [level.WARN]: '\x1b[33m%s\x1b[0m',
    [level.ERROR]: '\x1b[31m%s\x1b[0m',
};

function log(date, level, category, ...messages) {
    const color = consoleColors[level];
    const formattedDate = new Date(date).toISOString();

    console.log(color, formatMessage(formattedDate, level, category, ...messages));
}

function formatMessage(date, level, category, ...messages) {
    const message = messages.map((msg) => {
        return `${JSON.stringify(msg)}`;
    }).join(' ');

    return `Date: ${date}, Category: ${category}, Level: ${level}, Message: ${message}`;
}

export default { log };
