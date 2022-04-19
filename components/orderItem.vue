<template>
	<div class="border-contain margin-top20">
		<div v-if="orderData.rights_state == 1 && orderData.order_state == 1" class="flex-row align"
			style="background-color:#fff7d6" @click="toUpdate">
			<image class="up_img" src="/static/images/up_img@2x.png" />
			<text class="flex1" style="color: #ff6911;font-size: 25rpx">该订单支持升级车型，如有差价需您额外支付。</text>
			<text class="text-black-25" style="text-decoration: underline;margin-right:10rpx">我要升级</text>
		</div>

		<div class="flex-row align">
			<text class="text-black-25" style="height:85rpx;line-height:85rpx;margin-left: 20rpx;">下单时间</text>
			<text class="text-black-25 flex1" style="margin-left:30rpx;margin-right: 20rpx">{{setCreatTime}}</text>
			<text class="border-type">{{setType}}</text>
			<!--<text class="text-black" style="font-size: 25rpx">{{orderData.create_time.substring(0,this.orderData.create_time.length-3)}}</text>-->
		</div>
		<div class="line-gray"></div>
		<div class="flex-row align">
			<text v-if="!isPay && orderData.order_state != 10" class="price-title"
				style="margin-left: 20rpx">￥{{setAmount}}</text>
			<text class="text-black-25 flex1"
				style="height:85rpx;line-height:85rpx;margin-left: 20rpx">{{orderData.state_name}}</text>
			<div v-if="orderData.order_state < 3" class="flex-row align" @click="contactOrPay">
				<text v-if="isPay && orderData.order_state == 2 " class="text-black"
					style="font-size: 25rpx">联系司机</text>
				<text v-if="!isPay " class="text-black-25">支付{{countTxt}}</text>
				<image v-if="isPay && orderData.order_state == 2" class="img" src="/static/images/click_tel@2x.png" />
				<image v-if="!isPay" class="img" src="https://static.coolcargo.cn/public/image/applet/time_order@2x.png" />
			</div>
			<div v-if="orderData.order_state ==10 && orderData.violate_list.length > 0" class="flex-row align"
				@click="checkBreak">
				<text class="text-black-25">违章查看</text>
				<image class="img" src="https://static.coolcargo.cn/public/image/applet/check_img@2x.png" />
			</div>
		</div>
		<!--<div v-if="orderData.order_state == 10" class="flex-row align" style="height:85rpx;">-->
		<!--<text class="flex1" style="margin-left: 20rpx;color:#333333;font-size: 25rpx">订单已{{orderData.state_name}}</text>-->
		<!--<div v-if="orderData.violate_list.length > 0" class="flex-row align" @click="checkBreak">-->
		<!--<text class="text-black" style="font-size: 25rpx">违章查看</text>-->
		<!--<image class="img" src="/static/images/check_img@2x.png"/>-->
		<!--</div>-->
		<!--</div>-->
		<div class="line-gray"></div>
		<div class="flex-row align">
			<div class="flex1" style="overflow: hidden;">
				<div class="flex-row align padding-right5">
					<image class="addr-img" src="/static/images/get_img@2x.png" />
					<text class="text-gray">上海</text>
					<image class="down" src="https://static.coolcargo.cn/public/image/applet/down_gray@2x.png" />
					<text class="text-black-25 ">{{orderData.start_address}}</text>
				</div>
				<div v-if="orderData.return_address.length > 0" class="line-gray"></div>
				<div v-if="orderData.return_address.length > 0" class="flex-row align padding-right5">
					<image class="addr-img" src="/static/images/return_img@2x.png" />
					<text class="text-gray">上海</text>
					<image class="down" src="https://static.coolcargo.cn/public/image/applet/down_gray@2x.png" />
					<text class="text-black-25 ">{{orderData.return_address}}</text>
				</div>
			</div>
			<!--<div v-if="orderData.order_state <2">-->
			<!--<text  class="border-btn margin20">修改还车地址</text>-->
			<!--</div>   -->
		</div>
		<div class="line-gray"></div>
		<div class="flex-row align" style="justify-content: center" @click="toDetail">
			<text class="text-black-25" style="height:85rpx;line-height:85rpx;margin-left: 20rpx;">查看详情</text>
			<image class="img" src="/static/images/click_right@2x.png" />
		</div>

		<!--<div class="flex-row align" style="height: 140rpx">-->
		<!--<div class="align flex1">-->
		<!--<text class="text-black" style="font-size: 25rpx">{{setBeginDate}}</text>-->
		<!--<text class="text-gray margin-top5" style="font-size: 25rpx">{{setBeginTime}}</text>-->
		<!--</div>-->
		<!--<div class="align" style="padding-bottom: 10rpx">-->
		<!--<text class="text-yellow">{{orderData.rent_day}}天</text>-->
		<!--<image class="line-img" src="/static/images/line_img@2x.png"/>-->
		<!--</div>-->
		<!--<div class="align flex1">-->
		<!--<text class="text-black" style="font-size: 25rpx">{{setEndDate}}</text>-->
		<!--<text class="text-gray margin-top5" style="font-size: 25rpx">{{setEndTime}}</text>-->
		<!--</div>-->
		<!--</div>-->
		<!--<div class="line-gray"></div>-->
		<!--<div class="flex-row align" @click="clickPrice">-->
		<!--<image class="card-image" src="/static/images/car_card_img@2x.png"/>-->
		<!--<text class="text-black flex1" style="font-size: 25rpx">{{orderData.car_info}}</text>-->
		<!--<text   class="text-black" style="font-size: 25rpx">{{payTxt}}</text>-->
		<!--<text  class="price-title">￥{{setAmount}}</text>-->
		<!--<image v-if="orderData.isUp" class="img" src="/static/images/click_up@2x.png"/>-->
		<!--<image v-if="!orderData.isUp" class="img" src="/static/images/click_down@2x.png"/>-->
		<!--</div>-->
		<!--<div  class="line-gray"></div>-->
		<!--<div v-if="orderData.isUp" class="detail-contain" >-->
		<!--<div class="flex-row align" style="padding: 30rpx">-->
		<!--<text class="order-text" >{{orderData.car_info}} 用车费</text>-->
		<!--<text class="order-num" >x{{orderData.rent_day}}</text>-->
		<!--<text class="price-txt" >￥{{orderData.amount_rent}}</text>-->
		<!--</div>-->
		<!--<div class="line-gray"></div>-->
		<!--<div class="flex-row align" style="padding: 30rpx">-->
		<!--<text class="order-text" >基础保障车险服务费</text>-->
		<!--<text class="order-num" >x{{orderData.insurance_day}}</text>-->
		<!--<text  class="price-txt" >￥{{orderData.amount_insurance}}</text>-->
		<!--</div>-->
		<!--<div class="line-gray"></div>-->
		<!--<div v-if="orderData.amount_insurance2 > 0" class="flex-row align" style="padding: 30rpx">-->
		<!--<text class="order-text" >不计免赔车险服务费</text>-->
		<!--<text class="order-num" >x{{orderData.insurance_day}}</text>-->
		<!--<text class="price-txt" >￥{{orderData.amount_insurance2}}</text>-->
		<!--</div>-->
		<!--<div v-if="orderData.amount_insurance2 > 0" class="line-gray"></div>-->
		<!--<div v-if="orderData.amount_driver > 0" class="flex-row align" style="padding: 30rpx">-->
		<!--<text class="order-text" >尊享代驾司机服务费</text>-->
		<!--<text class="order-num" >x{{orderData.driver_days}}</text>-->
		<!--<text class="price-txt" >￥{{orderData.amount_driver}}</text>-->
		<!--</div>-->
		<!--<div v-if="orderData.amount_driver > 0" class="line-gray"></div>-->
		<!--<div v-if="orderData.amount_road > 0" class="flex-row align" style="padding: 30rpx">-->
		<!--<text class="order-text" >夜间送取车服务费</text>-->
		<!--<text class="order-num" ></text>-->
		<!--<text class="price-txt" >￥{{orderData.amount_road}}</text>-->
		<!--</div>-->
		<!--<div v-if="orderData.amount_road > 0" class="line-gray"></div>-->
		<!--<div v-if="orderData.amount_discount > 0" class="flex-row align" style="padding: 30rpx">-->
		<!--<text class="order-text">会员专享折扣</text>-->
		<!--<text class="order-num" ></text>-->
		<!--<text class="price-txt" >-￥{{orderData.amount_discount}}</text>-->
		<!--</div>-->
		<!--<div v-if="orderData.amount_discount > 0" class="line-gray"></div>-->
		<!--<div v-if="orderData.amount_coupon > 0" class="flex-row align" style="padding: 30rpx">-->
		<!--<text class="order-text" >优惠券抵扣</text>-->
		<!--<text class="order-num" ></text>-->
		<!--<text class="price-txt" >-￥{{orderData.amount_coupon}}</text>-->
		<!--</div>-->
		<!--<div  v-if="orderData.amount_coupon > 0" class="line-gray"></div>-->
		<!--<div v-if="orderData.pay_type == 3 && orderData.amount_deposit > 0" class="flex-row align" style="padding: 30rpx">-->
		<!--<text class="order-text" >押金</text>-->
		<!--<text class="order-num" ></text>-->
		<!--<text class="price-txt" >￥{{orderData.amount_deposit}}</text>-->
		<!--</div>-->
		<!--<div v-if="orderData.amount_deposit > 0" class="line-gray"></div>-->
		<!--<div v-if="orderData.amount_balance > 0" class="flex-row align" style="padding: 30rpx">-->
		<!--<text class="order-text" >储值账户抵扣</text>-->
		<!--<text class="order-num" ></text>-->
		<!--<text class="price-txt" >-￥{{orderData.amount_balance}}</text>-->
		<!--</div>-->
		<!--<div v-if="orderData.amount_balance > 0" class="line-gray"></div>-->
		<!--<div v-if="orderData.amount_cash > 0" class="flex-row align" style="padding: 30rpx">-->
		<!--<text class="order-text" >现金账户抵扣</text>-->
		<!--<text class="order-num" ></text>-->
		<!--<text class="price-txt" >-￥{{orderData.amount_cash}}</text>-->
		<!--</div>-->
		<!--<div v-if="orderData.amount_cash > 0" class="line-gray"></div>-->
		<!--<div v-if="orderData.amount_fuel > 0" class="flex-row align" style="padding: 30rpx">-->
		<!--<text class="order-text" >油费</text>-->
		<!--<text class="order-num" ></text>-->
		<!--<text class="price-txt" >￥{{orderData.amount_fuel}}</text>-->
		<!--</div>-->
		<!--<div v-if="orderData.amount_fuel > 0" class="line-gray"></div>-->
		<!--<div v-if="orderData.amount_violate > 0" class="flex-row align" style="padding: 30rpx">-->
		<!--<text class="order-text" >违章金额</text>-->
		<!--<text class="order-num" s></text>-->
		<!--<text class="price-txt" >￥{{orderData.amount_violate}}</text>-->
		<!--</div>-->
		<!--<div v-if="orderData.amount_violate > 0" class="line-gray"></div>-->
		<!--<div v-if="orderData.amount_other > 0" class="flex-row align" style="padding: 30rpx">-->
		<!--<text class="order-text" >违约金额</text>-->
		<!--<text class="order-num" ></text>-->
		<!--<text class="price-txt" >￥{{orderData.amount_other}}</text>-->
		<!--</div>-->
		<!--<div v-if="orderData.amount_other > 0" class="line-gray"></div>-->
		<!--<div v-if="orderData.back_balance > 0" class="flex-row align" style="padding: 30rpx">-->
		<!--<text class="order-text" >储值返还</text>-->
		<!--<text class="order-num" ></text>-->
		<!--<text class="price-txt" >-￥{{orderData.back_balance}}</text>-->
		<!--</div>-->
		<!--<div v-if="orderData.back_balance > 0" class="line-gray"></div>-->
		<!--<div v-if="orderData.back_cash > 0" class="flex-row align" style="padding: 30rpx">-->
		<!--<text class="order-text">现金返还</text>-->
		<!--<text class="order-num" ></text>-->
		<!--<text class="price-txt" >-￥{{orderData.back_cash}}</text>-->
		<!--</div>-->
		<!--<div v-if="orderData.back_cash > 0" class="line-gray"></div>-->
		<!--</div>-->


		<!--<div class="line-gray"></div>-->
		<!--<div v-if="orderData.order_state !==10" class="flex-row">-->
		<!--<div class="btn_cancel" @click="clickCancel">-->
		<!--<text class="text-black" style="font-size: 25rpx">取消订单</text>-->
		<!--<image class="img" src="/static/images/cancel_img@2x.png"/>-->
		<!--</div>-->
		<!--<div class="line"></div>-->
		<!--<div class="btn_cancel">-->
		<!--<text class="text-black" style="font-size: 25rpx" @click="contactUs">联系客服</text>-->
		<!--<image class="img" src="/static/images/click_contact@2x.png"/>-->
		<!--</div>-->
		<!--</div>-->

	</div>
</template>

<script>
	export default {
		props: {
			orderData: {},
		},
		data() {
			return {
				payTxt: '实付',
				isPay: false,
				createTime: '',
				countTxt: '15:00'
			}
		},
		computed: {
			setType() {
				var type = '租车订单';
				if (this.orderData.service_type == 1)
					type = '车+司机订单';
				else if (this.orderData.service_type == 2)
					type = '接送机订单';
				else if (this.orderData.service_type ==3)
					type = '接送机订单';
				return type;
			},
			setAmount() {
				var amount = 0;
				if (this.orderData.pay_amount > 0) {
					if (this.orderData.pay_type == 3) {
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
				//     if(this.orderData.pay_method == 0 ){
				//         amount = this.orderData.amount - this.orderData.amount_discount - this.orderData.amount_coupon
				//             - this.orderData.amount_balance - this.orderData.amount_cash + this.orderData.back_balance + this.orderData.back_cash;
				//     }
				//     if(this.orderData.pay_deposit == 0){
				//         amount += this.orderData.amount_deposit;
				//     }
				// }
				if (!this.isPay)
					this.countDown();
				return amount;
			},
			setCreatTime() {
				var create_time = this.orderData.create_time
				this.createTime = create_time.substring(0, this.orderData.create_time.length - 3);
				return this.createTime;
			}
			// setBeginDate(){
			//     const  beginD = this.orderData.start_time.substring(0,10);
			//  return beginD;
			// },
			// setBeginTime(){
			//     const  beginT = this.orderData.start_time.substring(10,this.orderData.start_time.length-3);
			//     return beginT;
			// },
			// setEndDate(){
			//     const  endD = this.orderData.return_time.substring(0,10);
			//     return endD;
			// },
			// setEndTime(){
			//     const endT = this.orderData.return_time.substring(10, this.orderData.return_time.length - 3);
			//     return endT;
			// },
		},
		methods: {
			// clickPrice(){
			//     return  this.$emit('clickPrice');
			// },
			// clickCancel(){
			//     return  this.$emit('clickCancel');
			// },
			toUpdate() {
				return this.$emit('toUpdate');
			},
			contactOrPay() {
				return this.$emit('contactOrPay');
			},
			contactUs() {
				return this.$emit('contactUs');
			},
			checkBreak() {
				return this.$emit('checkBreak');
			},
			toDetail() {
				return this.$emit('toDetail');
			},
			countDown() {
				var self = this;
				var totalTime = 900; //15分钟换算成1800秒
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
		},
	}
</script>

<style lang="scss" scoped>
	// @import 'src/js/css/base';
	.detail-contain {
		background-color: #fafafa;
	}

	.card-image {
		width: 170rpx;
		height: 55rpx;
		margin: 20rpx;
	}

	.img {
		width: 45rpx;
		height: 45rpx;
		margin: 20rpx;
	}

	.btn_cancel {
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

	.border-type {
		background-color: #fafafa;
		font-size: 20rpx;
		padding: 0 15rpx;
		line-height: 25rpx;
		border-width: 1rpx;
		border-color: #989898;
		color: #999999;
		margin-right: 20rpx;
	}

	.up_img {
		width: 40rpx;
		height: 40rpx;
		margin: 30rpx 20rpx;
	}
</style>
