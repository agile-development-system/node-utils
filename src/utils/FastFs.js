const fs = require('fs-extra');
/**
 * 文件系统操作类，集合了几个使用频率较高的文件操作函数
 * @alias module:nodeUtils.FastFs
 */
class FastFs {
    /**
     * 异步写入数据，不存在的路径自动创建
     * @param  {string} filename 文件名
     * @param  {object} data 写入的数据（对象）
     * @return {Promise<void>}
     */
    static writeFile(filename, data) {
        return fs.ensureFile(filename).then(() => fs.writeFile(filename, data));
    }

    /**
     * 同步写入数据，不存在的路径自动创建
     * @param  {string} filename 文件名
     * @param  {object} data 写入的数据（对象）
     * @return {void}
     */
    static writeFileSync(filename, ...argv) {
        fs.ensureFileSync(filename);
        return fs.writeFileSync(filename, ...argv);
    }

    /**
     * 异步获取路径是否存在
     * @param {string} path 路径
     * @returns {Promise<boolean>}
     */
    static getPathStat(path) {
        return fs.stat(path).catch(() => false);
    }

    /**
     * 同步获取路径是否存在
     * @param {string} path 路径
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
     * @param {string} filePath 文件路径
     * @param {any} data 需要写入的数据
     * @param {string|number} [space=4] 指定缩进用的空白字符串
     */
    static writeJsonFormat(filePath, data, space = 4) {
        return this.writeFile(filePath, JSON.stringify(data, null, space));
    }

    /**
     * 同步写入符合.json格式的json文件
     * @param {string} filePath 文件路径
     * @param {any} data 需要写入的数据
     * @param {string|number} [space=4] 指定缩进用的空白字符串
     */
    static writeJsonFormatSync(filePath, data, space = 4) {
        return this.writeFileSync(filePath, JSON.stringify(data, null, space));
    }
};

module.exports = FastFs;
