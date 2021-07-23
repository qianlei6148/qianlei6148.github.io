---
title: python3 django Heroku 命令
date: 2019-10-01 17:19:34
categories: [technology]
tags: [Django,python,Heroku]
---
本地测试运行
```
heroku local
```
<!--more-->
本地提交程序到heroku上
```
git push heroku master
```
修改heroku上的项目名称xxxx
    ```
heroku apps:rename xxxx
```
在当前项目下的terminal中输入
```
$heroku config // 查看项目信息+数据库信息
=== qianlei-log Config Vars
DATABASE_URL: 
postgres://agjgqu:58cd7d@ecompucom:5432/dakkrsm
DISABLE_COLLECTSTATIC: 0
```
数据库连接格式：
`postgres://<username>:<password>@<host>/<dbname>`

