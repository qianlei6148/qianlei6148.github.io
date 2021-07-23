---
title: 更新node
date: 2021-07-19 10:01:57
categories: [technology]
tags: [node]
---
## 更新node

### 1.windows 更新node
如果是windows, 那就请到node官网下载windows最新安装包来覆盖之前的node即可。
### 2.mac/linux 更新node
如果是mac/linux, 直接打开控制台
<!-- more-->
```Sh
# 首先查看你的node版本
$node -v
# 使用Node Binary管理模块"n"
# 全局安装管理模板"n"
$npm install -g n
```
安装管理模块`n`后，可以使用如下三种方式更新`node`
```sh
# 升级到指定的版本 n 版本号
$n 8.4.1
# 安装稳定版本(长期支持版本，稳定)
$n stable
# 安装最新版本(当前发布的最新版本，含最新功能)
$n latest
```
安装好最新版后，查看是否成功
```sh
$node -v
v14.17.3
```
#### 问题 如果得到的版本信息不正确，还是老版本
##### 解决方式:
>`n` 切换之后的`node`默认装在 `/usr/local/bin/node`，先用 `which node` 检查一下当前使用的 `node` 是否是这个路径下的。如上缘由，一般都是因为当前版本指定到了其他路径，更新下`/etc/profile`文件指定即可。

### 扩展知识 : 管理模块 ***`n`*** 
>`n是Node的一个模块，作者是TJ Holowaychuk（鼎鼎大名的Express框架作者）`。
>安装好后，你可以直接输入`n`后输出当前已经安装的node版本以及正在使用的版本（前面有一个o），你可以通过移动上下方向键来选择要使用的版本，最后按回车生效.
```sh
$n
    0.10.1 
    0.10.15 
o   0.10.21 
    0.11.8
```
>删除某个版本
```sh
$n rm 0.10.1 
```

---

#### p.s. 参考文章：
>1. [轻松两步完成Node.js版本升级](https://www.jianshu.com/p/e41a7aa0288c)
>2. [windows node版本如何升级](https://blog.csdn.net/guzhao593/article/details/81712016)
>3. [利用N来管理nodejs的版本问题](https://blog.csdn.net/jiangbo_phd/article/details/51476155)