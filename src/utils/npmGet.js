const fetch = require('node-fetch');
const fs = require('./fs');
const path = require('path');
const compressing = require('compressing');
const {
    runCommand,
} = require('@wanwu/template-utils');
const cache = {};
const { registry } = require('../cons/const');
module.exports = {
    /**
     * 取npm包的所有信息
     */
    getPackageInfo(packageName) {
        if (!cache.packages) {
            cache.packages = {};
        }
        if (!packageName) {
            return Promise.reject(new Error('方法：getPackageInfo  缺少npm包名'));
        }
        if (!cache.packages[packageName]) {
            cache.packages[packageName] = fetch(`${registry}/${packageName}`).then((res) => res.json()).catch(err => {
                delete cache.packages[packageName];
                return Promise.reject(err);
            });
        }
        return cache.packages[packageName];
    },
    /**
     * 取指定版本
     */
    getPackageInfoWithVersion(packageName, version) {
        version = version || 'latest';
        const packageInfosKey = `${packageName}-${version}`;
        if (!cache.packageInfos) {
            cache.packageInfos = {};
        }
        if (!packageName) {
            return Promise.reject(new Error('方法：getPackageInfoWithVersion  缺少npm包名'));
        }
        if (!cache.packageInfos[packageInfosKey]) {
            cache.packageInfos[packageInfosKey] = fetch(`${registry}/${packageName}/${version}`).then(res => res.json()).catch(err => {
                delete cache.packageInfos[packageInfosKey];
                return Promise.reject(err);
            });
        }
        return cache.packageInfos[packageInfosKey];
    },
    /**
     * 取最新版本信息
     */
    getPackageInfoLatest(packageName) {
        return this.getPackageInfoWithVersion(packageName, 'latest');
    },
    /**
     * 取最新版本号
     */
    async getLatestVersionOfPackage(packageName) {
        const packageInfo = await this.getPackageInfoLatest(packageName);
        return packageInfo.version;
    },
    /**
     *下载npm包到本地
     * @param {object} options
     * @param {string} options.outputDir 输出路径
     * @param {string} options.packageName 包名
     * @param {string} options.versionOrTag 版本或者标签
     * @param {object|boolean} options.autoInstall 自动下载npm包依赖或者自动下载配置
     * @param {boolean} options.autoInstall.prod 是否只下载生产依赖，默认：true
     * @param {boolean} options.outputWithVersion 输出路径是否加上版本
     */
    async getPackageLocalPath({ outputDir, packageName, versionOrTag, autoInstall, outputWithVersion } = {}) {
        if (!versionOrTag) {
            versionOrTag = await this.getLatestVersionOfPackage(packageName);
        }
        const packageInfo = await this.getPackageInfoWithVersion(packageName, versionOrTag);
        const version = packageInfo.version;
        let downloadUrl;
        try {
            downloadUrl = packageInfo.dist.tarball;
        } catch (error) {
            error.message = `获取资源链接失败：[${packageName}][${versionOrTag}]` + error.message;
            throw error;
        }
        const packageDir = path.resolve(outputDir, packageName, outputWithVersion ? version : '');
        if (!fs.getPathStatSync(packageDir)) {
            // 有缓存，直接读文件
            await fs.ensureDir(packageDir);
            const response = await fetch(downloadUrl);
            const tarbalPath = path.join(outputDir, '.tarbal');
            await compressing.tgz.uncompress(await response.buffer(), tarbalPath);
            fs.moveSync(path.join(tarbalPath, 'package'), packageDir, { overwrite: true });
            fs.removeSync(tarbalPath);
            if (autoInstall) {
                const packageFileDirPkg = path.join(packageDir, 'package.json');
                if (fs.getPathStatSync(packageFileDirPkg)) {
                    const dependencies = require(packageFileDirPkg).dependencies;
                    if (dependencies && Object.keys(dependencies).length) {
                        await runCommand(
                            'npm',
                            [
                                'install',
                                ...(autoInstall.prod === false ? [] : [
                                    '--production',
                                ]),
                            ],
                            {
                                cwd: packageDir,
                                stdio: 'ignore',
                                shell: true,
                            }
                        );
                    }
                }
            }
        }
        return packageDir;
    },

};
