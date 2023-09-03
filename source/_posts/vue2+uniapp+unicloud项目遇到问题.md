---
title: vue2+uniapp+unicloud项目遇到问题
date: 2022-05-31 13:36:58
categories: [technology]
tags: [uniapp,vue]
---
## 2022-9-10更新
我做了一个vue2的app。
在h5上面将程序写完，移动端打包后发现程序根本没法用，不能说没法用，只能说不怎么样。
由于是移动端，所以现在把遇到的一些问题和需求总结下。

<!-- more -->
### 1.移动端tabbar无法使用svg图标。
app打包后，打开程序遇到的第一个问题是tabbar图标居然无法显示。
由于想使用粉红色的图标，所以在阿里图标库中找了几个svg图标，在h5测试时没有问题，但在移动端上却出了问题，图标不显示，我把图标换成png发现显示了，然后我用搜索引擎一查，发现是原生的tabbar不支持svg图标，只能使用自定义tabbar.
### 2.class="swipe-item"导致轮播图（banner）无法显示
想想看，当打开app,发现首页上方背景是灰的，下面tabbar又是无图标的时候，自己的内心是多么崩溃，等于做了个寂寞。
后来发现这个class里面的样式在app中是失效的，图片不知道定位到了哪里。去除了这个class样式后，banner图终于显示出来了
### 3.`我的`页面中无法显示问题。
这个问题困扰了我一阵，明明h5端是能显示的，但移动端却页面空白。
后来发现是定义内容的时候，对象最后一个参数后面多了一个逗号。
### 4.下载了网易mumu模拟器作为android虚拟机来测试app, 却无法连接
解决：
```
//控制台输入命令
adb devices
```
显示`list of devices attached`，下面没有设备显示，说明没有连接到模拟器
在网上查到 mumu模拟器的端口号是`hostport:7555`, `guestport:5555`
```
//使用命令
adb connect 127.0.0.1:5555
//关闭
adb kill-server
//启动
adb start-server
//查看设备
adb devices
```
![图片](http://ql-u-pic.oss-cn-shanghai.aliyuncs.com/upic/2022/09/10/0eFlm8GNYzac.png)


