<template>
	<view>
		<!-- 导航栏 -->
		<nav-bar>
			<template v-if="checkList.length===0">
				<template slot="left">
					<text class="font-md ml-3 ">好友列表</text>
				</template>
				<template slot="right">
					<view class="flex align-center justify-center bg-light rounded-circle mr-3 " style="width: 60rpx;height: 60rpx;"
					 hover-class="bg-hover-light" @tap="openAdd">
						<text class="iconfont icon-zengjia"></text>
					</view>
				</template>
			</template>
			<template v-else>
				<view slot="left" class="font-md ml-3 text-primary" @click="handleCheckAll(false)">取消</view>
				<text class="font-md font-weight-bold">已选中{{checkList.length}}个</text>
				<view slot="right" class="font-md mr-3 text-primary" @click="handleCheckAll(true)">全选</view>
			</template>
		</nav-bar>

		<!-- 列表项 -->
		<f-list v-for="(item,index) in list" :key="index" :item="item" :index="index" @click="doEvent(item)" @select="select" type="friends"></f-list>

		<!-- 底部操作条 -->
		<view v-if="checkList.length>0">
			<view style="height: 115rpx;"></view>
			<view class="flex align-stretch bg-primary text-white fixed-bottom" style="height: 115rpx;line-height: 1.5;">
				<view v-for="(item,index) in actions" :key="index" class="flex-1 flex flex-column align-center justify-center"
				 hover-class="bg-hover-primary" @click="handleBottomEvent(item)">
					<text :class="'iconfont '+item.icon"></text>
					<text class="font-sm">{{item.name}}</text>
				</view>
			</view>
		</view>

		<!-- 删除弹出层 -->
		<f-dialog ref="delDialog" title="操作">是否删除选中项？</f-dialog>
		<!-- 添加好友彈出框 -->
		<f-dialog ref="addFriendDialog" title="操作">
			<input type="text" v-model="username" class="bg-light rounded flex-1 px-2" style="height: 95rpx;" placeholder="好友账号" />
		</f-dialog>
	</view>
</template>

<script>
	import navBar from "@/components/common/nav-bar.vue"
	import fList from "@/components/common/f-list.vue"
	import fDialog from "@/components/common/f-dialog.vue"
	import uniPopup from "@/components/uni-ui/uni-popup/uni-popup.vue"
	export default {
		components: {
			navBar,
			fList,
			fDialog,
			uniPopup
		},
		data() {
			return {
				list: [],
				username: '',
				dirname: '',
				sortIndex: 0,
			}
		},
		computed: {
			// 选中列表
			checkList() {
				return this.list.filter(item => item.checked);
			},
			// 底部菜单
			actions() {
				return [{
					icon: "icon-shanchu",
					name: "删除"
				}]
			},
		},
		onLoad() {
			let dirs = uni.getStorageSync('dirs');
			if (dirs) this.dirs = JSON.parse(dirs); // 有上次的操作状态则获取
			this.getData();
		},
		methods: {
			// 获取当前用户好友信息
			getData() {
				this.$H.get("/user/getFriends", {
					token: true
				}).then(res => {
					this.list = this.formatList(res.data)
				})
			},
			// 格式化对象数据
			formatList(list) {
				// console.log(list)
				// list = JSON.parse(JSON.stringify(list))
				return list.map(item => {
					return {
						checked: false,
						...item
					}
				})
			},
			select(e) {
				this.list[e.index].checked = e.value;

			},
			// 全选/取消全选按钮
			handleCheckAll(check) {
				if (check) return this.list.forEach(item => item.checked = true);
				this.list.forEach(item => item.checked = false)
			},
			
			
			// 底部操作栏事件
			handleBottomEvent(e) {
				this.$refs.delDialog.open((close) => {
					uni.showLoading({
						title: '正在删除...',
						mask: false
					})
					let ids = (this.checkList.map(item => item.id)).join(',')
					this.$H.post('/user/delete', {
						ids
					}, {
						token: true
					}).then(res => {
						this.getData();
						uni.showToast({
							title: res.message,
							icon: 'none'
						});
						uni.hideLoading()
					}).catch(err => {
						uni.hideLoading()
					})
					close()
				})
			},
			// 右上角添加按钮
			openAdd() {
				this.$refs.addFriendDialog.open((close) => {
					if (this.username == '') {
						return uni.showToast({
							title: res.message,
							icon: "none"
						})
					}
					this.$H.post(`/user/addFriend/${this.username}`, {
						name: this.username
					}, {
						token: true
					}).then(res => {
						uni.showToast({
							title: res.message,
							icon: 'none'
						});
						this.getData()
					})
					close();
				})
			},

			// 列表点击事件
			doEvent(e) {
				uni.navigateTo({
					url: "../chat/chat"
				})
			},
		}
	}
</script>

<style>

</style>
