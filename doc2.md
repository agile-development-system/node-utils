## Classes

<dl>
<dt><a href="#NameUtils">NameUtils</a></dt>
<dd></dd>
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

<a name="NameUtils"></a>

## NameUtils
**Kind**: global class  

* [NameUtils](#NameUtils)
    * [new NameUtils(name)](#new_NameUtils_new)
    * _instance_
        * [.lineName](#NameUtils+lineName) : <code>string</code>
        * [.humpName](#NameUtils+humpName) : <code>string</code>
        * [.lowerHumpName](#NameUtils+lowerHumpName) : <code>string</code>
    * _static_
        * [.toUpperHump(name)](#NameUtils.toUpperHump) ⇒ <code>string</code>
        * [.toLowerHump(name)](#NameUtils.toLowerHump) ⇒ <code>string</code>
        * [.toLine(name)](#NameUtils.toLine) ⇒ <code>string</code>
        * [.initName(name)](#NameUtils.initName) ⇒ [<code>NameUtils</code>](#NameUtils)

<a name="new_NameUtils_new"></a>

### new NameUtils(name)
名称处理工具类


| Param | Type | Description |
| --- | --- | --- |
| name | <code>stirng</code> | 名称文本 |

<a name="NameUtils+lineName"></a>

### nameUtils.lineName : <code>string</code>
横杠名称

**Kind**: instance property of [<code>NameUtils</code>](#NameUtils)  
<a name="NameUtils+humpName"></a>

### nameUtils.humpName : <code>string</code>
大驼峰名称

**Kind**: instance property of [<code>NameUtils</code>](#NameUtils)  
<a name="NameUtils+lowerHumpName"></a>

### nameUtils.lowerHumpName : <code>string</code>
小驼峰名称

**Kind**: instance property of [<code>NameUtils</code>](#NameUtils)  
<a name="NameUtils.toUpperHump"></a>

### NameUtils.toUpperHump(name) ⇒ <code>string</code>
横杠转大驼峰

**Kind**: static method of [<code>NameUtils</code>](#NameUtils)  

| Param | Type |
| --- | --- |
| name | <code>string</code> | 

<a name="NameUtils.toLowerHump"></a>

### NameUtils.toLowerHump(name) ⇒ <code>string</code>
横杠转小驼峰

**Kind**: static method of [<code>NameUtils</code>](#NameUtils)  

| Param | Type |
| --- | --- |
| name | <code>string</code> | 

<a name="NameUtils.toLine"></a>

### NameUtils.toLine(name) ⇒ <code>string</code>
驼峰转换横杠

**Kind**: static method of [<code>NameUtils</code>](#NameUtils)  

| Param | Type |
| --- | --- |
| name | <code>string</code> | 

<a name="NameUtils.initName"></a>

### NameUtils.initName(name) ⇒ [<code>NameUtils</code>](#NameUtils)
获取驼峰和横杠名称

**Kind**: static method of [<code>NameUtils</code>](#NameUtils)  

| Param | Type |
| --- | --- |
| name | <code>string</code> | 

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
