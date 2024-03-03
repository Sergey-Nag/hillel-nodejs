import { FORMATTER } from "../constants.js";
import { format } from "./default.js";
import { format as JSONFormat } from "./json.js";
import { format as CSVFormat } from "./csv.js";
import config from "../config.js";

const formatters = {
    [FORMATTER.JSON]: JSONFormat,
    [FORMATTER.CSV]: CSVFormat,
    [FORMATTER.DEFAULT]: format,
    [undefined]: format,
}

function getFormatter() {
    return formatters[config.formatter];
}

export { getFormatter };