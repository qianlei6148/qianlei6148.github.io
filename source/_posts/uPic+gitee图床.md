---
title: 图片上传工具（uPic 图床 + Gitee）
date: 2021-08-18 16:37:41
categories: tool
tags: [uPic,gitee]
---
文章主要使用了这个作者写的[uPic 图床配置教程 - 码云(Gitee)
](https://blog.svend.cc/upic/tutorials/gitee/)，自己在这里记录主要是为了留个备份。

## 配置项说明
<!--more-->
* 用户名: 码云用户名。例如：我的码云主页`https://gitee.com/xxxx`，我的用户名就是xxxx
* 仓库名: 需要储存上传文件的仓库名称。例如：我的仓库地址为 `https://gitee.com/xxx/oss-22` ，仓库名称就是oss-22 **备注：是地址上的仓库名称，如果你创建了proUdd等名称，在网页地址上面会显示pro-udd，而仓库名取的就是地址上面的名称而不是你创建的名称**
* 分支: 分支名称，默认是master。必须先创建好对应分支，才能使用
* Token: 码云的私人令牌
* 域名: 默认可不设置域名，会使用码云默认的访问地址。当你的仓库开启了pages功能，并配置好了自定义域名时，这里就可以使用你的自定义域名
* 保存路径: 文件储存的路径（包括文件夹）。 支持 {year} {month} {day} {hour} {minute} {second} {since_second} {since_millisecond} {random} {filename} {.suffix} 等变量。比如：上传的图片为 uPic.jpg，设定为 “uPic/{filename}{.suffix}”，则会保存到 “uPic/uPic.jpg”。

## Token 获取方式
1.点击[进入码云 Token 创建页面(点击进入)](https://gitee.com/profile/personal_access_tokens/new)
2.勾选`projects`访问权限或者全选都可以。然后滚动页面到底部，点击Generate token按钮来生成 token
3.复制生成好的 Token 值到 uPic token 输入框
<font color="red">注意：此 Token 只会显示一次！请务必保存好，否则之后丢失了，就得重新创建了~</font>

## 问题
Gitee 私有库里面的图片无法展示，需要改为公开库才行