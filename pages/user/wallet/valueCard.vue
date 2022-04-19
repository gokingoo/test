<template>
	<div class="align">
		<list class="list">
			<cell class="cell">
				<div class="card-bg margin-top20" style="display: flex;flex-direction: column;">
					<text class="text-gray">余额（元）</text>
					<text style="color:#ffffff;font-size: 40rpx;margin-top: 20rpx">{{userData.balance}}</text>
					<div class="flex-row align margin-top20" @click="toIncome">
						<text class="text-gray">账户明细</text>
						<image class="point-right margin-left20"
							src="https://static.coolcargo.cn/public/image/applet/point_right@2x.png" />
					</div>
				</div>
				<div class="deposit-bg" v-if="userData.deposit >0">
					<text class="flex1"
						style="color:#ff6004;font-size: 23rpx">储值账户与现金账户中共有{{userData.deposit}}元违损押金冻结中。</text>
					<text class="text-black" style="text-decoration: underline;margin-right: 20rpx"
						@click="questionClick">详情说明</text>
				</div>
				<div class="border-contain"
					style="padding-top:40rpx;padding-bottom: 40rpx;padding-right: 20rpx ;margin-top: 20rpx">
					<!--<div v-if="chooseType ==1" class="on-bg flex1 align">-->
					<!--<text class="on-price">￥10000</text>-->
					<!--<div>-->
					<!--<div class="on"></div>-->
					<!--<text class="on-title">享受权益</text>-->
					<!--<text class="on-line flex1"></text>-->
					<!--</div>-->
					<!--<text class="on-txt">1.原每辆车押金5000元,现享3000元；</text>-->
					<!--<text class="on-txt">2.租车费用享95折；</text>-->
					<!--<text class="on-txt">3.违章押金每辆车2000元；</text>-->
					<!--<text class="on-txt">4.同时可租1辆车；</text>-->
					<!--<div class="vipBg">-->
					<!--<image class="vip-img" src="/static/images/vip_comm@2x.png"/>-->
					<!--<text class="vip-text">黄金会员</text>-->
					<!--</div>-->
					<!--</div>-->
					<div class="flex-row">
						<div class='flex1' :style='onebackgroud'
							style='border-style:dashed;border-width: 1rpx;border-color: #999999;' @click="onChoose(1)">
							<view style='text-align: center'>
								<text
									:style="{fontSize:priceStyle.fontSize,margin:priceStyle.margin,color:priceStyle.color,justifyContent:priceStyle.justifyContent}">￥10000</text>
							</view>
							<div class="flex-row">
								<div
									:style="{marginTop:lineStyle.marginTop,width:lineStyle.width,borderTopColor:lineStyle.borderTopColor,borderTopWidth:lineStyle.borderTopWidth,borderTopStyle:lineStyle.borderTopStyle}">
								</div>

								<text :style="{color:titleStyle.color,fontSize:titleStyle.fontSize}">享受权益</text>

								<div
									:style="{marginTop:lineStyle.marginTop,width:lineStyle.width,borderTopColor:lineStyle.borderTopColor,borderTopWidth:lineStyle.borderTopWidth,borderTopStyle:lineStyle.borderTopStyle}">
								</div>
							</div>
							<view style='display: flex;flex-direction: column;'>
								<text
									:style="{width:txtStyle.width,marginLeft:txtStyle.marginLeft,marginTop:txtStyle.marginTop,color:txtStyle.color,fontSize:txtStyle.fontSize}">1.原每辆车押金5000元，现享3000元；</text>
								<text
									:style="{width:txtStyle.width,marginLeft:txtStyle.marginLeft,marginTop:txtStyle.marginTop,color:txtStyle.color,fontSize:txtStyle.fontSize}">2.租车费用享95折；</text>
								<!--<text :style="txtStyle">3.违章押金每辆车2000元；</text>-->
								<text
									:style="{width:txtStyle.width,marginLeft:txtStyle.marginLeft,marginTop:txtStyle.marginTop,color:txtStyle.color,fontSize:txtStyle.fontSize}">3.同时可租1辆车；</text>
							</view>

							<div class="vip-bg">
								<image class="vip-img"
									src="https://static.coolcargo.cn/public/image/applet/vip_gold@2x.png" />
								<text class="vip-text" style="color:#f5ea89">黄金会员</text>
							</div>
						</div>

						<div class="flex1" :style='threebackgroud'
							style='border-style:dashed;border-width: 1rpx;border-color: #999999;' @click="onChoose(2)">
							<view style='text-align: center;'>
								<text
									:style="{fontSize:priceStyle1.fontSize,margin:priceStyle1.margin,color:priceStyle1.color}">￥30000</text>
							</view>
							<div class="flex-row">
								<div
									:style="{marginTop:lineStyle1.marginTop,width:lineStyle1.width,borderTopColor:lineStyle1.borderTopColor,borderTopWidth:lineStyle1.borderTopWidth,borderTopStyle:lineStyle1.borderTopStyle}">
								</div>
								<text :style="{color:titleStyle1.color,fontSize:titleStyle1.fontSize}">享受权益</text>
								<div
									:style="{marginTop:lineStyle1.marginTop,width:lineStyle1.width,borderTopColor:lineStyle1.borderTopColor,borderTopWidth:lineStyle1.borderTopWidth,borderTopStyle:lineStyle1.borderTopStyle}">
								</div>
							</div>
							<view style='display: flex;flex-direction: column;'>
								<text
									:style="{width:txtStyle1.width,marginLeft:txtStyle1.marginLeft,marginTop:txtStyle1.marginTop,color:txtStyle1.color,fontSize:txtStyle1.fontSize}">1.原每辆车押金5000元，现享3000元；</text>
								<text
									:style="{width:txtStyle1.width,marginLeft:txtStyle1.marginLeft,marginTop:txtStyle1.marginTop,color:txtStyle1.color,fontSize:txtStyle1.fontSize}">2.租车费用享9折；</text>
								<!--<text :style="txtStyle1">3.违章押金每辆车2000元；</text>-->
								<text
									:style="{width:txtStyle1.width,marginLeft:txtStyle1.marginLeft,marginTop:txtStyle1.marginTop,color:txtStyle1.color,fontSize:txtStyle1.fontSize}">3.同时可租3辆车；</text>
							</view>
							<div class="vip-bg">
								<image class="vip-img"
									src="https://static.coolcargo.cn/public/image/applet/vip_plat@2x.png" />
								<text class="vip-text" style="color: #c2c2c2">白金会员</text>
							</div>
						</div>
					</div>

					<div class="flex-row" style="margin-top: 20rpx">
						<div class="flex1" :style='fivebackgroud'
							style='border-style:dashed;border-width: 1rpx;border-color: #999999;' @click="onChoose(3)">
							<view style='text-align: center;'>
								<text
									:style="{fontSize:priceStyle2.fontSize,margin:priceStyle2.margin,color:priceStyle2.color}">￥50000</text>
							</view>
							<div class="flex-row">
								<div
									:style="{marginTop:lineStyle2.marginTop,width:lineStyle2.width,borderTopColor:lineStyle2.borderTopColor,borderTopWidth:lineStyle2.borderTopWidth,borderTopStyle:lineStyle2.borderTopStyle}">
								</div>
								<text :style="{color:titleStyle2.color,fontSize:titleStyle2.fontSize}">享受权益</text>
								<div
									:style="{marginTop:lineStyle2.marginTop,width:lineStyle2.width,borderTopColor:lineStyle2.borderTopColor,borderTopWidth:lineStyle2.borderTopWidth,borderTopStyle:lineStyle2.borderTopStyle}">
								</div>
							</div>
							<view style='display: flex;flex-direction: column;'>
								<text
									:style="{width:txtStyle2.width,marginLeft:txtStyle2.marginLeft,marginTop:txtStyle2.marginTop,color:txtStyle2.color,fontSize:txtStyle2.fontSize}">1.原每辆车押金5000元，现享3000元；</text>
								<text
									:style="{width:txtStyle2.width,marginLeft:txtStyle2.marginLeft,marginTop:txtStyle2.marginTop,color:txtStyle2.color,fontSize:txtStyle2.fontSize}">2.租车费用享85折；</text>
								<!--<text :style="txtStyle2">3.违章押金每辆车2000元；</text>-->
								<text
									:style="{width:txtStyle2.width,marginLeft:txtStyle2.marginLeft,marginTop:txtStyle2.marginTop,color:txtStyle2.color,fontSize:txtStyle2.fontSize}">3.同时可租5辆车；</text>
							</view>
							<div class="vip-bg">
								<image class="vip-img"
									src="https://static.coolcargo.cn/public/image/applet/vip_diamond@2x.png" />
								<text class="vip-text" style="color: #568fcd">钻石会员</text>
							</div>
						</div>
						<div class="flex1" :style='otherbackgroud'
							style='border-style:dashed;border-width: 1rpx;border-color: #999999;' @click="onChoose(4)">
							<view style='text-align: center;display: flex;flex-direction: column; padding: 40px;'>
								<text
									:style="{fontSize:priceStyle3.fontSize,margin:priceStyle3.margin,color:priceStyle3.color}">其他</text>
								<text
									:style="{width:txtStyle3.width,marginLeft:txtStyle3.marginLeft,marginTop:txtStyle3.marginTop,color:txtStyle3.color,fontSize:txtStyle3.fontSize}">自定义金额</text>
							</view>
						</div>
					</div>
				</div>
				<div style="padding: 20rpx;display: flex;flex-direction: column;">
					<text style="font-size: 25rpx;color: #ff6004">【充值福利】</text>
					<text style="font-size: 25rpx;color: #ff6004">充值10000元，送5张100元优惠券。</text>
					<text style="font-size: 25rpx;color: #ff6004">充值30000元，送10张200元优惠券。</text>
					<text style="font-size: 25rpx;color: #ff6004">充值50000元，送10张200元、3张500元优惠券。</text>
					<text
						style="font-size: 28rpx;color: #ff6004">【注】：充值金额用于酷享租车使用，不予退还。优惠券具体使用规则请在“我的钱包”-“优惠券”中查看。</text>
				</div>
			</cell>
		</list>
		<div class="flex-row align" style="justify-content: center;margin-top: 10rpx;margin-bottom: 30rpx">
			<image class="question-img" src="../../../static/images/question@2x.png" />
			<text style="text-decoration: underline;font-size: 28rpx;color: #ff6004" @click="toVipExplain">会员等级说明</text>
		</div>
		<!-- <wxc-popup popup-color="rgb(255, 255, 255)" :show="isBottomShow" @wxcPopupOverlayClicked="popupOverlayBottomClick"
      pos="bottom" :height="rechargeHeight"> -->
		<!-- #ifdef APP -->


		<!-- <popupBottom ref="popup"  :visible.sync="popupVisible" title="标题"  radius="40"  maxHeight="900"   @close="" @reachBottom="onPopupReachBottom">
	     
	 
		<div>
			<div class="flex-row align" style="padding: 30rpx">
				<image class="cancel-btn" @click="bottomCancel" src="/static/images/cancel_img@2x.png" />
				<text style="width:560rpx;text-align: center;font-size: 30rpx;color: black">确认付款</text>
			</div>
			<div class="amount-bg">
				<text class="text-black" style="margin-right: 30rpx">储值金额</text>
				<input v-if="isEdit" class="amount-input" type="number" placeholder="请输入储值金额" @input="inputChange" />
				<text v-if="!isEdit" class="text-black">{{amount}}</text>
				<text class="text-black">元</text>
			</div>
			<div class="line-gray"></div>
			<div class="flex-row align" @click="payChoose(0)">
				<image class="ali-img" src="/static/images/ali_pay_img@2x.png" />
				<text class="text-black" style="width: 520rpx;font-size: 25rpx">支付宝</text>
				<image v-if="aliChoose" class="radio-img" src="/static/images/radio_checked@2x.png" />
				<image v-if="!aliChoose" class="radio-img" src="/static/images/radio_unchecked@2x.png" />
			</div>
			<div class="line-gray"></div>
			<div class="flex-row align" @click="payChoose(1)">
				<image class="ali-img" src="/static/images/wx_pay_img@2x.png" />
				<text class="text-black" style="width: 520rpx;font-size: 25rpx">微信支付</text>
				<image v-if="wxChoose" class="radio-img" src="/static/images/radio_checked@2x.png" />
				<image v-if="!wxChoose" class="radio-img" src="/static/images/radio_unchecked@2x.png" />
			</div>
			<div class="line-gray" style="margin-top: 50rpx"></div>
			<div class="flex-row align" style="height:90rpx;background-color: #ffffff;border-top-color: #999999">
				<text class="text-black" style="margin-left: 30rpx;font-size: 25rpx">需支付</text>
				<text style="color:#ff6004;margin-left: 10rpx;font-size: 28rpx">￥{{needPay}}</text>
				<div class="flex1"></div>
				<text v-if="canClick" class="pay-btn" @click="postToPay">确认储值</text>
				<text v-if="!canClick" class="pay-btn1">确认储值</text>
			</div>
		</div> -->
		<!-- </wxc-popup> -->
		<!-- <wxc-mask height="400" width="650" border-radius="10" duration="200" :top="300" mask-bg-color="#FFFFFF"
      :overlay-can-close="true" :has-animation="true" :has-overlay="true" :show-close="false" :show="questionShow"
      @wxcMaskSetHidden="questionSetHidden"> -->
		<!-- <div class="align">
        <div class="flex-row align">
          <text
            style="width:510rpx;font-size: 32rpx;color:#333333;margin: 30rpx;text-align: center">{{questionTitle}}</text>
          <image class="cancel-btn" src="/static/images/cancel_img@2x.png" @click="toCancel" />
        </div>
        <text class="text-black"
          style="line-height: 40rpx;padding-left: 30rpx;padding-right: 30rpx;margin-bottom: 20rpx">{{questionTxt}}</text>
      </div>-->
		<!-- </popupBottom> -->
		<!-- #endif -->
	</div>
</template>
<script>
	import {
		post,
		get
	} from "../../../utils/netUtil.js";
	import util from '../../../utils/util.js'
	export default {
		data() {
			return {
				code: 0,
				amount: 0,
				needPay: 0,
				editAmount: "",
				userData: {},
				userCash: 0,
				payMethod: 2,
				isEdit: false,
				isBottomShow: false,
				cashChecked: true,
				aliChoose: true,
				wxChoose: false,
				canClick: false,
				onebackgroud: 'background-color: #ffffff;',
				threebackgroud: 'background-color: #ffffff;',
				fivebackgroud: 'background-color: #ffffff;',
				otherbackgroud: 'background-color: #ffffff;',
				priceStyle: {
					margin: "25rpx",
					color: "#333333",
					fontSize: "30rpx"
				},
				priceStyle1: {
					margin: "15rpx",
					color: "#333333",
					fontSize: "30rpx"
				},
				priceStyle2: {
					margin: "15rpx",
					color: "#333333",
					fontSize: "30rpx"
				},
				priceStyle3: {
					margin: "15rpx",
					color: "#333333",
					fontSize: "30rpx"
				},
				titleStyle: {
					color: "#999999",
					fontSize: "20rpx"
				},
				titleStyle1: {
					color: "#999999",
					fontSize: "20rpx"
				},
				titleStyle2: {
					color: "#999999",
					fontSize: "20rpx"
				},
				txtStyle: {
					width: "300rpx",
					marginLeft: "5rpx",
					marginTop: "10rpx",
					color: "#999999",
					fontSize: "22rpx"
				},
				txtStyle1: {
					width: "300rpx",
					marginLeft: "5rpx",
					marginTop: "10rpx",
					color: "#999999",
					fontSize: "22rpx"
				},
				txtStyle2: {
					width: "300rpx",
					marginLeft: "5rpx",
					marginTop: "10rpx",
					color: "#999999",
					fontSize: "22rpx"
				},
				txtStyle3: {
					marginTop: "10rpx",
					color: "#999999",
					fontSize: "22rpx"
				},
				lineStyle: {
					marginTop: "10rpx",
					width: "120rpx",
					borderTopColor: "#cccccc",
					borderTopWidth: "1px",
					borderTopStyle: "dashed"
				},
				lineStyle1: {
					marginTop: "10rpx",
					width: "120rpx",
					borderTopColor: "#cccccc",
					borderTopWidth: "1rpx",
					borderTopStyle: "dashed"
				},
				lineStyle2: {
					marginTop: "10rpx",
					width: "120rpx",
					borderTopColor: "#cccccc",
					borderTopWidth: "1rpx",
					borderTopStyle: "dashed"
				},
				rechargeHeight: 530,
				questionShow: false,
				questionTitle: "违损押金介绍",
				questionTxt: "违损保证金的充值标准，与服务类型相关，不同服务所需冻结的违损保证金额度不同，同时使用车辆每增加一台，须再支付一份违损保证金，违损保证金将冻结在用户的违损保证金账户中。用车结束后，可在30日后向酷享出行APP发起提现申请，平台在3个工作日内受理，具体到账时间以各银行/平台规则为准。"
			};
		},
		components: {},
		methods: {
			questionClick() {
				uni.showModal({
					title: '违损押金介绍',
					content: '违损保证金的充值标准，与服务类型相关，不同服务所需冻结的违损保证金额度不同，同时使用车辆每增加一台，须再支付一份违损保证金，违损保证金将冻结在用户的违损保证金账户中。用车结束后，可在30日后向酷享出行APP发起提现申请，平台在3个工作日内受理，具体到账时间以各银行/平台规则为准。',
					showCancel: false
				})

			},
			questionSetHidden() {
				this.questionShow = false;
			},
			toIncome() {
				uni.navigateTo({
					url: './incomeDetail?type=1'
				})
			},
			// #ifdef APP
			postToPay() {
				if (this.wxChoose) {
					var result = bmWXPay.isInstallWXApp();
					if (!result) {
						uni.showToast({
							title: '还未安装微信',
							icon: 'error',
						});
						return;
					}
				}
				var userId = uni.getStorageSync("user_id");
				var token = uni.getStorageSync("user_token");
				if (!userId || !token) {
					return;
				}
				var dict = {
					user_id: userId,
					user_token: token,
					pay_type: 1,
					order_id: 0,
					amount: this.needPay,
					pay_method: this.payMethod
				};
				post("/pay", dict).then(res => {
					if (this.payMethod == 2) this.toAliPay(res);
					else if (this.payMethod == 3) {
						this.toWxPay(res)
					}

				});
			},
			// #endif
			// #ifdef MP-WEIXIN
			postToPay() {
				var userId = uni.getStorageSync('user_id');
				var token = uni.getStorageSync('user_token');
				if (!userId || !token) {
					return;
				}
				var dict = {
					user_id: userId,
					user_token: token,
					pay_type: 1,
					order_id: 0,
					amount: this.needPay,
					pay_method: 4,
					code: this.code
				};
				post('/pay', dict).then(res => {
					if (!res.sign) {
						uni.showToast({
							title: res.message,
							icon: 'none'
						})

					} else {
						this.toWxcPay(res)
					}



				})
			},

			// #endif
			toWxcPay(data) {
				const self = this;
				wx.requestPayment({
					timeStamp: data.timestamp,
					nonceStr: data.nonce_str,
					package: data.prepay_id,
					signType: 'MD5',
					paySign: data.sign,
					success(res) {
						if (res) {
							// self.toqueryPay(data)
							// (res)
							uni.showModal({
								title: '储值成功',
								showCancel: false
							})
							self.userData.balance += self.needPay;
							uni.setStorageSync("user_info", self.userData);
							setTimeout(function() {
								uni.$emit('ispay', 1)
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
			toWxPay(data) {
				const self = this;
				bmWXPay.pay(data, function(resData) {
					if (resData.status === 0) {
						self.$notice.toast({
							message: "储值成功"
						});
						self.isBottomShow = false;
						self.userData.balance += self.needPay;
						self.$storage.setSync("user_info", self.userData);
						self.$router.setBackParams({
							isConfirm: 1
						});
						self.$router.back({
							type: "PUSH"
						});
					} else if (resData.status === 2) {
						self.$notice.toast({
							message: "用户已取消"
						});
					} else if (resData.status === -1) {
						self.$notice.toast({
							message: "支付失败"
						});
					}
				});
			},
			toAliPay(authInfo) {
				const self = this;
				bmAliPay.pay({
						authInfo: authInfo,
						scheme: "coolcargo",
						isSandbox: false
					},
					function(resData) {
						if (resData.status == 9000) {
							self.$notice.toast({
								message: "储值成功"
							});
							self.userData.balance += self.needPay;
							self.isBottomShow = false;
							self.$storage.setSync("user_info", self.userData);
							self.$router.setBackParams({
								isConfirm: 1
							});
							self.$router.back({
								type: "PUSH"
							});
						} else if (resData.status == 6001) {
							self.$notice.toast({
								message: "用户已取消"
							});
						}
					}
				);
			},
			inputChange: function(event) {
				const self = this;
				self.editAmount = event.value;
				if (self.editAmount.length > 0) {
					self.amount = parseInt(self.editAmount);
					if (self.amount > 0) {
						self.canClick = true;
						// if(self.cashChecked)
						// self.needPay = self.amount-self.userCash > 0?self.amount - self.userCash:0;
						// else
						self.needPay = self.amount;
					} else {
						self.canClick = false;
						self.amount = 0;
						self.needPay = 0;
					}
				} else {
					self.canClick = false;
					self.amount = 0;
					self.needPay = 0;
				}
			},
			popupOverlayBottomClick() {
				this.isBottomShow = false;
			},
			// cashCheck(){
			//     this.cashChecked = !this.cashChecked;
			//     if(this.cashChecked)
			//         this.needPay = this.amount-this.userCash > 0?this.amount - this.userCash:0;
			//     else
			//         this.needPay = this.amount;
			// },
			toCancel() {
				this.questionShow = false;
			},
			bottomCancel() {
				this.isBottomShow = false;
			},
			payChoose(type) {
				if (type == 0) {
					this.aliChoose = true;
					this.wxChoose = false;
					this.payMethod = 2;
				} else {
					this.aliChoose = false;
					this.wxChoose = true;
					this.payMethod = 3;
				}
			},
			onChoose(type) {
				// this.isBottomShow = true;
				if (type == 1) {
					this.onebackgroud = 'background-color:#cccccc'
					this.threebackgroud = 'background-color: #ffffff'
					this.fivebackgroud = 'background-color: #ffffff'
					this.otherbackgroud = 'background-color: #ffffff'
					this.priceStyle = {
						margin: "15rpx",
						color: "#ff6004",
						fontSize: "30rpx"
					};
					this.priceStyle1 = {
						margin: "15rpx",
						color: "#333333",
						fontSize: "30rpx"
					};
					this.priceStyle2 = {
						margin: "15rpx",
						color: "#333333",
						fontSize: "30rpx"
					};
					this.priceStyle3 = {
						margin: "15rpx",
						color: "#333333",
						fontSize: "30rpx"
					};
					this.titleStyle = {
						color: "#ff6004",
						fontSize: "20rpx"
					};
					this.titleStyle1 = {
						color: "#999999",
						fontSize: "20rpx"
					};
					this.titleStyle2 = {
						color: "#999999",
						fontSize: "20rpx"
					};
					this.txtStyle = {
						width: "300rpx",
						marginLeft: "5rpx",
						marginTop: "10rpx",
						color: "#333333",
						fontSize: "22rpx"
					};
					this.txtStyle1 = {
						width: "300rpx",
						marginLeft: "5rpx",
						marginTop: "10rpx",
						color: "#999999",
						fontSize: "22rpx"
					};
					this.txtStyle2 = {
						width: "300rpx",
						marginLeft: "5rpx",
						marginTop: "10rpx",
						color: "#999999",
						fontSize: "22rpx"
					};
					this.txtStyle3 = {
						marginTop: "10rpx",
						color: "#999999",
						fontSize: "22rpx"
					};
					this.lineStyle = {
						marginTop: "10rpx",
						width: "120rpx",
						borderTopColor: "#ff6004",
						borderTopWidth: "1rpx",
						borderTopStyle: "dashed"
					};
					this.lineStyle1 = {
						marginTop: "10rpx",
						width: "120rpx",
						borderTopColor: "#cccccc",
						borderTopWidth: "1rpx",
						borderTopStyle: "dashed"
					};
					this.lineStyle2 = {
						marginTop: "10rpx",
						width: "120rpx",
						borderTopColor: "#cccccc",
						borderTopWidth: "1rpx",
						borderTopStyle: "dashed"
					};
					this.needPay = 10000;
					const self = this
					setTimeout(function() {
						uni.showModal({
							title: '提示',
							content: '确定充值：10000元！',
							confirmColor: '#ff6004',
							success(res) {
								if (res.confirm) {
									self.postToPay()
								} else if (res.cancel) {
									return
								}
							}
						})
					}, 1000);

					// this.amount = 10000;
					// if(this.cashChecked)
					// this.needPay = this.amount-this.userCash > 0?this.amount - this.userCash:0;
					// else
					// this.cur = 1

					// this.needPay = this.amount;

					// this.isEdit = false;
					// this.canClick = true;
				} else if (type == 2) {
					this.onebackgroud = 'background-color:#FfFfff'
					this.threebackgroud = 'background-color: #cccccc'
					this.fivebackgroud = 'background-color: #ffffff'
					this.otherbackgroud = 'background-color: #ffffff'
					this.priceStyle = {
						margin: "15rpx",
						color: "#333333",
						fontSize: "30rpx"
					};
					this.priceStyle1 = {
						margin: "15rpx",
						color: "#ff6004",
						fontSize: "30rpx"
					};
					this.priceStyle2 = {
						margin: "15rpx",
						color: "#333333",
						fontSize: "30rpx"
					};
					this.priceStyle3 = {
						margin: "15rpx",
						color: "#333333",
						fontSize: "30rpx"
					};
					this.titleStyle = {
						color: "#999999",
						fontSize: "20rpx"
					};
					this.titleStyle1 = {
						color: "#ff6004",
						fontSize: "20rpx"
					};
					this.titleStyle2 = {
						color: "#999999",
						fontSize: "20rpx"
					};
					this.txtStyle = {
						width: "300rpx",
						marginLeft: "5rpx",
						marginTop: "10rpx",
						color: "#999999",
						fontSize: "22rpx"
					};
					this.txtStyle1 = {
						width: "300rpx",
						marginLeft: "5rpx",
						marginTop: "10rpx",
						color: "#333333",
						fontSize: "22rpx"
					};
					this.txtStyle2 = {
						width: "300rpx",
						marginLeft: "5rpx",
						marginTop: "10rpx",
						color: "#999999",
						fontSize: "22rpx"
					};
					this.txtStyle3 = {
						marginTop: "10rpx",
						color: "#999999",
						fontSize: "22rpx"
					};
					this.lineStyle = {
						marginTop: "10rpx",
						width: "120rpx",
						borderTopColor: "#cccccc",
						borderTopWidth: "1rpx",
						borderTopStyle: "dashed"
					};
					this.lineStyle1 = {
						marginTop: "10rpx",
						width: "120rpx",
						borderTopColor: "#ff6004",
						borderTopWidth: "1rpx",
						borderTopStyle: "dashed"
					};
					this.lineStyle2 = {
						marginTop: "10rpx",
						width: "120rpx",
						borderTopColor: "#cccccc",
						borderTopWidth: "1rpx",
						borderTopStyle: "dashed"
					};
					this.needPay = 30000;
					const self = this
					setTimeout(function() {
						uni.showModal({
							title: '提示',
							content: '确定充值：30000元！',
							confirmColor: '#ff6004',
							success(res) {
								if (res.confirm) {
									self.postToPay()
								} else if (res.cancel) {
									return
								}
							}
						})
					}, 1000);

					// if(this.cashChecked)
					//     this.needPay = this.amount-this.userCash > 0?this.amount - this.userCash:0;
					// else
					// this.needPay = this.amount;
					// this.canClick = true;

					// this.isEdit = false;
				} else if (type == 3) {
					this.onebackgroud = 'background-color:#FfFfff'
					this.threebackgroud = 'background-color: #FfFfFf'
					this.fivebackgroud = 'background-color: #cccccc'
					this.otherbackgroud = 'background-color: #ffffff'
					this.priceStyle = {
						margin: "15rpx",
						color: "#333333",
						fontSize: "30rpx"
					};
					this.priceStyle1 = {
						margin: "15rpx",
						color: "#333333",
						fontSize: "30rpx"
					};
					this.priceStyle2 = {
						margin: "15rpx",
						color: "#ff6004",
						fontSize: "30rpx"
					};
					this.priceStyle3 = {
						margin: "15rpx",
						color: "#333333",
						fontSize: "30rpx"
					};
					this.titleStyle = {
						color: "#999999",
						fontSize: "20rpx"
					};
					this.titleStyle1 = {
						color: "#999999",
						fontSize: "20rpx"
					};
					this.titleStyle2 = {
						color: "#ff6004",
						fontSize: "20rpx"
					};
					this.txtStyle = {
						width: "300rpx",
						marginLeft: "5rpx",
						marginTop: "10rpx",
						color: "#999999",
						fontSize: "22rpx"
					};
					this.txtStyle1 = {
						width: "300rpx",
						marginLeft: "5rpx",
						marginTop: "10rpx",
						color: "#999999",
						fontSize: "22rpx"
					};
					this.txtStyle2 = {
						width: "300rpx",
						marginLeft: "5rpx",
						marginTop: "10rpx",
						color: "#333333",
						fontSize: "22rpx"
					};
					this.txtStyle3 = {
						marginTop: "10rpx",
						color: "#999999",
						fontSize: "22rpx"
					};
					this.lineStyle = {
						marginTop: "10rpx",
						width: "120rpx",
						borderTopColor: "#cccccc",
						borderTopWidth: "1rpx",
						borderTopStyle: "dashed"
					};
					this.lineStyle1 = {
						marginTop: "10rpx",
						width: "120rpx",
						borderTopColor: "#cccccc",
						borderTopWidth: "1rpx",
						borderTopStyle: "dashed"
					};
					this.lineStyle2 = {
						marginTop: "10rpx",
						width: "120rpx",
						borderTopColor: "#ff6004",
						borderTopWidth: "1rpx",
						borderTopStyle: "dashed"
					};
					this.needPay = 50000;
					const self = this
					setTimeout(function() {
						uni.showModal({
							title: '提示',
							content: '确定充值：50000元！',
							confirmColor: '#ff6004',
							success(res) {
								if (res.confirm) {
									self.postToPay()
								} else if (res.cancel) {
									return
								}
							}
						})
					}, 1000);

					// if(this.cashChecked)
					//     this.needPay = this.amount-this.userCash > 0?this.amount - this.userCash:0;
					// else
					// this.needPay = this.amount;
					// this.cur = 3
					// this.canClick = true;
					// this.isEdit = false;
				} else {
					this.onebackgroud = 'background-color:#FfFfff'
					this.threebackgroud = 'background-color: #FfFfFf'
					this.fivebackgroud = 'background-color: #ffffff'
					this.otherbackgroud = 'background-color: #cccccc'
					this.priceStyle = {
						margin: "15rpx",
						color: "#333333",
						fontSize: "30rpx"
					};
					this.priceStyle1 = {
						margin: "15rpx",
						color: "#333333",
						fontSize: "30rpx"
					};
					this.priceStyle2 = {
						margin: "15rpx",
						color: "#333333",
						fontSize: "30rpx"
					};
					this.priceStyle3 = {
						margin: "15rpx",
						color: "#ff6004",
						fontSize: "30rpx"
					};
					this.titleStyle = {
						color: "#999999",
						fontSize: "20rpx"
					};
					this.titleStyle1 = {
						color: "#999999",
						fontSize: "20rpx"
					};
					this.titleStyle2 = {
						color: "#999999",
						fontSize: "20rpx"
					};
					this.txtStyle = {
						width: "300rpx",
						marginLeft: "5rpx",
						marginTop: "10rpx",
						color: "#999999",
						fontSize: "22rpx"
					};
					this.txtStyle1 = {
						width: "300rpx",
						marginLeft: "5rpx",
						marginTop: "10rpx",
						color: "#999999",
						fontSize: "22rpx"
					};
					this.txtStyle2 = {
						width: "300rpx",
						marginLeft: "5rpx",
						marginTop: "10rpx",
						color: "#999999",
						fontSize: "22rpx"
					};
					this.txtStyle3 = {
						marginTop: "10rpx",
						color: "#ff6004",
						fontSize: "22rpx"
					};
					this.lineStyle = {
						marginTop: "10rpx",
						width: "120rpx",
						borderTopColor: "#cccccc",
						borderTopWidth: "1rpx",
						borderTopStyle: "dashed"
					};
					this.lineStyle1 = {
						marginTop: "10rpx",
						width: "120rpx",
						borderTopColor: "#cccccc",
						borderTopWidth: "1rpx",
						borderTopStyle: "dashed"
					};
					this.lineStyle2 = {
						marginTop: "10rpx",
						width: "120rpx",
						borderTopColor: "#cccccc",
						borderTopWidth: "1rpx",
						borderTopStyle: "dashed"
					};
					// this.amount = 0;
					// this.needPay = 0;
					// this.canClick = false;
					// this.isEdit = true;
					const self = this
					setTimeout(function() {
						uni.showModal({
							title: '提示',
							placeholderText: '请输入金额！',
							editable: true,
							confirmColor: '#ff6004',
							success(res) {
								if (res.confirm) {
									self.needPay = parseInt(res.content)
									self.postToPay()
								} else if (res.cancel) {
									return
								}
							}
						})
					}, 1000);

				}
			},
			toVipExplain() {
				uni.navigateTo({
					url: './vipExplain'
				});
			},
			getData() {
				this.userData = {};
				if (uni.getStorageSync("user_info")) {
					this.userData = uni.getStorageSync("user_info");
					// (this.userData)
					if (this.userData.deposit > 0) {
						var over = this.userData.balance - this.userData.deposit;
						if (over >= 0) {
							this.userCash = this.userData.cash;
						} else {
							var cash = this.userData.cash + over;
							if (cash >= 0) {
								this.userCash = cash;
							} else {
								this.userCash = 0;
							}
						}
					} else {
						this.userCash = this.userData.cash;
					}
				}
			}
		},
		created() {
			this.getData();
			// if(util.env.isIOS()){
			//     // this.rechargeHeight = 530 + weex.config.env.touchBarHeight;
			// }
		},
		// #ifdef MP-WEIXIN
		onLoad() {
			var self = this;
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
					}
				}
			})
			setTimeout(function() {
				uni.stopPullDownRefresh();
			}, 500);
		},
		// #endif

	};
</script>
<style lang="scss" scoped>
	.card-bg {
		height: 220rpx;
		align-items: center;
		justify-content: center;
		background-color: #595959;
		border-radius: 10rpx;
		/*background: linear-gradient(to right , #5d5d5d, #333333);*/
	}

	/*.on-bg{*/
	/*background-color: #fefbf3;*/
	/*border-width: 1rpx;*/
	/*border-color: #fabe00;*/
	/*}*/
	/*.on-price{*/
	/*margin: 20rpx;*/
	/*color: #fabe00;*/
	/*font-size: 35rpx;*/
	/*}*/
	/*.on-title{*/
	/*color: #fabe00;*/
	/*font-size: 22rpx;*/
	/*}*/
	/*.on-txt{*/
	/*width: 205rpx;*/
	/*margin-left: 5rpx;*/
	/*margin-top: 10rpx;*/
	/*color: #333333;*/
	/*font-size: 23rpx;*/
	/*}*/
	/*.on-line{*/
	/*width: 50rpx;*/
	/*height: 1rpx;*/
	/*color: #fabe00;*/
	/*border-style: dashed;*/
	/*}*/
	/*.off-bg{*/
	/*background-color: #ffffff;*/
	/*border-width: 1rpx;*/
	/*border-color: #cccccc;*/
	/*}*/
	/*.off-price{*/
	/*margin: 20rpx;*/
	/*color: #333333;*/
	/*font-size: 35rpx;*/
	/*}*/
	/*.off-title{*/
	/*color: #999999;*/
	/*font-size: 22rpx;*/
	/*}*/
	/*.off-txt{*/
	/*width: 205rpx;*/
	/*margin-top: 10rpx;*/
	/*color: #999999;*/
	/*font-size: 23rpx;*/
	/*}*/
	/*.off-line{*/
	/*color: #cccccc;*/
	/*border-style: dashed;*/
	/*width: 50rpx;*/
	/*height: 1rpx;*/
	/*}*/
	.vip-bg {
		display: flex;
		flex-direction: row;
		margin-top: 40rpx;
		margin-bottom: 30rpx;
	}

	.cancel-btn {
		width: 50rpx;
		height: 50rpx;
	}

	.amount-bg {
		flex-direction: row;
		align-items: center;
		height: 100rpx;
		padding: 10rpx 30rpx;

	}

	.amount-input {
		width: 200rpx;
		height: 80rpx;
		color: #333333;
		font-size: 25rpx;
		margin-right: 10rpx;
		padding: 1r0rpx;
		background-color: #fafafa;
		border-width: 1rpx;
		border-color: #989898;
		border-radius: 15rpx;
	}

	.cancel-btn {
		width: 50rpx;
		height: 50rpx;
		margin-right: 30rpx;
	}

	.pay-btn {
		width: 250rpx;
		height: 90rpx;
		text-align: center;
		background-color: #333333;
		font-size: 25rpx;
		line-height: 90rpx;
		color: #ffffff;
	}

	.pay-btn1 {
		width: 250rpx;
		height: 90rpx;
		text-align: center;
		background-color: #999999;
		font-size: 25rpx;
		line-height: 90rpx;
		color: #ffffff;
	}

	.deposit-bg {
		line-height: 30px;
		flex-direction: row;
		align-items: center;
		height: 70rpx;
		margin-top: 10rpx;
		padding-left: 10rpx;
		background-color: #fff7d6;
		border-radius: 12rpx;
	}

	.flex1 {
		width: 320px;
		height: 160px;
		align-items: center;
		margin-left: 35rpx,
	}
</style>
