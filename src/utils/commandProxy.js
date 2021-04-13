/*
 * @Description: 命令行工具
 * @Author: yaojin
 */
// ==================================== 引入 ====================================
// 工具
const {
    Command,
} = require('commander');
const program = new Command();
const semver = require('semver');
const childProcess = require('child_process');
const notice = require('./notice');
const fs = require('./fs');
const {
    getObjDeepValue,
} = require('./objUtils');
const {
    fn,
} = require('@wanwu/base-fn');
const updater = require('pkg-updater');
const path = require('path');
const { registry } = require('../cons/const');
// 常量
const PLUGIN_CALLING_TYPE = require('../cons/pluginCallingType');
const PLUGIN_COMMAD_TYPE = require('../cons/pluginCommadType');

// ==================================== 主体 ====================================

program
    .option('<pluginName> [options]', '调用插件')
    .option('install', '通过列表选择安装插件')
    .option('install [pluginName]', '安装指定插件')
    .option('install --local', '安装当前目录(调试用)')
    .option('uninstall', '通过列表选择卸载插件')
    .option('uninstall [pluginName]', '卸载指定插件');

// 检查node版本
function checkNodeVersion(pluginPackageJson) {
    const wantedVersion = getObjDeepValue(pluginPackageJson, 'engines.node');
    if (wantedVersion) {
        if (!semver.satisfies(process.version, wantedVersion)) {
            notice.error('你当前使用的 Node 版本：' + process.version + '， 这个版本的 ' + pluginPackageJson.name +
                ' 依赖于 Node ' + wantedVersion + '.\n请升级你的Node版本。');
            process.exit(1);
        }
    }
}

function make_green(txt) {
    return notice.getStr('info', txt);
}

class CommandProxy {
    exec(commandText) {
        return new Promise((resolve, reject) => {
            const putout = [];
            childProcess.exec(commandText, (error, stdout, stderr) => {
                if (error) {
                    return reject(error);
                }
                putout.push(stdout);
                resolve(putout);
            });
        });
    }

    /**
     * 处理wanwu插件命令配置
     * @param { Object } options
     * @param { PLUGIN_CALLING_TYPE } options.pluginCallingType 插件调用方式 | [ PLUGIN_CALLING_TYPE.CLI（cli调用）,PLUGIN_CALLING_TYPE.BIN（全局命令调用）]| 必传
     * @param { PLUGIN_COMMAD_TYPE } options.pluginCommadType 插件命令类型 | [ PLUGIN_COMMAD_TYPE.BUILD_IN（内置命令）,PLUGIN_CALLING_TYPE.EXTEND（扩展命令）]| 必传
     * @param { Object } options.pluginPackageJson 插件的package.json | 插件的bin必传
     * @param { Object } options.cliPackageJson 脚手架的package.json | cli的index.js必传
     * @param { Object } options.pluginCommandConfig 插件的命令配置 | 内置命令 & 插件的bin 必传
     * @param { ()=>Promise<T> } options.pluginHandle 插件的执行方法 | 内置命令 & 插件的bin 必传
     * @param { Function } options.register 插件的自行注册命令方法 | 可选
     */
    async processWanwuPluginCommandConfig({
        pluginCallingType,
        pluginCommadType,
        pluginPackageJson,
        cliPackageJson,
        pluginCommandConfig,
        pluginHandle,
        register,
    }) {
        const pluginCommad = process.argv[2];
        let pluginPackagePath;
        if (fs.getPathStatSync(fs.getWanwuHomePath('plugins/plugins.json'))) { pluginPackagePath = (require(fs.getWanwuHomePath('plugins/plugins.json'))[pluginCommad] || {}).path; }
        updater.defaultOpts.registry = registry;
        // 由于玩物cli体系还不算稳定，暂时都强制更新
        updater.defaultOpts.level = 'patch';
        let updates = [];
        if (cliPackageJson) {
            updates.push(updater({
                'pkg': cliPackageJson,
                'updateMessage': '<%=colors.cyan(\'玩物CLI\')%>有新版本:' +
                '<%=colors.dim(current)%> -> <%=colors.green(latest)%>' +
                '<%if(incompatible){%>\n<%=colors.bold("由于玩物cli体系还不算稳定，暂时都强制更新，您必须更新后才能继续使用。")%><%}%>\n' +
                '执行 <%=colors.cyan(command)%> 来进行更新', // custom notify message
            }));
        }

        if (!pluginCallingType) {
            notice.error('缺少pluginCallingType参数');
            return process.exit(1);
        }

        if (PLUGIN_CALLING_TYPE.CLI === pluginCallingType) { // 通过cli调用
            if (!pluginCommadType) {
                notice.error('缺少pluginCommadType参数');
                return process.exit(1);
            }
            if (PLUGIN_COMMAD_TYPE.BUILD_IN === pluginCommadType) { // 内置命令
                if (!pluginHandle || !pluginCommandConfig) {
                    notice.error('缺少pluginHandle或pluginCommandConfig参数');
                    return process.exit(1);
                }
            } else if (PLUGIN_COMMAD_TYPE.EXTEND === pluginCommadType) { // 扩展命令
                // 检查插件是否存在, 过滤--help,--version
                if (pluginCommad && !/^--?\w+/.test(pluginCommad)) {
                    const isPluginExternal = fs.getPathStatSync(pluginPackagePath + '/package.json');
                    if (!isPluginExternal) {
                        notice.error(`没有找到插件${pluginCommad} ，请确认是否安装此插件！`);
                        return process.exit(1);
                    } else {
                        pluginPackageJson = require(`${pluginPackagePath}/package.json`);
                    }
                    // 检查node版本
                    checkNodeVersion(pluginPackageJson);

                    pluginHandle = require(path.join(pluginPackagePath, pluginPackageJson.wanwuPluginMain || ''));
                    pluginCommandConfig = pluginPackageJson.wanwuCmdConfig;
                }
            }
        } else if (PLUGIN_CALLING_TYPE.BIN === pluginCallingType) { // 通过插件自己全局注册的命令调用
            if (!pluginPackageJson) {
                notice.error('缺少pluginPackageJson参数');
                return process.exit(1);
            }
            // 检查node版本
            checkNodeVersion(pluginPackageJson);
        }

        if (pluginCommadType !== PLUGIN_COMMAD_TYPE.BUILD_IN) {
            updates.push(updater({
                'pkg': pluginPackageJson,
                'updateMessage': '玩物CLI插件[<%=colors.cyan("' + pluginCommad + '")%>' + ']有新版本:' +
                '<%=colors.dim(current)%> -> <%=colors.green(latest)%>' +
                '<%if(incompatible){%>\n<%=colors.bold("由于玩物cli体系还不算稳定，暂时都强制更新，您必须更新后才能继续使用。")%><%}%>\n' +
                `执行 <%=colors.cyan('${cliPackageJson ? `wanwu install ${pluginCommad}` : `npm i ${pluginPackageJson.name}`}` + '\')%> 来进行更新',
            }));
        }
        await Promise.all(updates);

        // 处理命令

        let pluginProgram;

        if (pluginHandle) {
            if (PLUGIN_CALLING_TYPE.CLI === pluginCallingType) {
                // 注册插件命令
                pluginProgram = program.command(`${pluginCommad}`);
            } else if (PLUGIN_CALLING_TYPE.BIN === pluginCallingType) {
                pluginProgram = program;
            }
            if (pluginCommandConfig) {
                // 注册插件命令描述
                if (pluginCommandConfig.descriptions) {
                    pluginCommandConfig.descriptions.forEach((item) => {
                        pluginProgram.description(item);
                    });
                }
                if (pluginCommandConfig.description) {
                    pluginProgram.description(pluginCommandConfig.description);
                }
                // 注册插件命令参数
                // 兼容老版本
                if (pluginCommandConfig.options) {
                    pluginCommandConfig.options.forEach(config => {
                        let params = [];
                        if (Object.prototype.toString.call(config) === '[object Array]') {
                            params = config;
                        } else if (fn.typeYalidator.isObject(config)) {
                            const {
                                define, desc,
                            } = config;
                            if (define) {
                                params.push(define);
                            }
                            if (desc) {
                                params.push(desc);
                            }
                        }
                        pluginProgram.option(...params);
                    });
                }
                // 新版本
                if (pluginCommandConfig.args) {
                    pluginCommandConfig.args.forEach(config => {
                        let params = [];
                        if (fn.typeYalidator.isArray(config)) {
                            params = config;
                        } else if (fn.typeYalidator.isObject(config)) {
                            const {
                                define, desc,
                            } = config;
                            if (define) {
                                params.push(define);
                            }
                            if (desc) {
                                params.push(desc);
                            }
                        }
                        pluginProgram.option(...params);
                    });
                }
                if (pluginCommandConfig.option) {
                    pluginProgram.option(...pluginCommandConfig.option);
                }
                if (pluginCommandConfig.others) {
                    Object.keys(pluginCommandConfig.others).forEach(key => {
                        const item = pluginCommandConfig.others[key];
                        pluginProgram[key](item);
                    });
                }
            }
            // 代码配置命令
            if (fn.typeYalidator.isFunction(register)) {
                register(program, pluginProgram);
            } else if (PLUGIN_CALLING_TYPE.CLI === pluginCallingType && PLUGIN_COMMAD_TYPE.EXTEND === pluginCommadType && pluginHandle) {
                // cli调用扩展插件
                // register = pluginHandle.register;
                pluginProgram.helpOption(false).addHelpCommand(false);
                const registerPath = path.join(pluginPackagePath, pluginPackageJson.wanwuRegister || 'register.js');
                if (fs.getPathStatSync(registerPath)) {
                    register = require(path.join(pluginPackagePath, pluginPackageJson.wanwuRegister || 'register.js'));
                }
                if (fn.typeYalidator.isFunction(register)) {
                    register(program, pluginProgram);
                }
            }

            // 执行命令回调
            pluginProgram.action(async function () {
                try {
                    // 注入__PLUGIN_NAME__，便于插件及其依赖包区分环境
                    process.env.__PLUGIN_NAME__ = pluginCommad;
                    await pluginHandle.apply(null, arguments);
                } catch (error) {
                    notice.error('插件执行失败！');
                    notice.error(error.stack);
                    process.exit(1);
                }
            });
        }

        // 命令使用方式
        if (PLUGIN_CALLING_TYPE.CLI === pluginCallingType) {
            program.usage('<command> [options]');
        } else if (PLUGIN_CALLING_TYPE.BIN === pluginCallingType) {
            program.usage('[options]');
        }

        if (!pluginPackageJson && !cliPackageJson) {
            notice.error('缺少pluginPackageJson或cliPackageJson参数');
            return process.exit(1);
        }

        const packageJson = pluginPackageJson || cliPackageJson;
        // wanwu 不带参数展示用法
        if (PLUGIN_CALLING_TYPE.CLI === pluginCallingType) {
            if (!process.argv.slice(2).length) {
                program.outputHelp(make_green);
            }
        }
        program
            .version((pluginProgram && pluginProgram._version) || packageJson.version)
            .parse(process.argv);
    }
}

const commandProxy = new CommandProxy();

module.exports = commandProxy;
