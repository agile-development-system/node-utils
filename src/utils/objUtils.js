const objUtils = {
    isObj(obj) {
        return Object.prototype.toString.call(obj) === '[object Object]';
    },
    getObjDeepValue(obj, valuePath) {
        const valuePathArr = valuePath.split('.');
        let curValue = obj;
        for (let pathItem of valuePathArr) {
            curValue = curValue[pathItem];
            if (!curValue) {
                return undefined;
            }
        }
        return curValue;
    },
};

module.exports = objUtils;
