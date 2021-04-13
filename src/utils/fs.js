let fs = require('fs-extra');
let path = require('path');

let myfs = {
    ...fs,
    /**
   * [通过Promise写入数据]
   * @param  {String} file [文件名]
   * @param  {Object} obj  [写入的数据（对象）]
   * @return {Object}      [Promise对象]
   */
    writeFile(filename, ...argv) {
        return fs.ensureFile(filename).then(() => fs.writeFile(filename, ...argv));
    },
    writeFileSync(filename, ...argv) {
        fs.ensureFileSync(filename);
        return fs.writeFileSync(filename, ...argv);
    },
    /**
   * [通过Promise读取存储的数据]
   * @param  {String} file [文件名]
   * @return {Object}      [Promise对象]
   */
    // readFile: fs.readFile,
    // readFile(filename, ...argv) {
    // let promise = new Promise((resolve, reject) => {
    //     fs.readFile(filename, options,(err, data) => {
    //         if (err) {
    //             reject(err);
    //         } else {
    //             resolve(data);
    //         }
    //     });
    // });
    // return promise;
    // },
    /**
   * [通过Promise读取存储的数据]
   * @param  {String} file [文件名]
   * @return {Object}      [Promise对象]
   */
    // copyFile(targetFilename,...argv) {
    //     // let that = this;
    //     // return new Promise((resolve, reject) => {
    //     //     that
    //     //         .readFile(filename)
    //     //         .then(res => {
    //     //             that
    //     //                 .writeFile(targetFilename, res)
    //     //                 .then(res => {
    //     //                     resolve('success:copy ' + filename + ' to ' + targetFilename);
    //     //                 })
    //     //                 .catch(err => {
    //     //                     reject(err);
    //     //                 });
    //     //         })
    //     //         .catch(err => {
    //     //             reject(err);
    //     //         });
    //     // });
    //   return fs.ensureFile(()=>fs.copy(...argv))
    // },
    /**
   * [获取路径是否存在]
   * @param {String} path [路径]
   */
    // getPathStat: fs.stat,
    getPathStat(...argv) {
        return fs.stat(...argv).catch(() => false);
    },
    /**
   * [同步获取路径是否存在]
   * @param {String} path [路径]
   */
    getPathStatSync(path) {
        try {
            return fs.statSync(path);
        } catch (err) {
            return false;
        }
    },
    /**
   * [创建文件夹]
   * @param {String} dir
   */
    // mkdir(dir) {
    //     return new Promise((resolve, reject) => {
    //         fs.mkdir(dir, err => {
    //             if (err) {
    //                 resolve(false);
    //             } else {
    //                 resolve(true);
    //             }
    //         });
    //     });
    // },
    /**
   * [回调生成路径]
   * @param {String} dir
   */
    // async dirExists(dir) {
    //     let isExists = await this.getPathStat(dir);
    //     // 如果该路径且不是文件，返回true
    //     if (isExists && isExists.isDirectory()) {
    //         return true;
    //     } else if (isExists) {
    //         // 如果该路径存在但是文件，返回false
    //         return false;
    //     }
    //     // 如果该路径不存在
    //     let tempDir = path.parse(dir).dir; // 拿到上级路径
    //     // 递归判断，如果上级目录也不存在，则会代码会在此处继续循环执行，直到目录存在
    //     let status = await this.dirExists(tempDir);
    //     let mkdirStatus;
    //     if (status) {
    //         mkdirStatus = await this.mkdir(dir);
    //     }
    //     return mkdirStatus;
    // },
    /**
   * [获取用户目录的绝对路径]
   * @param {String} path
   */
    getCwdPath(_basePath, ..._path) {
        return /^(\/)/.test(_basePath) ? path.resolve(_basePath, ..._path) : path.resolve(process.cwd(), _basePath, ..._path);
    },
    getHomePath(_basePath, ..._path) {
        return /^(\/)/.test(_basePath) ? path.resolve(_basePath, ..._path) : path.resolve(require('user-home'), _basePath, ..._path);
    },
    getWanwuHomePath(_basePath, ..._path) {
        return /^(\/)/.test(_basePath) ? path.resolve(_basePath, ..._path) : this.getHomePath('.wanwu', _basePath, ..._path);
    },
    /**
     * 写入符合.json格式的json文件
     * @param {string} filePath 文件路径
     * @param {any} data 需要写入的数据
     */
    writeJsonFormat(filePath, data) {
        return fs.writeFile(
            filePath,
            JSON.stringify(data, null, 2) + '\n'
        );
    },
};

module.exports = myfs;

