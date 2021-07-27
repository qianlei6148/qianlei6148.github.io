---
title: hexo添加看板娘(使用官方文档方式)
date: 2019-10-23 17:34:36
categories: [technology]
tags: [hexo,Live2D]
---
>先在说前头，在我写完这篇文章后，出现了一个报错，无法编译无法启动。
<!--more-->

```
$ hexo g
INFO  Start processing
FATAL Something's wrong. Maybe you can find the solution here: http://hexo.io/docs/troubleshooting.html
Template render error: (unknown path) [Line 23, Column 16]
  Error: Unable to call `live2d`, which is undefined or falsey
```
而问题出现的情况就是这篇文章的最后ps的地方。
![问题图片live2d](https://i.loli.net/2019/10/24/VRaifAUBdG1Yy9h.png)


我之前的文章已经设计了看板娘，[《hexo模版yilia添加可爱的看板娘》](https://qianlei6148.github.io/2018/10/11/hexo%E6%A8%A1%E7%89%88yilia%E6%B7%BB%E5%8A%A0%E5%8F%AF%E7%88%B1%E7%9A%84%E7%9C%8B%E6%9D%BF%E5%A8%98/)这篇文章就是我之前的做法，但因为是直接在代码中添加，所以如果换了主题就会发现什么都没有了，于是我决定不使用直接写的方式。
&emsp;&emsp;而且如果把模板都放到主题里面，有时候`hexo g`生成会出现报错的情况，但并不会影响发布。但看到报错还是很难受的。
&emsp;&emsp;于是我决定使用官方文档的方式，可以看[中文版](https://github.com/EYHN/hexo-helper-live2d/blob/master/README.zh-CN.md)。
>第一步

我首先把我之前的代码都清除掉，包括`主题/layout/layout.ejs`的引用，`主题/layout/_partial/head.ejs`的js引用和init方法。
>第二步

在hexo根目录下，创建一个文件夹，起名`live2d_models`,把主题目录下之前下载的里面的`live2d模型`全部剪切到这个文件夹下。
>第三步

安装模块:
```
npm install --save hexo-helper-live2d
```
可以试试 yarn add hexo-helper-live2d, 据说高能的yarn会比垃圾npm少很多麻烦呢。 [Yarn](https://yarn.bootcss.com/)
**注意：文档中说有`仍使用老版本`和`标签模式`，这里其实我没太看懂，好像是因为版本的缘故，其实是两种模式，一种是`注入`一种是`标签`, 注入是每个页面都会显示，标签是只有页面中写了才会显示。**
>第四步

配置文件: 打开`hexo`根目录下的`_config.yml`:
在最下面添加：
```yml
# Live2D
## https://github.com/EYHN/hexo-helper-live2d
live2d:
  enable: true
  scriptFrom: local
  pluginRootPath: live2dw/
  pluginJsPath: lib/
  pluginModelPath: assets/
  tagMode: false #标签模式下为true
  debug: false
  log: false # Whether to show logs in console
  model:
    use: live2d-widget-model-haru #选择的模型
    scale: 1
    hHeadPos: 0.5
    vHeadPos: 0.618
  react:
    opacity: 0.7 #透明度
    opacityDefault: 0.7
    opacityOnHover: 0.2
  display:
    superSample: 2
    width: 150
    height: 300
    position: right #位置
    hOffset: 0
    vOffset: -20
  mobile:
    show: true
    scale: 0.5
    motion: true
```
上述完成后，就成功了！
>ps. 

（1）配置文件中`model.use`获取的模型文件位置，就是`第二步`的文件夹里的内容。


（2） 如果使用标签模式，需要把配置文件中的`tagMode`注释解开，并且标注为true, 同时在页面中，也就body位置的任意位置添加，根据你的blog是使用什么文件来决定添加

```
{{ live2d() }}(swig文件) 或 <%- live2d() %>(ejs文件).
``` 

将 tagMode 设置为 true, 然后插件将只会在拥有live2d标签的页面出现.

