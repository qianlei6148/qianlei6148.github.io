---
title: hexo模版yilia添加可爱的看板娘
date: 2018-10-11 22:04:05
categories: [blog]
tags:
- [hexo,Live2D]
- yilia
---
我使用了[Live2D](https://github.com/EYHN/hexo-helper-live2d/)， 来展现我的宠物。
首先说明我并没有直接`npm install`，而是直接在代码中添加。如果像直接简单的操作可以查看[使用文档](https://github.com/EYHN/hexo-helper-live2d/blob/master/README.zh-CN.md)来进行安装，文档很详细了。
<!-- more -->
![显示效果](https://i.loli.net/2018/10/11/5bbf5bc4cd29a.png)
由于yilia模版比较紧凑，所以一个小小的半透明的小宠物相对来说则比较好些，至于其他一些看板娘或者其他对话之类的功能的，就不在我考虑内了。其他model可以看，[其他大佬的作品](https://github.com/xiazeyu/live2d-widget-models)，[看板娘换衣play](https://www.fghrsh.net/post/123.html)，[猫与向日葵-血小板model](https://imjad.cn/)，详细教程的[猫与向日葵](https://imjad.cn/archives/lab/add-dynamic-poster-girl-with-live2d-to-your-blog-02)，和修改了详细的变的容易看懂的[后宫学长](https://haremu.com/p/205)唉反正网上很多，自己搜吧。
接下来是我自己的：
在`\themes\yilia\layout\layout.ejs`中添加，随便填在哪里，看自己的，我是直接放在body下面一行
```html
<div id="live2d-widget">
		<canvas id="live2dcanvas" width="300" height="600" style="position: fixed; opacity: 0.7; 
			right: 0px; bottom: -20px; z-index: 99999; pointer-events: none; border: 1px dashed rgb(204, 204, 204);">
		</canvas>
  </div>
```
然后在`\themes\yilia\layout\_partial\head.ejs`中添加`js`
```js
<script src="https://cdn.jsdelivr.net/npm/live2d-widget@3.x/lib/L2Dwidget.min.js"></script>
<script type="text/javascript">
    L2Dwidget.init({
		  model: {
			jsonPath: '/./packages/live2d-widget-model-wanko/assets/wanko.model.json',			
			scale: 1,
			hHeadPos: 0.5,
			vHeadPos: 0.618,
			myDefine: []
		  },
		  display: {
			superSample: 2,
			width: 100,
			height: 200,
			position: 'right',
			hOffset: 0,
			vOffset: -20
		  },
		  mobile: {
			show: true,
			scale: 0.5,
			motion: true
		  },
		  name: {
			canvas: 'live2dcanvas',
			div: 'live2d-widget'
		  },
		  react: {
			opacityDefault: 0.7,
			opacityOnHover: 0.2
			
		  },
		  dev: {
			log: false,
			border: false,
			mouseLog: false
			
		  }
		});
</script>
```
我是直接把model下载下来放在我的本地的，所以`jsonPath: '/./packages/live2d-widget-model-wanko/assets/wanko.model.json'`里面的路径直接加的是我本地下载好的model。
OK！就是显示一个宠物，其实我挺喜欢这么小狗的，哈哈~~
------------------------------------------------------------------------------------------------
2021.7.16 添加
```
提示报错：live2d tag detected, but won't be use. Make sure 'tagMode' config is expected. See #36, #122
解决：
如果您想使用最近的注入模式(将会在每个页面上显示):
请从 layout/layout.ejs 或 layout/_layout.swig 中删掉 前的 {{ live2d() }} 或 <%- live2d() %>.

如果您想使用旧的标签模式(仅替换 live2d 标签):
请保留{{ live2d() }} 或 <%- live2d() %>, 并将 tagMode 设置为 true.
```





