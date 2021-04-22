/**
 * 名称处理工具类，命名格式转换
 * @alias module:nodeUtils.ConvName
 */
class ConvName {
    /**
     * 横杠名称
     * @type {string}
     */
    lineName;
    /**
     * 大驼峰名称
     * @type {string}
     */
    humpName;
    /**
     * 小驼峰名称
     * @type {string}
     */
    lowerHumpName;
    /**
     * 获取三种名称转换结果的集合
     * @param {stirng} name 名称文本
     */
    constructor(name) {
        this.lineName = ConvName.toLine(name);
        this.humpName = ConvName.toUpperHump(name);
        this.lowerHumpName = ConvName.toLowerHump(name);
    }

    /**
     * 横杠转大驼峰
     * @param {string} name
     * @returns {string}
     */
    static toUpperHump(name) {
        return name.charAt(0).toUpperCase() + toHump(name.slice(1));
    }

    /**
     * 横杠转小驼峰
     * @param {string} name
     * @returns {string}
     */
    static toLowerHump(name) {
        return name.charAt(0).toLowerCase() + toHump(name.slice(1));
    }

    /**
     * 驼峰转换横杠
     * @param {string} name
     * @returns {string}
     */
    static toLine(name) {
        const reName = name.charAt(0).toLowerCase() + name.slice(1);
        return reName.replace(/([A-Z])/g, '-$1').toLowerCase();
    }

    /**
     * 获取驼峰和横杠名称
     * @param {string} name
     * @returns {ConvName}
     */
    static initName(name) {
        return new ConvName(name);
    }
}

/**
 * 横杠转驼峰(不处理首字母，不推荐使用)
 * @param {string} name
 * @returns {string}
 * @ignore
 */
function toHump(name) {
    return name.replace(/-(\w)/g, function (_, letter) {
        return letter.toUpperCase();
    });
}

module.exports = ConvName;
