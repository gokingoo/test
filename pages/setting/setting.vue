<template>
	<div class="align">
		<list class="list">
			<cell class="cell">
				<!-- #ifdef APP -->
				<div class="border-contain flex-row align" style="padding: 30rpx;margin-top: 20rpx;" @click="toLogin">
					<text class="flex1 text-black">切换账号</text>
					<image class="point-right" src="https://static.coolcargo.cn/public/image/applet/point_right@2x.png" />
				</div>
				<!-- #endif -->

				<div class="border-contain" style="margin-top: 10rpx;">
					<div class="flex-row align" style="padding: 30rpx" @click="toPrivacy">
						<text class="flex1 text-black">隐私政策</text>
						<image class="point-right" src="https://static.coolcargo.cn/public/image/applet/point_right@2x.png" />
					</div>
					<div style="height:1rpx;background-color: #cccccc;margin-left: 30rpx"></div>
					<div class="flex-row align" style="padding: 30rpx" @click="toProtocol">
						<text class="flex1 text-black">用户协议</text>
						<image class="point-right" src="https://static.coolcargo.cn/public/image/applet/point_right@2x.png" />
					</div>
				</div>
				<div class="border-contain" style="margin-top: 10rpx ">
					<div class="flex-row align" style="padding: 30rpx" @click="toFqa">
						<text class="flex1 text-black">常见问题</text>
						<image class="point-right" src="https://static.coolcargo.cn/public/image/applet/point_right@2x.png" />
					</div>
					<div style="height:1rpx;background-color: #cccccc;margin-left: 30rpx"></div>
					<div class="flex-row align" style="padding: 30rpx" @click="toAbout">
						<text class="flex1 text-black">关于我们</text>
						<image class="point-right" src="https://static.coolcargo.cn/public/image/applet/point_right@2x.png" />
					</div>
				</div>
				<!-- #ifdef APP -->
				<div class="border-contain flex-row align" style="padding: 30rpx;margin-top: 10rpx"
					@click="updateClick">
					<text class="flex1 text-black">版本号</text>
					<text class="text-black">{{version}}</text>
				</div>
				<!-- #endif -->

				<div v-if="userId" class="border-contain flex-row align" style="padding: 30rpx;margin-top: 10rpx">
					<div class="flex1">
						<text style="color: #333333;font-size: 28rpx">消息通知</text>
						<text class="tag-text">关闭后，可能错过重要通知</text>
					</div>
					<image v-if="needNotice" class="check-img" src="/static/images/radio_yes@2x.png"
						@click="checkClick()" />
					<image v-if="!needNotice" class="check-img" src="/static/images/radio_no@2x.png"
						@click="checkClick()" />
				</div>

				<div v-if="userId" class="border-contain flex-row align" style="padding: 30rpx;margin-top: 10rpx;"
					@click="toloGout">
					<div class="flex1">
						<text class="flex1 text-black">注销账号</text>
						<text class="tag-text">操作后账号信息将无法恢复，请谨慎操作</text>
					</div>
					<image class="point-right" src="https://static.coolcargo.cn/public/image/applet/point_right@2x.png" />
				</div>
			</cell>
		</list>
		<view style='display: flex;flex-direction: column;text-align: center;margin: 120rpx'>
			<text class="text-gray">copyright @ 2018-2022</text>
			<text class="text-gray">酷享出行 版权所有</text>
		</view>

	</div>
</template>
<script>
	import util from '../../utils/util.js'
	export default {
		data() {
			return {
				newVersion: '0',
				oldVersion: '1',
				needNotice: true,
				userId:0,
			}
		},
		components: {},
		methods: {
			toLogin() {
				uni.navigateTo({
					url: '../user/applogin'
				})
			},
			toloGout() {
				uni.navigateTo({
					url: './logout'
				})
			},
			toPrivacy() {
				uni.navigateTo({
					url: './privacy'
				})
			},
			toProtocol() {
				uni.navigateTo({
					url: './protocol'
				})
			},
			toFqa() {
				uni.navigateTo({
					url: './fqa'
				})
			},
			toAbout() {
				uni.navigateTo({
					url: './about'
				})
			},
			// },
			// updateClick() {
			// 	const self = this;
			// 	if (parseInt(self.newVersion) > parseInt(self.oldVersion)) {
			// 		update.getIsDownloading(function(data) {
			// 			if (data == 0) {
			// 				var url = self.$storage.getSync('download_url');
			// 				var comment = self.$storage.getSync('version_comment');
			// 				var force = self.$storage.getSync('force_update');
			// 				update.update(url, comment, self.newVersion, force);
			// 			} else {
			// 				self.$notice.toast({
			// 					message: '正在下载中...请稍候'
			// 				});
			// 			}
			// 		});

			// 	} else {
			// 		self.$notice.toast({
			// 			message: '当前已是最新版本'
			// 		});
			// 	}
			// },

			checkClick() {
				if (!this.needNotice)
					this.needNotice = true;
				else {
					uni.showModal({
						title: '关闭消息通知',
						content: '关闭后，您将不会收到任何新消息，可能错过重要通知，建议您不要关闭。',
						confirmText: '仍要关闭',
						cancelText: '我再想想',
						success: function(res) {
							// 点击确认按钮的回调 
							if (res.confirm) {
								this.needNotice = false;
							} else if (res.cancel) {
								// 点击取消按钮的回调
							}
						}.bind(this)
					})
				}
			}
		},
		onLoad(data){
			if(data.user_id!='undefined'){
				this.userId = data.user_id
			}
			
		},
		created() {
		}
	};
</script>
<style lang="scss" scoped>
	.tag-text {
		display: flex;
		flex-direction: column;
		height: 32rpx;
		line-height: 32rpx;
		font-size: 22rpx;
		color: #808080
	}

	.line {
		width: 1px;
		height: 80rpx;
		background-color: #cccccc;
	}

	.confim1 {
		width: 300rpx;
		height: 80rpx;
		font-size: 28rpx;
		text-align: center;
		color: #ff6005;
		line-height: 80rpx;
	}

	.confim {
		width: 300rpx;
		height: 80rpx;
		font-size: 28rpx;
		text-align: center;
		color: #333333;
		line-height: 80rpx;
	}
</style>
