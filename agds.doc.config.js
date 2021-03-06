/*
 * @Author: 锦阳
 * @Create: 2021年05月13日
 */

const GenDoc = require('@agds/cli-plugin-doc');
const preset = require('@agds/agds-doc-preset');
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
            presets: [preset],
            files: ['./src/**/*.js'],
            codesDir: './test/__test__',
            codesFiles: ['*.js'],
            helpers: {
                devInstall: false,
                importCode: GenDoc.getFileContent('./docs/import.js'),
                exportCode: GenDoc.getFileContent('./docs/export.js'),
                postfixes: [
                    {
                        id: 'cliUsages',
                        title: '命令行使用文档',
                        content: '```\n' + cliUsages + '```\n',
                    },
                ],
            },
        };
    })();
