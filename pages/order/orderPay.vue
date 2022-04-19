<template>
	<div>
		<list class="list">
			<cell class="cell">
				<div class="border-contain" style="margin-top: 20rpx">
					<div class="flex-row align" style="padding: 30rpx">
						<text v-if="orderData.service_type === 0"
							class="order-item-text">{{orderData.car_info}}用车费</text>
						<text v-if="orderData.service_type === 1"
							class="order-item-text">{{orderData.car_info}}用车费(8h或100km)</text>
						<text v-if="orderData.service_type === 2 || orderData.service_type === 3"
							class="order-item-text">{{orderData.car_info}} 接送机费用</text>
						<text v-if="orderData.service_type === 2 || orderData.service_type === 3" class="order-item-num"
							style="width: 80rpx;font-size: 28rpx"></text>
						<text v-if="orderData.service_type !== 2 && orderData.service_type !== 3" class="order-item-num"
							style="width: 80rpx;font-size: 28rpx">x{{orderData.rent_day}}</text>
						<text class="order-item-amount">￥{{orderData.amount_rent}}</text>
					</div>
					<div class="line-gray"></div>
					<div v-if="orderData.amount_insurance > 0" class="flex-row align" style="padding: 30rpx">
						<text class="order-item-text">基础保障车险服务费</text>
						<text class="order-item-num">x{{orderData.insurance_day}}</text>
						<text class="order-item-amount">￥{{orderData.amount_insurance}}</text>
					</div>
					<div v-if="orderData.amount_insurance > 0" class="line-gray"></div>
					<div v-if="orderData.amount_insurance2 > 0" class="flex-row align" style="padding: 30rpx">
						<text class="order-item-text">不计免赔车险服务费</text>
						<text class="order-item-num">x{{orderData.insurance_day}}</text>
						<text class="order-item-amount">￥{{orderData.amount_insurance2}}</text>
					</div>
					<div v-if="orderData.amount_insurance2 > 0" class="line-gray"></div>
					<div v-if="orderData.amount_driver > 0" class="flex-row align" style="padding: 30rpx">
						<text class="order-item-text">尊享代驾司机服务费</text>
						<text class="order-item-num">x{{orderData.driver_days}}</text>
						<text class="order-item-amount">￥{{orderData.amount_driver}}</text>
					</div>
					<div v-if="orderData.amount_driver > 0" class="line-gray"></div>
					<div v-if="orderData.last_amount > 0" class="flex-row align" style="padding: 30rpx">
						<text class="order-item-text">原订单金额</text>
						<text class="order-item-num"></text>
						<text class="order-item-amount">-￥{{orderData.last_amount}}</text>
					</div>
					<div v-if="orderData.last_amount > 0" class="line-gray"></div>
					<div v-if="orderData.amount_road > 0" class="flex-row align" style="padding: 30rpx">
						<div class="flex-row align" style="width: 520rpx">
							<text class="text-black" style="font-size: 28rpx">夜间送取车服务费</text>
							<image class="question-img" src="/static/images/question@2x.png"
								@click="questionClick(0)" />
						</div>
						<text class="text-yellow"
							style="width: 120rpx;margin-left: 20rpx">￥{{orderData.amount_road}}</text>
					</div>
					<div v-if="orderData.amount_road > 0" class="line-gray"></div>
					<div v-if="orderData.amount_discount > 0" class="flex-row align" style="padding: 30rpx">
						<text class="order-item-text">会员专享折扣</text>
						<text class="order-item-num" style="width: 80rpx;font-size: 28rpx"></text>
						<text class="order-item-amount">-￥{{orderData.amount_discount}}</text>
					</div>
				</div>
				<div v-if="hasCoupon" class="border-contain flex-row align" style="padding: 30rpx;margin-top: 20rpx"
					@click="toCoupon">
					<text class="text-black flex1" style="font-size: 28rpx">优惠券</text>
					<text class="text-yellow">{{couponTxt}}</text>
					<image class="point-right"
						src="https://static.coolcargo.cn/public/image/applet/point_right@2x.png" />
				</div>
				<div class="border-contain flex-row align" style="padding: 20rpx;margin-top: 20rpx">
					<div class="flex1">
						<div class="flex-row">
							<text style="color: #333333;font-size: 28rpx">费用合计</text>
							<text v-if="orderData.service_type == 0"
								style="color: #333333;font-size: 28rpx">(不包含违损押金)</text>
						</div>
						<div v-if="orderData.service_type == 0" class="flex-row" style="margin-top: 10rpx">
							<div class="vip-tag-contain flex-row align" @click="toValueCard">
								<image class="vip-tag-img" src="/static/images/vip_tag@2x.png"></image>
								<text class="vip-tag-text">会员低至￥{{vipPrice}}</text>
							</div>
							<div class="flex1"></div>
						</div>
					</div>
					<text style="font-size: 28rpx;color:#ff6004;margin-left: 10rpx">￥{{totalPrice}}</text>
				</div>
				<!-- <div v-if="orderData.last_amount > 0" class="border-contain flex-row align"
					style="padding: 20rpx;margin-top: 20rpx">
					<div class="flex1">
						<div class="flex-row">
							<text style="color: #333333;font-size: 28rpx">升级订单九折优惠</text>
							<text v-if="orderData.service_type == 0"
								style="color: #333333;font-size: 28rpx">(不包含违损押金)</text>
						</div>
					</div>
					<text style="font-size: 28rpx;color:#ff6004;margin-left: 10rpx">￥{{discountsPrice}}</text>
				</div> -->
				<div v-if="orderData.amount_deposit >0" class="border-contain flex-row align"
					style="padding:20rpx;margin-top: 20rpx">
					<div class="flex1">
						<div class="flex-row flex1 align">
							<text style="color: #333333;font-size: 28rpx">是否现在支付违损押金</text>
							<text
								style="font-size: 28rpx;color:#ff6004;margin-left: 10rpx">￥{{orderData.amount_deposit}}</text>
							<image class="question-img" src="/static/images/question@2x.png"
								@click="questionClick(1)" />
						</div>
						<div class="flex-row" style="margin-top: 10rpx">
							<div v-if="orderData.service_type == 0" class="vip-tag-contain flex-row align"
								style="margin-right: 5rpx" @click="toValueCard">
								<image class="vip-tag-img" src="/static/images/vip_tag@2x.png"></image>
								<text class="vip-tag-text">会员专享￥3000</text>
							</div>
							<div class="flex1"></div>
						</div>
					</div>
					<image v-if="payDepos" class="check-img" src="/static/images/radio_yes@2x.png"
						@click="checkClick()" />
					<image v-if="!payDepos" class="check-img" src="/static/images/radio_no@2x.png"
						@click="checkClick()" />
				</div>
				<div v-if="userBalance > 0 || userCash >0" class="border-contain" style="margin-top: 20rpx">
					<div v-if="userBalance> 0" class="flex-row align" @click="payCheck(0)">
						<image class="ali-img" src="https://static.coolcargo.cn/public/image/applet/value_pay@2x.png" />
						<text class="text-black" style="width: 170rpx;font-size: 25rpx">储值账户抵扣</text>
						<text class="text-gray" style="width: 350rpx;font-size: 25rpx">（可用余额 {{userBalance}}）</text>
						<image v-if="valueChecked" class="radio-img" src="/static/images/radio_checked@2x.png" />
						<image v-if="!valueChecked" class="radio-img"
							src="https://static.coolcargo.cn/public/image/applet/radio_unchecked@2x.png" />
					</div>
					<div v-if="userBalance > 0 && userCash >0" class="line-gray"></div>
					<div v-if="userCash > 0" class="flex-row align" @click="payCheck(1)">
						<image class="ali-img"
							src="https://static.coolcargo.cn/public/image/applet/income_pay@2x.png" />
						<text class="text-black" style="width: 170rpx;font-size: 25rpx">现金账户抵扣</text>
						<text class="text-gray" style="width: 350rpx;font-size: 25rpx">（可用余额 {{userCash}}）</text>
						<image v-if="incomeChecked" class="radio-img" src="/static/images/radio_checked@2x.png" />
						<image v-if="!incomeChecked" class="radio-img"
							src="https://static.coolcargo.cn/public/image/applet/radio_unchecked@2x.png" />
					</div>
				</div>
			</cell>
		</list>
		<view style="position:fixed;bottom:0;width: 100%;">
			<div class="flex-row align" style="height:80rpx;background-color: #ffffff;border-top-color: #999999">
				<text class="text-black" style="margin-left: 30rpx;font-size: 28rpx">需支付</text>

				<text class="flex1" style="margin-left: 10rpx;font-size: 28rpx;color: #ff6004">￥{{needPay}}</text>

				<text class="pay-btn" @click="comfirmClick">确认支付</text>
			</div>
		</view>
		<!-- <wxc-mask height="400" width="650" border-radius="10" duration="200" :top="300" mask-bg-color="#FFFFFF"
			:overlay-can-close="true" :has-animation="true" :has-overlay="true" :show-close="false" :show="questionShow"
			@wxcMaskSetHidden="questionSetHidden">
			<div class="align">
				<div class="flex-row align">
					<text
						style="width:510rpx;font-size: 32rpx;color:#333333;margin: 30rpx;text-align: center">{{questionTitle}}</text>
					<image class="cancel-btn" src="/static/images/cancel_img@2x.png" @click="toCancel" />
				</div>
				<text class="text-black"
					style="line-height: 40rpx;padding-left: 30rpx;padding-right: 30rpx;margin-bottom: 20rpx">{{questionTxt}}</text>
			</div>
		</wxc-mask> -->
	</div>
</template>
<script>
	import {
		put
	} from '../../utils/netUtil.js'

	export default {
		data() {
			return {
				// discountsPrice: 0,
				orderData: {},
				userData: {},
				vipPrice: 0,
				totalPrice: 0,
				couponId: 0,
				couponAmount: 0,
				couponTxt: '有可用优惠券',
				depositAmount: 0,
				needPay: 0,
				payType: 3, //2不含押金 3含押金
				payDepos: true,
				valueChecked: true,
				incomeChecked: true,
				userBalance: 0,
				userCash: 0,
				noticeList: [],
				hasCoupon: false,
				questionShow: false,
				questionTitle: '夜间送取车服务费介绍',
				questionTxt: '酷享出行免费上门送/取车服务时间：每天的8：00~22：00，不在此时间段内的送车、换车、取车服务需要用户加价50元/次的夜间服务费。'
			}
		},
		components: {},
		computed: {

		},
		methods: {
			toCancel() {
				this.questionShow = false;
			},
			questionClick(type) {
				if (type === 1) {
					uni.showModal({
						title: '违损保证金介绍',
						content: '违损保证金的充值标准，与服务类型相关，不同服务所需冻结的违损保证金额度不同，同时使用车辆每增加一台，须再支付一份违损保证金，违损保证金将冻结在用户的违损保证金账户中。用车结束后，可在30日后向酷享出行“客服”发起提现申请，平台在3个工作日内受理，具体到账时间以各银行/平台规则为准',
						showCancel: false,
					})
				} else {
					uni.showModal({
						title: '夜间送取车服务费介绍',
						content: '违损保证金的充值标准，与服务类型相关，不同服务所需冻结的违损保证金额度不同，同时使用车辆每增加一台，须再支付一份违损保证金，违损保证金将冻结在用户的违损保证金账户中。用车结束后，可在30日后向酷享出行”客服“发起提现申请，平台在3个工作日内受理，具体到账时间以各银行/平台规则为准',
						showCancel: false,
					})
					if (uni.getStorageSync('notice_list')) {
						this.noticeList = uni.getStorageSync('notice_list');
						uni.showModal({
							title: '夜间送取车服务费介绍',
							content: this.noticeList[0],
							showCancel: false,
						})

					} else
						uni.showModal({
							title: '夜间送取车服务费介绍',
							content: '酷享出行免费上门送/取车服务时间：每天的8：00-22：00，不在此时间段内的送车、换车、取车服务需要用户加价50元/次的夜间服务费。',
							showCancel: false,
						})

				}
			},
			questionSetHidden() {
				this.questionShow = false;
			},
			toValueCard() {
				this.$router.open({
					name: 'value_card',
					type: 'PUSH'
				});
			},
			payCheck(type) {
				if (type == 0 && this.orderData.parent_id > 0)
					return;
				if (type == 0) {
					this.valueChecked = !this.valueChecked;
				} else
					this.incomeChecked = !this.incomeChecked;
				this.priceCount();
			},
			checkClick() {
				if (this.orderData.parent_id > 0)
					return;
				this.payDepos = !this.payDepos;
				if (this.payDepos)
					this.payType = 3;
				else
					this.payType = 2;
				this.priceCount();
			},
			comfirmClick() {
				const self = this;
				uni.showModal({
					title: '提示',
					content: "是否确认支付",
					confirmText: '确认',
					cancelText: '取消',
					success(res) {
						if (res.confirm) {
							self.putToOrder();
						} else if (res.cancel) {
							return
						}
					}
				})

			},
			putToOrder() {
				var userId = uni.getStorageSync('user_id');
				var token = uni.getStorageSync('user_token');
				if (!userId || !token) {
					return;
				}
				var payAccount = 0;
				if (this.valueChecked && this.incomeChecked)
					payAccount = 3;
				else if (this.valueChecked)
					payAccount = 1;
				else if (this.incomeChecked)
					payAccount = 2;
				else
					payAccount = 0;

				var dict = {
					user_id: userId,
					user_token: token,
					order_id: this.orderData.order_id,
					order_state: 1,
					data_id: this.couponId,
					pay_type: this.payType,
					pay_account: payAccount,
				}
				put('/order', dict).then(res => {
					var res = encodeURIComponent(JSON.stringify(res));
					uni.reLaunch({
						url: './myorder?data=' + res
					})
				})


			},
			toCoupon() {
				var type = this.orderData.service_type
				uni.navigateTo({
					url: `../user/wallet/coupon?type=${type}`
				})

			},
			getUserData() {
				this.userData = {};
				if (uni.getStorageSync('user_info')) {
					this.userData = uni.getStorageSync('user_info');
					if (this.userData.coupon_list.length > 0) {
						var couponType = 1;
						if (this.orderData.service_type == 1) {
							couponType = 2;
						} else if (this.orderData.service_type == 2) {
							couponType = 3;
						} else if (this.orderData.service_type == 3) {
							couponType = 3;
						}
						var couponList = this.userData.coupon_list;
						for (var i = 0; i < couponList.length; i++) {
							var coupon = couponList[i];
							if (coupon.coupon_service == 0 || coupon.coupon_service == couponType) {
								this.hasCoupon = true;
							}
						}
					}
					if (this.userData.deposit > 0) {
						var over = this.userData.cash - this.userData.deposit;
						if (over >= 0) {
							this.userCash = over;
							this.userBalance = this.userData.balance;
						} else {
							this.userCash = 0;
							var amount = this.userData.balance + over;
							if (amount >= 0) {
								this.userBalance = amount;
							} else {
								this.userBalance = 0;
							}
						}
					} else {
						this.userBalance = this.userData.balance;
						this.userCash = this.userData.cash;
					}
				}
			},
			priceCount() {
				this.vipPrice = this.orderData.amount - Math.round((this.orderData.amount_rent * 0.15)) - this
					.couponAmount - this.orderData.last_amount;
				if (this.vipPrice < 0) {
					this.vipPrice = 0;
				}
				this.totalPrice = this.orderData.amount - this.orderData.amount_discount - this.couponAmount - this
					.orderData.last_amount;
				if (this.totalPrice < 0) {
					this.totalPrice = 0;
				}
				this.needPay = this.totalPrice;
				if (this.orderData.service_type == 0) {
					if (this.payDepos) {
						this.needPay = this.totalPrice + this.orderData.amount_deposit;
					} else {
						this.needPay = this.totalPrice
					}
				} else {
					this.needPay = this.totalPrice;
				}





				if (this.userBalance > 0 && this.valueChecked) {
					if (this.userBalance >= this.needPay) {
						this.needPay = 0;
					} else {
						this.needPay -= this.userBalance;
					}
				}
				if (this.needPay > 0) {
					if (this.userCash > 0 && this.incomeChecked) {
						if (this.userCash >= this.needPay) {
							this.needPay = 0;
						} else {
							this.needPay -= this.userCash;
						}
					}
				}
			},
			putRefreshOrder() {
				var userId = uni.getStorageSync('user_id');
				var token = uni.getStorageSync('user_token');
				if (!userId || !token) {
					return;
				}
				var dict = {
					user_id: userId,
					user_token: token,
					order_id: this.orderData.order_id,
					order_state: 99,
				}
				put('/order', dict).then(res => {
					this.orderData = res;
					this.priceCount();
				})
			}
		},
		created() {},
		onLoad(options) {
			const self = this;
			if (options.param) {
				var param = JSON.parse(decodeURIComponent(options.param));
				self.orderData = param;
				self.getUserData();
				self.priceCount();
			}
			uni.$on("coupon", function(data) {
				if (data.hasOwnProperty('coupon')) {
					self.couponId = data.coupon.data_id;
					self.couponAmount = data.coupon.coupon_amount;
					self.couponTxt = '-￥' + self.couponAmount;
					self.priceCount();
				}
			})
			uni.$on('isConfirm', function(data) {
				if (data == 1) {
					self.getUserData();
					self.putRefreshOrder();
				}
			})
		}

	};
</script>
<style lang="scss" scoped>
	.un-img {
		width: 67rpx;
		height: 42rpx;
		margin: 28rpx 13rpx 28rpx 30rpx;
	}

	.contact-img {
		width: 13rpx;
		height: 25rpx;
	}

	.cancel-btn {
		width: 50rpx;
		height: 50rpx;
		margin-right: 30rpx;
	}

	.pay-btn {
		width: 250rpx;
		height: 80rpx;
		text-align: center;
		background-color: #333333;
		font-size: 25rpx;
		line-height: 80rpx;
		color: #ffffff;
	}
</style>
