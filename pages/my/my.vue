<template>
	<view>
		<view class="p-3 flex align-center">
			<image :src="user.imgUrl" class="rounded-circle flex-shrink mr-3" style="width: 120rpx;height: 120rpx;"></image>
			<view class="flex-1 flex flex-column text-muted font">
				<view class="flex align-end">
					<text class="font-lg text-dark mr-2">{{user.name}}</text>
					<text class="font-md pb-0">{{user.sex}}</text>
				</view>
				<text class="text-ellipsis">{{user.username}}</text>
			</view>
		</view>
		<view class="f-divider"></view>
		<view class="p-3">
			<progress class="mb-3" :percent="progress" active stroke-width="4" />
			<view class="flex align-center justify-between font">
				<text class="text-light-muted">总:{{user.capacity |bytesToSize}}</text>
				<text class="text-warning">已用:{{user.used |bytesToSize}}</text>
			</view>
		</view>
		<view class="f-divider"></view>
		<navigator url="../setting/setting">
			<uni-list-item title="其他设置"></uni-list-item>
		</navigator>
	</view>
</template>

<script>
	import uniListItem from '@/components/uni-ui/uni-list-item/uni-list-item.vue';
	import {
		mapState
	} from "vuex"
	export default {
		components: {
			uniListItem
		},
		data() {
			return {

			}
		},
		computed: {
			// ...mapState({
			// 	user: state => state.user
			// }),
			user(){
				this.$store.state.user.url = this.$store.state.user.url? this.$store.state.user.url:'/static/14.jpg'
				console.log(this.$store.state)
				return this.$store.state.user
			},
			progress() {
				console.log(this.user)
				if (this.user.capacity === 0) return 0;
				return (this.user.used / this.user.capacity) * 100
			}
		},
		filters: {
			bytesToSize(bytes) {
				if (bytes === 0) return '0 kb';
				var k = 1024,
					sizes = ['byte','KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'],
					i = Math.floor(Math.log(bytes) / Math.log(k));
				return (bytes / Math.pow(k, i)).toPrecision(3) + ' ' + sizes[i]
			}
		},
		onShow() {
			this.getSize()
		},
		methods: {
			getSize() {
				this.$H.get('/user/getUserInfo', {
					token: true
				}).then(res => {
					this.$store.dispatch('updateInfo', res)
				})
			}
		}
	}
</script>

<style>

</style>
