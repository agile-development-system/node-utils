/*
 * @Author: 锦阳
 * @Create: 2021年05月20日
 */
/**
 * Git工具集合
 *
 * @alias module:nodeUtils.gcHasMsg
 */
class GitUtils {
    /**
     * 判断`git commit`是否传入`-m`参数
     *
     * @returns {boolean}
     */
    static gcHasMsg() {
        const GIT_PARAMS = process.env.GIT_PARAMS;
        return /message/.test(GIT_PARAMS);
    };
}

module.exports = GitUtils;