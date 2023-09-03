---
title: zsh:no matches found 问题
date: 2023-08-31 16:48:52
tags: [question]
---
## zsh:no matches found
解决方法：
打开文件`~/.zshrc` ，添加内容：
```
setopt no_nomatch
```
退出文件，更新：
```
source ~/.zshrc
```
