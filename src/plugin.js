/*
 * @Author: 锦阳
 * @Create: 2021年06月08日
 */
const { gcHasMsg } = require('./utils/GitUtils');
exports.gcHasMsg = () => {
    if (gcHasMsg()) {
        process.exit(1);
    } else {
        process.exit(0);
    }
};
