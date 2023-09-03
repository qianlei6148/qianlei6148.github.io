---
title: 使用imewlconverter给Rime添加词库
date: 2023-09-01 15:24:45
tags:
---
# 使用`imewlconverter`给`Rime`添加词库
## 1 什么是`Rime`
Rime 是跨平臺的輸入法軟件，Rime 輸入方案可通用於以下發行版：
<!-- more -->
【中州韻】 ibus-rime → Linux
【小狼毫】 Weasel → Windows
【鼠鬚管】 Squirrel → Mac OS X

我当前使用的是`macbook`，所以使用的是`鼠鬚管`输入法软件，里面自带了多个输入法，我使用的是`小鹤双拼`

但这里面自带的词库无法满足日常需求，所以想到用`搜狗标准词库`（[下载地址链接](https://pinyin.sogou.com/dict/detail/index/11640)）

## 2 什么是`imewlconverter`
中文名：`深蓝词库转换`
是一款开源免费的输入法词库转换程序([github地址链接](https://github.com/studyzy/imewlconverter)),
支持批量转换（一次拖拽多个词库文件，或者按住 Ctrl 选择多个文件），支持命令行模式（在命令行下使用-?命令查看帮助），支持 Windows、Linux、MacOS。
![](http://ql-u-pic.oss-cn-shanghai.aliyuncs.com/upic/2023/09/01/BgyQ3g607Eye.png)
下载自己系统的版本

## 3 安装 `.NET6.0`
使用`imewlconverter`需要下载`.NET`,可以到官网进行下载([官网下载链接](https://dotnet.microsoft.com/zh-cn/download)),并选择`6.0`这个`LTS`版本。
下载后安装完毕，就可以使用`dotnet`命令了。

windows系统好像有图形化界面，mac没看到，所以我使用的mac命令行模式

## 4 词库转换
将从`github`上下载的包解压缩，并进入文件夹中，执行以下指令
```
#控制台输入以下命令，获取帮助
dotnet ImeWlConverterCmd.dll -?
```
![](http://ql-u-pic.oss-cn-shanghai.aliyuncs.com/upic/2023/09/01/S3CH13eF0gdZ.png)
`-i:输入的词库类型 词库路径1 词库路径2 词库路径3 -o:输出的词库类型 输出词库路径 -c:编码文件路径`
根据帮助内容，进行转换
```
 dotnet ImeWlConverterCmd.dll -i:scel ./sougo.scel -o:rime ./luna_pinyin.txt
```
完成后，获取生成的文件`luna_pinyin.txt

## 5 设置`Rime`
首先将刚刚生成的文件`luna_pinyin.txt`重命名为`luna_pinyin.sogou.dict.yaml`，用来做后续操作。
![](http://ql-u-pic.oss-cn-shanghai.aliyuncs.com/upic/2023/09/01/6eaJ5UhSLT0H.png)
安装上图，点击`用户设定`打开`Rime`文件夹，将刚刚重命名后的文件`copy`进去。

控制台打开，进入Rime文件夹` ~/Library/Rime`
```
#打开文件，进行编辑
 vim luna_pinyin.sogou.dict.yaml
```
在文件开头添加如下内容：
```
# Rime dictionary
# encoding: utf-8
# Luna Pinyin Extended Dictionary(Basic)  - 明月拼音扩充词库（基本）

---
name: luna_pinyin.sogou      # 词库名
version: "2023.08.31"
sort: by_weight                 # by_weight（按词频高低排序）或 original（保持原码表中的顺序）
use_preset_vocabulary: true     # true 或 false，选择是否导入预设词汇表【八股文】
...
```
效果如下：
![](http://ql-u-pic.oss-cn-shanghai.aliyuncs.com/upic/2023/09/01/6D1lwbflxSyA.png)

完成以上内容后，需要将文件加载进`Rime`
```
#打开文件
 vim luna_pinyin.extended.dict.yaml
```
将`luna_pinyin.sogou` 这个词库添加进去(如下图)
![](http://ql-u-pic.oss-cn-shanghai.aliyuncs.com/upic/2023/09/01/6FcRS8Xc5foR.png)
然后将`Rime`重新部署下，词库即可生效。

## 6 文中处理的一些疑问
#### 1 为什么要在`luna_pinyin.extended.dict.yaml`中添加
原因：
打开你自己输入法的配置文件，我的是`小鹤双拼`，所以打开`vim double_pinyin_flypy.custom.yaml`
文件内容中显示如下：
![](http://ql-u-pic.oss-cn-shanghai.aliyuncs.com/upic/2023/09/01/TcYLG2pYWtpR.png)
它扩展词库加载的就是`luna_pinyin.extended.dict.yaml`这个文件，所以我们将词库配置在这个文件中

#### 2 刚安装好后，我发现使用`dotnet`命令出错
提示报错：` zsh:no matches found `，这个问题
解决方式：
打开文件`~/.zshrc` ，添加内容：
```
setopt no_nomatch
```
退出文件，并更新
```
source ~/.zshrc
```




