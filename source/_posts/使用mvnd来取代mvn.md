---
title: 更快的mvn：mvnd
date: 2023-07-26 09:25:59
tags:
---
# 更快的mvn：mvnd
## 1.介绍
<!-- more -->
> ### **`maven-mvnd`**
> Maven 守护版，旨在为 Maven 提供更快的构建速度，灵感借鉴了 Gradle 和 Takari（Maven 生命周期优化器）
> Maven 和 Gradle 可以说是项目构建工具中的绝代双骄。
> 
> Maven 的优点是稳定可靠，在绝大多数的项目上工作良好，社区生态很完善，几乎所有的 Java 开发者都在用。Maven 的缺点是，对于大一点的项目来说，构建太慢了。

>Gradle 的优点是足够的灵活，构建速度也会更快一点，因为使用了后台进程和缓存机制。Gradle 的缺点是版本迭代速度太快，社区跟不上，对于初学者来说，学习曲线比较陡峭。

mvnd 并不是 Maven 的重构版，等于是 Maven ∩ (Gradle & Takari) 部分优点的一个交集。


>mvnd 使用了以下架构方式：
* 内部嵌入了 Maven，所以不需要单独安装 Maven。
* 使用守护进程进行构建，守护进程可以为多个 mvnd 客户端的连续请求提供服务。
* 使用了内置的 GraalVM 虚拟机，和传统的 Java 虚拟机相比，它的启动速度更快，使用内存更少，内部的 JIT 编译器在编译时花费的时间也更少。
* 如果已有的守护进程都在工作中，则可以新建多个守护进程来支撑新的构建请求。

这种架构方式使得 mvnd 的性能优势得到了进一步提升。

## 2.安装使用
```
# Windows
choco install mvndaemon 
# Linux
sdk install mvnd
# macOS
brew install mvndaemon/homebrew-mvnd/mvnd
```
安装后，直接想`mvn`一样使用即可，只不过`mvn`要改成`mvnd`
```
mvnd -v
mvnd clean install
```

## 3.遇到的问题及解决
1.私有库的连接
正常使用公有库是没问题，但使用私有库，则会出现连不上的问题，此时需要进入mvnd的安装目录并打开`conf/settings.xml`
将`mirrors`标签下的默认`mirror`注释掉，即可（看下图）
![](http://ql-u-pic.oss-cn-shanghai.aliyuncs.com/upic/2023/07/26/TvXZFlyxE9ec.png)
