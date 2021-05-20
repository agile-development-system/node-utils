/*
 * @Author: 锦阳
 * @Create: 2021年05月20日
 */
const GIT_PARAMS = process.env.GIT_PARAMS;
if (!/message/.test(GIT_PARAMS)) {
    process.exit(0);
} else {
    process.exit(1);
}
