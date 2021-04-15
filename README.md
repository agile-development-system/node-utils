# @ads/node-utils
敏捷开发系统内部node工具函数库

## 快速开始

### 安装
```base
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

## Classes

<dl>
<dt><a href="#ConvName">ConvName</a></dt>
<dd><p>名称处理工具类，命名格式转换</p>
</dd>
<dt><a href="#FastFs">FastFs</a></dt>
<dd><p>文件系统操作类，集合了几个使用频率较高的文件操作函数</p>
</dd>
<dt><a href="#FastPath">FastPath</a></dt>
<dd><p>路径工具类，快速获取各类node常用路径，每个方法要求路径都不是绝对路径
如果是绝对路径，就按照绝对路径拼接</p>
</dd>
<dt><a href="#Notice">Notice</a></dt>
<dd><p>基于chalk封装的控制台输出静态函数类</p>
</dd>
</dl>

## Typedefs

<dl>
<dt><a href="#chalkType">chalkType</a> : <code>&#x27;success&#x27;</code> | <code>&#x27;error&#x27;</code> | <code>&#x27;warn&#x27;</code> | <code>&#x27;info&#x27;</code> | <code>string</code></dt>
<dd><p>chalk类型以及别名</p>
</dd>
</dl>

<a name="ConvName"></a>

## ConvName
名称处理工具类，命名格式转换

**Kind**: global class

* [ConvName](#ConvName)
    * [new ConvName(name)](#new_ConvName_new)
    * _instance_
        * [.lineName](#ConvName+lineName) : <code>string</code>
        * [.humpName](#ConvName+humpName) : <code>string</code>
        * [.lowerHumpName](#ConvName+lowerHumpName) : <code>string</code>
    * _static_
        * [.toUpperHump(name)](#ConvName.toUpperHump) ⇒ <code>string</code>
        * [.toLowerHump(name)](#ConvName.toLowerHump) ⇒ <code>string</code>
        * [.toLine(name)](#ConvName.toLine) ⇒ <code>string</code>
        * [.initName(name)](#ConvName.initName) ⇒ [<code>ConvName</code>](#ConvName)

<a name="new_ConvName_new"></a>

### new ConvName(name)
获取三种名称转换结果的集合


| Param | Type | Description |
| --- | --- | --- |
| name | <code>stirng</code> | 名称文本 |

<a name="ConvName+lineName"></a>

### convName.lineName : <code>string</code>
横杠名称

**Kind**: instance property of [<code>ConvName</code>](#ConvName)
<a name="ConvName+humpName"></a>

### convName.humpName : <code>string</code>
大驼峰名称

**Kind**: instance property of [<code>ConvName</code>](#ConvName)
<a name="ConvName+lowerHumpName"></a>

### convName.lowerHumpName : <code>string</code>
小驼峰名称

**Kind**: instance property of [<code>ConvName</code>](#ConvName)
<a name="ConvName.toUpperHump"></a>

### ConvName.toUpperHump(name) ⇒ <code>string</code>
横杠转大驼峰

**Kind**: static method of [<code>ConvName</code>](#ConvName)

| Param | Type |
| --- | --- |
| name | <code>string</code> |

<a name="ConvName.toLowerHump"></a>

### ConvName.toLowerHump(name) ⇒ <code>string</code>
横杠转小驼峰

**Kind**: static method of [<code>ConvName</code>](#ConvName)

| Param | Type |
| --- | --- |
| name | <code>string</code> |

<a name="ConvName.toLine"></a>

### ConvName.toLine(name) ⇒ <code>string</code>
驼峰转换横杠

**Kind**: static method of [<code>ConvName</code>](#ConvName)

| Param | Type |
| --- | --- |
| name | <code>string</code> |

<a name="ConvName.initName"></a>

### ConvName.initName(name) ⇒ [<code>ConvName</code>](#ConvName)
获取驼峰和横杠名称

**Kind**: static method of [<code>ConvName</code>](#ConvName)

| Param | Type |
| --- | --- |
| name | <code>string</code> |

<a name="FastFs"></a>

## FastFs
文件系统操作类，集合了几个使用频率较高的文件操作函数

**Kind**: global class

* [FastFs](#FastFs)
    * [.writeFile(filename, data)](#FastFs+writeFile) ⇒ <code>Promise.&lt;void&gt;</code>
    * [.writeFileSync(filename, data)](#FastFs+writeFileSync) ⇒ <code>void</code>
    * [.getPathStat(path)](#FastFs+getPathStat) ⇒ <code>Promise.&lt;boolean&gt;</code>
    * [.getPathStatSync(path)](#FastFs+getPathStatSync) ⇒ <code>boolean</code>
    * [.writeJsonFormat(filePath, data)](#FastFs+writeJsonFormat)

<a name="FastFs+writeFile"></a>

### fastFs.writeFile(filename, data) ⇒ <code>Promise.&lt;void&gt;</code>
异步写入数据，不存在的路径自动创建

**Kind**: instance method of [<code>FastFs</code>](#FastFs)

| Param | Type | Description |
| --- | --- | --- |
| filename | <code>string</code> | 文件名 |
| data | <code>object</code> | 写入的数据（对象） |

<a name="FastFs+writeFileSync"></a>

### fastFs.writeFileSync(filename, data) ⇒ <code>void</code>
写入数据，不存在的路径自动创建

**Kind**: instance method of [<code>FastFs</code>](#FastFs)

| Param | Type | Description |
| --- | --- | --- |
| filename | <code>string</code> | 文件名 |
| data | <code>object</code> | 写入的数据（对象） |

<a name="FastFs+getPathStat"></a>

### fastFs.getPathStat(path) ⇒ <code>Promise.&lt;boolean&gt;</code>
获取路径是否存在

**Kind**: instance method of [<code>FastFs</code>](#FastFs)

| Param | Type | Description |
| --- | --- | --- |
| path | <code>string</code> | 路径 |

<a name="FastFs+getPathStatSync"></a>

### fastFs.getPathStatSync(path) ⇒ <code>boolean</code>
同步获取路径是否存在

**Kind**: instance method of [<code>FastFs</code>](#FastFs)

| Param | Type | Description |
| --- | --- | --- |
| path | <code>string</code> | 路径 |

<a name="FastFs+writeJsonFormat"></a>

### fastFs.writeJsonFormat(filePath, data)
写入符合.json格式的json文件

**Kind**: instance method of [<code>FastFs</code>](#FastFs)

| Param | Type | Description |
| --- | --- | --- |
| filePath | <code>string</code> | 文件路径 |
| data | <code>any</code> | 需要写入的数据 |

<a name="FastPath"></a>

## FastPath
路径工具类，快速获取各类node常用路径，每个方法要求路径都不是绝对路径
如果是绝对路径，就按照绝对路径拼接

**Kind**: global class

* [FastPath](#FastPath)
    * [.getCwdPath(...paths)](#FastPath.getCwdPath) ⇒ <code>string</code>
    * [.getHomePath(...paths)](#FastPath.getHomePath) ⇒ <code>string</code>
    * [.getAdsHomePath(...paths)](#FastPath.getAdsHomePath) ⇒ <code>string</code>
    * [.convPath(basePath, paths)](#FastPath.convPath) ⇒ <code>string</code>

<a name="FastPath.getCwdPath"></a>

### FastPath.getCwdPath(...paths) ⇒ <code>string</code>
获取运行目录加路径的绝对路径

**Kind**: static method of [<code>FastPath</code>](#FastPath)

| Param | Type |
| --- | --- |
| ...paths | <code>string</code> |

<a name="FastPath.getHomePath"></a>

### FastPath.getHomePath(...paths) ⇒ <code>string</code>
获取用户目录加路径的绝对路径

**Kind**: static method of [<code>FastPath</code>](#FastPath)

| Param | Type |
| --- | --- |
| ...paths | <code>string</code> |

<a name="FastPath.getAdsHomePath"></a>

### FastPath.getAdsHomePath(...paths) ⇒ <code>string</code>
获取用户目录加路径的绝对路径

**Kind**: static method of [<code>FastPath</code>](#FastPath)

| Param | Type |
| --- | --- |
| ...paths | <code>string</code> |

<a name="FastPath.convPath"></a>

### FastPath.convPath(basePath, paths) ⇒ <code>string</code>
基于基础路径拼接追加路径，如果追加路径数组第一个路径是绝对路径，忽略基础路径直接拼接返回<br/>
是其他函数的依赖函数

**Kind**: static method of [<code>FastPath</code>](#FastPath)

| Param | Type | Description |
| --- | --- | --- |
| basePath | <code>string</code> | 基础路径 |
| paths | <code>Array.&lt;string&gt;</code> | 追加路径数组 |

<a name="Notice"></a>

## Notice
基于chalk封装的控制台输出静态函数类

**Kind**: global class

* [Notice](#Notice)
    * [.success(msg)](#Notice.success) ⇒ <code>void</code>
    * [.error(msg)](#Notice.error) ⇒ <code>void</code>
    * [.warn(msg)](#Notice.warn) ⇒ <code>void</code>
    * [.info(msg)](#Notice.info) ⇒ <code>void</code>
    * [.getStr(type, msg)](#Notice.getStr) ⇒ <code>chalk</code>
    * [.getBoldStr(type, msg)](#Notice.getBoldStr) ⇒ <code>chalk</code>

<a name="Notice.success"></a>

### Notice.success(msg) ⇒ <code>void</code>
控制台输出成功信息

**Kind**: static method of [<code>Notice</code>](#Notice)

| Param | Type | Description |
| --- | --- | --- |
| msg | <code>string</code> | 成功信息 |

<a name="Notice.error"></a>

### Notice.error(msg) ⇒ <code>void</code>
控制台输出错误信息

**Kind**: static method of [<code>Notice</code>](#Notice)

| Param | Type | Description |
| --- | --- | --- |
| msg | <code>string</code> | 错误信息文本 |

<a name="Notice.warn"></a>

### Notice.warn(msg) ⇒ <code>void</code>
控制台输出警告信息

**Kind**: static method of [<code>Notice</code>](#Notice)

| Param | Type | Description |
| --- | --- | --- |
| msg | <code>string</code> | 警告信息文本 |

<a name="Notice.info"></a>

### Notice.info(msg) ⇒ <code>void</code>
控制台输出信息

**Kind**: static method of [<code>Notice</code>](#Notice)

| Param | Type | Description |
| --- | --- | --- |
| msg | <code>string</code> | 信息文本 |

<a name="Notice.getStr"></a>

### Notice.getStr(type, msg) ⇒ <code>chalk</code>
获取各种颜色的字体

**Kind**: static method of [<code>Notice</code>](#Notice)

| Param | Type | Description |
| --- | --- | --- |
| type | [<code>chalkType</code>](#chalkType) | chalk类型 |
| msg | <code>string</code> | 文本 |

<a name="Notice.getBoldStr"></a>

### Notice.getBoldStr(type, msg) ⇒ <code>chalk</code>
获取各种颜色的粗体字体

**Kind**: static method of [<code>Notice</code>](#Notice)

| Param | Type | Description |
| --- | --- | --- |
| type | [<code>chalkType</code>](#chalkType) | chalk类型 |
| msg | <code>string</code> | 文本 |

<a name="chalkType"></a>

## chalkType : <code>&#x27;success&#x27;</code> \| <code>&#x27;error&#x27;</code> \| <code>&#x27;warn&#x27;</code> \| <code>&#x27;info&#x27;</code> \| <code>string</code>
chalk类型以及别名

**Kind**: global typedef
