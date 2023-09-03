---
title: mac ffmpeg下载配置
date: 2021-11-15 13:42:35
tags: [bilibili,ffmpeg]
---
为了把`b站`的视频`flv`格式转换成`MP4`格式，所以下载`ffmpeg`用来转换`MP4`格式.
正常下载使用 `brew`，但不知道为什么一直报错无法下载，最后觉得直接[官网下载](https://ffmpeg.org/download.html)后，配置使用
<!--more-->
下载好后，`vi ~/.bash_profile`，在文件最后添加上下面的环境变量就可以到处使用了
```
#ffmpeg
export PATH=$PATH:/Applications/projectForMyself/environment_configuration/ffmpegFloder/bin
```
我把下载的`ffmpeg`，放在了`bin`文件里面，也就是`bin/ffmpeg`。


