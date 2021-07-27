---
title: 为hexo博客yilia模版添加aplayer音乐播放器
date: 2018-10-13 13:34:25
categories: [blog]
tags:
- [music,hexo]
---
属性参数可以自己查看[官方文档](https://aplayer.js.org/#/zh-Hans/)。

<!-- more -->
先下载[js和css文件](https://github.com/MoePlayer/APlayer)，如果你是hexo，可以`npm install aplayer --save`，然后把其中`dist`文件夹放到`\themes\yilia\source`中
在`\themes\yilia\layout\layout.ejs`的`body`标签下的任意位置添加下面代码
```html
<link rel="stylesheet" href="/./dist/APlayer.min.css">
<div id="aplayer" style="z-index: 99999;"></div>
<script src="/./dist/hls.min.js"></script>
<script src="/./dist/APlayer.min.js"></script>
<script src="/./dist/musicPlay.js"></script>
```
其中`id`为`aplayer`就是你要把浏览器放置的地方，样式`z-index`则是为了让播放器显示载最上面一层，而`hls.min.js`文件则可以看[文档](https://aplayer.js.org/#/zh-Hans/)。
然后再`\themes\yilia\source\dist`建立一个`js`文件，名字任意，我建的是`musicPlay.js`，在其中写下如下代码
**注意 `container`对应`id`为`aplayer`，别改了上面忘了下面。**
```js
const ap = new APlayer({
    container: document.getElementById('aplayer'),
    // mini: false,
    fixed: true,//吸底模式
    autoplay: false,//默认是否自动播放
    theme: '#FADFA3',
    loop: 'all',
    order: 'random',
    preload: 'auto',
    volume: 0.7,//默认音量
    mutex: true,//是否不允许多个播放器同时播放
    listFolded: true,//是否默认收起播放列表
    listMaxHeight: 90,//播放列表的高度
    //lrcType: 3, //使用lrc文件提供歌词
	//网易云默认外链链接：http://music.163.com/song/media/outer/url?id=ID数字.mp3
    audio: [
        {
            name: 'SURPRISE-DRIVE',
            artist: '松冈充',
            url: 'http://music.163.com/song/media/outer/url?id=29751409.mp3',
            cover: 'http://p1.music.126.net/Oo0kXusaoF9DGwjAJFeAtA==/6671836558494023.jpg',
            lrc: '/./dist/music/lrc/29751409.lrc',
            theme: '#46718b'
        },
        {
            name: 'Be The One',
            artist: 'PANDORA / Beverly',
            url: 'http://music.163.com/song/media/outer/url?id=530986958.mp3',
            cover: 'http://p1.music.126.net/91YBBcxEO37hoIfm9W5TjA==/109951163116520306.jpg',
            theme: '#46718b'
        },
		{
            name: '我ら思う、故に我ら在り',
            artist: '氣志團',
            url: 'http://music.163.com/song/media/outer/url?id=40729281.mp3',
            cover: 'http://p1.music.126.net/5kUo3f5_GyyQNiSvPOIhXA==/18610333813518047.jpg',
            theme: '#46718b'
        },
		{
            name: 'Anything Goes! (「仮面ライダーオーズ/000」)',
            artist: '大黒摩季',
            url: 'http://music.163.com/song/media/outer/url?id=38689229.mp3',
            cover: 'http://p2.music.126.net/mQxtTZ1t2ZHS8LJ4qEDLWQ==/2543170398297999.jpg',
            lrc: '/./dist/music/lrc/38689229.lrc',
	    theme: '#46718b'
        },
		{
            name: 'Break the Chain (「仮面ライダーキバ」)',
            artist: 'Tourbillon',
            url: 'http://music.163.com/song/media/outer/url?id=38689234.mp3',
            cover: 'http://p2.music.126.net/mQxtTZ1t2ZHS8LJ4qEDLWQ==/2543170398297999.jpg',
            lrc: '/./dist/music/lrc/38689234.lrc',
	    theme: '#46718b'
        },
		{
            name: 'Just Live More',
            artist: '湘南乃風',
            url: 'http://rh01.sycdn.kuwo.cn/resource/n2/99/25/305360002.mp3',
            cover: 'http://img1.kuwo.cn/star/starheads/120/82/85/3360615613.jpg',
	    lrc: '/./dist/music/lrc/湘南乃風-Just Live More.lrc',
            theme: '#46718b'
        }
    ]
});
```
其中`audio`标签下，就是我加进去的歌曲，由于我把`lrcType: 3`注释了，所以lrc歌词文件不会生效。
