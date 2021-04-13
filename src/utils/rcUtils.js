const NEWLINE = '\n';
const RE_INI_KEY_VAL = /^\s*([\w.-]+)\s*=\s*(.*)?\s*$/;
const RE_NEWLINES = /\\n/g;
const NEWLINES_MATCH = /\n|\r|\r\n/;
const notice = require('./notice');
const fs = require('./fs');
const ANNITATION = /^\s*#/;
const EMPTYLINE = /^\s*$/;

exports.parse = parse;
/**
 * 解析rc格式的字符串
 * @param {String} dataSrc
 * @returns {Object}  rc对象
 */
function parse(dataSrc) {
    const obj = {};
    // convert Buffers before splitting into lines and processing
    dataSrc.toString().split(NEWLINES_MATCH).forEach(function (line, idx) {
        // matching "KEY' and 'VAL' in 'KEY=VAL'
        const keyValueArr = line.match(RE_INI_KEY_VAL);
        // matched?
        if (keyValueArr != null) {
            const key = keyValueArr[1];
            // default undefined or missing values to empty string
            let val = (keyValueArr[2] || '');
            const end = val.length - 1;
            const isDoubleQuoted = val[0] === '"' && val[end] === '"';
            const isSingleQuoted = val[0] === "'" && val[end] === "'";

            // if single or double quoted, remove quotes
            if (isSingleQuoted || isDoubleQuoted) {
                val = val.substring(1, end);

                // if double quoted, expand newlines
                if (isDoubleQuoted) {
                    val = val.replace(RE_NEWLINES, NEWLINE);
                }
            } else {
                // remove surrounding whitespace
                val = val.trim();
            }

            obj[key] = val;
        } else {
            if (!ANNITATION.test(line) || !EMPTYLINE.test(line)) {
                notice.error(`解析行时不匹配键和值 ${idx + 1}: ${line}`);
            }
        }
    });

    return obj;
}


exports.stringify = stringify;
/**
 * 把对象格式化成rc格式字符串
 * @param {Object} data
 * @returns {String} rc字符串
 */
function stringify(data = {}) {
    const dataStrList = Object.keys(data || {}).map(key => {
        const item = data[key];
        if (typeof item === 'string') {
            return `${key}=${item}`;
        } else {
            // notice.error(`编码时仅支持【string】类型的值 ${key}:${item}`);
            throw new Error(`编码时仅支持【string】类型的值 ${key}:${item}`);
        }
    }).filter(item => item);
    return dataStrList.join(NEWLINE);
}

exports.readRc = readRc;
/**
 * 异步读取rc文件内容
 * @param {String} filePath rc文件路径
 * @returns {Promise} 返回rc对象
 */
async function readRc(filePath) {
    let parsed = {};
    if (fs.getPathStatSync(filePath)) {
        parsed = await exports.parse(await fs.readFile(filePath));
    }
    return parsed;
}
exports.readRcSync = readRcSync;
/**
 * 同步读取rc文件内容
 * @param {String} filePath rc文件路径
 * @returns  {Object}  rc对象
 */
function readRcSync(filePath) {
    let parsed = {};
    if (fs.getPathStatSync(filePath)) {
        parsed = exports.parse(fs.readFileSync(filePath));
    }
    return parsed;
}
exports.writeRc = writeRc;
/**
 * 异步写入rc文件
 * @param {String} filePath
 * @param {Object} data
 * @returns {Promise}
 */
async function writeRc(filePath, data) {
    data = data || {};
    const string = exports.stringifyKeepFormat(await fs.readFile(filePath), data);
    return fs.writeFile(filePath, string);
}
exports.writeRcSync = writeRcSync;
/**
 * 同步写入rc文件
 * @param {String} filePath
 * @param {Object} data
 */
function writeRcSync(filePath, data) {
    data = data || {};
    const string = exports.stringifyKeepFormat(fs.readFileSync(filePath), data);
    return fs.writeFileSync(filePath, string);
}

exports.stringifyKeepFormat = stringifyKeepFormat;
/**
 * 保持源格式的格式化rc对象，writeRc和writeRcSync会调用这个，普通使用不需要这个方法jsdoc-to-markdown
 * @param {String} dataSrc 原格式rc字符串
 * @param {Object} data 修改后的对象
 * @returns {String} 修改后的rc字符串
 */
function stringifyKeepFormat(dataSrc, data) {
    const newData = {
        ...(data || {}),
    };
    // convert Buffers before splitting into lines and processing
    let newDataStr = dataSrc.toString().split(NEWLINES_MATCH).map(function (line, idx) {
        // matching "KEY' and 'VAL' in 'KEY=VAL'
        const keyValueArr = line.match(RE_INI_KEY_VAL);
        // matched?
        if (keyValueArr != null) {
            const key = keyValueArr[1];
            // default undefined or missing values to empty string
            // let val = (keyValueArr[2] || '');
            if (data[key]) {
                delete newData[key];
                return line.replace(RE_INI_KEY_VAL, `$1=${data[key]}`);
            } else {
                return '';
            }
        } else {
            if (!ANNITATION.test(line) && !EMPTYLINE.test(line)) {
                notice.error(`解析行时不匹配键和值 ${idx + 1}: ${line}`);
            }
            return line;
        }
    }).filter(line => line).join(NEWLINE) + NEWLINE;
    newDataStr = newDataStr + exports.stringify(newData) + NEWLINE;
    return newDataStr;
}

