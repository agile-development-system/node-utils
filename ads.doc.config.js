/*
 * @Author: 锦阳
 * @Create: 2021年05月13日
 */

const GenDoc = require('@ads/cli-plugin-doc');
module.exports = (
    /**
     * 配置参数
     *
     * @returns {GenDoc.RenderOptions}
     */
    async () => {
        const [cliUsages] = (await Promise.all([
            GenDoc.getCliUsages(),
        ]));
        return {
            template: './template.ejs',
            output: 'README.md',
            files: ['./src/**/*.js'],
            codesDir: './test/*',
            codesFiles: ['*.js'],
            helpers: {
                devInstall: true,
                importCode: GenDoc.getFileContent('./docs/import.js'),
                exportCode: GenDoc.getFileContent('./docs/export.js'),
                cliUsages,
            },
        };
    })();
