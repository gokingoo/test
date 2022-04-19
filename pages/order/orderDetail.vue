<template>
	<div>
		<list class="list">
			<cell class="cell">
				<div class="border-contain margin-top20">
					<div class="flex-row align">
						<div class="flex1">
							<div class="flex-row align padding-right5">
								<image class="addr-img" src="/static/images/get_img@2x.png" />
								<text class="text-gray">上海</text>
								<image class="down" src="https://static.coolcargo.cn/public/image/applet/down_gray@2x.png" />
								<text class="text-black-25 ">{{orderData.start_address}}</text>
							</div>
							<div v-if="orderData.return_address" class="line-gray"></div>
							<div v-if="orderData.return_address" class="flex-row align padding-right5">
								<image class="addr-img" src="/static/images/return_img@2x.png" />
								<text class="text-gray">上海</text>
								<image class="down" src="https://static.coolcargo.cn/public/image/applet/down_gray@2x.png" />
								<text class="text-black-25">{{orderData.return_address}}</text>
							</div>
						</div>
						<!--<text v-if="orderData.state <3" class="border-btn margin20">修改还车地址</text>-->
					</div>
					<div class="line-gray"></div>
					<div v-if="orderData.service_type===2" class="plane-height flex-row align">
						<text class="text-black-25">接机时间：</text>
						<text class="text-black-25">{{setBeginDate}}</text>
						<text class="text-black-25" style="margin-left: 10rpx">{{setBeginTime}}</text>
					</div>
					<div v-if="orderData.service_type===3" class="plane-height flex-row align">
						<text class="text-black-25">送机时间：</text>
						<text class="text-black-25">{{setBeginDate}}</text>
						<text class="text-black-25" style="margin-left: 10rpx">{{setBeginTime}}</text>
					</div>
					<div v-if="orderData.service_type===0 || orderData.service_type === 1"
						class="time-height flex-row align">
						<div class="align flex1" style="display: flex;flex-direction: column;">
							<text class="text-black-25">{{setBeginDate}}</text>
							<text class=" margin-top5" style="color: #999999;font-size: 25rpx">{{setBeginTime}}</text>
						</div>
						<div class="align" style="padding-bottom: 10rpx;display: flex;flex-direction: column;">
							<text class="text-yellow">{{orderData.rent_day}}天</text>
							<image class="line-img" src="/static/images/line_img@2x.png" />
						</div>
						<div class="align flex1" style="display: flex;flex-direction: column;">
							<text class="text-black-25">{{setEndDate}}</text>
							<text class=" margin-top5" style="color: #999999;font-size: 25rpx">{{setEndTime}}</text>
						</div>
					</div>
					<div class="line-gray"></div>
					<div class="flex-row align" @click="clickPrice">
						<text v-if="orderData.car_no" class="car-no-bg">{{orderData.car_no}}</text>
						<text class="text-black-25 flex1" style="margin-left: 20rpx">{{orderData.car_info}}</text>
						<text class="text-black-25">{{payTxt}}</text>
						<text class="price-title">￥{{setAmount}}</text>
						<image v-if="orderData.isUp" class="img" src="/static/images/click_up@2x.png" />
						<image v-if="!orderData.isUp" class="img" src="/static/images/click_down@2x.png" />
					</div>
					<div class="line-gray"></div>
					<div v-if="orderData.isUp" class="detail-contain">
						<div class="flex-row align" style="padding: 30rpx">
							<text v-if="orderData.service_type === 0" class="order-text">{{orderData.car_info}}
								用车费</text>
							<text v-if="orderData.service_type === 1" class="order-text">{{orderData.car_info}}
								用车费(8h或100km)</text>
							<text v-if="orderData.service_type === 2 || orderData.service_type === 3"
								class="order-item-text">{{orderData.car_info}} 接送机费用</text>
							<text v-if="orderData.service_type === 2 || orderData.service_type === 3"
								class="order-num"></text>
							<text v-if="orderData.service_type !== 2 && orderData.service_type !== 3"
								class="order-num">x{{orderData.rent_day}}</text>
							<text class="price-txt">￥{{orderData.amount_rent}}</text>
						</div>
						<div class="line-gray"></div>
						<div v-if="orderData.amount_insurance > 0" class="flex-row align" style="padding: 30rpx">
							<text class="order-text">基础保障车险服务费</text>
							<text class="order-num">x{{orderData.insurance_day}}</text>
							<text class="price-txt">￥{{orderData.amount_insurance}}</text>
						</div>
						<div v-if="orderData.amount_insurance > 0" class="line-gray"></div>
						<div v-if="orderData.amount_insurance2 > 0" class="flex-row align" style="padding: 30rpx">
							<text class="order-text">不计免赔车险服务费</text>
							<text class="order-num">x{{orderData.insurance_day}}</text>
							<text class="price-txt">￥{{orderData.amount_insurance2}}</text>
						</div>
						<div v-if="orderData.amount_insurance2 > 0" class="line-gray"></div>
						<div v-if="orderData.amount_driver > 0" class="flex-row align" style="padding: 30rpx">
							<text class="order-text">尊享代驾司机服务费</text>
							<text class="order-num">x{{orderData.driver_days}}</text>
							<text class="price-txt">￥{{orderData.amount_driver}}</text>
						</div>
						<div v-if="orderData.amount_driver > 0" class="line-gray"></div>
						<div v-if="orderData.amount_road > 0" class="flex-row align" style="padding: 30rpx">
							<text class="order-text">夜间送取车服务费</text>
							<text class="order-num"></text>
							<text class="price-txt">￥{{orderData.amount_road}}</text>
						</div>
						<div v-if="orderData.amount_road > 0" class="line-gray"></div>

						<div v-if="orderData.pay_type === 3 && orderData.amount_deposit > 0" class="flex-row align"
							style="padding: 30rpx">
							<text class="order-text">押金</text>
							<text class="order-num"></text>
							<text class="price-txt">￥{{orderData.amount_deposit}}</text>
						</div>
						<div v-if="orderData.pay_type === 3 && orderData.amount_deposit > 0" class="line-gray"></div>

						<div v-if="orderData.amount_fuel > 0" class="flex-row align" style="padding: 30rpx">
							<text class="order-text">油费</text>
							<text class="order-num"></text>
							<text class="price-txt">￥{{orderData.amount_fuel}}</text>
						</div>
						<div v-if="orderData.amount_fuel > 0" class="line-gray"></div>
						<div v-if="orderData.amount_violate > 0" class="flex-row align" style="padding: 30rpx">
							<text class="order-text">违章金额</text>
							<text class="order-num"></text>
							<text class="price-txt">￥{{orderData.amount_violate}}</text>
						</div>
						<div v-if="orderData.amount_violate > 0" class="line-gray"></div>
						<div v-if="orderData.amount_other > 0" class="flex-row align" style="padding: 30rpx">
							<text class="order-text">违约金额</text>
							<text class="order-num"></text>
							<text class="price-txt">￥{{orderData.amount_other}}</text>
						</div>
						<div v-if="orderData.amount_other > 0" class="line-gray"></div>
						<div v-if="orderData.amount_discount > 0" class="flex-row align" style="padding: 30rpx">
							<text class="order-text">会员专享折扣</text>
							<text class="order-num"></text>
							<text class="price-txt">-￥{{orderData.amount_discount}}</text>
						</div>
						<div v-if="orderData.amount_discount > 0" class="line-gray"></div>
						<div v-if="orderData.amount_coupon > 0" class="flex-row align" style="padding: 30rpx">
							<text class="order-text">优惠券抵扣</text>
							<text class="order-num"></text>
							<text class="price-txt">-￥{{orderData.amount_coupon}}</text>
						</div>
						<div v-if="orderData.amount_coupon > 0" class="line-gray"></div>
						<div v-if="orderData.amount_balance > 0" class="flex-row align" style="padding: 30rpx">
							<text class="order-text">储值账户抵扣</text>
							<text class="order-num"></text>
							<text class="price-txt">-￥{{orderData.amount_balance}}</text>
						</div>
						<div v-if="orderData.amount_balance > 0" class="line-gray"></div>
						<div v-if="orderData.amount_cash > 0" class="flex-row align" style="padding: 30rpx">
							<text class="order-text">现金账户抵扣</text>
							<text class="order-num"></text>
							<text class="price-txt">-￥{{orderData.amount_cash}}</text>
						</div>
						<div v-if="orderData.amount_cash > 0" class="line-gray"></div>
						<div v-if="orderData.back_balance > 0" class="flex-row align" style="padding: 30rpx">
							<text class="order-text">储值返还</text>
							<text class="order-num"></text>
							<text class="price-txt">-￥{{orderData.back_balance}}</text>
						</div>
						<div v-if="orderData.back_balance > 0" class="line-gray"></div>
						<div v-if="orderData.back_cash > 0" class="flex-row align" style="padding: 30rpx">
							<text class="order-text">现金返还</text>
							<text class="order-num"></text>
							<text class="price-txt">-￥{{orderData.back_cash}}</text>
						</div>
						<div v-if="orderData.back_cash > 0" class="line-gray"></div>
					</div>

					<div class="flex-row align">
						<text class="plane-height flex1">{{orderData.state_name}}</text>
						<div v-if="orderData.order_state < 3" class="flex-row align" @click="contactOrPay">
							<text v-if="isPay && orderData.order_state ===2 " class="text-black-25">联系司机</text>
							<text v-if="!isPay " class="text-black-25">支付{{countTxt}}</text>
							<image v-if="isPay && orderData.order_state ===2" class="img"
								src="/static/images/click_tel@2x.png" />
							<image v-if="!isPay" class="img" src="https://static.coolcargo.cn/public/image/applet/time_order@2x.png" />
						</div>
						<div v-if="orderData.order_state == 10 && orderData.violate_list.length > 0"
							class="flex-row align" @click="checkBreak">
							<text class="text-black-25">违章查看</text>
							<image class="img" src="/static/images/check_img@2x.png" />
						</div>
					</div>
					<!--<div v-if="orderData.order_state === 10" class="flex-row align">-->
					<!--<text class="text-black flex1" style="height:85rpx;line-height:85rpx;margin-left: 20rpx;font-size: 25rpx">订单已完成</text>-->
					<!--<div v-if="orderData.violate_list.length > 0" class="flex-row align" @click="checkBreak">-->
					<!--<text class="text-black" style="font-size: 25rpx">违章查看</text>-->
					<!--<image class="img" src="/static/images/check_img@2x.png"/>-->
					<!--</div>-->
					<!--</div>-->
					<div v-if="orderData.order_state !==10" class="line-gray"></div>
					<div v-if="orderData.order_state !==10" class="flex-row">
						<div class="btn_cancel" @click="clickCancel">
							<text class="text-black-25">取消订单</text>
							<image class="img" src="https://static.coolcargo.cn/public/image/applet/cancel_img@2x.png" />
						</div>
						<div class="line"></div>
						<div class="btn_cancel" @click="contactUs">
							<text class="text-black-25">联系客服</text>
							<image class="img" src="/static/images/click_contact@2x.png" />
						</div>
					</div>

				</div>
			</cell>
		</list>
	</div>
</template>
<script>
	import {
		put,
		get
	} from '../../utils/netUtil.js';

	export default {
		data() {
			return {
				orderData: {},
				payTxt: '实付',
				isPay: true,
				createTime: '',
				countTxt: '15:00'

			}
		},
		components: {
		},
		computed: {
			setAmount() {
				var amount = 0;
				if (this.orderData.pay_amount > 0) {
					if (this.orderData.pay_type == 3) {
						if (this.orderData.order_state == 10) {
							this.payTxt = '实付';
							this.isPay = true;
							amount = this.orderData.amount_cash + this.orderData.amount_balance - this.orderData
								.back_balance - this.orderData.back_cash;
						} else {
							if (this.orderData.pay_deposit > 0) {
								this.payTxt = '实付';
								this.isPay = true;
								amount = this.orderData.amount_cash + this.orderData.amount_balance - this.orderData
									.back_balance - this.orderData.back_cash;
							} else {
								this.payTxt = '需付';
								this.isPay = false;
								amount = this.orderData.pay_amount;
							}
						}

					} else {
						if (this.orderData.pay_method > 0) {
							this.payTxt = '实付';
							this.isPay = true;
							amount = this.orderData.amount_cash + this.orderData.amount_balance - this.orderData
								.back_balance - this.orderData.back_cash;
						} else {
							this.payTxt = '需付';
							this.isPay = false;
							amount = this.orderData.pay_amount;
						}
					}
				} else {
					amount = this.orderData.amount_cash + this.orderData.amount_balance - this.orderData.back_balance -
						this.orderData.back_cash;
					this.payTxt = '实付';
					this.isPay = true;
				}


				// if(this.orderData.pay_method !==0 && this.orderData.pay_deposit !== 0){
				//     amount = this.orderData.amount_cash + this.orderData.amount_balance;
				// }else{
				//     if(this.orderData.pay_method === 0 ){
				//         amount = this.orderData.amount - this.orderData.amount_discount - this.orderData.amount_coupon
				//             - this.orderData.amount_balance - this.orderData.amount_cash + this.orderData.back_balance + this.orderData.back_cash;
				//     }
				//     if(this.orderData.pay_deposit === 0){
				//         amount += this.orderData.amount_deposit;
				//     }
				// }
				return amount;
			},
			setBeginDate() {
				if (this.orderData.start_time != null) {
					var start_time = this.orderData.start_time
					return start_time.substring(0, 10);
				} else {
					return '';
				}

			},
			setBeginTime() {
				if (this.orderData.start_time != null) {
					return this.orderData.start_time.substring(11, this.orderData.start_time.length - 3);
				} else {
					return '';
				}

			},
			setEndDate() {
				if (this.orderData.return_time != null) {
					return this.orderData.return_time.substring(0, 10);
				} else {
					return '';
				}
			},
			setEndTime() {
				if (this.orderData.return_time != null) {
					return this.orderData.return_time.substring(11, this.orderData.return_time.length - 3);
				} else {
					return '';
				}

			},
		},
		methods: {
			clickPrice() {
				this.orderData.isUp = !this.orderData.isUp;
			},
			checkBreak() {
				var vio_list = this.orderData.violate_list
				uni.navigateTo({
					url: `./violate?vio_list=${vio_list}`,
				})
			},
			clickCancel() {
				const self = this;
				uni.showModal({
					title: '温馨提示',
					content: "非法定节假日用车订单，用户至少提前24小时通知取消的，订单金额将全部原路退还；用户在用车前24小时内通知取消的，将按订单金额的30%作为违约金扣减后进行原路退还。法定节假日用车订单，用户至少提前3天通知取消的，订单金额将全部原路退还；用户在用车前3天内通知取消的，将按订单金额的30%作为违约金扣减后进行原路退还。",
					confirmText: '确定取消',
					cancelText: "暂不取消",

					success(res) {
						if (res.confirm) {
							self.putCancel(self.orderData);
						} else if (res.cancel) {
							return
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
					if (res.result == 1) {
						uni.showModal({
							title: res.message,
							content: '"拨打客服":4008204770?',
							success(res) {
								if (res.confirm) {
									uni.makePhoneCall({
										phoneNumber: '4008204770'
									})
								} else if (res.cancel) {
									return;
								}
							}

						})

					} else {
						uni.showToast({
							title:'取消成功',
							icon:'success'
						})
						uni.$emit('isCancel', 1)
						setTimeout(function() {
							uni.navigateBack()
						}, 500);
						
					}
				})

			},
			contactUs() {
				const self = this;
				uni.showModal({
					title: "提示",
					content: "是否需要联系客服?",
					success(res) {
						if (res.confirm) {
							uni.makePhoneCall({
								phoneNumber: '4008204770'
							});
						} else if (res.cancel) {
							return;
						}
					}
				})
			},
			contactOrPay() {
				const self = this;
				if (self.orderData.pay_amount > 0 && (self.orderData.pay_type === 3 && self.orderData
						.pay_deposit <= 0) ||
					(self.orderData.pay_type === 2 && self.orderData.pay_method <= 0)) {
					var params = {
						order_id: self.orderData.order_id,
						amount: self.orderData.pay_amount,
						pay_type: self.orderData.pay_type
					}

					var param = encodeURIComponent(JSON.stringify(params));
					uni.navigateTo({
						url: './pay?parm=' + param
					})
				} else {
					if (self.orderData.order_state == 2 && self.orderData.driver_mobile.length > 0) {
						self.$notice.confirm({
							title: '提示',
							message: '是否需要联系司机？',
							okTitle: '确认',
							cancelTitle: '取消',
							okCallback() {
								// 点击确认按钮的回调
								self.$coms.call(self.orderData.driver_mobile);
							},
							cancelCallback() {
								// 点击取消按钮的回调
							}

						})
					}

				}
			},
			// getData() {
			// 	this.$router.getParams().then(resData => {
			// 		this.orderData = resData;
			// 		// // ('orderData',resData)
			// 		this.createTime = this.orderData.create_time;
			// 		this.countDown();
			// 	});
			// },
			countDown() {
				var self = this;
				var totalTime = 900; //15分钟换算成900秒
				var now = new Date().getTime() / 1000;
				var start = new Date(self.createTime.replace(/-/g, "/")).getTime() / 1000;
				var time = totalTime - (now - start);
				if (time > 0) {
					const timeOut = setInterval(function() {
						time--;
						var minute = parseInt(time / 60);
						var second = parseInt(time % 60);
						if (minute < 10) {
							minute = '0' + minute;
						}
						if (second < 10) {
							second = '0' + second;
						}
						self.countTxt = minute + ':' + second;
						if (time < 1) {
							clearInterval(timeOut);
						}
					}, 1000)
				} else {
					self.countTxt = '00:00'
				}

			},
			getOrderData() {
				var userId = uni.getStorageSync('user_id');
				var token = uni.getStorageSync('user_token');
				if (!userId || !token) {
					return;
				}

				var dict = {
					user_id: userId,
					user_token: token,
					order_id: this.orderData.order_id
				}
				get('/order', dict).then(res => {
					res.isUp = false;
					this.orderData = res;
					// uni.navigateBack()
				})
			}
		},
		created() {},
		onLoad(options) {

			if (options.parm) {
				var param = JSON.parse(decodeURIComponent(options.parm));
				this.orderData = param;
				this.createTime = this.orderData.create_time;
				this.countDown();
			}
		}
	};
</script>
<style lang="scss" scoped>
	.detail-contain {
		background-color: #fafafa;

	}

	.card-image {
		width: 170rpx;
		height: 55rpx;
		margin-left: 20rpx;

	}

	.img {
		width: 45rpx;
		height: 45rpx;
		margin: 20rpx;

	}

	.btn_cancel {
		display: flex;
		flex-direction: column;
		flex-direction: row;
		align-items: center;
		justify-content: center;
		width: 360rpx;
		height: 90rpx;

	}

	.line {
		width: 1rpx;
		height: 90rpx;
		background-color: #cccccc;

	}

	.price-title {
		color: #ff6004;
		font-size: 27rpx;

	}

	.price-txt {
		width: 120rpx;
		color: #ff6004;
		font-size: 25rpx;
		margin-left: 20rpx;

	}

	.order-text {
		width: 440rpx;
		font-size: 25rpx;
		color: #333333;

	}

	.order-num {
		width: 80rpx;
		font-size: 25rpx;
		color: #333333;

	}

	.car-no-bg {
		height: 45rpx;
		line-height: 45rpx;
		padding-left: 10rpx;
		padding-right: 10rpx;
		background-color: dodgerblue;
		margin-left: 20rpx;
		border-radius: 5rpx;
		font-size: 25rpx;
		color: white;

	}

	.time-height {
		height: 140rpx;
	}

	.plane-height {
		height: 85rpx;
		padding-left: 20rpx;
		line-height: 85rpx;
		color: #333333;
		font-size: 25rpx;
	}
</style>
