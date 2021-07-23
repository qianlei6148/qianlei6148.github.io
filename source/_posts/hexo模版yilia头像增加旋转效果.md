---
title: hexo模版yilia头像增加旋转效果
date: 2018-10-01 07:57:23
categories: [tool]
tags:
- hexo
- yilia
---
在`themes\yilia\source\`文件夹下
增加一个css文件`avatarrotation.css`用来旋转360度
内容如下：

<!-- more -->
```css
.left-col #header .profilepic img {
	/* 控制旋转速度时间*/
  -webkit-transition: -webkit-transform 1.0s ease-out;
  -moz-transition: -moz-transform 1.0s ease-out;
  transition: transform 1.0s ease-out;
}
.left-col #header .profilepic img:hover {
	/* 鼠标经过360% */
  -webkit-transform: rotateZ(360deg);
  -moz-transform: rotateZ(360deg);
  transform: rotateZ(360deg);
}
```
然后在`themes\yilia\layout\_partial\head.ejs`文件中添加进去创建的`css`文件：
找到`<%- partial('css') %>`，在它的下面添加代码，把刚才写的文件添加进去，**注意！！是在它的下面添加，不然旋转速度将不会生效**
```html
<% if (theme.avatarrotation){ %>
	<link rel="stylesheet" type="text/css" href="/./avatarrotation.css">
<% } %>
```
如果`css`不生效，查看`css`中的`href`位置是否写错了，可根据你具体存放的位置写路径。
最后在`主题文件_config.yml`中添加
```vim
#头像是否旋转(如果不要旋转取false)
avatarrotation: true
```
最终就可以旋转了！