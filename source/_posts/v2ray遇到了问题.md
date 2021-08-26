---
title: v2ray遇到了问题,突然连不上了
date: 2019-09-12 13:56:26
categories: [翻墙]
tags: [question,v2ray]
---
### 2021.08.26更新
发现修改好端口后，重启服务器报错
![报错信息](
https://gitee.com/qianlei6148/pictures-of-the-warehouse/raw/master/uPic/202108/20210826KjovTk.png)
报错：`Job for v2ray.service failed. See "systemctl status v2ray.service" and "journalctl -xe" for details.`
原因是配置文件内容出错了`config.json`，使用命令检查文件`jq . config.json`(`jq`是官方推荐的,可以用来校验`config.json`文件格式的工具)，显示全部内容说明格式没问题，那么就是里面具体的配置错了，使用`vi config.json`打开文件后仔细检查，终于发现原来是因为配置的多个端口，其中有两个端口号是一样的，也就是说一个端口被占用了，另一个还想使用这个端口，所以导致无法启动或者重启服务。
##### P.S.`bing`搜索中可以看到这个报错基本都是配置文件导致的，例如启动`docker`、`nginx`等，当然也有其他的，比如你写在配置文件中的端口被别的应用给占了，这个时候就需要你另外处理，具体原因具体分析，也可以直接把问题搜索一下


--------------------------------------------------
### 以前

&emsp;&emsp;今天, 发现vpn无法连接, google总是打不开, 甚至连搬瓦工的地址也无法打开.
<!--more-->
&emsp;&emsp;但我接下来发现ping ip没有问题, 同样的ssh也能连接上服务器的后台, 一切依旧, 除了连不上外网.
&emsp;&emsp;所以我怀疑端口是否被封, 于是我修改服务器和客户端上的配置文件, 果然又能连外网了, 从[检查端口网站](https://tool.lu/portscan)(这个工具无法使用了)上看, 端口处于close的状态, 但接着问题又来了, 我把443端口换成未关闭的444, 重启v2ray后, 发现444被关闭了,443端口居然打开了(open), 很奇怪.
&emsp;&emsp;**结果**：在测了一段时间后，我觉得重新连接可能性不大，改哪儿哪儿关闭。
&emsp;&emsp;于是我重新设置了新的端口，我设置了多个端口，shadowsocks端口设置为444和20001，vmess端口设置了10087，最后在本地电脑修改配置后，这三个端口不管哪个都可以连上网了。



