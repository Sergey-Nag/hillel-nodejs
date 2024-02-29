export const LEVEL = {
    ERROR: 'ERROR',
    WARN: 'WARN',
    INFO: 'INFO',
    DEBUG: 'DEBUG',
    TRACE: 'TRACE',
};

export const SCORE_LEVEL = {
    [LEVEL.ERROR]: 1,
    [LEVEL.WARN]: 2,
    [LEVEL.INFO]: 3,
    [LEVEL.DEBUG]: 4,
    [LEVEL.TRACE]: 5,
};

export const APPENDER = {
    CONSOLE: 'CONSOLE',
    FILE: 'FILE',
};

export const FORMATTER = {
    JSON: 'JSON',
    DEFAULT: 'DEFAULT',
    CSV: 'CSV',
};

export const DELIMETER = ', ';
