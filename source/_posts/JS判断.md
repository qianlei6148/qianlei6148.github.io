---
title: JS判断undefined和null和空字符串
date: 2023-05-10 17:32:53
categories: [technology]
tags: [js]
---

一般新人会这样写：
```js
if (data!=null && typeof(data)!=undefined && $.trim(data) != ''
```

其实可以这么写：
```js
//判断是undefined\null\空字符串
if (!data)
//判断不是undefined\null\空字符串
if (!!data)
```
