import Logger from './logger/Logger.js';

const log = new Logger('first');

log.info('info');
log.info('info 2');
log.warn('warn', 123, { foo: 'bar', 1: 2});

const log2 = new Logger('second');

log2.error('error');
log2.debug('debug');
log2.trace('trace');

try {
    throw new Error('test');
} catch (e) {
    log2.error('error here', e);
}