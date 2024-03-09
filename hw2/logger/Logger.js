import { LEVEL, SCORE_LEVEL, LOG_EVENT_NAME } from './constants.js';
import * as appenderStrategy from './appenders/strategy.js';
import * as formatterStrategy from './formatters/strategy.js';
import EventEmitter from 'events';
import config from './config.js';

export const logsEmitter = new EventEmitter();

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

const appenders = appenderStrategy.getAppenders();
const formatter = formatterStrategy.getFormatter();

appenders.init(formatter);

function executeLog(level, category, ...messages) {
    if (SCORE_LEVEL[level] <= config.scoreLevel) {
        logsEmitter.emit(LOG_EVENT_NAME, Date.now(), level, category, ...messages);
    }
}

export default Logger;
