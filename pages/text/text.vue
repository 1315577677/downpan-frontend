<template>
	<!-- 视频播放页 -->
	<view style="height: 100vh;">
		<div style="width: 750rpx;height: 100vh;">{{text}}</div>
	</view>
</template>
<script>
	import { webUrl } from '../../common/lib/config.js'
	export default {
		data() {
			return {
				url: "",
				text:""
			}
		},
		onLoad(e) {
			if (!e.url) {
				uni.showToast({
					title: '参数非法',
					icon: 'none'
				});
				return this.back()
			}
			this.url = e.url;
			if (e.title) {
				uni.setNavigationBarTitle({
					title: e.title
				})
			}
			console.log(e.url)
			// let index = e.url.split(webUrl)[1]
			let splitArr = e.url.split('/')
			let url = (splitArr.slice(3)).join('/')
			let getUrl = '/'+ url
			this.$H.get(getUrl).then(res=>{
				this.text = res
			})
		},
		methods: {
			back() {
				uni.navigateBack({
					delta: 1
				})
			}
		}
	}
</script>
