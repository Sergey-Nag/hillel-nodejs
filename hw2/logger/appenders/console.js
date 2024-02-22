import { LEVEL } from '../constants.js';
import { formatMessage } from '../messageConfig.js';

const RED = '\x1b[31m';
const YELLOW = '\x1b[33m';
const GREEN = '\x1b[32m';
const BLUE = '\x1b[34m';
const MAGENTA = '\x1b[35m';
const RESET = '\x1b[0m';

const messageColors = {
    [LEVEL.INFO]: BLUE,
    [LEVEL.WARN]: YELLOW,
    [LEVEL.ERROR]: RED,
    [LEVEL.DEBUG]: GREEN,
    [LEVEL.TRACE]: MAGENTA,
};

function log(date, level, category, ...messages) {
    const color = messageColors[level];

    console.log(
        `${color}%s${RESET}`,
        formatMessage(date, level, category, ...messages),
    );
}

export default { log };
