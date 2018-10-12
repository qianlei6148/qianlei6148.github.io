const ap = new APlayer({
    container: document.getElementById('aplayer'),
    // mini: false,
	fixed: true,
    autoplay: false,
    theme: '#FADFA3',
    loop: 'all',
    order: 'random',
    preload: 'auto',
    volume: 0.7,
    mutex: true,
    listFolded: false,
    listMaxHeight: 90,
    // lrcType: 3,
    audio: [
        // {
            // name: 'name1',
            // artist: 'artist1',
            // url: 'url1.mp3',
            // cover: 'cover1.jpg',
            // lrc: 'lrc1.lrc',
            // theme: '#ebd0c2'
        // },
        // {
            // name: 'name2',
            // artist: 'artist2',
            // url: 'url2.mp3',
            // cover: 'cover2.jpg',
            // lrc: 'lrc2.lrc',
            // theme: '#46718b'
        // },
		{ 
			name: "够爱", 
			artist: '曾沛慈', 
			url: '/./dist/music/曾沛慈 - 够爱.mp3', 
			cover: 'http://oeff2vktt.bkt.clouddn.com/image/84.jpg'
			// type: 'hls'
		}
		// {
			// name: 'あっちゅ～ま青春!',
			// artist: '七森中☆ごらく部',
			// url: 'https://moeplayer.b0.upaiyun.com/aplayer/yuruyuri.mp3',
			// cover: 'https://moeplayer.b0.upaiyun.com/aplayer/yuruyuri.jpg'
		// }

    ]
});
