---
title: maven、npm配置仓库账号密码
date: 2023-07-21 10:46:09
tags:
---
> java、vue前端等应用开发时，如果公司的私有依赖库关闭匿名访问，则需要先配置账号密码才能获取依赖资源，java应用需要配置maven账号密码，vue前端应用需要配置npm账号密码，配置方式如下：
<!-- more -->
### 1、maven配置仓库账号密码
1.1 进入maven安装目录
1.2 进入conf目录
1.3 修改settings.xml文件
在`settings.xml`文件**`servers`**标签中，添加内容。
>>[仓库id]为工程中pom文件配置的依赖私有仓库id，[账号]为对应仓库的账号，[密码]为对应仓库的账号密码
```xml
<server>
    <id>[仓库id]</id>
    <username>[账号]</username>
    <password>[密码]</password> 
</server> 
```
`settings.xml`文件修改保存后，即可通过maven命令拉取依赖资源。


### 2、npm配置仓库账号密码

需要先在本地登录仓库，操作如下：
在本地cmd执行命令：
```terminal
npm login --registry https://xxx.xxx.xx/repository/npm-public/
```
依次输入对应仓库的账号、密码、邮箱。
登录完成后，即可通过npm命令拉取对应仓库依赖资源。




