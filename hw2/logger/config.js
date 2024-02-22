import { existsSync, fstatSync, readFileSync } from 'fs';
import { LEVEL, APPENDER, SCORE_LEVEL } from './constants.js';


const defaultConfig = {
    logLevel: LEVEL.INFO,
    appender: APPENDER.CONSOLE,
};

function loadConfig() {
    const { LOG_CONFIG_FILE } = process.env;

    if (LOG_CONFIG_FILE && existsSync(LOG_CONFIG_FILE)) {
        const fileContent = readFileSync(LOG_CONFIG_FILE, 'utf-8');
        try {
            const config = JSON.parse(fileContent);
            return config;
        } catch (e) {
            console.log(`\nError parsing ${LOG_CONFIG_FILE} file: ${e.message}. Using default config\n`);
            return defaultConfig;
        }
    }

    LOG_CONFIG_FILE && console.log(`\n${LOG_CONFIG_FILE} config file not found! Using default config\n`);

    return defaultConfig;
}

function initConfig(config) {
    const logLevelName = (process.env.LOG_LEVEL ?? config.logLevel)?.toUpperCase();
    const appenderName = (process.env.LOG_APPENDER ?? config.appender)?.toUpperCase();

    const logLevel = LEVEL[logLevelName] ?? defaultConfig.logLevel;
    const appender = APPENDER[appenderName] ?? defaultConfig.appender;

    return {
        logLevel,
        appender,
        scoreLevel: SCORE_LEVEL[logLevel],
    };
}

const config = initConfig(loadConfig());

export default config;
