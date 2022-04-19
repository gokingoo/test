<template>
	<view>
		<view class="border-black flex-row align header">
			<image v-if="!userData.user_id " class="header-photo" resize="cover"
				src="https://static.coolcargo.cn/public/image/applet/head_unlogin@2x.png"></image>
			<image v-if="userData.user_id " class="header-photo" resize="cover" :src="HeadLoginImage"></image>
			<view style="margin-left: 30rpx">
				<view v-if="userData.user_id " class="flex-row align">
					<text class="mobile-txt">{{userData.user_name}}</text>
					<image class="vip-img" :src="vipImg" />
					<text class="vip-text" :style="vipColor">{{userData.level_name}}</text>
					<!-- <text class="vip-text"  >{{userData.user_name}}</text> -->
				</view>
				<view v-if="userData.user_id " class="flex-row" style="margin-top: 10rpx">
					<text v-if="userData.user_state==0" class="btn-non-authen" @click="toAuth">未认证</text>
					<text v-if="userData.user_state==1 || userData.user_state==2 " class="btn-authen"
						@click="toAuth">已认证</text>
					<text v-if="userData.user_state==3" class="btn-non-authen">冻结</text>
					<text class="btn-authen" style="margin-left: 15rpx" @click="toIncome">现金账户 ￥{{userData.cash}}</text>
				</view>

				<!-- #ifdef MP-WEIXIN -->
				<button v-if="!userData.user_id " class="mobile-txt" style="background-color:transparent;border:none"
					open-type="getPhoneNumber" @getphonenumber="onGetPhoneNumber">登录/注册</button>
				<!-- #endif -->

				<!-- #ifdef APP -->
				<text v-if="!userData.user_id " class="mobile-txt" @click="toLoginapp">点击登录</text>
				<!-- #endif -->

			</view>
		</view>
		<div class="border-contain flex-row " style="padding: 50rpx;margin-left: 15rpx;margin-right:15rpx ">
			<div class="flex1 align" style="display: flex;flex-direction: column;" @click="toShare">
				<image class="share-img" src="https://static.coolcargo.cn/public/image/applet/share_img@2x.png" />
				<text class="text-black">分享有礼</text>
				<text class="text-yellow">赠200元券</text>
			</div>
			<div style="width: 1px;height:150rpx;background-color: #cccccc"></div>
			<div class="flex1 align" style="display: flex;flex-direction: column;" @click="toWallet">
				<image class="share-img" src="/static/images/wallet_img@2x.png" />
				<text class="text-black">我的钱包</text>
				<text class="text-yellow">储值享折扣</text>
			</div>
		</div>
		<view class="border-contain" style="margin: 15rpx">
			<view class="flex-row align" style="padding: 30rpx" @click="toOrder">
				<image class="share-img" src="https://static.coolcargo.cn/public/image/applet/order_img@2x.png" />
				<text class="flex1 text-black" style="margin-left: 10px;">我的订单</text>
				<image class="point-right" src="https://static.coolcargo.cn/public/image/applet/point_right@2x.png" />
			</view>
			<view style="width: 650px;height:1px;background-color: #cccccc;margin-left: 0rpx"></view>
			<view class="flex-row align" style="padding: 30rpx" @click="toInvoice">
				<image class="share-img" src="https://static.coolcargo.cn/public/image/applet/invoice_img@2x.png" />
				<text class="flex1 text-black" style="margin-left: 10px;">申请发票</text>
				<image class="point-right" src="https://static.coolcargo.cn/public/image/applet/point_right@2x.png" />
			</view>
		</view>
		<view class="border-contain flex-row align" style="padding: 30rpx;margin-left: 6rpx;margin-right: 15rpx"
			@click="toContact">
			<image class="phone-img" src="/static/images/phone_img@2x.png" />
			<text class="flex1 text-black" style="margin-left: 10px;">联系我们</text>
			<image class="point-right" src="https://static.coolcargo.cn/public/image/applet/point_right@2x.png" />
		</view>
		<view class="border-contain flex-row align" style="padding: 30rpx;margin:15rpx" @click="toSetting">
			<image class="share-img" src="/static/images/setting_img@2x.png" />
			<text class="flex1 text-black" style="margin-left: 10px;">设置</text>
			<image class="point-right" src="https://static.coolcargo.cn/public/image/applet/point_right@2x.png" />
		</view>
		<view v-if="userData.user_id" class="border-contain flex-row align" style="padding: 30rpx;margin:15rpx"
			@click="quit">
			<image class="share-img" src="/static/images/quit@2x.png" />
			<text class="flex1 text-black" style="margin-left: 10px;">退出</text>
			<image class="point-right" src="https://static.coolcargo.cn/public/image/applet/point_right@2x.png" />
		</view>
		<popup ref="mapState" :showPopup="isagree" protocolPath="../setting/protocol" policyPath="../setting/privacy"
			@popupState="popupState"></popup>
	</view>
	</view>
	</view>

</template>

<script>
	import popup from '@/components/DuDu-popup/DuDu-popup.vue'
	import util from '../../utils/util.js'
	import {
		get,
		post
	} from '../../utils/netUtil.js'
	export default {
		data() {
			return {
				isagree: true,
				code: '',
				HeadLoginImage: "https://static.coolcargo.cn/public/image/applet/head_login@2x.png",
				rightImage: "https://static.coolcargo.cn/public/image/applet/msg_img@2x.png",
				vipImg: 'https://static.coolcargo.cn/public/image/applet/vip_comm@2x.png',
				vipColor: {
					color: '#d3a316'
				},
				userData: {},
				curHomeBackTriggerTimes: 1,
				maxHomeBackTriggerTimes: 2,
			}
		},
		components: {
			popup
		},
		methods: {
			get_accesstoken() {
				const self = this;
				let dict = {
					code: self.code,
				}
				post('/user', dict).then(res => {
					if (res.result == 0) {
						uni.showToast({
							title: '登录成功',
							icon: 'success',
						})
					}
					uni.showToast({
						title: res.message,
						icon: "none"
					})
					res.user_level = 3;
					uni.setStorageSync('user_mobile', res.user_mobile);
					uni.setStorageSync('user_id', res.user_id);
					uni.setStorageSync('user_token', res.user_token);
					uni.setStorageSync('user_info', res);
					this.getUserData();
				})
			},
			onGetPhoneNumber(e) {
				if (e.detail.code) {
					//发起网络请求
					this.code = e.detail.code
					this.get_accesstoken()
				} else {
					uni.showToast({
						title: '授权失败',
						icon: 'none'
					})
					return

				}
			},
			// rightClick() {
			// 	this.$router.open({
			// 		name: 'msg',
			// 		type: 'PUSH'
			// 	})
			// },
			toContact() {
				const self = this;
				uni.showModal({
					title: '提示',
					content: '是否需要联系客服？',
					confirmText: '确认',
					cancelTitle: '取消',
					success: function(res) {
						// 点击确认按钮的回调
						if (res.confirm) {
							uni.makePhoneCall({
								phoneNumber: '4008204770'
							});
						} else if (res.cancel) {
							// 点击取消按钮的回调
						}

					},
				})
			},
			toSetting() {
				var userId = this.userData.user_id
				uni.navigateTo({
					url: `../setting/setting?user_id=${userId}`,

				})
			},
			tologin() {
				uni.navigateTo({
					url: './login',
				})
			},
			toLoginapp() {
				uni.navigateTo({
					url: './applogin',
				})
			},


			toWallet() {
				if (util.isLogin())
					uni.navigateTo({
						url: 'wallet/wallet'
					})
			},
			toOrder() {
				if (util.isLogin())
					uni.navigateTo({
						url: '../order/myorder'
					})
			},
			toInvoice() {
				if (util.isLogin())
					uni.navigateTo({
						url: '../invoice/invoiceChoose'
					})
			},
			toIncome() {
				if (util.isLogin())
					uni.navigateTo({
						url: `./wallet/incomeDetail?type=${0}`
					})
			},
			toAuth() {
				if (util.isLogin())
					uni.navigateTo({
						url: '../auth/auth'
					})
			},
			quit() {
				var self = this
				uni.showModal({
					content: "确认退出当前账号？",
					cancelText: "取消",
					cancelColor: "#cccccc",
					confirmText: "确定",
					confirmColor: "#d3a316",
					success(res) {
						if (res.confirm) {
							uni.removeStorageSync('user_id');
							uni.removeStorageSync('user_token');
							uni.removeStorageSync('user_mobile');
							uni.removeStorageSync('user_info');
							self.userData = {};
							self.getUserData();
							wx.exitMiniProgram()
						} else if (res.cancel) {
							return
						}
					}
				})
			},
			getUserData() {
				var userId = uni.getStorageSync('user_id');
				var token = uni.getStorageSync('user_token');
				if (!userId || !token) {
					this.userData = {};
					return;
				}

				var dict = {
					user_id: userId,
					user_token: token
				}
				get('/user/data', dict).then(res => {
					this.userData = res;
					this.setVipImg();
					uni.setStorageSync('user_info', res);
				})

			},
			setVipImg() {
				if (this.userData.user_level == 1) {
					this.vipImg = 'https://static.coolcargo.cn/public/image/applet/vip_comm@2x.png';
					this.vipColor = {
						color: '#dda76f'
					}
				} else if (this.userData.user_level == 2) {
					this.vipImg = 'https://static.coolcargo.cn/public/image/applet/vip_gold@2x.png';
					this.vipColor = {
						color: '#f5ea89'
					}
				} else if (this.userData.user_level == 3) {
					this.vipImg = 'https://static.coolcargo.cn/public/image/applet/vip_plat@2x.png';
					this.vipColor = {
						color: '#c2c2c2'
					}
				} else if (this.userData.user_level == 4) {
					this.vipImg = 'https://static.coolcargo.cn/public/image/applet/vip_diamond@2x.png';
					this.vipColor = {
						color: '#568fcd'
					}
				}
			},
			toShare() {
				if (util.isLogin())
					uni.navigateTo({
						url: './share'
					})
			},


			// change_name(){
			//      this.$router.open({
			//         name: 'changename',
			//         params:{
			//             user_name:this.userData.user_name,
			//             user_id:this.userData.user_id,
			//             user_token:this.userData.user_token
			//             },
			//         type: 'PUSH'
			//     })
			// },
			// change_header_photo(){
			//     this.$router.open({
			//         name: 'changephoto',
			//         params:{
			//             HeadLoginImage:this.HeadLoginImage,
			//             user_token:this.userData.user_token,
			//             user_id:this.userData.user_id
			//             },
			//         type: 'PUSH'
			//     })
			// }
			popupState(e) { //e->false取消 true确认
				//  (e)
				if (e == true) {
					uni.setStorageSync('isagree', 1)
					this.isagree = false
				}
			}

		},

		onShow() {
			this.getUserData();
		},
		onPullDownRefresh() {
			var self = this;
			self.getUserData();
			setTimeout(function() {
				uni.stopPullDownRefresh();
			}, 500);
		},
		onLoad() {
			var isagr = uni.getStorageSync('isagree')
			if (isagr == 1) {
				this.isagree = false
			}
			const self = this
			uni.$on('islogin', function(data) {
				if (data || data == 1) {
					self.getUserData();
				}

			})			
		}

	}
</script>

<style lang="scss">
	.header {
		height: 120rpx;
		padding: 40rpx 30rpx;
		margin: 15rpx
	}

	.btn-authen {
		background-color: #5e5e5e;
		font-size: 24rpx;
		padding: 0 20rpx;
		line-height: 50rpx;
		border-width: 1rpx;
		border-color: #ffffff;
		border-radius: 50rpx;
		color: #ffffff;
	}

	.btn-non-authen {
		background-color: #b4b4b4;
		font-size: 24rpx;
		padding: 0 20rpx;
		line-height: 50rpx;
		border-width: 1rpx;
		border-color: #ffffff;
		border-radius: 50rpx;
		color: #ffffff;
	}

	.mobile-txt {
		color: #ffffff;
		font-size: 30rpx;
	}

	.share-img {
		width: 35rpx;
		height: 35rpx;
	}

	.phone-img {
		width: 45rpx;
		height: 32rpx;
		margin: 1px;
	}

	.vip-img {
		width: 40rpx;
		height: 25rpx;
		margin-left: 10rpx;
	}

	.isagree {
		background-color: #007AFF;
		position: absolute;
		width: 300rpx;
		height: 500rpx;
	}
</style>
