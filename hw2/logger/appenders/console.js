import { Readable } from 'stream';
import { logsEmitter } from '../Logger.js';
import { LOG_EVENT_NAME } from '../constants.js';
import FileNameTransform from './transformers/FileNameTransform.js';
import { createCloseStream } from './utils.js';


function init(FormatTransform) {
    const logStream = new Readable({ objectMode: true, read: () => {}});

    logStream
        .pipe(new FileNameTransform())
        .pipe(new FormatTransform())
        .pipe(process.stdout)

    logsEmitter.on(LOG_EVENT_NAME, (date, level, category, ...messages) => {
        logStream.push({ date, level, category, messages }, 'utf-8');
    });

    process.on('exit', createCloseStream(logStream));
    process.on('SIGINT', createCloseStream(logStream));
}

export default { init };
