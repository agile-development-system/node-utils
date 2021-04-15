const fs = require('fs-extra');
/** 文件系统操作类，集合了几个使用频率较高的文件操作函数 */
class FastFs {
    /**
     * 异步写入数据，不存在的路径自动创建
     * @param  {string} filename 文件名
     * @param  {object} data 写入的数据（对象）
     * @return {Promise<void>}
     */
    writeFile(filename, data) {
        return fs.ensureFile(filename).then(() => fs.writeFile(filename, data));
    }

    /**
     * 写入数据，不存在的路径自动创建
     * @param  {string} filename 文件名
     * @param  {object} data 写入的数据（对象）
     * @return {void}
     */
    writeFileSync(filename, ...argv) {
        fs.ensureFileSync(filename);
        return fs.writeFileSync(filename, ...argv);
    }

    /**
     * 获取路径是否存在
     * @param {string} path 路径
     * @returns {Promise<boolean>}
     */
    getPathStat(path) {
        return fs.stat(path).catch(() => false);
    }

    /**
     * 同步获取路径是否存在
     * @param {string} path 路径
     * @returns {boolean}
     */
    getPathStatSync(path) {
        try {
            return !!fs.statSync(path);
        } catch (err) {
            return false;
        }
    }

    /**
     * 写入符合.json格式的json文件
     * @param {string} filePath 文件路径
     * @param {any} data 需要写入的数据
     */
    writeJsonFormat(filePath, data) {
        return fs.writeJsonSync(filePath, data, { spaces: 2 });
    }
};

module.exports = FastFs;
