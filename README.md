# @ads/node-utils
**版本** ：1.0.13
敏捷开发系统内部node工具函数库

## 快速开始

### 安装
```bash
npm i -D @ads/node-utils
```

### 引入
```js
const utils = require('@ads/node-utils');
const { ConvName, FastPath, FastFs, Notice, PresetUtils, GitUtils } = utils;
```


### 导出
```js
module.exports = { ConvName, FastPath, FastFs, Notice, PresetUtils, GitUtils };
```




## 代码演示
```js
const { expect, test, describe } = require('@jest/globals');
const { ConvName, FastFs, FastPath, Notice, PresetUtils } = require('@ads/node-utils');
const path = require('path');
const fs = require('fs-extra');
describe('ConvName', () => {
    test('ConvName.initName', () => {
        const convName = ConvName.initName('ConvName-test');
        expect(convName).toMatchObject({
            lineName: 'conv-name-test',
            humpName: 'ConvNameTest',
            lowerHumpName: 'convNameTest',
        });
    });
    test('class ConvName', () => {
        const convName = new ConvName('ConvName-test');
        expect(convName).toMatchObject({
            lineName: 'conv-name-test',
            humpName: 'ConvNameTest',
            lowerHumpName: 'convNameTest',
        });
    });
    test('ConvName.toLine', () => {
        const name = ConvName.toLine('ConvName-test');
        expect(name).toBe('conv-name-test');
    });
    test('ConvName.toLowerHump', () => {
        const name = ConvName.toLowerHump('ConvName-test');
        expect(name).toBe('convNameTest');
    });
    test('ConvName.toUpperHump', () => {
        const name = ConvName.toUpperHump('ConvName-test');
        expect(name).toBe('ConvNameTest');
    });
});

const testText = 'Test';
describe('FastFs', () => {
    test('FastFs.writeFile', async () => {
        const pathName = path.join(__dirname, '.temp/FastFs.writeFile.test');
        await FastFs.writeFile(pathName, testText);
        expect(fs.readFileSync(pathName, { encoding: 'utf-8' })).toBe(testText);
    });
    test('FastFs.writeFileSync', () => {
        const pathName = path.join(__dirname, '.temp/FastFs.writeFileSync.test');
        FastFs.writeFileSync(pathName, testText);
        expect(fs.readFileSync(pathName, { encoding: 'utf-8' })).toBe(testText);
    });
    const statPathName = path.join(__dirname, '../__mock__/index.js');
    const statFalsePathName = path.join(__dirname, '../__mock__/index.jst');

    test('FastFs.getPathStat', async () => {
        const res = await FastFs.getPathStat(statPathName);
        expect(res).toBe(true);
    });
    test('FastFs.getPathStat false', async () => {
        const res = await FastFs.getPathStat(statFalsePathName);
        expect(res).toBe(false);
    });
    test('FastFs.getPathStatSync', () => {
        const res = FastFs.getPathStatSync(statPathName);
        expect(res).toBe(true);
    });
    test('FastFs.getPathStatSync false', () => {
        const res = FastFs.getPathStatSync(statFalsePathName);
        expect(res).toBe(false);
    });
    const obj = {
        a: 'a',
        b: 1,
    };
    test('FastFs.writeJsonFormat&FastFs.readJson', async () => {
        const pathName = path.join(__dirname, '.temp/FastFs.writeJsonFormat.json');
        await FastFs.writeJsonFormat(pathName, obj);
        expect(await FastFs.readJson(pathName)).toMatchObject(obj);
    });
    test('FastFs.writeJsonFormatSync&FastFs.readJsonSync', () => {
        const pathName = path.join(__dirname, '.temp/FastFs.writeJsonFormatSync.json');
        FastFs.writeJsonFormatSync(pathName, obj);
        expect(FastFs.readJsonSync(pathName)).toMatchObject(obj);
    });
    const json = require('../__mock__/json.json');
    const jsonPathName = path.join(__dirname, '../__mock__/json.json');
    test('FastFs.readJson', async () => {
        const res = await FastFs.readJson(jsonPathName);
        expect(res).toMatchObject(json);
    });
    test('FastFs.readJsonSync', () => {
        const res = FastFs.readJsonSync(jsonPathName);
        expect(res).toMatchObject(json);
    });
    test('FastFs parseJson error', () => {
        const jsonPathName = path.join(__dirname, '../__mock__/index.js');
        try {
            FastFs.readJsonSync(jsonPathName);
        } catch (error) {
            expect(error.message).toMatch(jsonPathName);
        }
    });
});

describe('FastPath', () => {
    test('FastPath.getCwdPath', () => {
        const res = FastPath.getCwdPath('package.json');
        expect(typeof res === 'string').toBe(true);
    });
    test('FastPath.getHomePath', () => {
        const res = FastPath.getHomePath('cache');
        expect(typeof res === 'string').toBe(true);
    });
    test('FastPath.getAdsHomePath', () => {
        const res = FastPath.getAdsHomePath('cache');
        expect(typeof res === 'string').toBe(true);
    });
    test('FastPath.convPath', () => {
        const res = FastPath.convPath(__dirname, 'cache');
        expect(typeof res === 'string').toBe(true);
    });
    test('FastPath.convPath root', () => {
        const res = FastPath.convPath(__dirname, '/cache');
        expect(typeof res === 'string').toBe(true);
    });
});
describe('Notice', () => {
    const onConsoleOut = (logMethod, cb, out) => new Promise(resolve => {
        const log = console[logMethod];
        console[logMethod] = function () {
            // log.apply(console, arguments);
            cb.apply(null, arguments);
            resolve();
            console[logMethod] = log;
        };
        out();
    });
    test('Notice.success', () => {
        return onConsoleOut('log', (res) => {
            expect(JSON.stringify(res)).toBe('"\\u001b[42m\\u001b[30m SUCCESS \\u001b[39m\\u001b[49m\\u001b[32m 成功信息\\u001b[39m"');
        }, () => Notice.success('成功信息'));
    });
    test('Notice.error', () => {
        return onConsoleOut('error', (res) => {
            expect(JSON.stringify(res)).toBe('"\\u001b[41m ERROR \\u001b[49m\\u001b[31m 错误信息\\u001b[39m"');
        }, () => Notice.error('错误信息'));
    });
    test('Notice.warn', () => {
        return onConsoleOut('warn', (res) => {
            expect(JSON.stringify(res)).toBe('"\\u001b[43m\\u001b[30m WARN \\u001b[39m\\u001b[49m\\u001b[33m 警告信息\\u001b[39m"');
        }, () => Notice.warn('警告信息'));
    });
    test('Notice.info', () => {
        return onConsoleOut('info', (res) => {
            expect(JSON.stringify(res)).toBe('"\\u001b[44m\\u001b[30m INFO \\u001b[39m\\u001b[49m\\u001b[36m 普通信息\\u001b[39m"');
        }, () => Notice.info('普通信息'));
    });
    test('Notice.getStr', () => {
        const res = Notice.getStr('info', '普通信息颜色文字');
        expect(JSON.stringify(res)).toBe('"\\u001b[36m普通信息颜色文字\\u001b[39m"');
    });
    test('Notice.getBoldStr', () => {
        const res = Notice.getBoldStr('blue', '普通信息颜色文字');
        expect(JSON.stringify(res)).toBe('"\\u001b[1m\\u001b[34m普通信息颜色文字\\u001b[39m\\u001b[22m"');
    });
});

describe('PresetUtils', () => {
    const config = {
        presets: [{
            e: 'e',
            b: ['b'],
            c: 'c',
        }],
        a: 'a',
        c: 'd',
        b: [
            'a',
            'c',
        ],
        modify: (_config) => {
            delete _config.c;
        },
    };
    test('PresetUtils.getDeepPreset', async () => {
        const res = await PresetUtils.getDeepPreset(config);
        expect(res).toMatchObject([
            { e: 'e', b: ['b'], c: 'c' },
            { presets: [{ e: 'e', b: ['b'], c: 'c' }], a: 'a', c: 'd', b: ['a', 'c'] },
        ]);
    });
    test('PresetUtils.getDeepPresetMerge', async () => {
        const res = await PresetUtils.getDeepPresetMerge(config);
        expect(res).toMatchObject({ a: 'a', b: ['b', 'a', 'c'], c: 'd', e: 'e' });
    });
    test('PresetUtils.getDeepPresetMergeAndModify', async () => {
        const res = await PresetUtils.getDeepPresetMergeAndModify(config);
        expect(res).toMatchObject({ a: 'a', b: ['b', 'a', 'c'], e: 'e' });
    });
});
```



## API文档
<a name="module_nodeUtils"></a>

### nodeUtils
<a name="module_nodeUtils.CmdParser"></a>

#### nodeUtils.CmdParser
基于`commander.js`封装的命令行解析工具库

**性质**: [<code>nodeUtils</code>](#module_nodeUtils)的静态class
<a name="module_nodeUtils.CmdParser.optionParseByConfig"></a>

##### CmdParser.optionParseByConfig(program, config)
基于config配置Command实例

**性质**: [<code>CmdParser</code>](#module_nodeUtils.CmdParser)的静态方法

| 参数 | 类型 | 描述 |
| --- | --- | --- |
| program | <code>Command</code> | command实例 |
| config | [<code>CmdConfig</code>](#CmdConfig) | 命令行解析配置 |

<a name="module_nodeUtils.CmdParser.cmdParser"></a>

##### CmdParser.cmdParser(options)
基于配置文件的命令行解析器

**性质**: [<code>CmdParser</code>](#module_nodeUtils.CmdParser)的静态方法

| 参数 | 类型 | 描述 |
| --- | --- | --- |
| options | <code>object</code> | 函数参数 |
| options.root | <code>string</code> | 当前命令行npm包根目录 |
| [options.isCore] | <code>boolean</code> | 是否是@ads/cli调用 |
| [options.cmd] | <code>string</code> | 命令名称，命令调用必填 |

<a name="module_nodeUtils.ConvName"></a>

#### nodeUtils.ConvName
名称处理工具类，命名格式转换

**性质**: [<code>nodeUtils</code>](#module_nodeUtils)的静态class
<a name="new_module_nodeUtils.ConvName_new"></a>

##### new ConvName(name)
获取三种名称转换结果的集合


| 参数 | 类型 | 描述 |
| --- | --- | --- |
| name | <code>stirng</code> | 名称文本 |

<a name="module_nodeUtils.ConvName+lineName"></a>

##### convName.lineName : <code>string</code>
横杠名称

**性质**: [<code>ConvName</code>](#module_nodeUtils.ConvName)的instance属性
<a name="module_nodeUtils.ConvName+humpName"></a>

##### convName.humpName : <code>string</code>
大驼峰名称

**性质**: [<code>ConvName</code>](#module_nodeUtils.ConvName)的instance属性
<a name="module_nodeUtils.ConvName+lowerHumpName"></a>

##### convName.lowerHumpName : <code>string</code>
小驼峰名称

**性质**: [<code>ConvName</code>](#module_nodeUtils.ConvName)的instance属性
<a name="module_nodeUtils.ConvName.toUpperHump"></a>

##### ConvName.toUpperHump(name) ⇒ <code>string</code>
横杠转大驼峰

**性质**: [<code>ConvName</code>](#module_nodeUtils.ConvName)的静态方法

| 参数 | 类型 | 描述 |
| --- | --- | --- |
| name | <code>string</code> | 名称文本 |

<a name="module_nodeUtils.ConvName.toLowerHump"></a>

##### ConvName.toLowerHump(name) ⇒ <code>string</code>
横杠转小驼峰

**性质**: [<code>ConvName</code>](#module_nodeUtils.ConvName)的静态方法

| 参数 | 类型 | 描述 |
| --- | --- | --- |
| name | <code>string</code> | 名称文本 |

<a name="module_nodeUtils.ConvName.toLine"></a>

##### ConvName.toLine(name) ⇒ <code>string</code>
驼峰转换横杠

**性质**: [<code>ConvName</code>](#module_nodeUtils.ConvName)的静态方法

| 参数 | 类型 | 描述 |
| --- | --- | --- |
| name | <code>string</code> | 名称文本 |

<a name="module_nodeUtils.ConvName.initName"></a>

##### ConvName.initName(name) ⇒ <code>ConvName</code>
获取驼峰和横杠名称

**性质**: [<code>ConvName</code>](#module_nodeUtils.ConvName)的静态方法

| 参数 | 类型 | 描述 |
| --- | --- | --- |
| name | <code>string</code> | 名称文本 |

<a name="module_nodeUtils.FastFs"></a>

#### nodeUtils.FastFs
文件系统操作类，集合了几个使用频率较高的文件操作函数

**性质**: [<code>nodeUtils</code>](#module_nodeUtils)的静态class
<a name="module_nodeUtils.FastFs.writeFile"></a>

##### FastFs.writeFile(filename, data) ⇒ <code>Promise.&lt;void&gt;</code>
异步写入数据，不存在的路径自动创建

**性质**: [<code>FastFs</code>](#module_nodeUtils.FastFs)的静态方法

| 参数 | 类型 | 描述 |
| --- | --- | --- |
| filename | <code>fs.PathLike</code> | 文件名 |
| data | <code>object</code> | 写入的数据（对象） |

<a name="module_nodeUtils.FastFs.writeFileSync"></a>

##### FastFs.writeFileSync(filename, data) ⇒ <code>void</code>
同步写入数据，不存在的路径自动创建

**性质**: [<code>FastFs</code>](#module_nodeUtils.FastFs)的静态方法

| 参数 | 类型 | 描述 |
| --- | --- | --- |
| filename | <code>fs.PathLike</code> | 文件名 |
| data | <code>object</code> | 写入的数据（对象） |

<a name="module_nodeUtils.FastFs.getPathStat"></a>

##### FastFs.getPathStat(path) ⇒ <code>Promise.&lt;boolean&gt;</code>
异步获取路径是否存在

**性质**: [<code>FastFs</code>](#module_nodeUtils.FastFs)的静态方法

| 参数 | 类型 | 描述 |
| --- | --- | --- |
| path | <code>fs.PathLike</code> | 路径 |

<a name="module_nodeUtils.FastFs.getPathStatSync"></a>

##### FastFs.getPathStatSync(path) ⇒ <code>boolean</code>
同步获取路径是否存在

**性质**: [<code>FastFs</code>](#module_nodeUtils.FastFs)的静态方法

| 参数 | 类型 | 描述 |
| --- | --- | --- |
| path | <code>fs.PathLike</code> | 路径 |

<a name="module_nodeUtils.FastFs.writeJsonFormat"></a>

##### FastFs.writeJsonFormat(filename, data, [space]) ⇒ <code>Promise</code>
异步写入符合.json格式的json文件

**性质**: [<code>FastFs</code>](#module_nodeUtils.FastFs)的静态方法

| 参数 | 类型 | 默认值 | 描述 |
| --- | --- | --- | --- |
| filename | <code>fs.PathLike</code> |  | 文件路径 |
| data | <code>any</code> |  | 需要写入的数据 |
| [space] | <code>string</code> \| <code>number</code> | <code>4</code> | 指定缩进用的空白字符串 |

<a name="module_nodeUtils.FastFs.writeJsonFormatSync"></a>

##### FastFs.writeJsonFormatSync(filename, data, [space]) ⇒ <code>void</code>
同步写入符合.json格式的json文件

**性质**: [<code>FastFs</code>](#module_nodeUtils.FastFs)的静态方法

| 参数 | 类型 | 默认值 | 描述 |
| --- | --- | --- | --- |
| filename | <code>fs.PathLike</code> |  | 文件路径 |
| data | <code>any</code> |  | 需要写入的数据 |
| [space] | <code>string</code> \| <code>number</code> | <code>4</code> | 指定缩进用的空白字符串 |

<a name="module_nodeUtils.FastFs.readJson"></a>

##### FastFs.readJson(filename) ⇒ <code>Promise.&lt;object&gt;</code>
异步读取json文件

**性质**: [<code>FastFs</code>](#module_nodeUtils.FastFs)的静态方法

| 参数 | 类型 | 描述 |
| --- | --- | --- |
| filename | <code>fs.PathLike</code> | json文件路径 |

<a name="module_nodeUtils.FastFs.readJsonSync"></a>

##### FastFs.readJsonSync(filename) ⇒ <code>object</code>
同步读取json文件

**性质**: [<code>FastFs</code>](#module_nodeUtils.FastFs)的静态方法

| 参数 | 类型 | 描述 |
| --- | --- | --- |
| filename | <code>fs.PathLike</code> | json文件路径 |

<a name="module_nodeUtils.FastPath"></a>

#### nodeUtils.FastPath
路径工具类，快速获取各类node常用路径，每个方法要求路径都不是绝对路径
如果是绝对路径，就按照绝对路径拼接

**性质**: [<code>nodeUtils</code>](#module_nodeUtils)的静态class
<a name="module_nodeUtils.FastPath.getCwdPath"></a>

##### FastPath.getCwdPath(...paths) ⇒ <code>string</code>
获取运行目录加路径的绝对路径

**性质**: [<code>FastPath</code>](#module_nodeUtils.FastPath)的静态方法

| 参数 | 类型 | 描述 |
| --- | --- | --- |
| ...paths | <code>string</code> | 路径 |

<a name="module_nodeUtils.FastPath.getHomePath"></a>

##### FastPath.getHomePath(...paths) ⇒ <code>string</code>
获取用户目录加路径的绝对路径

**性质**: [<code>FastPath</code>](#module_nodeUtils.FastPath)的静态方法

| 参数 | 类型 | 描述 |
| --- | --- | --- |
| ...paths | <code>string</code> | 路径 |

<a name="module_nodeUtils.FastPath.getAdsHomePath"></a>

##### FastPath.getAdsHomePath(...paths) ⇒ <code>string</code>
获取用户目录加路径的绝对路径

**性质**: [<code>FastPath</code>](#module_nodeUtils.FastPath)的静态方法

| 参数 | 类型 | 描述 |
| --- | --- | --- |
| ...paths | <code>string</code> | 路径 |

<a name="module_nodeUtils.FastPath.convPath"></a>

##### FastPath.convPath(basePath, paths) ⇒ <code>string</code>
基于基础路径拼接追加路径，如果追加路径数组第一个路径是绝对路径，忽略基础路径直接拼接返回<br/>
是其他函数的依赖函数

**性质**: [<code>FastPath</code>](#module_nodeUtils.FastPath)的静态方法

| 参数 | 类型 | 描述 |
| --- | --- | --- |
| basePath | <code>string</code> | 基础路径 |
| paths | <code>Array.&lt;string&gt;</code> | 追加路径数组 |

<a name="module_nodeUtils.gcHasMsg"></a>

#### nodeUtils.gcHasMsg
Git工具集合

**性质**: [<code>nodeUtils</code>](#module_nodeUtils)的静态class
<a name="module_nodeUtils.gcHasMsg.gcHasMsg"></a>

##### gcHasMsg.gcHasMsg() ⇒ <code>boolean</code>
判断`git commit`是否传入`-m`参数

**性质**: [<code>gcHasMsg</code>](#module_nodeUtils.gcHasMsg)的静态方法
<a name="module_nodeUtils.Notice"></a>

#### nodeUtils.Notice
基于chalk封装的控制台输出静态函数类

**性质**: [<code>nodeUtils</code>](#module_nodeUtils)的静态class
<a name="module_nodeUtils.Notice.success"></a>

##### Notice.success(msg) ⇒ <code>void</code>
控制台输出成功信息

**性质**: [<code>Notice</code>](#module_nodeUtils.Notice)的静态方法

| 参数 | 类型 | 描述 |
| --- | --- | --- |
| msg | <code>string</code> | 成功信息 |

<a name="module_nodeUtils.Notice.error"></a>

##### Notice.error(msg) ⇒ <code>void</code>
控制台输出错误信息

**性质**: [<code>Notice</code>](#module_nodeUtils.Notice)的静态方法

| 参数 | 类型 | 描述 |
| --- | --- | --- |
| msg | <code>string</code> | 错误信息文本 |

<a name="module_nodeUtils.Notice.warn"></a>

##### Notice.warn(msg) ⇒ <code>void</code>
控制台输出警告信息

**性质**: [<code>Notice</code>](#module_nodeUtils.Notice)的静态方法

| 参数 | 类型 | 描述 |
| --- | --- | --- |
| msg | <code>string</code> | 警告信息文本 |

<a name="module_nodeUtils.Notice.info"></a>

##### Notice.info(msg) ⇒ <code>void</code>
控制台输出信息

**性质**: [<code>Notice</code>](#module_nodeUtils.Notice)的静态方法

| 参数 | 类型 | 描述 |
| --- | --- | --- |
| msg | <code>string</code> | 信息文本 |

<a name="module_nodeUtils.Notice.getStr"></a>

##### Notice.getStr(type, msg) ⇒ <code>chalk</code>
获取各种颜色的字体

**性质**: [<code>Notice</code>](#module_nodeUtils.Notice)的静态方法

| 参数 | 类型 | 描述 |
| --- | --- | --- |
| type | [<code>ChalkType</code>](#ChalkType) | chalk类型 |
| msg | <code>string</code> | 文本 |

<a name="module_nodeUtils.Notice.getBoldStr"></a>

##### Notice.getBoldStr(type, msg) ⇒ <code>chalk</code>
获取各种颜色的粗体字体

**性质**: [<code>Notice</code>](#module_nodeUtils.Notice)的静态方法

| 参数 | 类型 | 描述 |
| --- | --- | --- |
| type | [<code>ChalkType</code>](#ChalkType) | chalk类型 |
| msg | <code>string</code> | 文本 |

<a name="module_nodeUtils.PresetUtils"></a>

#### nodeUtils.PresetUtils
支持presets预设的配置生成工具

**性质**: [<code>nodeUtils</code>](#module_nodeUtils)的静态class
<a name="module_nodeUtils.PresetUtils.getDeepPreset"></a>

##### PresetUtils.getDeepPreset(config) ⇒ <code>Promise.&lt;Array.&lt;Config&gt;&gt;</code>
递归获取配置对象presets数组，返回一维数组

**性质**: [<code>PresetUtils</code>](#module_nodeUtils.PresetUtils)的静态方法

| 参数 | 类型 | 描述 |
| --- | --- | --- |
| config | [<code>Config</code>](#Config) | 配置对象 |

<a name="module_nodeUtils.PresetUtils.getDeepPresetMerge"></a>

##### PresetUtils.getDeepPresetMerge(config) ⇒ [<code>Config</code>](#Config)
递归获取配置对象presets数组，并使用merge合并

**性质**: [<code>PresetUtils</code>](#module_nodeUtils.PresetUtils)的静态方法

| 参数 | 类型 | 描述 |
| --- | --- | --- |
| config | [<code>Config</code>](#Config) | 配置对象 |

<a name="module_nodeUtils.PresetUtils.getDeepPresetMergeAndModify"></a>

##### PresetUtils.getDeepPresetMergeAndModify(config) ⇒ [<code>Config</code>](#Config)
递归获取配置对象presets数组，并使用merge合并，最后调用`config.modify`函数

**性质**: [<code>PresetUtils</code>](#module_nodeUtils.PresetUtils)的静态方法

| 参数 | 类型 | 描述 |
| --- | --- | --- |
| config | [<code>Config</code>](#Config) | 配置对象 |

<a name="CmdConfig"></a>

### CmdConfig : <code>object</code>
命令行解析配置

**性质**: 类型声明
**属性**

| 属性 | 类型 | 描述 |
| --- | --- | --- |
| cmd | <code>string</code> | 作为插件时为子命令名称，单独使用时`ads-<cmd>`为命令行程序名称 |
| desc | <code>string</code> | 描述 |
| alias | <code>string</code> | 此命令的别名，只在插件调用时有效 |
| opts | [<code>Array.&lt;OptConfig&gt;</code>](#OptConfig) | option配置项描述 |

<a name="OptConfig"></a>

### OptConfig : <code>object</code>
命令行option解析配置

**性质**: 类型声明
**属性**

| 属性 | 类型 | 描述 |
| --- | --- | --- |
| opt | <code>string</code> | option字段配置 |
| desc | <code>string</code> | 描述 |
| default | <code>string</code> \| <code>boolean</code> | 默认值 |
| required | <code>boolean</code> | 是否是必填参数 |

<a name="ChalkType"></a>

### ChalkType : <code>&#x27;success&#x27;</code> \| <code>&#x27;error&#x27;</code> \| <code>&#x27;warn&#x27;</code> \| <code>&#x27;info&#x27;</code> \| <code>string</code>
chalk类型以及别名

**性质**: 类型声明
<a name="Config"></a>

### Config : <code>object</code>
支持preset的配置对象

**性质**: 类型声明
**属性**

| 属性 | 类型 | 描述 |
| --- | --- | --- |
| presets | [<code>Array.&lt;Config&gt;</code>](#Config) | 预设配置数组 |
| modify | [<code>ConfigModify</code>](#ConfigModify) | 将默认配置和preset合并后生成的config再次处理的钩子 |

<a name="ConfigModify"></a>

### ConfigModify ⇒ [<code>Config</code>](#Config)
**性质**: 类型声明

| 参数 | 类型 | 描述 |
| --- | --- | --- |
| config | [<code>Config</code>](#Config) | 将默认配置和preset合并后生成的config |




### 命令行使用文档

```
Usage: ads-gc-has-msg [options]

判断git commit命令是否传入-m参数

Options:
  -v,--version  查看版本号
  -h, --help    查看帮助信息

配合git hooks【prepare-commit-msg】和【commitizen】使用，避免git commit已经传入-m参数时调用commitizen界面

文档查看：git@gitee.com:agile-development-system/node-utils
@ads/node-utils@1.0.13 /Users/jinyang/code/ads/node-utils

```


