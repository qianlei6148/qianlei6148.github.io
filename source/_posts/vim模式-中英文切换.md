---
title: vim模式 输入法中英文切换
date: 2023-02-23 10:54:12
tags:
---
> 最近开始频繁的使用vim模式，但有一种情况让我很难受，那就是当我使用拼音写完注释后，切回vim-normal模式时，输入法仍然是中文，每次都要再次切到中文，特别是在客户领导在旁边催你进度时尤为明显。
> 最近在刷b站时碰巧刷到一个up的视频，终于找到一个解决方案，vim_mode我会在vscode、iterm2和idea中都会用到，所以改变输入法是最好的选择
> 备注来源：b站up主 阿崔cxr

# Rime Squirrel 鼠须管输入法
<!-- more -->
[RIME|中州韻輸入法引擎](https://rime.im/) 是一款聪明的输入法，它是一款可以由用户自己来制作的输入法，虽然自己定制的门坎会高，但如果你有耐心就可以根据这个输入法引擎自己来设计。(RIME一个开源(github)的可高度定制的输入法(框架)
本身下载下来就可以直接使用，只不过默认的中文是繁体字。
如果不想设计也不要紧，因为已经有很多成品可以使用。
[ssnhd/rime](https://github.com/ssnhd/rime)配置文件可以帮助你，打开网址，下载下来，里面的花园明朝字体需要安装，用来解决生僻字，而配置文件则可以直接复制copy到输入法里面的配置中，之后点击重新部署就完成了。

至此输入法就处理好了，接下来就处理vim_mode中英文切换
配置文件`squirrel.custom.yaml`最下面的配置
```
   # 特定App默认中/英文输入   
  app_options:    
    com.apple.Spotlight:             # 聚焦搜索
        ascii_mode: true             # true默认英文,false默认中文
    com.runningwithcrayons.Alfred:   # alfred
        ascii_mode: true
    com.apple.Terminal:              # 终端
        ascii_mode: true
        ascii_punct: true
    com.microsoft.VSCode:            # Visual Studio Code
        ascii_mode: true
        ascii_punct: true            # 中文状态输出英文标点(半角) 
        vim_mode: true               # 设置vim模式,insert模式切换到normal模式时,自动变成英文输入
    com.tencent.Lemon:               # 腾讯柠檬
        ascii_mode: true
    com.apple.dt.Xcode:              # Xcode
        ascii_mode: true
    com.nektony.App-Cleaner-SII:     # App Cleaner & Uninstaller
        ascii_mode: true
    com.xunyong.hapigo:              # hapigo
        ascii_mode: true
    com.jetbrains.intellij:          # intellij   idea
        ascii_mode: true
        ascii_punct: true
        vim_mode: true
    com.googlecode.iterm2:           #iterm2
        ascii_mode: true
        ascii_punct: true
        vim_mode: true
```
重新部署后，就能愉快的使用了。
