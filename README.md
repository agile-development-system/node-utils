# @ads/node-utils

敏捷开发系统内部node工具函数库
## 快速开始
### 安装
```bash
npm i @ads/node-utils
```
### 引入
```js
const utils = require('@ads/node-utils');
const { ConvName, FastPath, FastFs, Notice } = utils;
```
### 导出
```js
module.exports = { ConvName, FastPath, FastFs, Notice }
```
<a name="module_nodeUtils"></a>

## nodeUtils
<a name="module_nodeUtils.ConvName"></a>

### nodeUtils.ConvName
名称处理工具类，命名格式转换

**Kind**: static class of [<code>nodeUtils</code>](#module_nodeUtils)
<a name="new_module_nodeUtils.ConvName_new"></a>

#### new ConvName(name)
获取三种名称转换结果的集合


| Param | Type | Description |
| --- | --- | --- |
| name | <code>stirng</code> | 名称文本 |

<a name="module_nodeUtils.ConvName+lineName"></a>

#### convName.lineName : <code>string</code>
横杠名称

**Kind**: instance property of [<code>ConvName</code>](#module_nodeUtils.ConvName)
<a name="module_nodeUtils.ConvName+humpName"></a>

#### convName.humpName : <code>string</code>
大驼峰名称

**Kind**: instance property of [<code>ConvName</code>](#module_nodeUtils.ConvName)
<a name="module_nodeUtils.ConvName+lowerHumpName"></a>

#### convName.lowerHumpName : <code>string</code>
小驼峰名称

**Kind**: instance property of [<code>ConvName</code>](#module_nodeUtils.ConvName)
<a name="module_nodeUtils.ConvName.toUpperHump"></a>

#### ConvName.toUpperHump(name) ⇒ <code>string</code>
横杠转大驼峰

**Kind**: static method of [<code>ConvName</code>](#module_nodeUtils.ConvName)

| Param | Type |
| --- | --- |
| name | <code>string</code> |

<a name="module_nodeUtils.ConvName.toLowerHump"></a>

#### ConvName.toLowerHump(name) ⇒ <code>string</code>
横杠转小驼峰

**Kind**: static method of [<code>ConvName</code>](#module_nodeUtils.ConvName)

| Param | Type |
| --- | --- |
| name | <code>string</code> |

<a name="module_nodeUtils.ConvName.toLine"></a>

#### ConvName.toLine(name) ⇒ <code>string</code>
驼峰转换横杠

**Kind**: static method of [<code>ConvName</code>](#module_nodeUtils.ConvName)

| Param | Type |
| --- | --- |
| name | <code>string</code> |

<a name="module_nodeUtils.ConvName.initName"></a>

#### ConvName.initName(name) ⇒ <code>ConvName</code>
获取驼峰和横杠名称

**Kind**: static method of [<code>ConvName</code>](#module_nodeUtils.ConvName)

| Param | Type |
| --- | --- |
| name | <code>string</code> |

<a name="module_nodeUtils.FastFs"></a>

### nodeUtils.FastFs
文件系统操作类，集合了几个使用频率较高的文件操作函数

**Kind**: static class of [<code>nodeUtils</code>](#module_nodeUtils)
<a name="module_nodeUtils.FastFs.writeFile"></a>

#### FastFs.writeFile(filename, data) ⇒ <code>Promise.&lt;void&gt;</code>
异步写入数据，不存在的路径自动创建

**Kind**: static method of [<code>FastFs</code>](#module_nodeUtils.FastFs)

| Param | Type | Description |
| --- | --- | --- |
| filename | <code>string</code> | 文件名 |
| data | <code>object</code> | 写入的数据（对象） |

<a name="module_nodeUtils.FastFs.writeFileSync"></a>

#### FastFs.writeFileSync(filename, data) ⇒ <code>void</code>
写入数据，不存在的路径自动创建

**Kind**: static method of [<code>FastFs</code>](#module_nodeUtils.FastFs)

| Param | Type | Description |
| --- | --- | --- |
| filename | <code>string</code> | 文件名 |
| data | <code>object</code> | 写入的数据（对象） |

<a name="module_nodeUtils.FastFs.getPathStat"></a>

#### FastFs.getPathStat(path) ⇒ <code>Promise.&lt;boolean&gt;</code>
获取路径是否存在

**Kind**: static method of [<code>FastFs</code>](#module_nodeUtils.FastFs)

| Param | Type | Description |
| --- | --- | --- |
| path | <code>string</code> | 路径 |

<a name="module_nodeUtils.FastFs.getPathStatSync"></a>

#### FastFs.getPathStatSync(path) ⇒ <code>boolean</code>
同步获取路径是否存在

**Kind**: static method of [<code>FastFs</code>](#module_nodeUtils.FastFs)

| Param | Type | Description |
| --- | --- | --- |
| path | <code>string</code> | 路径 |

<a name="module_nodeUtils.FastFs.writeJsonFormat"></a>

#### FastFs.writeJsonFormat(filePath, data)
写入符合.json格式的json文件

**Kind**: static method of [<code>FastFs</code>](#module_nodeUtils.FastFs)

| Param | Type | Description |
| --- | --- | --- |
| filePath | <code>string</code> | 文件路径 |
| data | <code>any</code> | 需要写入的数据 |

<a name="module_nodeUtils.FastPath"></a>

### nodeUtils.FastPath
路径工具类，快速获取各类node常用路径，每个方法要求路径都不是绝对路径
如果是绝对路径，就按照绝对路径拼接

**Kind**: static class of [<code>nodeUtils</code>](#module_nodeUtils)
<a name="module_nodeUtils.FastPath.getCwdPath"></a>

#### FastPath.getCwdPath(...paths) ⇒ <code>string</code>
获取运行目录加路径的绝对路径

**Kind**: static method of [<code>FastPath</code>](#module_nodeUtils.FastPath)

| Param | Type |
| --- | --- |
| ...paths | <code>string</code> |

<a name="module_nodeUtils.FastPath.getHomePath"></a>

#### FastPath.getHomePath(...paths) ⇒ <code>string</code>
获取用户目录加路径的绝对路径

**Kind**: static method of [<code>FastPath</code>](#module_nodeUtils.FastPath)

| Param | Type |
| --- | --- |
| ...paths | <code>string</code> |

<a name="module_nodeUtils.FastPath.getAdsHomePath"></a>

#### FastPath.getAdsHomePath(...paths) ⇒ <code>string</code>
获取用户目录加路径的绝对路径

**Kind**: static method of [<code>FastPath</code>](#module_nodeUtils.FastPath)

| Param | Type |
| --- | --- |
| ...paths | <code>string</code> |

<a name="module_nodeUtils.FastPath.convPath"></a>

#### FastPath.convPath(basePath, paths) ⇒ <code>string</code>
基于基础路径拼接追加路径，如果追加路径数组第一个路径是绝对路径，忽略基础路径直接拼接返回<br/>
是其他函数的依赖函数

**Kind**: static method of [<code>FastPath</code>](#module_nodeUtils.FastPath)

| Param | Type | Description |
| --- | --- | --- |
| basePath | <code>string</code> | 基础路径 |
| paths | <code>Array.&lt;string&gt;</code> | 追加路径数组 |

<a name="module_nodeUtils.Notice"></a>

### nodeUtils.Notice
基于chalk封装的控制台输出静态函数类

**Kind**: static class of [<code>nodeUtils</code>](#module_nodeUtils)
<a name="module_nodeUtils.Notice.success"></a>

#### Notice.success(msg) ⇒ <code>void</code>
控制台输出成功信息

**Kind**: static method of [<code>Notice</code>](#module_nodeUtils.Notice)

| Param | Type | Description |
| --- | --- | --- |
| msg | <code>string</code> | 成功信息 |

<a name="module_nodeUtils.Notice.error"></a>

#### Notice.error(msg) ⇒ <code>void</code>
控制台输出错误信息

**Kind**: static method of [<code>Notice</code>](#module_nodeUtils.Notice)

| Param | Type | Description |
| --- | --- | --- |
| msg | <code>string</code> | 错误信息文本 |

<a name="module_nodeUtils.Notice.warn"></a>

#### Notice.warn(msg) ⇒ <code>void</code>
控制台输出警告信息

**Kind**: static method of [<code>Notice</code>](#module_nodeUtils.Notice)

| Param | Type | Description |
| --- | --- | --- |
| msg | <code>string</code> | 警告信息文本 |

<a name="module_nodeUtils.Notice.info"></a>

#### Notice.info(msg) ⇒ <code>void</code>
控制台输出信息

**Kind**: static method of [<code>Notice</code>](#module_nodeUtils.Notice)

| Param | Type | Description |
| --- | --- | --- |
| msg | <code>string</code> | 信息文本 |

<a name="module_nodeUtils.Notice.getStr"></a>

#### Notice.getStr(type, msg) ⇒ <code>chalk</code>
获取各种颜色的字体

**Kind**: static method of [<code>Notice</code>](#module_nodeUtils.Notice)

| Param | Type | Description |
| --- | --- | --- |
| type | [<code>chalkType</code>](#module_nodeUtils.Notice..chalkType) | chalk类型 |
| msg | <code>string</code> | 文本 |

<a name="module_nodeUtils.Notice.getBoldStr"></a>

#### Notice.getBoldStr(type, msg) ⇒ <code>chalk</code>
获取各种颜色的粗体字体

**Kind**: static method of [<code>Notice</code>](#module_nodeUtils.Notice)

| Param | Type | Description |
| --- | --- | --- |
| type | [<code>chalkType</code>](#module_nodeUtils.Notice..chalkType) | chalk类型 |
| msg | <code>string</code> | 文本 |

<a name="module_nodeUtils.Notice..chalkType"></a>

#### Notice~chalkType : <code>&#x27;success&#x27;</code> \| <code>&#x27;error&#x27;</code> \| <code>&#x27;warn&#x27;</code> \| <code>&#x27;info&#x27;</code> \| <code>string</code>
chalk类型以及别名

**Kind**: inner typedef of [<code>Notice</code>](#module_nodeUtils.Notice)
<a name="module_nodeUtils.PresetUtils"></a>

### nodeUtils.PresetUtils
支持presets预设的配置生成工具

**Kind**: static class of [<code>nodeUtils</code>](#module_nodeUtils)
<a name="module_nodeUtils.PresetUtils.getDeepPreset"></a>

#### PresetUtils.getDeepPreset(config) ⇒ <code>Promise.&lt;Array.&lt;module:nodeUtils.PresetUtils~Config&gt;&gt;</code>
递归获取配置对象presets数组，返回一维数组

**Kind**: static method of [<code>PresetUtils</code>](#module_nodeUtils.PresetUtils)

| Param | Type | Description |
| --- | --- | --- |
| config | [<code>Config</code>](#module_nodeUtils.PresetUtils..Config) | 配置对象 |

<a name="module_nodeUtils.PresetUtils.getDeepPresetMerge"></a>

#### PresetUtils.getDeepPresetMerge(config) ⇒ [<code>Config</code>](#module_nodeUtils.PresetUtils..Config)
递归获取配置对象presets数组，并使用merge合并

**Kind**: static method of [<code>PresetUtils</code>](#module_nodeUtils.PresetUtils)

| Param | Type | Description |
| --- | --- | --- |
| config | [<code>Config</code>](#module_nodeUtils.PresetUtils..Config) | 配置对象 |

<a name="module_nodeUtils.PresetUtils..Config"></a>

#### PresetUtils~Config : <code>object</code>
支持preset的配置对象

**Kind**: inner typedef of [<code>PresetUtils</code>](#module_nodeUtils.PresetUtils)
**Properties**

| Name | Type | Description |
| --- | --- | --- |
| presets | <code>Array.&lt;Config&gt;</code> | 预设配置数组 |

