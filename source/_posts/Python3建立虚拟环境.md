---
title: Python3建立虚拟环境
date: 2019-09-20 07:10:39
categories: [technology]
tags: [Django,Python3]
---

首先创建一个文件夹，如：books
* 先切换到books目录下，使用python3
```cmd
$ cd books 
$ Python3 -m venv xxx
```
`xxx`表示的是你准备创建的文件名, 如果与当前目录（books）名称相同, 那么接下来安装的文件都会放在同一个目录下
<!-- more -->
建立虚拟环境
然后在books目录下激活虚拟环境
```
//激活虚拟环境
$ source xxx/bin/activate
```

//激活好后,在terminal中输入任何指令，下面都会显示`(xxx)`，
例如：输入`ls`查当前文件夹的内容，回车后会显示在文件下面
```
$ ls
(xxx)
 ```
 ```
//关闭虚拟环境
$deactivate
```
也可以输入`$python`查看是否激活，如果显示的`python`目录路径是当前文件夹下，则说明激活成功，如果显示的是系统安装的路径，就说明没有激活。
#### 安装Django
记住**激活后才能用**，
```
$pip install Django
Installing collected packages: Django 
Successfully installed Django Cleanin
```
创建项目：
```
django-admin.py startproject books .
```
`books`就是当前你所处在的目录名
***记住最后的`.`是必须要的***
这个命令末尾的点，是让新项目使用合适的目录结构，这样开发完成后可轻松地将应用程序部署到服务器上
（如果部署时是应为`.`而出现配置问题，则需要删除 除了`xxx`以外的所有文件和文件夹，然后重新运行命令）
#### 创建数据库
```
$python manage.py migrate
........
$ls
db.sqlite3 .....
```
#### 项目运行
```
python manage.py runserver
```
最后在浏览器`localhost:8000`下查看页面，如要关闭`Ctrl+c`

#### 创建应用程序
终端还运行着`runserver`, 重新打开一个终端（或tab页）,
切换到`manage.py`所在的目录, 激活虚拟环境, 在执行命令`startapp`
```
$source xxx/bin/activate
(xxx)$python manage.py startapp xxxx
(xxx)$ls
xxxx  xxx  manage.py  db.sqlite3 ...
```
 `startapp appname`命令是让Django建立应用程序所需的基础设施, 执行`ls`会发现多了个xxxx文件夹(你可以创建多个应用程序作为不同的模块放在项目中，比如创建个user应用程序，这个模块就专门用来管理用户等信息)
 
 #### 定义模型
 首先是激活模型
 在`settings.py`的 `INSTALLED_APPS`中，添加`xxxx`应用程序
在 `models.py`创建类，然后完成迁移数据库
```
$python manage.py makemigrations xxxx
$python manage.py migrate
```
___记住，每次创建或者修改类都要做一次迁移数据库___

#### Django管理网站
```
$python manage.py createsuperuser
```
>__注册模型__

在`admin.py`中，添加代码,例如：
```Python
from xxxx.models import xx
admin.site.register(xx)
```
>静态文件更新

添加静态文件需要更新下，以免出现加载404的情况，在`setting.py`配置中:
```python
#存放静态文件位置，
STATICFILES_DIRS = [os.path.join(BASE_DIR, 'static'), ]
```
其中的`static`是静态目录，是当前项目的目录下的一级目录，如果你创建在别的地方比如二级目录，那就需要修改文件夹路径，比如`xxxx/static`
>（比如在[《python编程：从入门到实践》](https://baike.baidu.com/item/Python%E7%BC%96%E7%A8%8B%EF%BC%9A%E4%BB%8E%E5%85%A5%E9%97%A8%E5%88%B0%E5%AE%9E%E8%B7%B5/19943874?fr=aladdin)这本书中的`20.2.10 创建用于存储静态文件的目录`小节中，`static`文件夹就创建在`learning_log/learning_log/static`中），所以需要把`static`修改成`learning_log/static`。


如果发现没有用，静态文件页面刷新就404，那有个办法：
```
#在setting.py中添加
STATIC_ROOT = 'staticfiles'
```
