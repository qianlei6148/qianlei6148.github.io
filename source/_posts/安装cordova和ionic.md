---
title: 安装cordova和ionic
date: 2019-06-11 21:47:45
categories: [technology]
tags:
- phone
- ionic
- cordova
---
[安装`cordova`和`ionic`](https://blog.csdn.net/baymaxlily/article/details/52948777)
```cmd
npm install -g cordova ionic@3.16.0
```
 <!--more-->
然后发现, `cordova -v` 和 `ionic -v`都显示不是内部指令, 原因在于没有`nodejs`配置错误, 对环境配置需要进行进一步操作.
[Node.js安装及环境配置之Windows篇](https://www.cnblogs.com/zhouyu2017/p/6485265.html)中有第五步有叙述

使用`vscode`编程
ionic基本操作
```
ionic start myApp tabs --type ionic1  	创建带tab页的ionic1项目
ionic serve                                                          运行项目
ionic cordova platform add android     	 添加Android平台
ionic cordova build android                          打debug包
ionic cordova build --release android         打release包
ionic cordova plugin add 插件名                   添加ngCordova插件
```
mac电脑需要在前面加命令前面加sudo，因为权限问题。
