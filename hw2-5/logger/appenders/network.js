import net from 'net';
import { Readable } from "stream";
import { logsEmitter } from "../Logger.js";
import config from '../config.js';
import { LOG_EVENT_NAME } from "../constants.js";
import FileNameTransform from "./transformers/FileNameTransform.js";
import { createCloseStream } from "./utils.js";

function init(FormatTransform) {
    if (!config.port || !config.hostname) {
        throw new Error('Port and hostname are required to connect to the server');
    }

    const logStream = new Readable({ objectMode: true, read: () => {}});
    const connection = net.connect({ port: config.port, host: config.hostname, });

    logStream
        .pipe(new FileNameTransform())
        .pipe(new FormatTransform())
        .pipe(connection);

    connection.on('error', (err) => {
        console.error('Network appender error:', err.message);
    });

    logsEmitter.on(LOG_EVENT_NAME, (date, level, category, ...messages) => {
        logStream.push({ date, level, category, messages }, 'utf-8');
    });

    process.on('beforeExit', createCloseStream(logStream));
    process.on('SIGINT', createCloseStream(logStream));
}

export default { init };
