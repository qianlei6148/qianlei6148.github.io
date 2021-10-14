---
title: Vue项目创建
date: 2020-08-31 09:36:00
categories: [technology]
tags: [python]
---
## 1.创建项目
在默认配置都有的情况下：
vue init webpack 项目名称
cd 项目
npm install 
npm run lint -- --fix
npm run dev

feature/ELIM-16' into 'hotfix/1.3.1' in 2020-09-07 16:34:22
## 遇到问题

报错“ vue-cli · connect ECONNREFUSED ”
cnpm -v
查看到prefix=/usr/local,
于是 npm config set prefix=/usr/local 设置下
最后vue list 查看到