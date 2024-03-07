import { createWriteStream, existsSync, writeFileSync } from 'fs';
import { Readable } from 'stream';
import { logsEmitter } from '../Logger.js';
import config from '../config.js';
import { CSV_HEADERS, FORMATTER, LOG_EVENT_NAME } from '../constants.js';
import CSVMessageTransform from './transformers/CSVMessageTransform.js';
import FileNameTransform from './transformers/FileNameTransform.js';
import IsErrorTransform from './transformers/IsErrorTransform.js';
import { createCloseStream } from './utils.js';

const filePath = './app';
const errorFilePath = './app_error';

function init(FormatTransform) {
    const logStream = new Readable({ objectMode: true, read: () => {} });

    const fileStream = config.formatter === FORMATTER.CSV
        ? createCSVWriteStream(filePath)
        : createLogWriteStream(filePath);

    const errorFileStream = config.formatter === FORMATTER.CSV
        ? createCSVWriteStream(errorFilePath)
        : createLogWriteStream(errorFilePath);

    const logPipline = logStream.pipe(new FileNameTransform())

    logPipline
        .pipe(new FormatTransform())
        .pipe(new CSVMessageTransform())
        .pipe(fileStream);

    logPipline
        .pipe(new IsErrorTransform())
        .pipe(new FormatTransform())
        .pipe(new CSVMessageTransform())
        .pipe(errorFileStream);

    logsEmitter.on(LOG_EVENT_NAME, (date, level, category, ...messages) => {
        logStream.push({ date, level, category, messages }, 'utf8');
    });

    process.on('exit', createCloseStream(logStream));
    process.on('SIGINT', createCloseStream(logStream));
}

function createLogWriteStream(fileName) {
    const logFileName = `${fileName}.log`;

    return createWriteStream(logFileName, { flags: 'a+', encoding: 'utf8' });
}

function createCSVWriteStream(fileName) {
    const logDate = new Date()
    const day = `${logDate.getDate()}`.padStart(2, '0');
    const month = `${logDate.getMonth() + 1}`.padStart(2, '0');
    const year = logDate.getFullYear();

    const logFileName = `${fileName}_${day}_${month}_${year}.csv`;

    if (!existsSync(logFileName)) {
        writeFileSync(logFileName, `${CSV_HEADERS}\n`);
    }

    return createWriteStream(logFileName, { flags: 'a+', encoding: 'utf8' });
}

export default { init };
