import { FORMATTER } from "../constants.js";
import { DefaultFormatTransform } from "./default.js";
import { JsonFormatTransform } from "./json.js";
import { CsvFormatTransform } from "./csv.js";
import config from "../config.js";

const formatters = {
    [FORMATTER.JSON]: JsonFormatTransform,
    [FORMATTER.CSV]: CsvFormatTransform,
    [FORMATTER.DEFAULT]: DefaultFormatTransform,
    [undefined]: DefaultFormatTransform,
}

function getFormatter() {
    return formatters[config.formatter];
}

export { getFormatter };