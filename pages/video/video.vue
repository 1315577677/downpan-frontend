<template>
	<!-- 视频播放页 -->
	<view style="height: 100vh;">
		<video :src="url"  controls style="width: 750rpx;height: 100vh;" @ended="back"></video>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				url: 'http://127.0.0.1:8888/file/getFile/123.mp4'
			}
		},
		// onLoad(e) {
		// 	if (!e.url) {
		// 		uni.showToast({
		// 			title: '参数非法',
		// 			icon: 'none'
		// 		});
		// 		return this.back()
		// 	}
		// 	this.url = e.url;
		// 	if (e.title) {
		// 		uni.setNavigationBarTitle({
		// 			title: e.title
		// 		})
		// 	}
		// },
		methods: {
			back() {
				uni.navigateBack({
					delta: 1
				})
			}
		}
	}
</script>

<style>

</style>
