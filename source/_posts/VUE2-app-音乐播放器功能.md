---
title: uniapp 音乐播放器功能
date: 2022-09-25 10:10:51
tags:
---
# uniapp 移动端的音乐播放器
## 写的原因
>这个`app`从4月份开始，做了一个星期，但中间有3个月没碰，8月末又重新拿了起来，但由于`uniapp`的多次更新，导致`app`出了问题，而且本人是刚学的vue2，3个月没碰，有些遗忘，需要重新学习才行，同时这个`app`遇到的问题有些难以处理。
>因此我想先整理出我一开始做出来的功能，以便后期如果需要重新开始，则可以把我想要的功能重新添加进去。

## 功能
**_要点_**：点击播放键可以播放音乐，切换画面后，音乐不会停止，然后在旁边出现一个mini的音乐播放器，可以随时退出。
（我并没有使用一些已经写好的player,只要是因为并不符合我所需要的要求，即只需要背景音乐可以停止和继续的功能就行）
1、需要做一个`mini`版的音乐播放器,放在页面的左边，在播放期间可以随时播放和停止。
2、由于没有页面和退出也能听到音乐，所以必须使用全局变量。 我使用了`vuex`来控制这些变量。
3、如何把上面两点写进`app`中。

### 1、播放器样式 
#### (**_注：原本想要找到我之前参考的博客，可以说这个播放器，基本上使用了那名作者的功能，当然为了结合自身app，对他写功能也进行了修改，但时隔3个多月，我已经找不到该网站了，如果该作者看到这个是你写的功能，可以和我邮件联系，我会标注_**)
页面的样式我需要做成mini型，放在各个`page`中，而不是放在最下面，因为我不是`音乐app`,所以只需要在播放期间可以停止。
因此我添加一个`component`,命名为`playermin.vue`,并把播放器的样式结构添加进去。
> tip
> 由于本人对`css`只是半吊子桶水的实力，因此这里的结构样式是直接使用了网上的播放器样式，只是对里面的功能进行了删减和添加
```html
<template>
	<view class="player-min" :class="[!isOpen?'open':'']" v-if="(isplayactive && require)">
		<image class="img" :class="[isplayingmusic ? '':'stoped']" :src="playdetail.pic" mode=""
			@click="isOpen=!isOpen"></image>
		<view class="btns" v-show="isOpen">
			<text v-if="!isplayingmusic" class="item cuIcon-playfill" @click="play"></text>
			<text v-if="isplayingmusic" class="item cuIcon-stop" @click="pause"></text>
			<text class="item cuIcon-close" @click="close"></text>
			<!-- <text class="item cuIcon-repeal" @click="toPlayPage"></text> -->
		</view>
	</view>
</template>

<script>
//引入在vuex中的全局变量，用来控制播放器，具体变量的用途，看下面vuex中的内容
	import {
		mapGetters,
		mapMutations
	} from 'vuex'
	export default {
		props: {
			require: {
				type: Boolean,
				default: true
			}
		},
        //挂载的时候输出传入的参数，用来debug
		mounted() {
			console.log(this.require)
		},
		data() {
			return {
				isOpen: false
			};
		},
        //项目中使用了多模块方式书写vuex
		computed: {
			...mapGetters('vuexMusic', ['isplayingmusic', 'playdetail', 'isplayactive', 'bgAudioManager'])

		},
		methods: {
			...mapMutations('vuexMusic', ['setIsplayingmusic', 'setPlaydetail', 'setIsplayactive', 'playAudio', 'pauseAudio', 'stopAudio']),
            //下面三个方法，对应三个按钮，分别是播放、暂停、关闭mini播放器
			play() {
				this.playAudio()
				this.setIsplayingmusic(true)
			},
			pause() {
				this.pauseAudio();
				this.setIsplayingmusic(false)
			},
			close() {
				// this.bgAudioManager.stop()
				this.stopAudio()
				this.setIsplayingmusic(false)
			}
            //这个是原作者写的打开播放列表，但我这边暂时是不需要的，所以我还没有验证过下面这段功能实际展示的效果
			// toPlayPage() {
			// 	const list = this.audiolist;
			// 	uni.navigateTo({
			// 		url: '/pages/palyer/palyer?id=' + this.playdetail.id + '&index=' + "none" + '&list=' +
			// 			encodeURIComponent(JSON.stringify(list))
			// 	})
			// }
		}
	}
</script>
<!-- 下面的样式是我直接拷贝网上别人写的，本人对scss不是很熟 -->
<style lang="scss">
	.player-min {
		// flex: 1;
		position: fixed;
		bottom: 40%;
		z-index: 1002;
		display: flex;
		align-items: center;
		background-color: rgba(0, 0, 0, 0.7);
		border-radius: 50rpx 15rpx 15rpx 50rpx;

		&.open {
			// border-radius: 45rpx;
			border-radius: 50%;
		}

		.img {
			width: 100rpx;
			height: 100rpx;
			border-radius: 50%;

			&.stoped {
				animation-play-state: paused;
			}

			animation: rotate 10s linear .1s infinite;
			// box-shadow: 0 0 20rpx;
		}

		.btns {
			height: 100rpx;
			line-height: 100rpx;
			font-size: 48rpx;
			color: #F0F0F0;
			transition: width 2.5s linear;

			.item {
				margin: 0 6rpx;
			}

			.cuIcon-playfill {
				// margin-left: 12rpx;
			}
		}
	}

	@keyframes rotate {
		0% {
			transform: rotate(0deg);
		}

		100% {
			transform: rotate(360deg);
		}

	}
</style>

```

## VUEX
`vuex`的部分，我使用了多模块的方式。
在`store`中，添加一个文件夹`modules`, 在里面添加`music.js`,然后`store/index.js`中添加引用
** `index.js`**
```js
import vuexMusic from '@/store/modules/music.js'
import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)
const store = new Vuex.Store({
	modules: {
		vuexMusic
	},
	strict: true
})
```
** `music.js`**
```js
import Vue from 'vue'
//公共变量
const state = {
	//是否正在播放 (默认false)
	isplayingmusic: false,
	//是否打开mini播放器 (默认false)
	isplayactive: false,
	//当前播放的歌曲
	playdetail: '',
	//播放歌曲列表
	audiolist: [],
	//播放器 （在mutations中进行初始化）
	bgAudioManager: '',
	//定时时间,用于背景音频播放进度更新事件目前没用）
	timer: null
}
//获取变量
const getters = {
	isplayingmusic(state) {
		return state.isplayingmusic
	},
	isplayactive(state) {
		return state.isplayactive
	},
	playdetail(state) {
		return state.playdetail;
	},
	audiolist(state) {
		return state.audiolist
	},
	bgAudioManager(state) {
		return state.bgAudioManager
	},
	timer(state) {
		return state.timer
	}
}
//mutation 直接修改state中的属性
const mutations = {
	setIsplayingmusic(state, param) {
		state.isplayingmusic = param
	},
	setIsplayactive(state, param) {
		state.isplayactive = param
	},
	setPlaydetail(state, param) {
		state.playdetail = param
	},
	setAudiolist(state, param) {
		state.audiolist = param
	},
	//播放器初始化
	setInitBgAudioManager(state, param) {
		//音乐播放器
		let audioPlayer = null;
		// #ifdef H5
		audioPlayer = uni.createInnerAudioContext() //H5 则注册一个音乐组件
		// #endif
		// #ifdef APP-PLUS
		audioPlayer = uni.getBackgroundAudioManager() //app,则注册一个背景音乐组件，当切后台后仍会播放音乐
		// #endif
		state.bgAudioManager = audioPlayer
		state.bgAudioManager.onPlay(() => {
			console.log('playing')
			Vue.prototype.cusPlay && Vue.prototype.cusPlay()
			clearInterval(state.timer)
			console.log(Vue.$store)
			console.log(this)
			this.commit('vuexMusic/setTimer', param)
		})
		// Vue.prototype.$bgAudioManager.onTimeUpdate(()=>{
		// 	console.log('update')
		// 	Vue.prototype.cusTimeUpdate && Vue.prototype.cusTimeUpdate()
		// })
		state.bgAudioManager.onEnded(() => {
			Vue.prototype.cusEnded && Vue.prototype.cusEnded()
			clearInterval(state.timer)
		})
		state.bgAudioManager.onError((err) => {
			console.log('play err:' + err)
			this.commit('vuexMusic/setIsplayactive', false)
			clearInterval(state.timer)
		})
		state.bgAudioManager.onStop((res) => {
			console.log('play stop:' + res)
			this.commit('vuexMusic/setIsplayactive', false)
			clearInterval(state.timer)
		})
	},
	//播放器歌曲相关参数赋值
	setBgAudioManager(state, param) {
		state.bgAudioManager.url = param.song;
		state.bgAudioManager.title = param.song_name;
		state.bgAudioManager.coverImgUrl = param.song_cover;
		state.bgAudioManager.singer = param.singer;
		//h5
		state.bgAudioManager.autoplay = true;
		//app
		state.bgAudioManager.src = param.song;
	},
	setTimer(state, param) {
		state.timer = setInterval(() => { //安卓和ios app 下onTimeUpdate事件在替换资源和seek之后不会触发，这里做手动触发
			console.log('update')
			Vue.prototype.cusTimeUpdate()
		}, 200)
	},
    //播放歌曲
	playAudio(state, param) {
		let playPromise = state.bgAudioManager.play()
        //如果没有存在，则播放
		if (playPromise !== undefined) {
			playPromise.then(() => {
				state.bgAudioManager.play()
			}).catch(() => {

			})
		}
		// state.bgAudioManager.play()
	},
    //暂停歌曲
	pauseAudio(state, param) {
		state.bgAudioManager.pause()
	},
    //关闭歌曲
	stopAudio(state, param) {
		state.bgAudioManager.stop()
	}

}
const actions = {
	isplayingmusicAction(context, param) {
		//调用mutations中的方法，来修改state中的
		context.commit('setIsplayingmusic', param)
	}
}

export default {
	namespaced: true,
	state,
	mutations,
	getters,
	actions
}

```
## 在项目中使用该功能
页面注册，pages.json,App.vue,music-list
** `App.vue` ** 
```js
<script>
import {
    mapMutations,
    mapGetters
} from "vuex"
export default {
    onLaunch: function() {
        //音乐播放器 注册事件函数写在vuex中
        this.setInitBgAudioManager()
    },
    methods: {
        ...mapMutations('vuexMusic', ['setInitBgAudioManager'])
    }
}
</script>
```
**`music-detail.vue`** 这个文件是音乐列表文件
```html
<template>
	<view class="container">
		<cu-custom :isBack="true" bgColor="bg-gradual-pink shadow-blur">
			<block slot="content">作品</block>
		</cu-custom>
		<scroll-view scroll-y="true" class="page-content" @scroll="scrollpage" :style="{top:customBar*2+'rpx'}">
			<uni-card :is-shadow="false" is-full>
				<view class="album-top">
					<view class="album-con">
						<view class="flex-box">
							<view class="flex-item"></view>
							<view class="img-info">
								<image class="img" :src="bgimg"></image>
							</view>
							<view class="flex-item"></view>
						</view>
						<view class="album-bot flex-box">
							<view class="flex-item"></view>
							<view class="">
								<view class="txt">{{ albumMsg.album }}</view>
							</view>
							<view class="flex-item"></view>
						</view>
					</view>
				</view>
			</uni-card>
			<uni-section overflow title="歌曲" type="line">
				<!-- <uni-card > -->
				<mu-list :list="targetMuList" :isNav="false" :cover="bgimg"></mu-list>
				<!-- </uni-card> -->
			</uni-section>
		</scroll-view>

	</view>
</template>

<script>
	// 防抖
	function debounce(fn, wait = 10) {
		var timeout = null;
		return function() {
			if (timeout !== null) clearTimeout(timeout);
			timeout = setTimeout(fn, wait);
		}
	}
	var that = null
	import muList from '@/components/musiclist.vue'
	import {
		mapGetters,
		mapMutations
	} from 'vuex'
	import Vue from 'vue'

	const db = uniCloud.database()
	export default {
		data() {
			return {
				//专辑信息
				albumMsg: [],
				//专辑封面
				bgimg: '',
				playList: [],
				scrollTop: 20,
				scrollY: 0,
				targetMuList: {},
				lyric: []
			};
		},
		components: {
			muList
		},
		computed: {
			...mapGetters('vuexMusic', ['audiolist', 'playdetail', 'bgAudioManager']),
			//歌曲列表，通过专辑信息，实时计算出来
			targetMuLis() {
				if (!this.albumMsg.album) return [];
				const par = {
					album_id: this.albumMsg._id
				};
				const t = this.album.tracks.slice(0, 25);
				return t.map(val => {
					return {
						id: val.id,
						name: val.name,
						picUrl: val.al.picUrl,
						n1: val.ar[0].name,
						n2: val.al.name
					}
				})
			},
			customBar() {
				return this.CustomBar
			}
		},
		created() {
			that = this
		},
		onLoad(options) {
			//页面加载的时候，进行数据加载
			this.getData(options.item);
			//初始化播放器参数
			this.initPlay()

		},
		methods: {
			...mapMutations('vuexMusic', ['setPlaydetail', 'setIsplayingmusic', 'setIsplayactive', 'setBgAudioManager']),
			getData(id) {
				let par = {
					_id: id
				};
				db.collection('music-album')
					.where(par).get()
					.then(res => {
						console.log("music-album", res.result.data[0])
						this.albumMsg = res.result.data[0]
						this.bgimg = this.albumMsg.album_cover
					}).catch(err => {
						console.log(err)
					})
				par = {
					album_id: id
				};
				db.collection('music-list')
					.where(par)
					.get()
					.then(res => {
						console.log("music-list", res.result.data)
						this.targetMuList = res.result.data
						// this.setAudiolist(this.targetMuList)
					})
					.catch(err => {
						console.log("music-list", err)
					})
			},
			scrollpage(e) {
				this.scrollY = e.detail.scrollTop
				this.scroll()
			},
			// 设置背景条
			scroll: debounce(() => {
				if (that.scrollY < 5) {
					that.scrollTop = 20
				} else {
					if (that.scrollY < 300) {
						that.scrollTop = -parseInt(that.scrollY) + 20
					}
				}
			}),
			goBack() { // 返回上一页
				uni.navigateBack();
			},
			initPlay(id, index) {
				// if (index) {
				// 	this.curPlayIndex = index
				// }
				Vue.prototype.cusPlay = this.onPlayFn
				Vue.prototype.cusTimeUpdate = this.onTimeUpdateFn
				Vue.prototype.cusEnded = this.onEndedFn				
			},
			playNextOrPrevSong(id) {
				console.log('#playNextOrPrevSong 歌曲ID：', id)
				//for循环对比，获取当前的
				for (let i = 0; i < this.audiolist.length; i++) {
					let item = this.audiolist[i]
					if (id == item._id) {
						this.setBgAudioManager(item)
						this.setPlaydetail({
							id: item._id,
							pic: item.song_cover
						})
						break
					}
				}
			},
			onPlayFn() {
				console.log("#onPlayFn")
				// this.playTime = this.song.time;
				// this.isPlay = true
				this.setIsplayingmusic(true)
				this.setIsplayactive(true)
				console.log('onplaying')
			},
			onTimeUpdateFn() {
				// console.log("#onTimeUpdateFn", this.$bgAudioManager.currentTime)
				const curtime = this.bgAudioManager.currentTime
				this.curPlayTime = Math.floor(curtime);

			},
			onEndedFn() {
				console.log('ended')
				// this.isPlay = false;
				this.setIsplayingmusic(false)
				this.setIsplayactive(false)
				this.next(true);
			},
			next(isAuto) {
				const index = this.getIndex('next', isAuto)
				console.log(index)
				console.log(this.audiolist)
				console.log(this.audiolist[index])
				this.playNextOrPrevSong(this.audiolist[index]._id)
			},
			getIndex(type, isAuto) {
				//['0列表循环', '1随机播放', '2单曲循环']
				let next = 0;
				let prev = 0;
				//获取当前播放列表
				const last = this.audiolist.length - 1;
				let cur = 0
				//获取当前正在播放的歌曲
				this.playdetail
				//for循环对比，获取当前的
				for (let i = 0; i < this.audiolist.length; i++) {
					let audioCur = this.audiolist[i]
					if (this.playdetail.id == audioCur._id) {
						cur = i
						break
					}
				}
				next = cur == last ? 0 : cur + 1
				//判断是上一首还是下一首
				return type == 'next' ? next : prev
			},

		}
	};
</script>

<style lang="scss" scoped>
	$bgheight: 520rpx;
	$bgtop: -44px;

	.container {
		overflow: hidden;
	}

	.nav-bar {
		position: relative;
		background-position: 0 0px;
		background-repeat: no-repeat;
		background-size: cover;
	}

	.bg {
		position: absolute;
		top: 0;
		left: 0;
		height: 100%;
		width: 100%;
		filter: blur(35px);
		background-position: 0 0px;
		background-repeat: no-repeat;
		background-size: cover;
	}

	.bg1 {
		position: absolute;
		top: 0;
		left: 0;
		height: 100%;
		width: 100%;
		background: rgba(0, 0, 0, 0.2);
		z-index: 2;
	}

	.page-content {
		position: fixed;

	}

	.album-top {
		position: relative;
		top: $bgtop;
		height: $bgheight;
		padding-top: 44px;
		overflow: hidden;
		background: #fff;

		.bg {
			background-size: 100%;
		}

		.album-con {
			position: absolute;
			width: 100%;
			padding: 46rpx 24rpx 0 30rpx;
			// padding: 46rpx 0 0 0 ;
			z-index: 10;
		}
	}

	.album-bot {
		padding-top: 42rpx;
		// color: #fff;
		text-align: center;

		.iconfont {
			font-size: 44rpx;
		}

		.txt {
			font-size: x-large;
			color: #252621;
		}
	}

	.img-info {
		position: relative;
		// width: 390rpx;
		width: 280rpx;
		height: 280rpx;
		// margin-right: 40rpx;
		border-radius: 10rpx;
		overflow: hidden;
		margin: 0, auto;

		// background-image: url('@/static/music/vinyl_03.png');
		// background-size: cover;
		// background-repeat: no-repeat;
		&:before {
			content: ' ';
			position: absolute;
			left: 0;
			top: 0;
			width: 100%;
			height: 40rpx;
			z-index: 2;
			background-image: linear-gradient(180deg, rgba(0, 0, 0, 0.2), transparent);
		}

		.img {
			width: 280rpx;
			height: 280rpx;

		}

		.count {
			position: absolute;
			top: 0;
			right: 0;
			padding-left: 25rpx;
			line-height: 34rpx;
			color: #fff;
			font-size: 24rpx;
			z-index: 10;
			background: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAMgAAADICAMAAACahl6sAAAAqFBMVEUAAAD///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////8j1z1tAAAAN3RSTlMA9wcC+/3w4A/RoQv0m4s6IBkU7eeRK73kxaZtW+rc1cmxe3UmwbiWQNmqgWZUzUY1ME4dhmGuJ2Z0kQAABVtJREFUeNrtnYtWGkEQRFsEeSmgII8EVBASUFHx1f//ZwmJRwaZYhndjdU5c//gQp8DVTvTK5FIJBKJRCKRSCQSiUQikcj/yWI6vRfzNEYz/U23NhbLlF70jZ7hr+W+pQ6FoxOxyXhP12neiEVyZd3gdiH2uFYfP0tijP2mehk8iy3miui1xRLfFHNaFTv0dAutvpihq1uZmPmp1yRqRuZLVxyol+5cLOB+9nMwZ52G8OOKSLWWVx97TzlhZ01EZDxRL8UHIcf92ZAl/ZZ6+UE+XxsiUjoF8zWinq9NEZH2BZivO+HFJyLyPFAvL4/Cil9ESkcF9XFIO19ARGRRVi9ndaHEDVPvksp38FP/7VgIQSJLTirq5fByX+jAIkvq5+rlnG++tovI/uWheqmwlUZAZMXxlXo5+M41X0DEZXqmXspUpaSuOBJAbrTq8GhLSSzi8jjUv/CWkusimLui/oa4lNxVRHLXYL5ISkmPCKLRYS4lPSIYFOovCEpJXVGRJGCoz59++XwBEci4R1pKIhFMv0VZegeL4FCfDyklGUSWoZ6vlAQiSTw32UpJN/lJMm6o5yolkUgy92WqUjJcxA31RKXkJ0RwqN+7TpwvLpFlqGcpJYNEQkL9MOtSEotcSRIo1DOU3kEigaH+bCoQShEY6vUKlpKcIjDU41IyS5EXSSY81M/q4oNXBIR6VHoTi4BQD0pJahEQ6kHpnZ3IUAIIDPWF96U3u8hGqEelJL/IWqjHpaQFERjqC0er0siECAj12c6Xm4ckRW6a20tJMyKvoR6WknZEcKgf9EXEkggO9b22LREY6pelpC0RHOq7fWMiONRPxlmJdCQLcKjPP1VtieBQX5wbE8GhvtOwJbIM9bCUtCWCQ33xzpgIDvWVXLoiE8macQck4YYxERjqy/vWRFCofzInItKeqIdxiiI9yRwc6msWRXyhfmBSxBfqFzZFNkP9g1UROVkP9TfpiVzIv6VRVodLqyLv/7D0jYps/IW8Nyni+VNfNSjii1kVSU/kVjIHB9+6ORF/FTEUYyKgHBqUjIlMZ+rjcCppipQlY47BOoNyQ0yJoEq7JmJJpH4Om1NLIieVAjzAbUgEPSjJn1YlA5FzyYj7Mn6eaEhkmTvQtRNLIjdNeBHIksjiFp+CyExkJmlT+lmA5wYsiTwP8PVFQyLti20XSs2IVE/zGZ+mwyJnkh79VsKlaxsi40niiUALIug44IF7BtiAyLyb7anZZJGipECjs9s5ZnKR3NPejifLuUUeimDBzeZUMYs0fgQ8SOcVAU/R0X2YLEW66ZXSyTfgSEUeh19+JxGIhJbSX39L1G00PlxKM9zbBSIhpTTHTWogElBKk9xt/5xIfUazAtXtZ8JLaaL9D64IX334L0Tq51w7LNySJqyUJttaA0QSp4pujxAWCS+lb9vydbiZeudSmnHXVrDITZNz+1mgyOKWdR8dEIGlNO2GwBCR5wHxzka36kgopXvUWzRdEapSOiORfot906ybTINL6RnHVHlEUCltYFtussi8++WrQtIQaXQIlreEinhLaYZ1OoEi+Z1L6R+EW9ehCC6lzyjfs4BElqU0zRKwQJHCeinNUB9+VgSX0rxvh/GJ5EagPnwifl+POryV0jT14WdEjq+I6sMPilCV0p8R2Zf6jKs+/KAIKqUH5FO1IXKght+NqCt4F3fvwtu3QL+qP4GybqFwZGKq/jBUTJnldQO78F1VbbxgJIHSHpgqivowhIp/qoiKnh05aZqfqlceiOvDMC51jRlb0bM79RZrfRhKqXb46lExOlVv5O5G19ejB/bQEYlEIpFIJBLJkF8r2nFUwcJuMQAAAABJRU5ErkJggg==) no-repeat;
			background-size: 25rpx 25rpx;
			transform: scale(0.8);
		}
	}

	.info-con {
		.title {
			margin-bottom: 14rpx;
			// color: #fff;
			line-height: 46rpx;
			font-weight: 600;
			height: auto;
			/*高度自动*/
			display: inline-block;
			/*转为行内块元素*/
			white-space: pre-wrap;
			/*处理元素内的空白,保留空白符序列，但是正常地进行换行*/
			word-wrap: break-word;
			/*允许长单词或 URL 地址换行到下一行,在长单词或 URL 地址内部进行换行*/
		}
	}

	.avator-box {
		margin-bottom: 26rpx;
		align-items: center;
		color: #ccc0ba;
		font-size: 25rpx;

		.avator {
			width: 60rpx;
			height: 60rpx;
			margin-right: 12rpx;
			border-radius: 60rpx;
		}
	}

	.desc-box {
		align-items: center;
		line-height: 40rpx;
		color: #ccc0ba;
		font-size: 23rpx;
	}

	.album-list {
		position: relative;
		top: - 84px;
		background: #fff;
		border-radius: 36rpx 36rpx 0 0;
		z-index: 100;

		.title-bar {
			padding: 10rpx;
			justify-content: space-between;

			.iconfont {
				margin-left: 16rpx;
				margin-right: 16rpx;
				font-size: 40rpx;
			}

			.play {
				line-height: 80rpx;
				color: #252621;
				font-weight: 600;
				font-size: 32rpx;
			}

			.collect {
				width: 228rpx;
				height: 80rpx;
				text-align: center;
				line-height: 80rpx;
				border-radius: 80rpx;
				color: #fff;
				background: #fb2b21;
			}
		}

		.item {
			align-items: center;
			height: 120rpx;
		}

		.con {
			padding-right: 40rpx;
			align-items: center;
			justify-content: space-between;
		}

		.num {
			width: 84rpx;
			text-align: center;
			line-height: 120rpx;
			color: #999;
			font-size: 24rpx;

			&.on {
				color: #ff3a3a;
			}
		}

		.tit {
			margin-right: 20rpx;
			color: #333;
			line-height: 48rpx;
			font-size: 32rpx;
		}

		.count {
			margin-right: 20rpx;
			color: #ccc;
			line-height: 48rpx;
			font-size: 24rpx;
			transform: scale(0.84);
		}

		.icon {
			width: 56rpx;
			height: 20rpx;
		}

		.desc {
			// color: #999;
			color: #999999;
			font-size: 24rpx;
			line-height: 40rpx;
		}
	}
</style>

```

**`musiclist.vue`** 这个文件是个组件，用在`music-detail.vue`
```html
<template>
	<view class="mulist">
		<view class="nav" v-if="isNav">
			<text class="l">{{title}}</text>
			<text class="r">{{more}}</text>
		</view>
		<view class="item" v-for="(val,index) in list" :key="index">
			<view class="flex-item index-item" style="width: 60rpx;">
				{{index+1}}
			</view>
			<view class="text ellipsis flex-box">
				<text class="name ellipsis">{{val.song_name}}</text>
			</view>
			<view class="play-btn flex-item" @click="play(index, val)">
				<view v-if="(playdetail.id==val._id && isplayingmusic==true)" class="iconfont">&#xe76a;</view>
				<view v-else class="iconfont">&#xe638;</view>
			</view>
		</view>
	</view>
</template>

<script>
	import {
		mapGetters,
		mapMutations
	} from 'vuex'
	import Vue from 'vue'
	let update = true;
	export default {
		data() {
			return {
				// isPlay: false,
			}
		},
		props: {
			title: {
				type: String,
				default: '歌曲推荐'
			},
			more: {
				type: String,
				default: '更多推荐'
			},
			list: {
				// type:Array,
				default: []
			},
			isNav: {
				type: Boolean,
				default: true
			},
			cover: {
				type: String,
				default: ''
			}

		},
		computed: {
			...mapGetters('vuexMusic', ['audiolist', 'playdetail', 'isplayingmusic', 'bgAudioManager'])
		},
		methods: {
			...mapMutations('vuexMusic', ['setAudiolist', 'setPlaydetail', 'setIsplayingmusic', 'setIsplayactive', 'setBgAudioManager', 'playAudio', 'pauseAudio']),
			// toPlayer(ele) {
			// 	uni.navigateTo({
			// animationDuration:500,
			// animationType:'fade-in',
			// 		url: '/pages/music/music-detail/palyer?id=' + ele.id + '&index=' + ele.index + '&list=' +
			// 			encodeURIComponent(JSON.stringify(ele.list))
			// 	})
			// },
			play(index, item) {
				console.log("#musicList-play", item)
				//添加当前音乐列表
				this.setAudiolist(this.list)
				//如果不是同一首歌，则重置
				if (this.bgAudioManager.src !== item.song) {
					this.setBgAudioManager(item)
					this.setPlaydetail({
						id: item._id,
						pic: item.song_cover
					})
					this.setIsplayingmusic(false)
				}
				if (this.isplayingmusic) {
					this.pauseAudio()
					this.setIsplayingmusic(false)
				} else {
					this.playAudio()
					this.setIsplayingmusic(true)
				}
				// this.isPlay = !this.isPlay;

			}
		}
	}
</script>

<style lang="scss">
	.mulist {
		padding: 0 30rpx;

		.nav {
			height: 110rpx;
			font-size: 34rpx;
			display: flex;
			padding: 30rpx 0;

			.l {
				width: 100%;
				font-weight: 600;
			}

			.r {
				flex-shrink: 0;
				padding: 0rpx 25rpx;
				height: 50rpx;
				line-height: 50rpx;
				font-size: 24rpx;
				border: 2rpx solid #e6e6e6;
				border-radius: 50rpx;
			}
		}

		.item {
			display: flex;
			align-items: center;
			margin-bottom: 15rpx;

			.img {
				height: 100rpx;
				width: 100rpx;
				border-radius: 18rpx;
			}

			.index-item {
				font-size: 34rpx;
			}

			.text {
				flex: 1;
				margin-left: 20rpx;
				;

				text {
					display: block;
				}

				.name {
					font-size: 32rpx;
					overflow: hidden;
				}

				.ar {
					font-size: 24rpx;
					overflow: hidden;

					.point {
						font-size: 40rpx;
					}
				}
			}

			.item-icon {
				margin: 0 6rpx;
			}

			.cuIcon-right {
				margin: 10rpx 6rpx;
				font-size: 34rpx;
				// color: #E7EBED;
				width: 68rpx;
				// height: 80rpx;
			}

			.play-btn {
				position: relative;
				margin: 10rpx 6rpx;
				font-size: 34rpx;

				// width: 0rpx;
				.iconfont {
					font-size: 10rpx;
					// width: 68rpx;

				}

				&::before {
					content: '';
					display: block;
					position: absolute;
					top: 50%;
					left: 50%;
					border: 2rpx solid #000000;
					width: 40rpx;
					height: 40rpx;
					border-radius: 50%;
					transform: translateX(-50%) translateY(-50%);
				}
			}
		}
	}
</style>
```
由于想要在每个页面中使用，所以我把`mini播放器`放在了页面最上方`导航栏`组件中
**`cu-custom.vue`**
```html
<template>
	<!-- 里面内容就不显示了，就把需要引用的列出来-->
    <playerMin :require="re"></playerMin>
</template>
<script>
	import playerMin from '@/components/playermin.vue'
	export default {
		components: {
			playerMin
		}
	}
</script>
```