const _path = require('path');
/**
 * 路径工具类，快速获取各类node常用路径，每个方法要求路径都不是绝对路径
 * 如果是绝对路径，就按照绝对路径拼接
 *
 * @alias module:nodeUtils.FastPath
 */
class FastPath {
    /**
     * 获取运行目录加路径的绝对路径
     *
     * @param {...string} paths 路径
     * @returns {string}
     */
    static getCwdPath(...paths) {
        return this.convPath(process.cwd(), paths);
    }

    /**
     * 获取用户目录加路径的绝对路径
     *
     * @param {...string} paths 路径
     * @returns {string}
     */
    static getHomePath(...paths) {
        return this.convPath(require('user-home'), paths);
    }

    /**
     * 获取用户目录加路径的绝对路径
     *
     * @param {...string} paths 路径
     * @returns {string}
     */
    static getAdsHomePath(...paths) {
        return this.convPath(this.getHomePath('.ads'), paths);
    }

    /**
     * 基于基础路径拼接追加路径，如果追加路径数组第一个路径是绝对路径，忽略基础路径直接拼接返回<br/>
     * 是其他函数的依赖函数
     *
     * @param {string} basePath 基础路径
     * @param {string[]} paths 追加路径数组
     * @returns {string}
     */
    static convPath(basePath, paths) {
        return _path.isAbsolute(paths[0]) ? _path.resolve(...paths) : _path.resolve(basePath, ...paths);
    }
};
module.exports = FastPath;
