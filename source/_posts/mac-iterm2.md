---
title: mac iterm2配置ssh连接
date: 2021-08-18 14:44:08
categories: tool
tags: [ssh,item2]
---
首先先测试下，在`iterm`中输入命令`ssh -p$port root@$host`查看是否能连接到服务器
```sh
#-p后面跟端口号，@后面跟地址
$ssh -p22 root@101.102.03.04
```
**如果没问题，则开始配置**
<!--more-->
* **ssh配置**
点击`iterm2—>Preferences—>Profiles`，或者使用快捷键`⌘O`(command+英文O)
![新建Profiles图片](https://gitee.com/qianlei6148/pictures-of-the-warehouse/raw/master/uPic/202108/20210819rmwLtg.png)

* **输入密码**
由于只能登录之后输入密码，密码过于复杂或者登录次数少还会忘记，所以再配置密码。
点击`Window->Password Manager`或者使用快捷键`⌥⌘F`
![新建密码图片](https://gitee.com/qianlei6148/pictures-of-the-warehouse/raw/master/uPic/202108/202108198yn72U.png)

##  <font color='red'>所有配置完成</font>。
配置完毕，以后打开ssh，就直接快捷键`⌘O`选中想要打开的`ssh`回车即可。
进入后让你输入密码的时候，就快捷键`⌥⌘F`选中你设定的密码回车就自动输入进去了。
