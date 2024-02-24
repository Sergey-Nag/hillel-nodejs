import { LEVEL, SCORE_LEVEL } from './constants.js';
import * as appenderStrategy from './appenderStrategy.js';
import config from './config.js';

function Logger(category) {
    this.info = function (...messages) {
        executeLog(LEVEL.INFO, category, ...messages);
    };
    this.warn = function (...messages) {
        executeLog(LEVEL.WARN, category, ...messages);
    };
    this.error = function (...messages) {
        executeLog(LEVEL.ERROR, category, ...messages);
    };
    this.debug = function (...messages) {
        executeLog(LEVEL.DEBUG, category, ...messages);
    };
    this.trace = function (...messages) {
        executeLog(LEVEL.TRACE, category, ...messages);
    };
}

const appender = appenderStrategy.getAppender();

function executeLog(level, category, ...messages) {
    if (SCORE_LEVEL[level] <= config.scoreLevel) {
        appender.log(Date.now(), level, category, ...messages);
    }
}

export default Logger;
