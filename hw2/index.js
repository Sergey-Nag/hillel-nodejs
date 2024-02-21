import Logger from './logger/logger.js';

const log = new Logger('index.js');

log.info('info');
log.warn('warn');
log.warn('error 1', 123, {a: 1});
log.error('error 1', 123, {a: 1});
