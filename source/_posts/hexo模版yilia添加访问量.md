---
title: hexo模版yilia添加不蒜子统计
date: 2019-10-24 17:08:10
categories: [technology]
tags:
- hexo
- yilia
---
我使用了[不蒜子 - 极简网页计数器](http://busuanzi.ibruce.info/)
具体参考可参考[文档](http://ibruce.info/2015/04/04/busuanzi/)
>## 添加统计文章阅读量

打开`themes\yilia\layout\_partial\post\date.ejs`

因为我准备把文章阅读量放在文章生成日期的旁边
然后在最上面添加如下内容：
<!-- more -->
```html
<%# "不蒜子统计" %>
<span id="busuanzi_container_page_pv" 
style='display:none' class="<%= class_name %>">
    <i class="icon-smile icon"></i> 阅读数：
    <span id="busuanzi_value_page_pv"></span>次
</span>
```
>## 添加统计访客数和统计总访问量

打开`themes\yilia\layout\_partial\footer.ejs`
在`class="footer-left"`前添加
```html
<script async src="https://busuanzi.ibruce.info/busuanzi/2.3/busuanzi.pure.mini.js"></script>
```
然后在你想要添加的地方添加下面语句
```html
<div class="powered-by">
    <span id="busuanzi_container_site_uv">
        本站访客数:<span id="busuanzi_value_site_uv"></span> ||
    </span>
    <span id="busuanzi_container_site_pv">
        本站总访问量<span id="busuanzi_value_site_pv"></span>次
    </span>
</div>
```
然后就可以查看
如果你发现数字很大，那是因为本地的测试地址大家都一样，你上传上去，打开你的域名地址就会发现从0开始了！
