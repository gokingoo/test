<template>
	<div>
		<list class="list share-bg">

			<div class="align" style="position: relative; display: flex;flex-direction: column;">
				<image class="share-info" resize="cover"
					src="https://static.coolcargo.cn/public/image/applet/share_info@2x.png"></image>
				<div class="share-txt align">
					<text class="invite-code-txt">{{userData.invitor_code}}</text>
				</div>
			</div>

			
			<div class="align" style='display: flex;flex-direction: column;'>
				<image class="share-qr" resize="cover"
					src="https://static.coolcargo.cn/public/image/applet/share_qr@2x.png"></image>
			</div>
			<!-- #ifdef APP -->
			<div class="wx-contain">
				<div class="align" @click="toShare(0)">
					<image class="wx-img" resize="cover"
						src="https://static.coolcargo.cn/public/image/applet/wx_session@2x.png"></image>
					<text class="wx-txt">分享至微信</text>
				</div>
				<div class="align" style="margin-left: 100rpx;" @click="toShare(1)">
					<image class="wx-img" resize="cover"
						src="https://static.coolcargo.cn/public/image/applet/wx_timeline@2x.png"></image>
					<text class="wx-txt">分享至朋友圈</text>
				</div>
			</div>
			<!-- #endif -->
		</list>
	</div>
</template>
<script>
	import util from '../../utils/util.js'
	export default {
		data() {
			return {
				userData: {}
			}
		},
		components: {},
		methods: {
			toShare(type) {
				var self = this
				var result = bmWXShare.isInstallWXApp();
				if (!result) {
					self.$notice.toast({
						message: '还未安装微信'
					});
					return;
				};
				var platform = 'WechatSession';
				var shareContent = '注册时输入我的邀请码' + self.userData.invitor_code + '，可得200元券。';
				var title = '酷享出行-您的私家车库';
				if (type == 0) {
					platform = 'WechatSession';
					title = '酷享出行-您的私家车库';
				} else {
					platform = 'WechatTimeLine';
					title = '酷享出行-注册输邀请码' + self.userData.invitor_code + '可得200元券';
				}

				bmWXShare.share({
					title: title, // 分享的标题
					content: shareContent, // 分享的文字内容
					url: 'http://www.coolcargo.cn/download.html', // 分享对应的URL地址，如h5、音乐链接、视频链接、小程序的链接
					image: 'https://mmbiz.qlogo.cn/mmbiz_png/QOEtur5GFt57ztIpZ1SvBKQpib4MxuH8XLKE7KuYzAGcXCC2juCwibP8Oq133n9UQPrenoWElKNPGT92WVmt6AGg/0?wx_fmt=png', // 分享的图片url
					shareType: 'Webpage', // 分享的类型
					platform: platform // 分享平台 朋友圈/好友（注意：历史版本的字段名是platforms,现在是一个字符串而不是数组）
				}, function(resData) { // 注意： 历史版本返回的是一个promise对象，现在的是callback回调
					// 成功回调
					if (resData.status == 0) {
						uni.showToast({
							title: '分享成功',
							icon: 'success'
						});
					} else {
						uni.showToast({
							title: '分享失败',
							icon: 'error'
						});
					}
				}, function(resData) {
					// 失败回调
					uni.showToast({
						title: '分享失败',
						icon: 'error'
					});
				})
			}
		},
		created() {
			if (uni.getStorageSync('user_info')) {
				this.userData = uni.getStorageSync('user_info');
			}
		}

	};
</script>
<style lang="scss" scoped>
	.share-bg {
		background-color: #fff7d6;
	}

	.share-info {
		width: 750rpx;
		height: 737rpx;
	}

	.share-qr {
		margin-top: 10rpx;
		width: 467rpx;
		height: 353rpx;
	}

	.share-txt {
		position: absolute;
		top: 600rpx;
		left: 315rpx;
		right: 0;
	}

	.invite-code-txt {
		font-size: 45rpx;
		color: black;
		font-weight: bold;
	}

	.wx-contain {
		margin-top: 20rpx;
		margin-bottom: 50rpx;
		flex-direction: row;
		display: flex;
		// flex-direction: column;
		align-items: center;
		justify-content: center;
	}

	.wx-img {
		margin-left: 12px;
		width: 91rpx;
		height: 91rpx;
	}

	.wx-txt {
		display: flex;
		margin-top: 10rpx;
		color: #bba886;
		font-size: 24rpx;
	}
</style>
