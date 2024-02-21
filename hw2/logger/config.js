import { appender, level, scoreLevel} from './constants.js';

const defaultConfig = {
    logLevel: level.INFO,
    scoreLevel: scoreLevel[level.INFO],
    appender: appender.CONSOLE,
};

function initConfig() {
    const logLevel = process.env.LOG_LEVEL?.toUpperCase() ?? defaultConfig.logLevel;
    return {
        logLevel,
        appender: process.env.LOG_APPENDER?.toUpperCase() ?? defaultConfig.appender,
        scoreLevel: scoreLevel[logLevel],
    };
}

const config = initConfig();
console.log(config);

export default config;
