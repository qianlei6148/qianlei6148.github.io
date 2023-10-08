---
title: 记一次hostwinds服务器退款经历
date: 2023-10-08 23:15:53
tags:
---
### 退款时间: `2023.10.8`
### 记录原因：
> 网上有许多退款教程，但我遇到了不一样的情况，所以在退款成功后，对此进行一次记录。
<!-- more -->
### 当时的情况
>  
首先我是一年前购买的服务器，但由于大家都懂的原因，导致我逐渐不使用了，这个服务器付款周期是年付，这个周期我从没有变过，而它被设置成免密支付，导致了直接就付款成功了。
当10.8发现自己的支付宝有付款记录后，立马网上搜退款方式，网上面有很多说法，不过确定72小时之内退款是没问题的，只是有的是退在网站上有的是直接原路退还。
我最后钱是退回到了支付宝里面，并没有退在hostwinds的网站里。

### 解决经过
首先肯定是网上搜退款教程，刚开始挺顺利
如图下([教程来自这个地址](https://www.vpsgo.com/hostwinds-how-to-refund.html)) 可以点击进入：
![](http://ql-u-pic.oss-cn-shanghai.aliyuncs.com/upic/2023/10/08/7kg227soMNSO.png)
![](http://ql-u-pic.oss-cn-shanghai.aliyuncs.com/upic/2023/10/08/diksltIxhHD9.png)
然后随便选个`cancel`的理由。
到这一步很顺利。
随后问题来了：
>在教程中说取消服务器会自动生成一个工单，然后根据这个工单来完成取消服务器的流程，随后根据这个取消工单的`Service ID`来创建一个新的退款的工单，最后退款成功。

这一步无法进行，因为它没有自动生成工单，并且自动帮我取消服务器了，我的服务器状态已经是`cancelled`，没有工单，也就没有取消工单的`Service ID`.
这让我犯难了，网上搜不到，没法解决？
但这是我无疑中点了`liveChat`，于是问题迎刃而解了。
下面是聊天记录，如图：
![](http://ql-u-pic.oss-cn-shanghai.aliyuncs.com/upic/2023/10/08/dHvBHIarL19r.png)
然后打开链接，跳转到`ticket`页面,并且出现了一份工单
如图所示：
![](http://ql-u-pic.oss-cn-shanghai.aliyuncs.com/upic/2023/10/08/CFYnr3fsa6xI.png)
根据聊天的内容来处理
![](http://ql-u-pic.oss-cn-shanghai.aliyuncs.com/upic/2023/10/08/0Z05grBOlS1i.png)
下图是我的回复内容：
![](http://ql-u-pic.oss-cn-shanghai.aliyuncs.com/upic/2023/10/08/Q7YXvzUmpqf9.png)
大约半小时候，他回复我退款成功，于是我到支付宝中查看，钱果然退了回来。
这就是我退款的全过程。