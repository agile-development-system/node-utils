const fnUtils = {
    isFn(fn) {
        return Object.prototype.toString.call(fn) === '[object Function]';
    },
};

module.exports = fnUtils;
