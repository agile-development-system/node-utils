/**
 * 横杠转大驼峰
 * @param {String} name
 */
function toUpperHump(name) {
    return name.charAt(0).toUpperCase() + name.slice(1).replace(/-(\w)/g, function (all, letter) {
        return letter.toUpperCase();
    });
}

/**
 * 横杠转小驼峰
 * @param {String} name
 */
function toLowerHump(name) {
    return name.charAt(0).toLowerCase() + name.slice(1).replace(/-(\w)/g, function (all, letter) {
        return letter.toUpperCase();
    });
}

/**
 * 驼峰转换横杠
 * @param {String} name
 */
function toLine(name) {
    const reName = name.charAt(0).toLowerCase() + name.slice(1);
    return reName.replace(/([A-Z])/g, '-$1').toLowerCase();
}
/**
 * 获取驼峰和横杠名称
 * @param {String} name
 */
function initName(name) {
    const lineName = toLine(name);
    const humpName = toUpperHump(name);
    const lowerHumpName = toLowerHump(name);
    return {
        lineName,
        humpName,
        lowerHumpName,
    };
}

const nameUtils = {
    toUpperHump,
    toLowerHump,
    toLine,
    initName,
};

module.exports = nameUtils;
