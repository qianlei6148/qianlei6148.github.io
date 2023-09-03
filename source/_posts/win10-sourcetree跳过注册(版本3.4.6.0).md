---
title: win10 sourcetree跳过注册(版本3.4.6.0)
date: 2021-09-13 10:20:11
tags: [SourceTree]
---
> 文章参考了酷极和的文章[Windows10 下安装SourceTree 跳过注册 Bitbucket](https://www.cnblogs.com/daizhongxing/p/12251672.html)，主要是用来记录下自己这边的操作。

首先在官网下载好最新版之后（2021-9-13最新版是3.4.6），安装。

不要打开程序，先改配置
`C:\Users\当前用户文件夹\AppData\Local\Atlassian\SourceTree`添加文件`accounts.json`，添加内容如下
```json
[
  {
    "$id": "1",
    "$type": "SourceTree.Api.Host.Identity.Model.IdentityAccount, SourceTree.Api.Host.Identity",
    "Authenticate": true,
    "HostInstance": {
      "$id": "2",
      "$type": "SourceTree.Host.Atlassianaccount.AtlassianAccountInstance, SourceTree.Host.AtlassianAccount",
      "Host": {
        "$id": "3",
        "$type": "SourceTree.Host.Atlassianaccount.AtlassianAccountHost, SourceTree.Host.AtlassianAccount",
        "Id": "atlassian account"
      },
      "BaseUrl": "https://id.atlassian.com/"
    },
    "Credentials": {
      "$id": "4",
      "$type": "SourceTree.Model.BasicAuthCredentials, SourceTree.Api.Account",
      "Username": "",
      "Email": null
    },
    "IsDefault": false
  }
]
```
然后修改文件`C:\Users\当前用户文件夹\AppData\Local\Atlassian\SourceTree.exe_Url_xxxxxxxx\3.4.6.0\user.config`，内容如下
```json
<setting name="AgreedToEULA" serializeAs="String">
        <value>True</value>
</setting>
<setting name="AgreedToEULAVersion" serializeAs="String">
        <value>20160201</value>
</setting>
```

然后启动既可以了。
