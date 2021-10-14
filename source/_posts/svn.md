---
title: mac电脑遇到的svn证书验证失败问题
date: 2021-10-14 09:33:04
tags: -svn
---
# svn报错：Server SSL certificate verification failed: certificate has expired, issuer is not trusted
第一次连接svn拉去代码时遇到的问题，原因是https证书验证失败。
## 解决方案
在终端中操作
```sh
#地址请填自己的svn地址
svn sl https://svn.xxxxxx/xxxx
```
运行后，出现`是否需要重新验证`,R表示不打算验证，T和P表示临时和总是相信。
我们输入`P`总是相信
接下来需要输入账号密码等信息，直接输入svn的账号和密码即可。
以上操作完毕，就可以拉去代码了。

