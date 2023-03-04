---
title: Git报错
date: 2018-10-13 13:34:25
categories: [technology]
tags: [git]
---
### OpenSSL SSL_read: Connection was reset, errno 10054
当时是准备使用如下命令时报的错：
```sh
#git强制覆盖本地命令（单条执行）：
$ git fetch --all && git reset --hard origin/master && git pull
```
<!--more-->
原因：服务器的SSL证书没有经过第三方机构的签署，所以报错。**当然也很有可能是很有可能是网络不稳定，连接超时导致的**
## 我的解决方式是：**[FastGithub](https://github.com/dotnetcore/FastGithub) 或者 翻墙**


网上找到的解决：
* 网上面有大部分内容的解决方式是执行如下git命令脚本
```sh
#修改设置，解除ssl验证
$ git config --global http.sslVerify "false"
```
但我使用后没有任何效果，还是报如上错误
* 于是我有搜到了一个解决方案：***更新DNS缓存***
```sh
#Windows用户：cmd命令窗口执行：
$ ipconfig /flushdns
```
仍然没有用。。。
* 找到第三个，但第三个是因为文件过大，超时了。和我不是一个问题
  地址：[git push时报错](https://blog.csdn.net/qq_45452172/article/details/114732482?utm_medium=distribute.pc_relevant_t0.none-task-blog-2%7Edefault%7EBlogCommendFromMachineLearnPai2%7Edefault-1.control&depth_1-utm_source=distribute.pc_relevant_t0.none-task-blog-2%7Edefault%7EBlogCommendFromMachineLearnPai2%7Edefault-1.control)
* 但以上这些对我都没有
最后我觉得既然可能是网络不稳定，连接超时所引起的，那么就直接翻墙更新，然后就可以了。
