import { LEVEL } from '../constants.js';
import { appendFile } from 'fs/promises';
import { formatMessage } from '../messageConfig.js';

const filePath = './app.log';
const errorFilePath = './app_error.log';

function log(date, level, category, ...messages) {
    const message = formatMessage(date, level, category, ...messages);

    appendFile(filePath, message + '\n', { flag: 'a+' });

    if (level === LEVEL.ERROR) {
        appendFile(errorFilePath, message + '\n', { flag: 'a+' });
    }
}

export default { log };
