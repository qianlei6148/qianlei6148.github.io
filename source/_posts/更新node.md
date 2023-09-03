---
title: 更新node
date: 2021-07-19 10:01:57
categories: [technology]
tags: [node]
---
## 使用n更新和切换node

### 1.windows 更新node
如果是windows, 那就请到node官网下载windows最新安装包来覆盖之前的node即可。
切换,可以使用 `n` 工具,和下面是一样的
### 2.mac/linux 更新/切换 node
如果是mac/linux, 直接打开控制台
**我使用的时候会报权限问题,所以以下的命令除了查看版本号之外,其余的我都使用`sudo n`来进行 **
<!-- more-->
```Sh
# 首先查看你的node版本
$node -v
# 使用Node Binary管理模块"n"
# 全局安装管理模板"n"
#$npm install -g n
$sudo npm install -g n
```
安装管理模块`n`后，可以使用如下三种方式更新`node`.

```sh
# 升级到指定的版本 n 版本号
$sudo n 8.4.1
# 安装稳定版本(长期支持版本，稳定)
$sudo n stable
# 安装最新版本(当前发布的最新版本，含最新功能)
$sudo n latest
```
安装好最新版后，查看是否成功
```sh
$node -v
v14.17.3
```
#### 问题 如果得到的版本信息不正确，还是老版本
##### 解决方式:
>`n` 切换之后的`node`默认装在 `/usr/local/bin/node`，先用 `which node` 检查一下当前使用的 `node` 是否是这个路径下的。如上缘由，一般都是因为当前版本指定到了其他路径，更新下`/etc/profile`文件指定即可。

我是因为以前在`vim ~/.zshrc`中进行了配置,导致无法切换
```vim
#我配置了这三项,导致无法切换,最后我把这三个注释了之后,可以切换了
#export PATH="/usr/local/opt/node@14/bin:$PATH"
#export LDFLAGS="-L/usr/local/opt/node@14/lib"
#export CPPFLAGS="-I/usr/local/opt/node@14/include"
```

### 扩展知识 : 管理模块 ***`n`*** 
>`n是Node的一个模块，作者是TJ Holowaychuk（鼎鼎大名的Express框架作者）`。
>安装好后，你可以直接输入`n`后输出当前已经安装的node版本以及正在使用的版本（前面有一个o），你可以通过移动上下方向键来选择要使用的版本，最后按回车生效.
```sh
$sudo n
    0.10.1 
    0.10.15 
o   0.10.21 
    0.11.8
```
>删除某个版本
```sh
$sudo n rm 0.10.1 
```
### 扩展知识 : ***`n和nvm的区别`*** 

 我们在使用 `n` 管理 `node` 版本前，首先需要一个 `node` 环境。我们或者用 `Homebrew` 来安装一个 `node`，或者从官网下载 pkg 来安装，总之我们得先自己装一个 `node`, `n`本身是没法给你装的。
 在安装的时候，n 会先将指定版本的 node 存储下来，然后将其复制到我们熟知的路径 /usr/local/bin，非常简单明了。当然由于 n 会操作到非用户目录，所以需要加 sudo 来执行命令。
>两者区别:
>1. 安装简易度。nvm 安装起来显然是要麻烦不少；n 这种安装方式更符合 node 的惯性思维。见仁见智吧。
>2. 系统支持。注意， nvm 不支持 Windows。
>3. 对全局模块的管理。n 对全局模块毫无作为，因此有可能在切换了 node 版本后发生全局模块执行出错的问题；nvm 的全局模块存在于各自版本的沙箱中，切换版本后需要重新安装，不同版本间也不存在任何冲突。
>4. 关于 node 路径。n 是万年不变的 /usr/local/bin；nvm 需要手动指定路径。

---

#### p.s. 参考文章：
>1. [轻松两步完成Node.js版本升级](https://www.jianshu.com/p/e41a7aa0288c)
>2. [windows node版本如何升级](https://blog.csdn.net/guzhao593/article/details/81712016)
>3. [利用N来管理nodejs的版本问题](https://blog.csdn.net/jiangbo_phd/article/details/51476155)
>4. [node版本管理 n和nvm说明](https://blog.csdn.net/qq_34710578/article/details/94598428)