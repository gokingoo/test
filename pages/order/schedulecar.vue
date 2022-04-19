<template>
	<div>
		<div class="flex-row">
			<view class="tab-content" :style="shortcolor" @click="car_title(1)" :class="{active:cur==1}">
				<image class='share-img' :src="ShortRental"></image>
				<text :style="{fontSize:chooseTxt.fontSize,color:chooseTxt.color}">短租</text>
			</view>
			<view class="tab-content" :style="longcolor" @click="car_title(2)" :class="{active:cur==2}">
				<image class='share-img' :src="LongRent"></image>
				<text :style="{fontSize:chooseTxt1.fontSize,color:chooseTxt1.color}">长租</text>
			</view>
		</div>
		<cell class="cell" v-show="cur==1">
			<div class="border-contain">
				<div class="flex-row align">
					<div class="flex1" style="overflow: hidden; margin: 10px;">
						<div class="flex-row align" @click="toAddrChoose(0)">
							<image class="addr-img" src="/static/images/get_img@2x.png" />
							<text class="text-gray">上海</text>
							<image class="down" src="https://static.coolcargo.cn/public/image/applet/down_gray@2x.png" />
							<text
								style="color:#333333;font-size: 28rpx;white-space: nowrap;text-overflow: ellipsis;overflow:hidden">{{getAddress}}</text>
						</div>
						<div class="line-gray"></div>
						<div class="flex-row align" @click="toAddrChoose(1)">
							<image class="addr-img" src="/static/images/return_img@2x.png" />
							<text class="text-gray">上海</text>
							<image class="down" src="https://static.coolcargo.cn/public/image/applet/down_gray@2x.png" />
							<text
								style="color:#333333;font-size: 28rpx;white-space:nowrap;text-overflow: ellipsis;overflow: hidden">{{returnAddress}}</text>
						</div>
					</div>
					<div>
						<text class="border-btn margin20" style='font-size: 28rpx;' @click="pickDate">上门送取车</text>
					</div>
				</div>

				<div class="line-gray"></div>
				<div class="flex-row align">
					<div class="align flex1" @click="DatePicker(0)">
						<div class="align flex1" style="display: flex;flex-direction: column; margin: 10px;">
							<text class="text-black" style="font-size: 28rpx">{{getDayTxt}}</text>
							<text class="text-gray margin-top5">{{getTimeTxt}}</text>
						</div>

					</div>
					<div class="align" style="padding-bottom: 10rpx">
						<text class="text-yellow"
							style="display: flex;flex-direction: column; align-items: center;">{{daysTxt}}</text>
						<image class="line-img" src="/static/images/line_img@2x.png" />
					</div>
					<div class="align flex1" @click="DatePicker(1)">
						<div class="align flex1" style="display: flex;flex-direction: column;">
							<text class="text-black" style="font-size: 28rpx">{{backDayTxt}}</text>
							<text class="text-gray margin-top5">{{backTimeTxt}}</text>
						</div>
					</div>
				</div>
			</div>
			<div v-if="comeType == 0" class="border-contain align">
				<div class="line-gray margin-top20"></div>
				<div class="flex-row align">
					<image class="question-img" src="/static/images/tel_img@2x.png" />
					<input class="input1" type="number" placeholder="请输入租车用户联系手机" maxlength=11 v-model="userMobile" />
					<!-- <div class="flex-row align" @click="toContacts(0)">
                                    <!-- <image class="question-img" src="/static/images/add_img@2x.png"/>
                                    <!-- <text class="text-black">通讯录</text> 
                                </div> -->
				</div>
			</div>
			<div class="border-contain align margin-top20">
				<view style="display: flex;flex-direction: column; align-items: center; ">
					<image class="car-image" resize="cover" :src="carImg" />
					<text class="text-black margin-top5" style="font-size: 30rpx">{{carTitle}}</text>
					<text class="text-gray margin-top5" style="font-size: 25rpx">{{carData.car_detail}}</text>
					<div class="flex-row align margin-top5">
						<div style="margin-right:10rpx;">
							<text class="text-yellow">{{dayPrice}}</text>
						</div>
						<div class="vip-tag-contain flex-row align" @click="toValueCard">
							<image class="vip-tag-img" src="/static/images/vip_tag@2x.png"></image>
							<text class="vip-tag-text">会员低至￥{{Math.round(carData.day_price * 0.85)}}/天</text>
						</div>
					</div>
				</view>

				<div class="line-gray margin-top20"></div>
				<div class="insure-bg">
					<text class="text-black">基础保障车险服务费</text>
					<text class="text-yellow" style="width: 170rpx">￥{{carData.insurance_price}}元/天</text>
					<image class="question-img" src="/static/images/question@2x.png" @click="questionClick(0)" />
					<div style="width: 225rpx"></div>
				</div>
				<div class="line-gray"></div>
				<div class="insure-bg">
					<text class="text-black">是否需要车险不计免赔</text>
					<text class="text-yellow" style="width: 150rpx">￥{{carData.insurance_price2}}元/天</text>
					<image class="question-img" src="/static/images/question@2x.png" @click="questionClick(1)" />
					<div style="width: 145rpx"></div>
					<image v-if="needInsurance" class="check-img" src="/static/images/radio_yes@2x.png"
						@click="checkClick(0)" />
					<image v-if="!needInsurance" class="check-img" src="/static/images/radio_no@2x.png"
						@click="checkClick(0)" />
				</div>
				<!--<div class="line-gray"></div>-->
				<!--<div class="insure-bg">-->
				<!--<text class="text-black">是否需要尊享司机服务</text>-->
				<!--<text class="text-yellow" style="width: 150rpx">￥{{driverPrice}}元/天</text>-->
				<!--<image class="question-img" src="/static/images/question@2x.png" @click="questionClick(2)" />-->
				<!--<div style="width: 140rpx"></div>-->
				<!--<image v-if="needDriver" class="check-img" src="/static/images/radio_yes@2x.png" @click="checkClick(1)" />-->
				<!--<image v-if="!needDriver" class="check-img" src="/static/images/radio_no@2x.png" @click="checkClick(1)" />-->
				<!--</div>-->
				<!--<div v-if="needDriver" class="insure-bg">-->
				<!--<text class="text-black">您需要使用专属代驾司机天数为</text>-->
				<!--<text class="text-yellow margin-left20" style="width: 100rpx">{{needDays}}天</text>-->
				<!--<div style="width: 80rpx"></div>-->
				<!--<text class="modify-btn" @click="modifyDay">改天数</text>-->
				<!--</div>-->
			</div>
			<view class="btn" @click="toPay(0)">{{btnText}}</view>
		</cell>


		<cell class="cell" v-show="cur==2">
			<div class="border-contain align">
				<view style="display: flex;flex-direction: column; align-items: center; ">
					<image class="addr-img" src="/static/images/light_img@2x.png" />
					<text class="text-yellow"
						style="margin-left: 10rpx;margin-right: 10rpx;line-height: 30rpx">您选择了长租服务，请留下您的联系方式，我们会有专人尽快与您联系，给您提供最专业的租车指导、实惠的租车价格、最妥帖的售后服务！</text>
				</view>
				<div class="line-gray margin-top20"></div>
				<div class="flex-row align">
					<image class="question-img" src="/static/images/tel_img@2x.png" />
					<input class="input1" type="number" placeholder="请输入租车用户联系手机" maxlength=11 v-model="mobile" />
					<!-- <div class="flex-row align" @click="toContacts(1)">
                                    <image class="question-img" src="/static/images/add_img@2x.png"/>
                                    <text class="text-black">通讯录</text>
                                </div> -->
				</div>
			</div>

			<div class="border-contain align margin-top20">
				<view style="display: flex;flex-direction: column; align-items: center; ">
					<image class="car-image" resize="cover" :src="carImg" />
					<text class="text-black margin-top5">{{carData.car_brand}} {{carData.car_series}}</text>
					<text class="text-gray margin-top5" style="font-size: 25rpx">{{carData.car_detail}}</text>
					<textarea class="text-area" rows="6" placeholder="您可简单描述具体用车需求（选填）" v-model="content" />
				</view>
			</div>
			<view class="btn" @click="toPay(1)">提交咨询</view>
		</cell>


		<!-- <div class="align" style="overflow:hidden;" v-show="cur==3">
                <text  style="font-size: 32rpx;color:#333333;margin: 30rpx">【尊享司机服务天数选择】</text>
                    <text class="text-black" >您租车时长为{{daysTxt}}，最多可选择{{days}}天</text>
                <text class="text-black" style="margin-left: 30rpx;margin-right: 30rpx">专属代驾司机服务，下单后代驾司机会与您联系确定具体服务细节。</text>
                <div class="flex-row align" style="margin-top: 50rpx">
                <image class="del-btn" src="/static/images/day_del@2x.png" @click="delClick"/>
                    <text class="text-black" style="font-size: 28rpx;width: 150rpx;text-align: center">{{driverDays}}天</text>
                    <image class="del-btn" src="/static/images/day_add@2x.png" @click="addClick"/>
                </div>
                <div class="line-gray" style="margin-top: 80rpx"></div>
                <div class="flex-row">
                 <text class="confim" @click="toConfirm(0)">取消</text>
                    <div class="line"></div>
                    <text class="confim"  @click="toConfirm(1)">确定</text>
                </div>
            </div> -->
		<!-- <wxc-mask height="400" width="650" border-radius="10" duration="200" :top="300" mask-bg-color="#FFFFFF"
                  :overlay-can-close="false" :has-animation="true" :has-overlay="true" :show-close="false"
                  :show="outShow" @wxcMaskSetHidden="outAreaSetHidden">
            <div class="align" style="overflow: hidden;">
                <text  style="font-size: 32rpx;color:#333333;margin: 30rpx">【超出服务范围】</text>
                <text class="text-black" style="height:200rpx;line-height: 40rpx;padding-left: 30rpx;padding-right: 30rpx;margin-bottom: 20rpx">您选择的地址超出酷享送取车服务范围，无法为您提供服务，给您造成的不便深表歉意。</text>
                <div class="line-gray" ></div>
                <div class="flex-row">
                    <text class="confim" @click="toCheck(0)">取消</text>
                    <div class="line"></div>
                    <text class="confim"  @click="toCheck(1)">确定</text>
                </div>
            </div>
        </wxc-mask>
        <wxc-mask :height="questionHeight" width="650" border-radius="10" duration="200" :top="300" mask-bg-color="#FFFFFF"
                  :overlay-can-close="true" :has-animation="true" :has-overlay="true" :show-close="false"
                  :show="questionShow" @wxcMaskSetHidden="questionSetHidden">
            <div class="align">
                <div class="flex-row align" >
                    <text  style="width:510rpx;font-size: 32rpx;color:#333333;margin: 30rpx;text-align: center">{{questionTitle}}</text>
                    <image class="cancel-btn"  src="/static/images/cancel_img@2x.png" @click="toCancel" />
                </div>
                <text class="text-black" style="line-height: 40rpx;padding-left: 30rpx;padding-right: 30rpx;margin-bottom: 20rpx">{{questionTxt}}</text>
            </div>
        </wxc-mask>-->
		<mx-date-picker :show="showPicker" type="datetime" :show-tips="true" @confirm="ed" @cancel="ed"
			format="yyyy-mm-dd hh:ii" />
	</div>

</template>
<script>
	import ConfigData from './data';
	import {
		post,
		get
	} from '../../utils/netUtil.js';
	import util, {
		utilFunc
	} from '../../utils/util.js';
	import MxDatePicker from "@/components/mx-datepicker/mx-datepicker.vue";
	export default {
		data() {
			return {
				cur: 1,
				showPicker: false,
				chooseTxt: {
					fontSize: "25rpx",
					color: "#333333"
				},
				chooseTxt1: {
					fontSize: '25rpx',
					color: '#999999'
				},
				ShortRental: '/static/images/short_rent_on@2x.png',
				LongRent: '/static/images/long_rent_off@2x.png',
				shortcolor: "background-color:#FFFFFF",
				longcolor: "background-color:#F8F8F8",
				mobile: '',
				userMobile: '',
				content: '',
				carData: {},
				getAddr: {},
				returnAddr: {},
				getAddr: {},
				returnAddr: {},
				overlayShow: false,
				outShow: false,
				authShow: false,
				carImg: '',
				tabTitles: ConfigData.tabTitles,
				tabStyles: ConfigData.tabStyles,
				radioConfig: ConfigData.radioConfig,
				needInsurance: true,
				needDriver: false,
				animationType: 'push',
				getDate: [],
				returnDate: [],
				isRange: false,
				calendarTitle: '选择日期',
				dateRange: [],
				dateRange1: [],
				getNote: ['取车'],
				returnNote: ['还车'],
				minibarCfg: {
					title: '日期选择'
				},
				isGet: true,
				getTime: '',
				backTime: '',
				getDayTxt: '选择取车',
				getTimeTxt: '日期时间',
				backDayTxt: '选择还车',
				backTimeTxt: '日期时间',
				daysTxt: '',
				days: 0,
				driverDays: 0, //最后选择的天数
				needDays: 0,
				order: {},
				locationData: {},
				getType: 0,
				getAddress: '请输入取车地址',
				returnAddress: '请输入还车地址',
				showPicker: false,
				selectedCellStyle: {
					backgroundColor: '#ff6004'
				},
				pos: [],
				endDateTxt: '',
				curDay: '',
				curHour: '',
				driverPrice: 299,
				questionShow: false,
				questionTitle: '基础保险介绍',
				questionTxt: '我们向您提供的车辆均购买交强险及商业保险，将按照“每台车每天”收取费用，具体金额与所预定车型相关。基础保障服务费用为用车必须费用，须与基础服务费用一同结算支付。',
				carTitle: '',
				dayPrice: '',
				questionHeight: 400,
				comeType: 0,
				orderId: 0,
				btnText: "立即订车",
				lastOrderAmount: 0,

			}
		},
		components: {
			MxDatePicker
		},
		methods: {
			DatePicker(type) { //显示
				this.timetype = type
				if (type == 0)
					this.showPicker = true;
				if (type == 1) {
					if (this.getDate.length > 0 && this.getTimeTxt != '日期时间') {
						this.showPicker = true
					} else {
						uni.showModal({
							content: '请先选择开始时间',
							showCancel: false
						})
						return false;
					}
				}

			},
			ed(e) {
				//选择
				this.showPicker = false;
				if (e) {
					let appointTime = new Date(e.value.replace(/-/g, '/')).getTime();
					if (appointTime + 1000 * 60 < new Date().getTime()) {
						uni.showToast({
							title: '不能选择过去时间',
							icon: 'none'
						});
						return false;
					}
					var getDatetime = e.value.split(' ')
					if (this.timetype == 0) {
						if (this.returnDate) {
							this.returnDate = [];
							this.backDayTxt = '选择还车';
							this.backTime = '';
							this.backTimeTxt = '日期时间';
							this.daysTxt = '';
						}
						this.getDate = getDatetime[0]
						this.getDayTxt = this.getDate
						this.getTime = getDatetime[1]
						this.getTimeTxt = this.getTime
						var cTime = getDatetime[1];
						var hour = parseInt(cTime.substring(0, 3));
						if (this.curDay == this.getDayTxt) {
							if (this.curHour <= 8 && hour < 11) {
								uni.showModal({
									content: '开始日期选择当天，当前时间在8点或之前须选择11点或之后',
									showCancel: false
								});
								this.conditionClear();
								return;
							} else if (this.curHour >= 22 && hour < 11) {
								uni.showModal({
									content: '当前时间在22点之后,开始日期请选择第二天11点或之后',
									showCancel: false
								});
								this.conditionClear();
								return;
							} else if ((this.curHour > 8 && this.curHour < 22) && hour < (this.curHour + 3)) {
								uni.showModal({
									content: '开始日期选择当天，开始时间需要往后推3小时',
									showCancel: false
								});
								this.conditionClear();
								return;
							} else {
								this.getTime = cTime;
								this.getTimeTxt = cTime;
								this.returnDate = [];
								this.backDayTxt = '选择结束';
								this.backTime = '';
								this.backTimeTxt = '日期时间';
								this.daysTxt = '';
							}
						}
						this.showPicker = false;

					} else {
						var cTime = getDatetime[1];
						this.returnDate = getDatetime[0]
						this.backDayTxt = this.returnDate
						this.backTime = cTime;
						this.backTimeTxt = this.backTime;
						this.countTime();
					}

					// //选择的值
					// // ('value => ' + e.value);
					// //原始的Date对象
					// // ('date => ' + e.date);
				}
			},





			car_title(type) {
				if (type == 1) {
					this.cur = 1;
					this.ShortRental = '/static/images/short_rent_on@2x.png'
					this.LongRent = '/static/images/long_rent_off@2x.png'
					this.chooseTxt1 = {
						fontSize: '25rpx',
						color: '#999999'
					}
					this.chooseTxt = {
						fontSize: '25rpx',
						color: '#333333'
					}
					this.shortcolor = "background-color:#FFFFFF"
					this.longcolor = "background-color:#F8F8F8"
				} else {
					this.cur = 2;
					this.ShortRental = '/static/images/short_rent_off@2x.png'
					this.LongRent = '/static/images/long_rent_on@2x.png'
					this.chooseTxt1 = {
						fontSize: '25rpx',
						color: '#333333'
					}
					this.chooseTxt = {
						fontSize: '25rpx',
						color: '#999999'
					}
					this.shortcolor = "background-color:#F8F8F8"
					this.longcolor = "background-color:#FFFFFF"
				}
			},
			tabPageSelected() {},
			toCancel() {
				this.questionShow = false;
			},
			questionClick(type) {
				this.questionShow = true;
				if (type == 1) {
					this.questionHeight = 650;
					var content =

						uni.showModal({
							title: "不计免赔介绍",
							content: '保障范围内：' +
								'1.无需承担基本保障服务理赔范围内的任何损失' +
								'2.无需承担2000元以内的车辆损失费用' +
								'3.无需承担因非人为故意造成的车辆划痕产生的2000元以内的损失' +
								'不在保障范围内：' +
								'1.无事故证明无保险理赔材料' +
								'2.以下情况产生的损失由客户自行承担：玻璃损坏、轮胎损坏、底盘、车上零件遗失' +
								'3.因车损产生的停运费、折旧费' +
								'4.其他基本保障服务中保险公司无需承担，或责任免除的场景',
							showCancel: false
						})
				} else if (type == 2) {
					this.questionHeight = 400,
						uni.showModal({
							title: "尊享代驾服务司机介绍",
							content: "如客户需要代驾司机的情况下，我们提供资深商务代驾司机。费用为'${this.driverPrice}'元/天。",
							showCancel: false
						})
				} else {
					this.questionHeight = 400,
						uni.showModal({
							title: "基础保险介绍",
							content: "我们向您提供的车辆均购买交强险及商业保险，将按照“每台车每天”收取费用，具体金额与所预定车型相关。基础保障服务费用为用车必须费用，须与基础服务费用一同结算支付。",
							showCancel: false
						})
				}
			},
			questionSetHidden() {
				this.questionShow = false;
			},
			toValueCard() {
				uni.navigateTo({
					url: '../user/wallet/valueCard'
				})
			},
			delClick() {
				if (this.driverDays > 1) {
					this.driverDays--;
				} else {
					this.$notice.toast({
						message: '专属代驾司机天数最少为1天'
					});

				}
			},
			addClick() {
				if (this.driverDays < this.days) {
					this.driverDays++;
				} else {
					this.$notice.toast({
						message: '专属代驾司机天数不能超过用车天数'
					});
				}
			},
			radioChecked(index) {
				this.list[index].checked = true;
				for (var i = 0; i < this.list.length; i++) {
					if (i != index) {
						this.list[i].checked = false;
					}
				}
			},
			postLongRent() {
				if (!this.mobile) {
					uni.showToast({
						title: '请输入联系手机',
						icon: 'none'
					})
					return;
				}
				if (!util.checkMobile(this.mobile)) {
					uni.showToast({
						title: '请输入正确联系手机',
						icon: 'none'
					})
					return;
				}

				const self = this;
				uni.showModal({
					title: '提示',
					content: '是否需要提交咨询?',
					confirmText: '确认',
					cancelText: '取消',
					success(res) {
						if (res.confirm) {
							const self = this
							var userId = uni.getStorageSync('user_id');
							var token = uni.getStorageSync('user_token');
							if (!userId || !token) {
								return;
							}

							var dict = {
								user_id: userId,
								user_token: token,
								advice_type: 1,
								content: self.content,
								mobile: self.mobile
							}
							post('/user/advice', dict).then(res => {
								uni.showModal({
									content: "提交成功，我们会尽快与您联系！",
									showCancel: false,
								});
								setTimeout(function() {
									uni.navigateBack()
								}, 500);
							})
						} else if (res.cancel) {
							return
						}

					}
				})
			},
			toPay(type) {
				if (type == 0) {
					this.postToOrder();
				} else {
					this.postLongRent();
				}
			},
			// toConfirm(type) {
			// 	this.overlayShow = false;
			// 	if (type == 1) {
			// 		this.needDays = this.driverDays;
			// 	}
			// },
			// toAuth(type) {
			// 	if (type == 1) {
			// 		uni.showModal({
			// 			title: '【温馨提示】',
			// 			content: '您还未完成认证，暂时不能下单，请在完成认证后下单。',
			// 			success(res) {
			// 				if (res.confirm) {
			// 					uni.navigateTo({
			// 						url: '../auth/auth'
			// 					})
			// 				} else if (res.cancel) {
			// 					return
			// 				}
			// 			}
			// 		})
			// 	}
			// },
			// toCheck(type) {
			// 	this.outShow = false;
			// 	if (type == 1) {
			// 		this.$router.open({
			// 			name: 'service_area',
			// 			params: {
			// 				pos: this.pos
			// 			},
			// 			type: 'PUSH'
			// 		});
			// 	}
			// },
			checkClick(type) {
				if (type == 0) {
					this.needInsurance = !this.needInsurance;
				} else {
					this.needDriver = !this.needDriver;
				}
			},
			modifyDay() {
				this.overlayShow = true;
				this.driverDays = this.needDays;
			},

			countTime() {
				if (this.getDayTxt == '选择取车' || this.getTimeTxt == '日期时间' || this.backDayTxt == '选择还车' || this
					.backTimeTxt == '日期时间') {
					this.daysTxt = '';
					return;
				}
				var get = this.getDayTxt + ' ' + this.getTimeTxt;
				var back = this.backDayTxt + ' ' + this.backTimeTxt;
				var start = new Date(get.replace(/-/g, "/")).getTime();
				var end = new Date(back.replace(/-/g, "/")).getTime();
				var dateDiff = end - start; //时间差的毫秒数
				var dayDiff = Math.floor(dateDiff / (24 * 3600 * 1000)); //计算出相差天数
				if (dateDiff <= 0) {
					uni.showModal({
						content: '请认真选择时间!!',
						showCancel: false
					})
					this.conditionClear();
					return
				}
				var leave1 = dateDiff % (24 * 3600 * 1000); //计算天数后剩余的毫秒数
				var hours = Math.floor(leave1 / (3600 * 1000)); //计算出小时数
				//计算相差分钟数
				var leave2 = leave1 % (3600 * 1000); //计算小时数后剩余的毫秒数
				var minutes = Math.floor(leave2 / (60 * 1000)); //计算相差分钟数
				this.days = dayDiff;
				if (hours > 0 || minutes > 0) {
					this.days = dayDiff + 1;
				}

				if (hours == 0 && minutes == 0)
					this.daysTxt = dayDiff + '天';
				else
					this.daysTxt = dayDiff + '天' + hours + '时' + minutes + '分';
				this.driverDays = this.days;
				this.needDays = this.days;

			},
			setDateRange() {
				var nowTime = new Date();
				var year = nowTime.getFullYear();
				var month = nowTime.getMonth() + 1;
				var day = nowTime.getDate();
				this.curHour = nowTime.getHours();
				if (this.curHour >= 22) {
					day = day + 1;
				}
				if (month < 10) {
					month = '0' + month;
				}
				if (day < 10) {
					day = '0' + day;
				}
				var start = year + '-' + month + '-' + day;
				this.curDay = start;
				this.endDateTxt = (year + 1) + '-' + month + '-' + day;
				this.dateRange = [start, this.endDateTxt];
				this.dateRange1 = [start, this.endDateTxt];
			},
			getData() {
				if (uni.getStorageSync('user_mobile')) {
					this.mobile = uni.getStorageSync('user_mobile');
					this.userMobile = uni.getStorageSync('user_mobile');
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
					order_id: this.orderId
				}
				get('/order', dict).then(res => {
					this.orderData = res;
					this.getAddr.lon = this.orderData.start_lon;
					this.getAddr.lat = this.orderData.start_lat;
					this.getAddr.title = "";
					this.getAddr.address = this.orderData.start_address;
					this.returnAddr.lon = this.orderData.return_lon;
					this.returnAddr.lat = this.orderData.return_lat;
					this.returnAddr.title = "";
					this.returnAddr.address = this.orderData.return_address;
					this.getAddress = this.orderData.start_address;
					this.returnAddress = this.orderData.return_address;
					this.lastOrderAmount = this.orderData.amount;

				})
			},
			postToOrder() {
				if (!this.getAddr.hasOwnProperty('address')) {
					uni.showToast({
						title: '请输入取车地址',
						icon: 'none'
					})
					return;
				}
				if (!this.returnAddr.hasOwnProperty('address')) {
					uni.showToast({
						title: '请输入还车地址',
						icon: 'none'
					})
					return;
				}

				if (this.address == '请输入取车地址') {
					uni.showToast({
						title: '请输入取车地址',
						icon: 'none'
					})
					return;
				}
				if (!this.return_address == '请输入还车地址') {
					uni.showToast({
						title: '请输入还车地址',
						icon: 'none'
					})
					return;
				}
				if (this.getDate.length == 0) {
					uni.showToast({
						title: '请选择取车日期',
						icon: 'none'
					})

					return;
				}
				if (this.returnDate.length == 0) {
					uni.showToast({
						title: '请选择还车日期',
						icon: 'none'
					})

					return;
				}
				if (!this.getTime.length) {
					uni.showToast({
						title: '请选择取车车日期',
						icon: 'none'
					})
					return;
				}
				if (!this.backTime.length) {
					uni.showToast({
						title: '请选择还车日期',
						icon: 'none'
					})
					return;
				}
				if (!this.userMobile) {
					uni.showToast({
						title: '请输入联系电话',
						icon: 'none'
					})
					return;
				}
				if (!util.checkMobile(this.userMobile)) {
					uni.showToast({
						title: '请输入正确联系手机',
						icon: 'none'
					})
					return;
				}
				var userId = uni.getStorageSync('user_id');
				var token = uni.getStorageSync('user_token');
				if (!userId || !token) {
					return;
				}
				var insurance_type = 0;
				if (this.needInsurance)
					insurance_type = 1;
				var driver_need = 0;
				var days = 0;
				// if (this.needDriver) {
				//     driver_need = 1;
				//     days = this.driverDays;
				// }    
				var stLon = this.getAddr.lon;
				var stLat = this.getAddr.lat;
				var edLon = this.returnAddr.lon;
				var edLat = this.returnAddr.lat;
				var start = '';
				var end = '';
				if (this.getAddr.title.length > 0 && this.getAddr.title != this.getAddr.address) {
					start = this.getAddr.title + "(" + this.getAddr.address + ")";
				} else {
					start = this.getAddr.address;
				}
				if (this.returnAddr.title.length > 0 && this.returnAddr.title != this.returnAddr.address) {
					end = this.returnAddr.title + "(" + this.returnAddr.address + ")";
				} else {
					end = this.returnAddr.address;
				}
				// var cityId = this.$storage.getSync('city_id');
				var dict = {
					user_id: userId,
					user_token: token,
					city_id: '321',
					user_mobile: this.userMobile,
					service_type: this.carData.service_type,
					driver_need: driver_need,
					driver_days: days,
					insurance_type: insurance_type,
					model_id: this.carData.model_id,
					start_address: start,
					start_lon: stLon,
					start_lat: stLat,
					return_address: end,
					return_lon: edLon,
					return_lat: edLat,
					start_time: this.getDate + ' ' + this.getTime + ':00',
					return_time: this.returnDate + ' ' + this.backTime + ':00',
					data_id: 0,
					rights_state: this.comeType,
					parent_id: this.orderId
				};
				uni.request({
					method: 'POST',
					url: util.getOpenUrl() + '/order',
					data: util.getParmasData(dict)
				}).then(res => {
					var res = res[1].data
					if (res.result == 0) {
						// this.$notice.toast({message: '订单提交成功'});
						this.saveHisAddr(0, this.getAddr);
						this.saveHisAddr(1, this.returnAddr);
						// if(utilFunc.env.isAndroid()){
						//     this.$router.back({type:'PUSH'});
						// }
						this.toOrderPay(res.content);

					} else if (res.result == 1001) {
						uni.showToast({
							title: '账号异常，请重新登录',
							icon: 'none'
						})
						setTimeout(() => {
							uni.navigateTo({
								url: '../user/login'
							})
						}, 500)
						uni.clearStorage();
					} else {
						uni.showToast({
							title: res.message,
							icon: 'none'
						})
						if (res.message == '取车坐标不在指定范围内') {
							this.pos[0] = this.getAddr.lon;
							this.pos[1] = this.getAddr.lat;
							uni.showModal({
								title: '【超出服务范围】',
								content: '您选择的地址超出酷享送取车服务范围，无法为您提供服务，给您造成的不便深表歉意。',
								confirmText: '确定',
								cancelText: '取消',
								success(res) {
									if (res.confirm) {
										uni.navigateTo({
											url: '../city/serviceArea'
										})
									} else if (res.cancel) {
										return

									}

								}
							})
							this.outShow = true;
						} else if (res.message == '还车坐标不在指定范围内') {
							this.pos[0] = this.returnAddr.lon;
							this.pos[1] = this.returnAddr.lat;
							uni.showModal({
								title: '【超出服务范围】',
								content: '您选择的地址超出酷享送取车服务范围，无法为您提供服务，给您造成的不便深表歉意。',
								confirmText: '确定',
								cancelText: '取消',
								success(res) {
									if (res.confirm) {
										uni.navigateTo({
											url: '../city/serviceArea'
										})
									} else if (res.cancel) {
										return

									}

								}
							})
						}
					}

				});

			},

			toOrderPay(order) {
				var order = encodeURIComponent(JSON.stringify(order));
				uni.navigateTo({
					url: './orderPay?param=' + order
				})
			},

			toAddrChoose(type) {
				this.getType = type;
				uni.navigateTo({
					url: `../city/addressSearch?type=${type}`,

				})


			},
			pickerOverlayClick(e) {
				this.showPicker = false;
			},
			conditionClear() {
				this.returnDate = [];
				this.getTime = '';
				this.getTimeTxt = '日期时间';
				this.backDayTxt = '选择还车';
				this.backTime = '';
				this.backTimeTxt = '日期时间';
				this.daysTxt = '';
			},
			saveHisAddr(type, address) {
				var addrList = [];
				addrList.push(address);
				var key = 'his_get_address';
				if (type !== 0)
					key = 'his_return_address';
				var hisList = uni.getStorageSync(key);
				if (hisList && hisList.length > 0) {
					for (var i = 0; i < hisList.length; i++) {
						var addr = hisList[i];
						if (addr.address !== address.address)
							addrList.push(addr);
						if (addrList.length > 5)
							break;

					}
				}
				uni.setStorageSync(key, addrList);

			},
			// 	toContacts(type) {
			// 		var self = this;
			// 		self.$coms.contacts().then(data => {
			// 			if (data.length > 0) {
			// 				var person = JSON.parse(data);
			// 				if (type == 0) {
			// 					self.userMobile = person.phone.replace(/\s/g, "")
			// 				}
			// 				if (type == 1) {
			// 					self.mobile = person.phone.replace(/\s/g, "")
			// 				}
			// 			}
			// 		}, error => {
			// 			// ("获取失败", error)
			// 		})
			// 	}
		},
		created() {
			this.getData();
			this.setDateRange();
		},
		onLoad(options) {

			var self = this;
			uni.$on("selectType", function(data) {
				if (!data.address) {
					return;
				}
				if (self.getType == 0) {
					self.getAddr = data
					self.getAddress = data.address
				} else {
					self.returnAddr = data
					self.returnAddress = data.address
				}

			})

			if (options.param) {
				var param = JSON.parse(decodeURIComponent(options.param));
				this.carData = param;
				this.carImg = util.setCarImg(this.carData.model_id, this.carData.last_time);
				this.carTitle = this.carData.car_brand + '' + this.carData.car_series;
				this.dayPrice = '￥' + this.carData.day_price + '/天';
			} else if (options) {

				var param = JSON.parse(decodeURIComponent(options.data));
				
				if (param.come_type)
					this.comeType = param.come_type;
				if (param.order_id)
					this.orderId = param.order_id;
				if (param.car_data)
					this.carData = param.car_data;
				this.carImg = util.setCarImg(this.carData.model_id, this.carData.last_time);
				this.carTitle = this.carData.car_brand + '' + this.carData.car_series;
				this.dayPrice = '￥' + this.carData.day_price + '/天';
				if (this.comeType == 1 && this.orderId > 0) {
					this.btnText = "立即升级";
					this.getOrderData();
				}

			}
		}

	};
</script>
<style lang="scss" scoped>
	.item-container {
		width: 750rpx;
	}

	.cancel-btn {
		width: 50rpx;
		height: 50rpx;
		margin-right: 30rpx;
	}

	.car-image {
		width: 500rpx;
		height: 284rpx;
	}

	.confim {
		width: 300rpx;
		height: 80rpx;
		font-size: 28rpx;
		text-align: center;
		color: #333333;
		line-height: 80rpx;
	}

	.line {
		width: 1rpx;
		height: 80rpx;
		background-color: #cccccc;
	}


	.insure-bg {
		flex-direction: row;
		display: flex;
		align-items: center;
		justify-content: left;
		height: 80rpx;
		padding-left: 20rpx;
		padding-right: 20rpx;
	}

	.modify-btn {
		background-color: #333333;
		font-size: 24rpx;
		padding: 0 15rpx;
		line-height: 50rpx;
		border-radius: 50rpx;
		color: #ffffff;
	}

	.del-btn {
		width: 50rpx;
		height: 50rpx;
	}

	.input1 {
		width: 550rpx;
		height: 85rpx;
		color: #333333;
		font-size: 28rpx;
		padding: 0rpx 20rpx;
	}

	.tab-content {
		width: 700px;
		display: flex;
		align-items: center;
		flex-direction: column;
		// color: #fff;
	}

	.share-img {
		width: 41rpx;
		height: 48rpx;
	}
</style>
