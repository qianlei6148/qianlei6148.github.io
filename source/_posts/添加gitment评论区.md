---
title: hexo添加gitment评论区(+评论区汉化)
date: 2019-10-24 14:51:24
categories: [technology]
tags: [hexo,git]
---
网上有很多，如果是hexo blog 直接看[hexo集成Gitment](https://joeybling.github.io/yilia-plus-demo/2019/07/24/Hexo%E5%8D%9A%E5%AE%A2%E9%9B%86%E6%88%90Gitment%E8%AF%84%E8%AE%BA/)这一个就可以了。
**主要说明的是每+篇新的文章评论区都需要初始化：**
（这个挺麻烦的）

页面发布后，你需要访问页面并使用你的 GitHub 账号登录（请确保你的账号是第二步所填 repo 的 owner），点击初始化按钮，之后其他用户即可在该页面发表评论。
<!-- more -->
&emsp;&emsp;它会在你填写的repo的内部初始化一个issue, 你可以登录github项目的issue中看到记录的评论，所以这个其实就是一个根据Issues来搭建的评论系统。[详见 Gitment：使用 GitHub Issues 搭建评论系统](https://imsun.net/posts/gitment-introduction/)



>接下来下面是我记录下自己的

### 配置
```yml
#5、Gitment
gitment_owner:      #你的 GitHub ID(github用户名)
gitment_repo: 'xxxx.github.io'    #存储评论的 repo(一般是你博客仓库地址)
gitment_oauth:   #申请的token
  client_id: ''           #client ID
  client_secret: ''       #client secret
```

### gitment汉化：
把定义模块中css和js换成下面两行，也可以download下来放模板目录下再换
```html
<link rel="stylesheet" href="https://billts.site/extra_css/gitment.css">
<script src="https://billts.site/js/gitment.js"></script>
```
来源：https://github.com/imsun/gitment/issues/104
