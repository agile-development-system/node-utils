/*
 * @Description: 插件管理器
 * @Author: yaojin
 */
// 由于模块结构调整。此模块已被迁移至cli包内
const ora = require('ora');
const {
    fn,
} = require('@wanwu/base-fn');
const fs = require('./fs');
const notice = require('./notice');
const {
    get,
} = require('./request');
const {
    exec,
} = require('./commandProxy');
let installableDataCache;

const pluginManager = {

    // 注册插件
    register(pluginName) {
        const originPluginName = pluginName;
        // 检查是否安装beta版
        const isBetaVersionPlugin = /^\w+@.+/.test(originPluginName);
        if (isBetaVersionPlugin) {
            pluginName = originPluginName.split('@')[0];
        }
        const isInstallLocalPlugin = pluginName === '--local';
        ensurePackageJson();
        return new Promise((resolve, reject) => {
            exec('sudo npm -v')
                .then(() => {
                    let spinner;
                    spinner = ora(isInstallLocalPlugin ? '正在安装本地插件。。。' : `正在安装插件${pluginName}。。。`);
                    spinner.start();
                    let prejob = Promise.resolve(installableDataCache);
                    if (!installableDataCache || isInstallLocalPlugin) {
                        if (isInstallLocalPlugin) { // 开发调试，安装本地包
                            prejob = new Promise((resolve2, reject2) => {
                                const cwd = process.cwd();
                                // 校验插件
                                // package.json
                                const packageJsonPath = `${cwd}/package.json`;
                                const isPackageJsonExternal = fs.getPathStatSync(packageJsonPath);
                                if (!isPackageJsonExternal) {
                                    spinner.stop();
                                    throw Error('本地插件缺少package.json');
                                }
                                // index.js
                                const indexPath = `${cwd}/index.js`;
                                const isIndexExternal = fs.getPathStatSync(indexPath);
                                if (!isIndexExternal) {
                                    spinner.stop();
                                    throw Error('本地插件缺少index.js');
                                }
                                // 包名
                                const packageJson = require(packageJsonPath);
                                const {
                                    name, description,
                                } = packageJson;
                                if (!/^@wanwu\/cli-plugin-\w+/.test(name)) {
                                    spinner.stop();
                                    throw Error('本地插件包名格式错误');
                                }
                                pluginName = this.getPluginName(name);
                                const installableData = {
                                    map: {
                                        [pluginName]: {
                                            key: name,
                                            value: {
                                                name,
                                                pluginName,
                                                description,
                                            },
                                        },
                                    },
                                };
                                resolve2(installableData);
                            })
                                .catch(err => {
                                    notice.error(notice.getErrorMsg(err));
                                    process.exit(1);
                                });
                        } else if (isBetaVersionPlugin) { // 安装beta版本时检查版本是否存在，因为即使版本不存在npm install也不会报错
                            prejob = new Promise((resolve3, reject3) => {
                                exec(`npm view @wanwu/cli-plugin-${originPluginName}`)
                                    .then(res => {
                                        if (!fn.typeYalidator.isEmpty(res) && res[0]) {
                                            this.getInstallableData({
                                                spinnerText: '正在获取插件信息。。。',
                                            })
                                                .then(installableData => {
                                                    resolve3(installableData);
                                                });
                                        } else {
                                            reject3('插件版本不存在');
                                            return Promise.reject('插件版本不存在');
                                        }
                                    })
                                    .catch(err => {
                                        notice.error(notice.getErrorMsg(err, '插件名错误'));
                                        process.exit(1);
                                    });
                            });
                        } else {
                            prejob = this.getInstallableData({
                                spinnerText: '正在获取插件信息。。。',
                            });
                        }
                    }
                    prejob
                        .then(installableData => {
                            installableDataCache = installableData;
                            const pkg = installableDataCache.map[pluginName];
                            if (!pkg) {
                                spinner.stop();
                                reject(`不存在插件:${pluginName}`);
                                return Promise.reject(`不存在插件:${pluginName}`);
                            }
                            const installPath = isInstallLocalPlugin ? process.cwd() : (isBetaVersionPlugin ? `${pkg.key}@${originPluginName.split('@')[1]}` : pkg.key);
                            return exec(`cd ${fs.getWanwuHomePath('plugins')}&&npm install ${installPath}`);
                        })
                        .then(() => {
                            spinner.stop();
                            // 填入注册表
                            const registry = getPluginRegistry();
                            const pluginInfo = installableDataCache.map[pluginName];
                            const packageName = pluginInfo.key;
                            registry[pluginName] = {
                                name: pluginName,
                                packageName,
                                path: `${fs.getWanwuHomePath('plugins')}/node_modules/${packageName}`,
                                description: pluginInfo.value.description,
                            };
                            // 写入plugin.json
                            writePluginRegistrySync(registry);
                            if (isInstallLocalPlugin) {
                                installableDataCache = null;
                            }
                            resolve();
                        })
                        .catch(() => {
                            if (isInstallLocalPlugin) {
                                installableDataCache = null;
                            }
                        });
                });
        });
    },

    // 注销插件
    logout(pluginName) {
        ensurePackageJson();
        return new Promise((resolve, reject) => {
            exec('sudo npm -v')
                .then(() => {
                    const spinner = ora(`正在卸载插件${pluginName}。。。`);
                    spinner.start();
                    // 卸载插件
                    const registry = getPluginRegistry();
                    const pkg = registry[pluginName];
                    if (!pkg) {
                        spinner.stop();
                        return reject(`插件${pluginName}未安装`);
                    }
                    exec(`cd ${fs.getWanwuHomePath('plugins')}&&npm uninstall ${pkg.packageName}`)
                        .then(() => {
                            spinner.stop();
                            // 移出注册表
                            delete registry[pluginName];
                            // 写入plugin.json
                            writePluginRegistrySync(registry);
                            resolve();
                        })
                        .catch(() => { });
                });
        });
    },

    // 获取可安装插件信息
    getInstallableData(optinos = {}) {
        const {
            spinnerText,
        } = optinos;
        const spinner = spinnerText ? ora(spinnerText) : null;
        if (spinner) {
            spinner.start();
        }
        return new Promise(resolve => {
            // 获取服务器插件包列表
            get('http://npm.wanwudezhi.work/_list/search/search?startkey=@wanwu/cli-plugin')
                .then(rsp => {
                    if (spinner) {
                        spinner.stop();
                    }
                    const installableData = {
                        list: [],
                        map: {},
                    };
                    if (typeof rsp === 'string') {
                        rsp = JSON.parse(rsp);
                    }
                    if (rsp) {
                        const {
                            rows,
                        } = rsp;
                        if (rows) {
                            if (rows && rows.length) {
                                // 获取本地注册表
                                const registry = getPluginRegistry();
                                if (registry) {
                                    // 生成已安装插件set
                                    const installedPluginSet = new Set();
                                    for (let k in registry) {
                                        installedPluginSet.add(registry[k].packageName);
                                    }
                                    // 填充installableData
                                    rows.forEach(pkg => {
                                        const pluginName = this.getPluginName(pkg.key);
                                        pkg.pluginName = pluginName;
                                        if (!installedPluginSet.has(pkg.key)) {
                                            installableData.list.push(pkg);
                                        }
                                        installableData.map[pluginName] = pkg;
                                    });
                                    installableDataCache = installableData;
                                    resolve(installableData);
                                }
                            }
                        }
                    }
                })
                .catch(error => {
                    if (spinner) {
                        spinner.stop();
                    }
                    notice.error('获取远程数据失败: ' + error.message.trim());
                });
        });
    },

    // 获取可卸载插件列表
    getUninstallableList() {
        return new Promise(resolve => {
            // 获取本地注册表
            const registry = getPluginRegistry();
            const list = [];
            for (let k in registry) {
                if (registry[k]) {
                    list.push(registry[k]);
                }
            }
            resolve(list);
        });
    },

    // 获取插件某版本说明

    getVersionExplain() { },

    // 获取插件最新版本
    getLatestVersion() { },

    // 获取插件版本列表
    getVersionList() { },

    // 获取可更新插件列表
    getUpdatableList() { },

    // 获取已废弃插件列表
    getDiscardedList() { },

    // 获取插件名
    getPluginName(pkgName = '') {
        return pkgName.split('-')[2];
    },
};

// 确保有plugins目录下有package.json
function ensurePackageJson() {
    const packageJsonPath = fs.getWanwuHomePath('plugins', 'package.json');
    const isPackageJsonExist = fs.getPathStatSync(packageJsonPath);
    if (!isPackageJsonExist) {
        fs.writeFileSync(
            packageJsonPath,
            JSON.stringify({
                'name': 'plugins',
                'version': '1.0.0',
                'description': '',
                'main': 'index.js',
                'scripts': {
                    'test': 'echo "Error: no test specified" && exit 1',
                },
                'keywords': [],
                'author': '',
                'license': 'ISC',
            }, null, '\t') + '\r\n',
        );
    }
}

// 获取插件注册表
function getPluginRegistry() {
    let registry = null;
    const pluginsConfigPath = fs.getWanwuHomePath('plugins', 'plugins.json');
    const isPluginsConfigExist = fs.getPathStatSync(pluginsConfigPath);
    if (!isPluginsConfigExist) {
        fs.writeFileSync(
            pluginsConfigPath,
            JSON.stringify({}, null, '\t') + '\r\n',
        );
    }
    try {
        registry = require(pluginsConfigPath);
    } catch (error) {
    }
    return registry;
}

// 写入插件注册表
function writePluginRegistrySync(registryObj) {
    const pluginsConfigPath = fs.getWanwuHomePath('plugins', 'plugins.json');
    fs.writeFileSync(
        pluginsConfigPath,
        JSON.stringify(registryObj, null, '\t') + '\r\n',
    );
}

module.exports = pluginManager;
