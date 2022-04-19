<template>
	<div>
		<list class="list">
			<cell class="cell">
				<div class="border-contain" style="margin-top: 20px">
					<div class="flex-row align" style="padding: 30px">
						<text v-if="orderData.service_type === 0" class="order-item-text">{{orderData.car_info}}
							用车费</text>
						<text v-if="orderData.service_type === 1" class="order-item-text">{{orderData.car_info}}
							用车费(8h或100km)</text>
						<text v-if="orderData.service_type === 2 || orderData.service_type === 3"
							class="order-item-text">{{orderData.car_info}} 接送机费用</text>
						<text v-if="orderData.service_type === 2 || orderData.service_type === 3" class="order-item-num"
							style="width: 80px;font-size: 28px"></text>
						<text v-if="orderData.service_type !== 2 && orderData.service_type !== 3"
							class="order-item-num">x{{orderData.rent_day}}</text>
						<text class="order-item-amount">￥{{orderData.amount_rent}}</text>
					</div>
					<div class="line-gray"></div>
					<div v-if="orderData.amount_insurance > 0" class="flex-row align" style="padding: 30px">
						<text class="order-item-text">基础保障车险服务费</text>
						<text class="order-item-num">x{{orderData.insurance_day}}</text>
						<text class="order-item-amount">￥{{orderData.amount_insurance}}</text>
					</div>
					<div v-if="orderData.amount_insurance > 0" class="line-gray"></div>
					<div v-if="orderData.amount_insurance2 > 0" class="flex-row align" style="padding: 30px">
						<text class="order-item-text">不计免赔车险服务费</text>
						<text class="order-item-num">x{{orderData.insurance_day}}</text>
						<text class="order-item-amount">￥{{orderData.amount_insurance2}}</text>
					</div>
					<div v-if="orderData.amount_insurance2 > 0" class="line-gray"></div>
					<div v-if="orderData.amount_driver >0" class="flex-row align" style="padding: 30px">
						<text class="order-item-text">尊享代驾司机服务费</text>
						<text class="order-item-num">x{{orderData.driver_days}}</text>
						<text class="order-item-amount">￥{{orderData.amount_driver}}</text>
					</div>
					<div v-if="orderData.amount_driver >0" class="line-gray"></div>
					<div v-if="orderData.amount_road >0" class="flex-row align" style="padding: 30px">
						<div class="flex-row align" style="width: 520px">
							<text class="text-black" style="font-size: 28px;margin-right: 20px">夜间送取车服务费</text>
							<image class="question-img" src="/static/images/question@2x.png"
								@click="questionClick(0)" />
						</div>
						<text class="order-item-amount">￥{{orderData.amount_road}}</text>
					</div>
					<div v-if="orderData.amount_road >0" class="line-gray"></div>
					<div v-if="orderData.amount_discount>0" class="flex-row align" style="padding: 30px">
						<text class="order-item-text">会员专享折扣</text>
						<text class="order-item-num"></text>
						<text class="order-item-amount">-￥{{orderData.amount_discount}}</text>
					</div>
					<div v-if="orderData.amount_discount >0" class="line-gray"></div>
					<div v-if="orderData.amount_coupon >0" class="flex-row align" style="padding: 30px">
						<text class="order-item-text">优惠券抵扣</text>
						<text class="order-item-num"></text>
						<text class="order-item-amount">-￥{{orderData.amount_coupon}}</text>
					</div>
					<div v-if="orderData.amount_coupon>0" class="line-gray"></div>
					<div class="flex-row align" style="padding: 30px">
						<text v-if="orderData.service_type === 0" class="order-item-text">费用合计（不包含违损押金）</text>
						<text v-if="orderData.service_type !== 0" class="order-item-text">费用合计</text>
						<text class="order-item-num"></text>
						<text class="order-item-amount">
							￥{{orderData.amount - orderData.amount_discount-orderData.amount_coupon}}</text>
					</div>
				</div>
				<div v-if="orderData.pay_type >0 && orderData.amount_deposit > 0" class="border-contain flex-row align"
					style="padding: 30px;margin-top: 10px;">
					<div class="flex-row align" style="width: 520rpx">
						<text class="text-black" style="font-size: 28rpx;margin-right: 20rpx">违损押金</text>
						<image class="question-img" src="/static/images/question@2x.png" @click="questionClick(1)" />
					</div>
					<text class="order-item-amount">￥{{orderData.amount_deposit}}</text>
				</div>
				<div v-if="orderData.amount_balance > 0 || orderData.amount_cash > 0" class="border-contain"
					style="margin-top: 10px;">
					<div v-if="orderData.amount_balance > 0" class="flex-row align" style="padding: 30px">
						<text class="order-item-text">储值账户抵扣</text>
						<text class="order-item-num"></text>
						<text class="order-item-amount">-￥{{orderData.amount_balance}}</text>
					</div>
					<div v-if="orderData.amount_balance > 0 && orderData.amount_cash > 0" class="line-gray"></div>
					<div v-if="orderData.amount_cash > 0" class="flex-row align" style="padding: 30px">
						<text class="order-item-text">现金账户抵扣</text>
						<text class="order-item-num"></text>
						<text class="order-item-amount">-￥{{orderData.amount_cash}}</text>
					</div>
				</div>
				<div class="border-contain flex-row align" style="padding: 30px;margin-top: 10px">
					<text class="order-item-text">需支付</text>
					<text class="order-item-num"></text>
					<text class="order-item-amount">￥{{orderData.pay_amount}}</text>
				</div>
			</cell>
		</list>
	</div>
</template>
<script>
	import {
		get
	} from '../../utils/netUtil.js';

	export default {
		data() {
			return {
				orderId: 0,
				orderData: {},
				noticeList: [],
				questionShow: false,
			}
		},
		components: {
		},
		computed: {

		},
		methods: {
			questionClick(type) {

				if (type === 1) {
					uni.showModal({
						title: '违损保证金介绍',
						content: '违损保证金的充值标准，与服务类型相关，不同服务所需冻结的违损保证金额度不同，同时使用车辆每增加一台，须再支付一份违损保证金，违损保证金将冻结在用户的违损保证金账户中。用车结束后，可在30日后向酷享出行APP发起提现申请，平台在3个工作日内受理，具体到账时间以各银行/平台规则为准。',
						showCancel: false
					})
				} else {
					uni.showModal({
						title: '夜间送取车服务费介绍',
						content: '违损保证金的充值标准，与服务类型相关，不同服务所需冻结的违损保证金额度不同，同时使用车辆每增加一台，须再支付一份违损保证金，违损保证金将冻结在用户的违损保证金账户中。用车结束后，可在30日后向酷享出行APP发起提现申请，平台在3个工作日内受理，具体到账时间以各银行/平台规则为准。',
						showCancel: false
					})
					if (uni.getStorageSync('notice_list')) {
						this.noticeList = uni.getStorageSync('notice_list');
						uni.showModal({
							title: '夜间送取车服务费介绍',
							content: this.noticeList[0],
							showCancel: false
						})
					} else {
						this.noticeList = uni.getStorageSync('notice_list');
						uni.showModal({
							title: '夜间送取车服务费介绍',
							content: '酷享出行免费上门送/取车服务时间：每天的8：00~22：00，不在此时间段内的送车、换车、取车服务需要用户加价50元/次的夜间服务费。',
							showCancel: false
						})
					}
				}
			},
			getOrder() {
				var userId = uni.getStorageSync('user_id');
				var token = uni.getStorageSync('user_token');
				if (!userId || !token) {
					return;
				}

				var dict = {
					user_id: userId,
					user_token: token,
					order_id: this.orderId
				}
				get('/order', dict).then(res => {
					this.orderData = res;
				})
			}
		},
		onLoad(data) {
			if (data.order_id) {
				this.orderId = data.order_id;
				this.getOrder();
			} else {

			}

		}
	}
</script>
<style lang="scss" scoped>
	.income-bg {
		width: 720px;
		height: 250px;
		align-items: center;
		justify-content: center;
		background-color: #595959;
		border-radius: 10px;
	}

	.cancel-btn {
		width: 50px;
		height: 50px;
		margin-right: 30px;
	}

	.btn {
		margin-top: 60px;
		margin-bottom: 30px;
		margin-left: 25px;
		width: 700px;
		height: 70px;
		text-align: center;
		background-color: #333333;
		font-size: 25px;
		line-height: 70px;
		border-width: 1px;
		border-color: #989898;
		border-radius: 10px;
		color: #ffffff;
	}

	.ali-img {
		width: 50px;
		height: 50px;
		margin: 20px 30px;
	}
</style>
