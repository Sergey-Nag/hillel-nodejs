import { APPENDER } from '../constants.js';
import config from '../config.js';
import consoleAppender from './console.js';
import fileAppender from './file.js';
import networkAppender from './network.js';

const appenders = {
    [APPENDER.CONSOLE]: consoleAppender,
    [APPENDER.FILE]: fileAppender,
    [APPENDER.NETWORK]: networkAppender,
    [undefined]: consoleAppender,
};

function getAppenders() {
    return {
        init(...args) {
            config.appenders.forEach((a) => {
                appenders[a].init(...args)
            });
        },
    }
}

export { getAppenders };
