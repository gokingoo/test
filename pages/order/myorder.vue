<template>
	<div>
		<list class="list" ref="list" :showRefresh="true" @refresh="onrefresh">
			<cell v-for="(i, index) in orderList " :key="index" class="cell">
				<order-item :order-data="i" @toDetail="toDetail(i)" @contactOrPay="contactOrPay(i)"
					@checkBreak="checkBreak(i)" @toUpdate="toUpdate(i)"></order-item>
			</cell>
			<cell class="cell" v-if="!orderList.length">
				<nothing padding-top="220" :title="nothingStr"></nothing>
			</cell>

			<cell v-if="userState == 0">
				<div class="not-auth-bg" @click="toAuth">
					<text class="flex1"
						style="color: #ff6004;font-size: 23rpx;margin-left: 20rpx">您还未认证身份，为不影响您用车请在送车前完成认证。</text>
					<text style="color: #333333;font-size: 26rpx;">前往认证</text>
				</div>
			</cell>
		</list>
	</div>
</template>
<script>
	import OrderItem from '../../components/orderItem.vue'
	import nothing from '../../components/nothing.vue'
	import {
		get,
		put,
		post
	} from '../../utils/netUtil.js';

	export default {
		data() {
			return {
				title: "我的订单",
				nothingStr: '当前暂无订单',
				orderList: [],
				userState: 0,
				overlayShow: false,
				orderId: 0
			}
		},
		components: {
			OrderItem,
			nothing,
		},
		computed: {},
		methods: {
			onrefresh() {
				this.$refs["list"].refreshEnd();
				this.getOrderList();
			},
			// checkBreak(order) {
			// 	this.$router.open({
			// 		name: 'violate',
			// 		params: {
			// 			vio_list: order.violate_list
			// 		},
			// 		type: 'PUSH'
			// 	});
			// },
			clickPrice(index) {
				this.orderList[index].isUp = !this.orderList[index].isUp;
			},
			getOrderList() {
				var userId = uni.getStorageSync('user_id');
				var token = uni.getStorageSync('user_token');
				if (!userId || !token) {
					return;
				}

				var dict = {
					user_id: userId,
					user_token: token,
					order_id: 0
				}
				get('/order', dict).then(res => {
					uni.hideNavigationBarLoading();
					for (var i = 0; i < res.length; i++) {
						res[i].isUp = false;
					}
					this.orderList = res;
					// this.orderList[2].violate_list=[{
					//     violate_id:1,
					//     violate_time:'2019-04-19 12:45:00',
					//     address:'人民广场',
					//     rule:'闯红灯',
					//     score:6,
					//     amount:200
					// },{
					//     violate_id:2,
					//     violate_time:'2019-04-20 12:45:00',
					//     address:'西藏南路',
					//     rule:'超速',
					//     score:3,
					//     amount:300
					// }]
				})
			},
			clickCancel(order) {
				const self = this;
				uni.showModal({
					title: '提示',
					content: '是否取消该订单？',
					confirmText: '确认',
					cancelTitle: '取消',
					success: function(res) {
						// 点击确认按钮的回调
						if (res.confirm) {
							self.putCancel(order);
						} else if (res.cancel) {
							// 点击取消按钮的回调
						}
					}
				})
			},
			putCancel(order) {
				var userId = uni.getStorageSync('user_id');
				var token = uni.getStorageSync('user_token');
				if (!userId || !token) {
					return;
				}
				var dict = {
					user_id: userId,
					user_token: token,
					order_id: order.order_id,
					order_state: -1
				}
				put('/order', dict).then(res => {
					uni.showToast({
						title: '订单已取消',
						icon: 'none'
					})
					this.getOrderList();

				})
			},
			toDetail(order) {
				var order = encodeURIComponent(JSON.stringify(order));
				uni.navigateTo({
					url: './orderDetail?parm=' + order
				})
			},
			// #ifdef MP-WEIXIN
			toUpdate(order) {
				const self = this
				uni.showModal({
					title: '您正在对订单进行升级车型操作:',
					content: '目前升级车型暂时仅支持升级"宝马车型";如有差额需您额外支付！(车型九折优惠)',
					cancelColor: "#333333",
					cancelText: '暂不升级',
					confirmColor: '#ff6911',
					confirmText: '确定升级',
					success(res) {
						if (res.confirm) {
							uni.navigateTo({
								url: `./bmw?orderID=${order.order_id}`
							})
						} else if (res.cancel) {
							return
						}
					}
				})
			},
			// #endif
			// #ifdef APP
			toUpdate(order) {
				const self = this
				uni.showModal({
					title: '您正在对订单进行升级车型操作:',
					content: '目前升级车型暂时仅支持升级"宝马车型";如有差额需您额外支付!',
					cancelColor: "#333333",
					cancelText: '暂不升级',
					confirmColor: '#ff6911',
					confirmText: '确定升级',
					success(res) {
						if (res.confirm) {
							uni.navigateTo({
								url: `./bmw?orderID=${order.order_id}`
							})
						} else if (res.cancel) {
							return
						}
					}
				})
			},
			// #endif
			
			// contactUs(order) {
			//     const self = this;
			//     self.$notice.confirm({
			//         title: '提示',
			//         message: '是否需要联系客服？',
			//         okTitle: '确认',
			//         cancelTitle: '取消',
			//         okCallback() {
			//             // 点击确认按钮的回调
			//             self.$coms.call('4008204770');

			//         },
			//         cancelCallback() {
			//             // 点击取消按钮的回调
			//         }

			//     })
			// },
			contactOrPay(orderData) {
				const self = this;

				if (orderData.pay_amount > 0 && (orderData.pay_type == 3 && orderData.pay_deposit <= 0) || (orderData
						.pay_type == 2 && orderData.pay_method <= 0)) {
					var param = {
						order_id: orderData.order_id,
						amount: orderData.pay_amount,
						pay_type: orderData.pay_type
					}
					var params = encodeURIComponent(JSON.stringify(param));
					uni.navigateTo({
						url: './pay?parm=' + params
					})
				} else {
					if (orderData.order_state == 2 && orderData.driver_mobile.length > 0) {
						uni.showModal({
							title: '提示',
							content: '是否需要联系司机?',
							success(res) {
								if (res.confirm) {
									uni.makePhoneCall({
										phoneNumber: orderData.driver_mobile
									});
								} else if (res.cancel) {
									return
								}
							}
						})
					}
				}
			},
			toAuth() {
				uni.navigateTo({
					url: '../auth/auth'
				})
			},
		},
		onPullDownRefresh() {
			var self = this;
			uni.showNavigationBarLoading()
			self.getOrderList();
			setTimeout(function() {
				uni.stopPullDownRefresh();
			}, 500);
		},
		created() {
			if (uni.getStorageSync('user_info')) {
				this.userState = uni.getStorageSync('user_info').user_state;
			}
			this.getOrderList();
		},

		onLoad(options) {
			if (options) {
				if (options.hasOwnProperty('param')) {
					var param = JSON.parse(decodeURIComponent(options.param));
					this.orderList = param;
				} else if (options.data) {
					var res = JSON.parse(decodeURIComponent(options.data))
					if (res && res.amount > 0) {
						var parm = encodeURIComponent(JSON.stringify(res))
						uni.navigateTo({
							url: './pay?parm=' + parm,

						})

					}
				}

			}
			const self = this
			uni.$on("isCancel", function(data) {
				if (data == 1) {
					self.getOrderList();
				}
			})
		},
	};
</script>
<style lang="scss" scoped>
	.not-auth-bg {
		flex-direction: row;
		height: 50rpx;
		padding: 5rpx;
		align-items: center;
		background-color: #fff7d6;
		margin-top: 8rpx;
		border-radius: 5rpx;
		margin-bottom: 10rpx;
	}

	.line {
		width: 1px;
		height: 80rpx;
		background-color: #cccccc;
	}
</style>
