const chalk = require('chalk');
const error = chalk.red;
const success = chalk.green;
const warn = chalk.yellow;
const info = chalk.cyan;
/**
 * 基于chalk封装的控制台输出静态函数类
 * @alias module:nodeUtils.Notice
 */
class Notice {
    /**
     * 控制台输出成功信息
     * @param {string} msg 成功信息
     * @return {void}
     */
    static success(msg) {
        console.log(chalk.bgGreen.black(' SUCCESS ') + success(' ' + msg));
    }

    /**
     * 控制台输出错误信息
     * @param {string} msg 错误信息文本
     * @return {void}
     */
    static error(msg) {
        console.error(chalk.bgRed(' ERROR ') + error(' ' + msg));
    }

    /**
     * 控制台输出警告信息
     * @param {string} msg 警告信息文本
     * @return {void}
     */
    static warn(msg) {
        console.warn(chalk.bgYellow.black(' WARN ') + warn(' ' + msg));
    }

    /**
     * 控制台输出信息
     * @param {string} msg 信息文本
     * @return {void}
     */
    static info(msg) {
        console.info(chalk.bgBlue.black(' INFO ') + info(' ' + msg));
    }

    /**
     * 获取各种颜色的字体
     * @param {chalkType} type chalk类型
     * @param {string} msg 文本
     * @returns {chalk}
     */
    static getStr(type, msg) {
        const message = '' + msg;
        const text = chalk[chalkAlias(type)](message);
        return text;
    }

    /**
     * 获取各种颜色的粗体字体
     * @param {chalkType} type chalk类型
     * @param {string} msg 文本
     * @returns {chalk}
     */
    static getBoldStr(type, msg) {
        const message = '' + msg;
        const text = chalk.bold[chalkAlias(type)](message);
        return text;
    }
};
/**
 * chalk别名转换
 * @param {chalkType} type chalk类型
 * @returns {string}
 * @ignore
 */
function chalkAlias(type) {
    const aliasMap = {
        error: 'red',
        success: 'green',
        warn: 'yellow',
        info: 'cyan',
    };
    return aliasMap[type] || type;
}

/**
 * chalk类型以及别名
 * @typedef {'success'|'error'|'warn'|'info'|string} chalkType
 */

module.exports = Notice;
