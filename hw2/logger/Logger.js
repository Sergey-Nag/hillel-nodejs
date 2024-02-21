import { level, scoreLevel } from './constants.js';
import * as appenderStrategy from './appenderStrategy.js';
import config from './config.js';

/**
 * Logger:
 *  log_level: info, warn, error, trace, debug
 *  log_score: {
 *      none: ??? 0
 *      error: 1
 *      warn: 2
 *      info: 3
 *      debug: 4
 *      trace: 5
 *  }
 *  appenders: console, file, queue, elastic...
 */

function Logger(category) {
    this.info = function (...messages) {
        executeLog(level.INFO, category, ...messages);
    };
    this.warn = function (...messages) {
        executeLog(level.WARN, category, ...messages);
    };
    this.error = function (...messages) {
        executeLog(level.ERROR, category, ...messages);
    };
}

const appender = appenderStrategy.getAppender();

function executeLog(level, category, ...messages) {
    if (scoreLevel[level] <= config.scoreLevel) {
        appender.log(Date.now(), level, category, ...messages);
    }
}

export default Logger;
