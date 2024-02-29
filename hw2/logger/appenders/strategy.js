import { APPENDER } from '../constants.js';
import config from '../config.js';
import consoleAppender from './console.js';
import fileAppender from './file.js';

const appenders = {
    [APPENDER.CONSOLE]: consoleAppender,
    [APPENDER.FILE]: fileAppender,
    [undefined]: consoleAppender,
};

function getAppender() {
    return {
        log(...args) {
            config.appenders.forEach((a) => {
                appenders[a].log(...args)
            });
        },
    }
}

export { getAppender };
