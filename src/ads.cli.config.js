/*
 * @Author: 锦阳
 * @Create: 2021年05月16日
 */
const { gcHasMsg } = require('./plugin');
module.exports = [
    {
        cmd: 'gc-has-msg',
        desc: '判断git commit命令是否传入-m参数',
        action: gcHasMsg,
        help: {
            after: [
                '配合git hooks【prepare-commit-msg】和【commitizen】使用，避免git commit已经传入-m参数时调用commitizen界面',
            ],
        },
    },
];
