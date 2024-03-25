import config from '../config.js';
import { LEVEL } from '../constants.js';

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

const RED = '\x1b[31m';
const YELLOW = '\x1b[33m';
const GREEN = '\x1b[32m';
const BLUE = '\x1b[34m';
const MAGENTA = '\x1b[35m';
const RESET = '\x1b[0m';
const messageColors = {
    [LEVEL.INFO]: BLUE,
    [LEVEL.WARN]: YELLOW,
    [LEVEL.ERROR]: RED,
    [LEVEL.DEBUG]: GREEN,
    [LEVEL.TRACE]: MAGENTA,
};

export function createStringColorizer(level) {
    if (level) {
        return (message) => {
            return `${messageColors[level]}${message}${RESET}`;
        };
    }

    return (message) => message;
}
