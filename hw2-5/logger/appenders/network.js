import { logsEmitter } from "../Logger";
import { createCloseStream } from "./utils";

function init(FormatTransform) {
    const logStream = new Readable({ objectMode: true, read: () => {}});

    logStream
        .pipe(new FileNameTransform())
        .pipe(new FormatTransform())
        .pipe(process.stdout);
 
    logsEmitter.on(LOG_EVENT_NAME, (date, level, category, ...messages) => {
        logStream.push({ date, level, category, messages }, 'utf-8');
    });

    process.on('exit', createCloseStream(logStream));
    process.on('SIGINT', createCloseStream(logStream));
}

export default { init };
