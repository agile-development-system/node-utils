const fs = require('fs-extra');
const JSON5 = require('json5');

/**
 * 文件系统操作类，集合了几个使用频率较高的文件操作函数
 * @alias module:nodeUtils.FastFs
 */
class FastFs {
    /**
     * 异步写入数据，不存在的路径自动创建
     * @param  {fs.PathLike} filename 文件名
     * @param  {object} data 写入的数据（对象）
     * @return {Promise<void>}
     */
    static writeFile(filename, data) {
        return fs.ensureFile(filename).then(() => fs.writeFile(filename, data));
    }

    /**
     * 同步写入数据，不存在的路径自动创建
     * @param  {fs.PathLike} filename 文件名
     * @param  {object} data 写入的数据（对象）
     * @return {void}
     */
    static writeFileSync(filename, data) {
        fs.ensureFileSync(filename);
        return fs.writeFileSync(filename, data);
    }

    /**
     * 异步获取路径是否存在
     * @param {fs.PathLike} path 路径
     * @returns {Promise<boolean>}
     */
    static getPathStat(path) {
        return fs.stat(path).catch(() => false);
    }

    /**
     * 同步获取路径是否存在
     * @param {fs.PathLike} path 路径
     * @returns {boolean}
     */
    static getPathStatSync(path) {
        try {
            return !!fs.statSync(path);
        } catch (err) {
            return false;
        }
    }

    /**
     * 异步写入符合.json格式的json文件
     * @param {fs.PathLike} filename 文件路径
     * @param {any} data 需要写入的数据
     * @param {string|number} [space=4] 指定缩进用的空白字符串
     */
    static writeJsonFormat(filename, data, space = 4) {
        return this.writeFile(filename, JSON.stringify(data, null, space));
    }

    /**
     * 同步写入符合.json格式的json文件
     * @param {fs.PathLike} filename 文件路径
     * @param {any} data 需要写入的数据
     * @param {string|number} [space=4] 指定缩进用的空白字符串
     */
    static writeJsonFormatSync(filename, data, space = 4) {
        return this.writeFileSync(filename, JSON.stringify(data, null, space));
    }

    /**
     * 异步读取json文件
     * @param {fs.PathLike} filename json文件路径
     * @returns {Promise<object>}
     */
    static async readJson(filename) {
        const content = await fs.readFile(filename, 'utf8');
        return parseJson(content, filename);
    }

    /**
     * 同步读取json文件
     * @param {fs.PathLike} filename json文件路径
     * @returns {object}
     */
    static readJsonSync(filename) {
        const content = fs.readFileSync(filename, 'utf8');
        return parseJson(content, filename);
    }
};

function parseJson(json, filename) {
    try {
        return JSON5.parse(json);
    } catch (err) {
        if (filename) { err.message = filename + ': ' + err.message; }
        throw err;
    }
}
module.exports = FastFs;
