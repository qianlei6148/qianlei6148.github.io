---
title: XAMPP-VM数据库MariaDB使用其他工具连接
date: 2019-10-19 15:21:04
categories: [technology]
tags: [XAMPP-VM,MariaDB]
---

&emsp;&emsp;使用`XAMPP-VM`出现问题，但网上搜索答案，大部分都不带`VM`的。

>&emsp;&emsp;首先我遇到了一个问题，到最后也无法解决，只能卸载重新装了个XAMPP-VM。
基本情况是：有很长一段时间都没有打开`XAMPP-VM`, 然后再次打开连数据库后报错。
```
Access denied for user 'root'@'localhost' 
(using password: YES/NO)
```
<!-- more -->
>不管是第三方数据库连接工具，还是XAMPP自带的phpMyAdmin都报错，从网上查询的结果是可能密码遗忘了，必须重新设置密码。
>但我无法进入数据库，使用无密码登录也不能进入，可能是因为我以前把配置文件中的`skip-grant-tables`给注释掉了吧，准备修改里面的文件但总是提示没有权限，也解不开，被迫无奈，只能卸载重装了（归根结底还是以前并没有记录笔记的习惯，安装了新的程序，下次遇到情况还是要重新搜索，但网上的东西太多，这次搜到的不一定和上次的一样，等于记忆重新来了一遍，那干脆自己记录是最好的。可以规避掉以前自己已经解决但又再次遇到的问题。）

&emsp;&emsp;但`XAMPP-VM`和`XAMPP`之间是有区别的，带VM说明是自带虚拟机，而不是在本地机器的基础上创建的，它自带linux虚拟机，所有的内容都安装在虚拟机中，目前只有mac电脑中有带`VM`的版本。
&emsp;&emsp;两者的目录结构也有所不同，`VM`主文件都在`/opt/lampp`中，启动文件在这个目录下的`bin`文件中。因此如果你网上搜索`linux xampp`排列前几个的目录结构都是这个。 
在xampp控制台中，启动好后当你点击`go application`时首页打开，它的初始页面中有很多说明，比如使用phpMyAdmin连接数据库，第一次需要改配置什么的等等，还有常见问题回答。
&emsp;&emsp;但使用别的软件连接数据库`MariaDB`则没有说明，正常用其他数据库工具连接刚开始都会报`Host...is not allowed to connect to this MariaDB server...`这个错误。
**备注：下面这段是修改权限的文字描述，不想这么看的可以直接看下面的操作**
>修改权限：
&emsp;&emsp;你需要从`terminal`中进入虚拟机，先使用命令`mysql -uroot -p`，因为初始是没有密码的，所以直接回车就能进入mysql，`use mysql`来切换到我们准备修改的数据库，先查询下用户表`select host,user,password from user;`，没有问题的话，然后就创建`grant all privileges on *.* to 'root'@'%' identified by '这里是你的密码' with grant option;`，创建好后，记得要刷下权限`flush privileges;`（注：如果你想删除，删除后也必须刷权限），然后就可以使用数据库工具连接了。

操作如下：
```sql
mysql -uroot -p --不需要输入密码直接进入数据库
use mysql; --切换当前数据库为mysql数据库模块
select host,user,password from user;--先查询sql
--给root账号添加新的权限
grant all privileges on *.* to 'root'@'%' identified by '这里是你的密码' with grant option;
flush privileges;--添加完毕后，需要刷新权限
```
如果发现设置权限的密码不是自己想要的，就删除user表中的%这条数据
```
delete from user where host='%';//如果发现设置错了
flush privileges;//刷新权限
```
（Navicat,tablePlus都能连上了，账号是root,密码是之前创建账号权限是输入的密码，比如我在本地的密码就习惯使用自己名字的拼音，免得忘记）
