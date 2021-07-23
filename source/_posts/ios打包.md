---
title: ios打包
date: 2019-10-28 10:10:18
categories: technology
tags: [ios]
---
需要后缀名为`.P12`和`.mobileprovision`文件，这两个文件代表`ios证书`和`描述文件`。
>xcode如果出问题
最好先 `ionic cordova build ios`, 
然后
打开`platform`文件夹中的 `xxxxxx.xcworkspace`
>（xcode第一次打包所需要配置的选项）：

![c](屏幕快照 2019-10-28 上午11.14.22.png)
![s](屏幕快照 2019-10-28 上午11.11.59.png)
![d](屏幕快照 2019-10-28 上午11.15.43.png)

修改好之后，开发打包发布，
1.首先选择`Generic IOS Device` , 点击`product->Archive`
![d](屏幕快照 2019-10-28 下午5.07.43.png)
2.点击`distribute app`
![](屏幕快照 2019-10-28 下午4.33.08.png)
3.选择企业级`Enterprise`
![](屏幕快照 2019-10-28 下午4.47.28.png)
4.第一个默认`none`,第二个不要勾选
![](屏幕快照 2019-10-28 下午4.51.33.png)
5.第一个默认，第二个选择`import->mobileprovision`
![](屏幕快照 2019-10-28 下午4.52.17.png)
6.结束好后，会生成一个文件夹，里面包含四个文件，其中`.ipa`文件是苹果安装包
![](屏幕快照 2019-10-28 下午4.54.28.png)

>写plist,自动更新

.plist文件是属性列表文件，这里配置更新状态。
标注：
```
<?xml version="1.0" encoding="UTF-8"?>
<!DOCTYPE plist PUBLIC "-//Apple//DTD PLIST 1.0//EN" "http://www.apple.com/DTDs/PropertyList-1.0.dtd">
<plist version="1.0">
  <dict>
    <key>items</key>
    <array>
      <dict>
        <key>assets</key>
        <array>
          <dict>
            <key>kind</key>
            <string>software-package</string>
            <key>url</key>
            <string>AppStore地址加文件名地址</string>
          </dict>
        </array>
        <key>metadata</key>
        <dict>
          <key>bundle-identifier</key>
          <string>程序id</string>
          <key>bundle-version</key>
          <string>版本号</string>
          <key>kind</key>
          <string>software</string>
          <key>title</key>
          <string>IPA名.ipa</string>
        </dict>
      </dict>
    </array>
  </dict>
</plist>
```
