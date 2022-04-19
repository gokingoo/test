<template>
	<div>
		<list class="list">
			<cell class="cell">
				<div class="income-bg margin-top20">
					<text style="font-size: 25rpx;color: #ffffff">需支付（元）</text>
					<div style="margin-top: 20rpx;">
						<text class="price">{{orderAmount}}</text>
					</div>
					<div class="flex-row" style="margin-top: 30rpx" @click="toChargeDetail">
						<text style="font-size: 25rpx;color: #999999">收费明细</text>
						<image class="point-right margin-left20"
							src="https://static.coolcargo.cn/public/image/applet/point_right@2x.png" />
					</div>
				</div>
			</cell>
			<cell class="cell">
				<div class="border-contain" style="margin-top: 50rpx">
					<!-- #ifdef APP -->
					<div class="flex-row align" @click="payChoose(0)">
						<image class="ali-img"
							src="https://static.coolcargo.cn/public/image/applet/ali_pay_img@2x.png" />
						<text class="text-black" style="width: 520rpx;font-size: 25rpx">支付宝</text>
						<image v-if="aliChoose" class="radio-img" src="/static/images/radio_checked@2x.png" />
						<image v-if="!aliChoose" class="radio-img"
							src="https://static.coolcargo.cn/public/image/applet/radio_unchecked@2x.png" />
					</div>
					<div class="line-gray"></div>
					<!-- #endif -->

					<div class="flex-row align" @click="payChoose(1)">
						<image class="ali-img"
							src="https://static.coolcargo.cn/public/image/applet/wx_pay_img@2x.png" />
						<text class="text-black" style="width: 520rpx;font-size: 25rpx">微信支付</text>
						<!-- #ifdef APP -->
						<image v-if="wxChoose" class="radio-img" src="/static/images/radio_checked@2x.png" />
						<image v-if="!wxChoose" class="radio-img"
							src="https://static.coolcargo.cn/public/image/applet/radio_unchecked@2x.png" />
						<!-- #endif -->

					</div>
				</div>
			</cell>
		</list>
		<!-- #ifdef APP -->
		<view class="btn" @click="postToPay">确认支付</view>
		<!-- #endif -->
		<!-- #ifdef MP-WEIXIN -->
		<view class="btn" @click="postToxcPay">确认支付</view>
		<!-- #endif -->

	</div>
</template>
<script>
	import {
		post,
		get
	} from '../../utils/netUtil.js'
	import {
		utilFunc
	} from '../../utils/util.js'
	export default {
		data() {
			return {
				orderData: {},
				orderId: 0,
				orderAmount: 0,
				payType: 0,
				aliChoose: false,
				wxChoose: true,
				payMethod: 2,
				code: '',
			}
		},
		components: {

		},
		computed: {

		},
		methods: {
			// plateCheck() {
			// 	this.hasPlate = !this.hasPlate;
			// },
			// payChoose(type) {
			// 	if (type == 0) {
			// 		this.aliChoose = true;
			// 		this.wxChoose = false;
			// 		this.payMethod = 2;
			// 	} else {
			// 		this.aliChoose = false;
			// 		this.wxChoose = true;
			// 		this.payMethod = 3;
			// 	}
			// },
			// #ifdef APP
			// postToPay() {
			// 	if (this.wxChoose) {
			// 		var result = plus.runtime.isApplicationExist({
			// 			pname: 'com.tencent.mm',
			// 			action: 'weixin://'
			// 		});
			// 		if (!result) {
			// 			uni.showToast({
			// 				title: '还未安装微信',
			// 				icon: 'error'
			// 			})
			// 			return;
			// 		}
			// 	}
			// 	var userId = uni.getStorageSync('user_id');
			// 	var token = uni.getStorageSync('user_token');
			// 	if (!userId || !token) {
			// 		return;
			// 	}
			// 	var dict = {
			// 		user_id: userId,
			// 		user_token: token,
			// 		pay_type: this.payType,
			// 		order_id: this.orderId,
			// 		amount: this.orderAmount,
			// 		pay_method: this.payMethod,
			// 	}
			// 	console.log(this.payMethod)
			// 	post('/pay', dict).then(res => {
			// 		console.log(res)
			// 		if (this.payMethod == 2)
			// 			this.toAliPay(res);
			// 		else if (this.payMethod == 3) {
			// 			this.toWxPay(res);
			// 		}
			// 	})
			// },
			// #endif
			// #ifdef MP-WEIXIN
			postToxcPay() {
				var userId = uni.getStorageSync('user_id');
				var token = uni.getStorageSync('user_token');
				if (!userId || !token) {
					return;
				}

				var dict = {
					user_id: userId,
					user_token: token,
					pay_type: this.payType,
					order_id: this.orderId,
					amount: this.orderAmount,
					pay_method: 4,
					code: this.code
				}

				post('/pay', dict).then(res => {
					if (res.result == 1) {
						uni.showToast({
							title: res.message,
							icon: 'none'
						})
					} else {
						this.toWxxPay(res)
					}
				})
			},
			// #endif
			toWxxPay(data) {
				const self = this
				wx.requestPayment({
					timeStamp: data.timestamp,
					nonceStr: data.nonce_str,
					package: data.prepay_id,
					signType: 'MD5',
					paySign: data.sign,
					success(res) {
						 if (res.errMsg) {
							uni.showToast({
								title: '支付成功',
								icon: 'success'
							})
							uni.$emit('isCancel', 1)
							setTimeout(function() {
								uni.navigateBack()
							}, 500);
						}
					},
					fail(err) {
						var err = JSON.stringify(err)
						if (err)
							uni.showToast({
								title: '支付失败!请退回重新支付',
								icon: 'none'
							})
					}

				})
			},
			// toWxPay(data) {
			// 	console.log(data)
			//     const self = this
			//     bmWXPay.pay(data, function(resData) {
			//         if (resData.status === 0) {
			//             self.$notice.toast({
			//                 message: '支付成功，请至我的订单中查看'
			//             });
			//             self.$router.setBackParams({
			//                 isCancel: 1
			//             });
			//             self.$router.back({
			//                 type: 'PUSH'
			//             });
			//         } else if (resData.status === 2) {
			//             self.$notice.toast({
			//                 message: '用户已取消'
			//             });
			//         } else if (resData.status === -1) {
			//             self.$notice.toast({
			//                 message: '支付失败'
			//             });
			//         }
			//     })
			// },
			// toAliPay(authInfo) {
			// 	const self = this;
			// 	bmAliPay.pay({
			// 		authInfo: authInfo,
			// 		scheme: 'coolcargo',
			// 		isSandbox: false
			// 	}, function(resData) {
			// 		if (resData.status == 9000) {
			// 			self.$notice.toast({
			// 				message: '支付成功，请至我的订单中查看'
			// 			});
			// 			self.$router.setBackParams({
			// 				isCancel: 1
			// 			});
			// 			self.$router.back({
			// 				type: 'PUSH'
			// 			});
			// 		} else if (resData.status == 6001) {
			// 			self.$notice.toast({
			// 				message: '用户已取消'
			// 			});
			// 		}
			// 	})
			// },
			// toChargeDetail() {
			// 	uni.navigateTo({
			// 		url: `./chargeDetail?order_id=${this.orderId}`,

			// 	})
			// },
			// backClick() {
			// 	const self = this;
			// 	globalEvent.addEventListener('androidBack', options => {
			// 		if (self.comeType == 1) {
			// 			self.$router.setBackParams({
			// 				isCancel: 1
			// 			});
			// 		} else {
			// 			self.$router.open({
			// 				name: 'my_order',
			// 				type: 'PUSH'
			// 			});
			// 		}
			// 		self.$router.back({
			// 			type: 'PUSH'
			// 		});
			// 	})
			// },
		},
		// #ifdef MP-WEIXIN
		onLoad(data) {
			if (data.parm) {
				var resData = JSON.parse(decodeURIComponent(data.parm));
				this.orderData = resData
				if (resData.order_id) {
					this.orderId = resData.order_id;
				}
				if (resData.amount) {
					this.orderAmount = resData.amount;
				}
				if (resData.pay_type) {
					this.payType = resData.pay_type;
				}
			}
			let self = this
			uni.login({
				success(res) {
					if (res) {
						self.code = res.code
					}
				}
			})

		},
		onPullDownRefresh() {
			var self = this;
			uni.login({
				success(res) {
					if (res) {
						self.code = res.code
					} else {
						return
					}
				}
			})
			setTimeout(function() {
				uni.stopPullDownRefresh();
			}, 500);
		},
		// #endif
		// #ifdef APP
		onLoad(data) {
			if (data.parm) {
				var resData = JSON.parse(decodeURIComponent(data.parm));
				this.orderData = resData
				if (resData.order_id) {
					this.orderId = resData.order_id;
				}
				if (resData.amount) {
					this.orderAmount = resData.amount;
				}
				if (resData.pay_type) {
					this.payType = resData.pay_type;
				}
			}
		}
		// #endif
	}
</script>
<style lang="scss" scoped>
	.income-bg {
		height: 250rpx;
		align-items: center;
		justify-content: center;
		background-color: #595959;
		border-radius: 10rpx;
	}

	.price {
		color: #ffffff;
		font-size: 40rpx;
	}
</style>
