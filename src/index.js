const myfs = require('./utils/fs');
const notice = require('./utils/notice');
const rcUtils = require('./utils/rcUtils');
const pluginManager = require('./utils/pluginManager');
const myRequest = require('./utils/request');
const commandProxy = require('./utils/commandProxy');
const createPromiseQueue = require('./utils/promiseQueue');
const {
    toUpperHump, toLowerHump, toLine, initName,
} = require('./utils/nameUtils');
const objUtils = require('./utils/objUtils');
const {
    getObjDeepValue,
} = objUtils;
const fnUtils = require('./utils/fnUtils');
const PLUGIN_CALLING_TYPE = require('./cons/pluginCallingType');
const PLUGIN_COMMAD_TYPE = require('./cons/pluginCommadType');
const npmGet = require('./utils/npmGet');
const importDefault = function importDefault(ex) {
    return (ex && (typeof ex === 'object') && 'default' in ex) ? ex['default'] : ex;
};

const index = {
    fs: myfs,
    notice,
    myfs,
    importDefault,
    toUpperHump,
    toLowerHump,
    toLine,
    initName,
    objUtils,
    getObjDeepValue,
    fnUtils,
    rcUtils,
    pluginManager,
    myRequest,
    commandProxy,
    createPromiseQueue,
    PLUGIN_CALLING_TYPE,
    PLUGIN_COMMAD_TYPE,
    npmGet,
};
module.exports = index;
