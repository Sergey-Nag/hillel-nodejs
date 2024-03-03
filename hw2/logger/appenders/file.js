import { existsSync, } from 'fs';
import { appendFile } from 'fs/promises';
import config from '../config.js';
import { FORMATTER, LEVEL } from '../constants.js';

const filePath = './app';
const errorFilePath = './app_error';

function log(format, date, level, category, ...messages) {
    const message = format(date, level, category, ...messages) + '\n';

    if (config.formatter === FORMATTER.CSV) {
        writeCSVLog(message, level === LEVEL.ERROR, date);
    } else {
        writeTextLog(message, level === LEVEL.ERROR);
    }
}

async function writeCSVLog(message, writeError, date) {
    const logDate = new Date(date);
    const day = `${logDate.getDate()}`.padStart(2, '0');
    const month = `${logDate.getMonth() + 1}`.padStart(2, '0');
    const year = logDate.getFullYear();

    const logFileName = `${filePath}_${day}_${month}_${year}.csv`;
    const errorLogName = `${errorFilePath}_${day}_${month}_${year}.csv`;

    const logMessage = existsSync(logFileName)
        ? message.split('\n')[1] + '\n'
        : message;

    await writeLog(logMessage, logFileName, writeError ? errorLogName : null);
}

async function writeTextLog(message, writeError) {
    const logFileName = `${filePath}.log`;
    const errorLogName = `${errorFilePath}.log`;

    await writeLog(message, logFileName, writeError ? errorLogName : null);
}

async function writeLog(message, fileName, errorFileName) {
    await appendFile(fileName, message, { flag: 'a+' });
    if (errorFileName) {
        await appendFile(errorFileName, message, { flag: 'a+' });
    }
}

export default { log };
