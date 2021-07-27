---
title: hexo相关
date: 2018-09-29 13:05:30
categories: [technology,blog]
tags: [hexo]
---
# hexo相关（文件夹对应意义等）
> 文件夹内容：
*   node_modules：文件夹中放依赖包
*   public：存放的是hexo根据source里的内容生成的页面
*   scaffolds：命令生成文章等的模板
 <!--more-->
*   source：用hexo命令创建的各种文章
*   themes：所下载的主题全放里面
*   _config.yml：整个博客站点的配置
*   db.json：source解析所得到的
*   package.json：项目所需模块项目的配置信息

在`_config.yml`中添加配置, 部署到自己的GitHub网站上
```
deploy:
  type: git
  repo: https://github.com/YourgithubName/YourgithubName.github.io.git
  branch: master
```
>常用hexo指令：[（官网查看指令链接）](https://hexo.io/zh-cn/docs/commands.html)

`hexo version`: 显示版本号
`hexo init`: 初始化
`hexo new <title>`: 新建文章(默认等同于`hexo new post <title>`)
`hexo generate`或者`hexo g`: 静态文件生成
`hexo publish`: 发布
`hexo server`或者`hexo s`: 启动本地服务器
`hexo deploy`或者`hexo d`: 自动生成静态文件并部署网站
`hexo clean`: 清除缓存和已生成的静态文件(一般在更换主题或者修改没有生效的情况下)
`hexo --safe/--debug/--slient`: 安全/调试/简洁模式
`hexo new draft "<title>"`: 创建草稿，可以把不用的却不舍得删的文件已到这个目录下
`hexo new tags "<title>"`: 创建标签
`hexo new categories "<title>"`: 创建分类

>组合操作

`hexo deploy -g`  生成静态文件并部署网站
`hexo server -g ` 生成静态文件并且启动本地服务器
`hexo clean && hexo s`: 清理并启动本地服务器
`hexo clean && hexo d`: 清理并部署网站

>标题、标签、分类

在Markdown文件的开头添加
```
---
title: 标题
category:  分类
tags: 标签
---
```
例子：
```
---
title: hexo相关
date: 2018-09-29 13:05:30
categories: [technology]
tags: [hexo]
---
```
如果使用`hexo new`命令或者是用工具`hexoEdit.app`新建文章会自动生成上面的结构。
**（注：[hexoEdit](https://github.com/zhuzhuyule/HexoEditor)是一款书写markdown的工具，在windows和mac上都有版本，这款工具内核是以[moeditor](https://moeditor.github.io)为基础改造成可以快速用于hexo blog。
在工具内的`设置`中配好`hexo配置文件`，`创建Post`就会创建hexo文章并把文件保存路径自动定位到hexo的目录中）**

多个标签的设置

方式一：仿照Hexo配置文件中的写法
```
tags:
  - Hexo
  - java
  - JavaScript
```
方式二：数组写法
```
tags: [前端,Hexo,HTML,JavaScript]
```






