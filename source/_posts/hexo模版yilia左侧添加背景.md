---
title: hexo模版yilia左侧添加背景
date: 2018-09-30 09:36:05
categories: [technology]
tags: 
- hexo 
- yilia
description: 给hexo模版yilia左侧添加背景
---
yilia模版左侧背景需要自己设置(很简单哦)
首先打开`themes\yilia\layout\layout.ejs`
在最上面添加
```html
<% var left_default = '#fff'; %>
```
<!-- more -->
作为默认值，如果你不加图片，就会默认为白色
接着在`layout.ejs`文件中找到
```html
<div class="left-col" q-class="show:isShow"></div>
```
在其中为它添加内联样式,结果如下：
```html
<div class="left-col" q-class="show:isShow" style="background: <%= theme.style && theme.style.left_ground ? theme.style.left_ground : left_default %>">
```
其中`theme.style.left_ground`中的`left_ground`就是主题配置文件`_config.yml`中`style`下的你所要添加的名称。
最后在主题的`themes\yilia\_config.yml`中添加
```vim
 # 头像上面的背景颜色
  header: 'rgba(0,0,0,0)' #设置背景透明，不然头像上方是默认色
 #左侧头像板块的背景颜色
  left_ground: 'url(/assets/blogImg/timg2.png)no-repeat 100%;background-size:cover;'
```
记住添加在`style`标签下面哦
url()里面的图片地址自己填写吧~~~


