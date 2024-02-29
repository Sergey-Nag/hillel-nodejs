import { existsSync, readFileSync } from 'fs';
import { APPENDER, LEVEL, SCORE_LEVEL, DELIMETER, FORMATTER } from './constants.js';

const defaultConfig = {
    logLevel: LEVEL.INFO,
    appenders: [APPENDER.CONSOLE],
    delimeter: DELIMETER,
    formatter: FORMATTER.DEFAULT,
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
        }
    } else if (LOG_CONFIG_FILE) {
        console.log(`\n${LOG_CONFIG_FILE} config file not found! Using default config\n`);
    }
}

const getDefinedLevel = (config) => {
    return LEVEL[process.env.LOG_LEVEL?.toUpperCase()]
        ?? LEVEL[config?.logLevel?.toUpperCase()]
        ?? defaultConfig.logLevel;
}

const getDefinedAppenders = (config) => {
    const envAppenders = process.env.LOG_APPENDERS?.split(',');
    const appenders = config?.appenders ?? defaultConfig.appenders;

    return (envAppenders ?? appenders)
        .map((a) => APPENDER[a.trim().toUpperCase()])
        .filter(Boolean);
}

const getDefinedDelimeter = (config) => {
    return process.env.LOG_DELIMETER
        ?? config?.delimeter
        ?? defaultConfig.delimeter;
}

const getDefinedFormatter = (config) => {
    return FORMATTER[process.env.LOG_FORMATTER?.toUpperCase()]
        ?? FORMATTER[config?.formatter?.toUpperCase()]
        ?? defaultConfig.formatter;
}

function initConfig(config) {
    const logLevel = getDefinedLevel(config);
    const appenders = getDefinedAppenders(config);
    const delimeter = getDefinedDelimeter(config);
    const formatter = getDefinedFormatter(config);

    return {
        logLevel,
        appenders,
        formatter,
        delimeter,
        scoreLevel: SCORE_LEVEL[logLevel],
    };
}

const loadedConfig = loadConfig();
const config = initConfig(loadedConfig);

console.log('Config:', config);
export default config;
