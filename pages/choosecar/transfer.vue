<template>
	<div>
		<div class="flex-row ">
			<view class="tab-content" :style="shortcolor" @click="car_title(1)" :class="{active:cur==1}">
				<image class='share-img' :src="ShortRental"></image>
				<text :style="{fontSize:chooseTxt.fontSize,color:chooseTxt.color}">接机服务</text>
			</view>
			<view class="tab-content" :style="longcolor" @click="car_title(2)" :class="{active:cur==2}">
				<image class='share-img' :src="LongRent"></image>
				<text :style="{fontSize:chooseTxt1.fontSize,color:chooseTxt1.color}">送机服务</text>
			</view>
		</div>
		<cell class="cell" v-show="cur==1">
			<div class="border-contain">
				<div class="flex-row align">
					<div class="flex1" style="overflow: hidden;">
						<div class="flex-row align" @click="toAddrChoose(2)">
							<image class="addr-img" src="/static/images/get_img@2x.png" />
							<text class="text-gray">上海</text>
							<image class="down" src="https://static.coolcargo.cn/public/image/applet/down_gray@2x.png" />
							<text
								style="color:#333333;font-size: 28rpx;white-space: nowrap;text-overflow: ellipsis;overflow:hidden">{{getAddress}}</text>
						</div>
						<div class="line-gray"></div>
						<div class="flex-row align" @click="toAddrChoose(5)">
							<image class="addr-img" src="/static/images/return_img@2x.png" />
							<text class="text-gray">上海</text>
							<image class="down" src="https://static.coolcargo.cn/public/image/applet/down_gray@2x.png" />
							<text
								style="color:#333333;font-size: 28rpx;white-space:nowrap;text-overflow: ellipsis;overflow: hidden">{{returnAddress}}</text>
						</div>
					</div>
					<div>
						<text class="border-btn margin20" style="font-size: 28rpx;">优选司机</text>
					</div>
				</div>
				<div class="line-gray"></div>
				<div class="flex-row align" @click="DatePicker(0)">
					<image class="addr-img" src="https://static.coolcargo.cn/public/image/applet/time_img@2x.png" />
					<text class="time-text">{{getDayTxt}}&ensp;{{getTimeTxt}}</text>
				</div>
			</div>
			<div class="border-contain align margin-top20"
				style="display: flex;flex-direction: column; align-items: center; ">
				<image class="car-image" resize="cover" :src="carImg" />
				<text class="text-black margin-top5" style="font-size: 30rpx">{{carTitle}}</text>
				<text class="text-gray margin-top5" style="font-size: 25rpx">{{carData.car_detail}}</text>
				<div class="flex-row align margin-top5">
					<text v-if="isGetHQ" class="text-gray " style="font-size: 25rpx">虹桥 </text>
					<text v-if="isGetHQ" class="text-yellow">{{dayPrice}}</text>
					<text v-if="isGetHQ && isGetPD" class="text-gray " style="font-size: 25rpx">/ </text>
					<text v-if="isGetPD" class="text-gray " style="font-size: 25rpx">浦东 </text>
					<text v-if="isGetPD" class="text-yellow">{{dayPrice2}}</text>
					<!--<div class="vip-tag-contain flex-row align" @click="toValueCard">
						<!--<image class="vip-tag-img" src="/static/images/vip_tag@2x.png"></image>
						<!--<text class="vip-tag-text">会员低至￥{{Math.round(carData.day_price * 0.85)}}/天</text>-->
					<!--</div>-->
				</div>
				<div class=" margin-top20 flex-row align margin-bottom20" @click="questionClick()">
					<text class="text-yellow" style="text-decoration: underline">服务介绍</text>
					<image class="question-img" src="/static/images/question@2x.png" />
				</div>
				<!--<div class="insure-bg">-->
				<!--<text class="text-black">是否需要车<!--<div class="insure-bg">-->
				<!--<text class="text-black">基础保障车险服务费</text>-->
				<!--<text class="text-yellow" style="width: 170rpx">￥{{carData.insurance_price}}元/天</text>-->
				<!--<image class="question-img" src="/static/images/question@2x.png" @click="questionClick(0)" />-->
				<!--<div style="width: 225rpx"></div>-->
				<!--</div>-->
				<!--<div class="line-gray"></div>--险不计免赔</text>-->
				<!--<text class="text-yellow" style="width: 150rpx">￥{{carData.insurance_price2}}元/天</text>-->
				<!--<image class="question-img" src="/static/images/question@2x.png" @click="questionClick(1)" />-->
				<!--<div style="width: 145rpx"></div>-->
				<!--<image v-if="needInsurance" class="check-img" src="/static/images/radio_yes@2x.png" @click="checkClick(0)" />-->
				<!--<image v-if="!needInsurance" class="check-img" src="/static/images/radio_no@2x.png" @click="checkClick(0)" />-->
				<!--</div>-->
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
			<view class="btn" @click="toPay(0)">立即订车</view>
		</cell>

		<cell class="cell" v-show="cur==2">
			<div class="border-contain">
				<div class="flex-row align">
					<div class="flex1" style="overflow: hidden;">
						<div class="flex-row align" @click="toAddrChoose(3)">
							<image class="addr-img" src="/static/images/get_img@2x.png" />
							<text class="text-gray">上海</text>
							<image class="down" src="https://static.coolcargo.cn/public/image/applet/down_gray@2x.png" />
							<text
								style="color:#333333;font-size: 28rpx;white-space: nowrap;text-overflow: ellipsis;overflow:hidden">{{getAddress1}}</text>
						</div>
						<div class="line-gray"></div>
						<div class="flex-row align" @click="toAddrChoose(4)">
							<image class="addr-img" src="/static/images/return_img@2x.png" />
							<text class="text-gray">上海</text>
							<image class="down" src="https://static.coolcargo.cn/public/image/applet/down_gray@2x.png" />
							<text
								style="color:#333333;font-size: 28rpx;white-space:nowrap;text-overflow: ellipsis;overflow: hidden">{{returnAddress1}}</text>
						</div>
					</div>
					<div>
						<text class="border-btn margin20" style="font-size: 28rpx;">优选司机</text>
					</div>
				</div>
				<div class="line-gray"></div>
				<div class="flex-row align" @click="DatePicker(1)">
					<image class="addr-img" src="https://static.coolcargo.cn/public/image/applet/time_img@2x.png" />
					<text class="time-text">{{sendDayTxt}}&ensp;{{sendTimeTxt}}</text>
				</div>
			</div>
			<div class="border-contain align margin-top20"
				style="display: flex;flex-direction: column; align-items: center; ">
				<image class="car-image" resize="cover" :src="carImg" />
				<text class="text-black margin-top5" style="font-size: 30rpx">{{carTitle}}</text>
				<text class="text-gray margin-top5" style="font-size: 25rpx">{{carData.car_detail}}</text>
				<div class="flex-row align margin-top5">
					<text v-if="isSendHQ" class="text-gray " style="font-size: 25rpx">虹桥 </text>
					<text v-if="isSendHQ" class="text-yellow">{{dayPrice}}</text>
					<text v-if="isSendHQ && isSendPD" class="text-gray " style="font-size: 25rpx">/ </text>
					<text v-if="isSendPD" class="text-gray " style="font-size: 25rpx">浦东 </text>
					<text v-if="isSendPD" class="text-yellow">{{dayPrice2}}</text>
					<!--<div class="vip-tag-contain flex-row align" @click="toValueCard">-->
					<!--<image class="vip-tag-img" src="/static/images/vip_tag@2x.png"></image>-->
					<!--<text class="vip-tag-text">会员低至￥{{Math.round(carData.day_price * 0.85)}}/天</text>-->
					<!--</div>-->
				</div>
				<div class=" margin-top20 flex-row align margin-bottom20" @click="questionClick()">
					<text class="text-yellow" style="text-decoration: underline">服务介绍</text>
					<image class="question-img" src="/static/images/question@2x.png" />
				</div>
				<!--<div class="insure-bg">-->
				<!--<text class="text-black">基础保障车险服务费</text>-->
				<!--<text class="text-yellow" style="width: 170rpx">￥{{carData.insurance_price}}元/天</text>-->
				<!--<image class="question-img" src="/static/images/question@2x.png" @click="questionClick(0)" />-->
				<!--<div style="width: 225rpx"></div>-->
				<!--</div>-->
				<!--<div class="line-gray"></div>-->
				<!--<div class="insure-bg">-->
				<!--<text class="text-black">是否需要车险不计免赔</text>-->
				<!--<text class="text-yellow" style="width: 150rpx">￥{{carData.insurance_price2}}元/天</text>-->
				<!--<image class="question-img" src="/static/images/question@2x.png" @click="questionClick(1)" />-->
				<!--<div style="width: 145rpx"></div>-->
				<!--<image v-if="needInsurance" class="check-img" src="/static/images/radio_yes@2x.png" @click="checkClick(0)" />-->
				<!--<image v-if="!needInsurance" class="check-img" src="/static/images/radio_no@2x.png" @click="checkClick(0)" />-->
				<!--</div>-->
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
			<view class="btn" @click="toPay(1)">立即订车</view>
		</cell>
		</list>
		<!-- <wxc-mask height="460" width="650" border-radius="10" duration="200" :top="300" mask-bg-color="#FFFFFF"
                  :overlay-can-close="false" :has-animation="true" :has-overlay="true" :show-close="false"
                  :show="overlayShow" @wxcMaskSetHidden="wxcMaskSetHidden">
            <div class="align" style="overflow:hidden;">
                <text  style="font-size: 32rpx;color:#333333;margin: 30rpx">【尊享司机服务天数选择】</text>
                    <text class="text-black" >您租车时长为{{daysTxt}}，最多可选择{{days}}天</text>
                <text class="text-black" style="margin-left: 30rpx;margin-right: 30rpx">专属代驾司机服务，下单后代驾司机会与您联系确定具体服务细节。</text>
                <div class="flex-row align "style="margin-top: 50rpx">
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
            </div>
        </wxc-mask>
        <wxc-mask height="400" width="650" border-radius="10" duration="200" :top="300" mask-bg-color="#FFFFFF"
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
        <wxc-mask height="550" width="650" border-radius="10" duration="200" :top="300" mask-bg-color="#FFFFFF"
                  :overlay-can-close="true" :has-animation="true" :has-overlay="true" :show-close="false"
                  :show="questionShow" @wxcMaskSetHidden="questionSetHidden">
            <div class="align">
                <div class="flex-row align" >
                    <text  style="width:510rpx;font-size: 32rpx;color:#333333;margin-left: 30rpx;margin-top:30rpx;margin-bottom:30rpx;text-align: center">{{questionTitle}}</text>
                    <image class="cancel-btn"  src="/static/images/cancel_img@2x.png" @click="toCancel" />
                </div>
                <text class="text-black" style="line-height: 40rpx;padding-left: 30rpx;padding-right: 30rpx;margin-bottom: 20rpx">{{questionTxt}}</text>
            </div>
        </wxc-mask>
        <wxc-mask height="400" width="650" border-radius="10" duration="200" :top="300" mask-bg-color="#FFFFFF"
                  :overlay-can-close="false" :has-animation="true" :has-overlay="true" :show-close="false"
                  :show="authShow" @wxcMaskSetHidden="authSetHidden">
            <div class="align">
                <text  style="font-size: 32rpx;color:#333333;margin: 30rpx">【温馨提示】</text>
                <div >
                    <text class="text-black" style="height:200rpx;line-height: 40rpx;padding-left: 30rpx;padding-right: 30rpx;margin-bottom: 20rpx">您还未完成认证，暂时不能下单，请在完成认证后下单。</text>
                </div>

                <div class="line-gray"></div>
                <div class="flex-row">
                    <text class="confim" @click="toAuth(0)">取消</text>
                    <div class="line"></div>
                    <text class="confim"  @click="toAuth(1)">确定</text>
                </div>
            </div>-->
		<mx-date-picker :show="showPicker" type="datetime" :show-tips="true" @confirm="ed" @cancel="ed"
			format="yyyy-mm-dd hh:ii" />
	</div>
</template>
<script>
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
				plantype: 0,
				chooseTxt: {
					fontSize: "25rpx",
					color: "#333333"
				},
				chooseTxt1: {
					fontSize: '25rpx',
					color: '#999999'
				},
				ShortRental: 'https://static.coolcargo.cn/public/image/applet/get_plane_on@2x.png',
				LongRent: 'https://static.coolcargo.cn/public/image/applet/send_plane_off@2x.png',
				shortcolor: "background-color:#FFFFFF",
				longcolor: "background-color:#F8F8F8",
				mobile: '',
				content: '',
				serviceType: 2,
				// pay_type: 0,
				carData: {},
				getAddr: {},
				returnAddr: {},
				getAddr1: {},
				returnAddr1: {},
				overlayShow: false,
				outShow: false,
				authShow: false,
				carImg: '',
				needInsurance: false,
				needDriver: false,
				animationType: 'push',
				getDate: [],
				getDate1: [],
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
				sendTime: '',
				backTime: '',
				getDayTxt: '请选择',
				getTimeTxt: '接机时间',
				sendDayTxt: '请选择',
				sendTimeTxt: '送机时间',
				daysTxt: '',
				days: 0,
				driverDays: 0, //最后选择的天数
				needDays: 0,
				order: {},
				locationData: {},
				getType: 2,
				getAddress: '请输入接机航站楼',
				returnAddress: '请输入目的地地址',
				getAddress1: '请输入上车地址',
				returnAddress1: '请输入送机航站楼',
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
				questionTitle: '接送机服务介绍',
				questionTxt: '本服务提供机场或火车站接送。以预定到达时间为准，机场免费等待1小时。价格包含车费、油费、保险费、司机服务费等。服务中产生的路桥费、停车费等额外费用由乘客自行承担。夜间服务时间段（23：00-7:00）需加收50元/次服务费。',
				carTitle: '',
				dayPrice: '',
				dayPrice2: '',
				isGetPD: true,
				isGetHQ: true,
				isSendPD: true,
				isSendHQ: true,
				noticeList: [],
			}
		},
		components: {
			MxDatePicker
		},
		methods: {
			DatePicker(type) {
				//显示
				this.plantype = type
				this.showPicker = true;
			},
			ed(e) {
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
					var now_date = getDatetime[0]
					if (this.plantype == 0) {
						this.getDate = now_date
						this.getDayTxt = this.getDate
						this.getTime = getDatetime[1]
						this.getTimeTxt = this.getTime
					} else {
						this.getDate1 = now_date
						this.sendDayTxt = this.getDate1
						this.sendTime = getDatetime[1]
						this.sendTimeTxt = this.sendTime
					}

					var cTime = getDatetime[1];
					var hour = parseInt(cTime.substring(0, 3));
					if (this.curDay == now_date) {
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
							this.getTimeTxt = cTime;
							this.returnDate = [];
							this.backDayTxt = '选择结束';

						}

						this.showPicker = false;

					} else {
						if (this.getDayTxt == '选择取车' || this.getTimeTxt == '日期时间') {
							this.daysTxt = '';
							return;
						}
					}
				}
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

			car_title(type) {
				if (type == 1) {
					this.cur = 1;
					this.ShortRental = 'https://static.coolcargo.cn/public/image/applet/get_plane_on@2x.png'
					this.LongRent = 'https://static.coolcargo.cn/public/image/applet/send_plane_off@2x.png'
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
					this.serviceType = 3;
					this.ShortRental = 'https://static.coolcargo.cn/public/image/applet/get_plane_off@2x.png'
					this.LongRent = 'https://static.coolcargo.cn/public/image/applet/send_plane_on@2x.png'
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
			toCancel() {
				uni.showModal({
					showCancel: false,
					title: "接送机服务介绍",
					content: "本服务提供机场或火车站接送。以预定到达时间为准，机场免费等待1小时。价格包含车费、油费、保险费、司机服务费等。服务中产生的路桥费、停车费等额外费用由乘客自行承担。夜间服务时间段（23：00-7:00）需加收50元/次服务费。"
				})
				//          this.questionShow = false;
			},
			questionClick() {
				uni.showModal({
					showCancel: false,
					title: "接送机服务介绍",
					content: "本服务提供机场或火车站接送。以预定到达时间为准，机场免费等待1小时。价格包含车费、油费、保险费、司机服务费等。服务中产生的路桥费、停车费等额外费用由乘客自行承担。夜间服务时间段（23：00-7:00）需加收50元/次服务费。"
				})
			},
			toValueCard() {
				this.$router.open({
					name: 'value_card',
					type: 'PUSH'
				});
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
			// postLongRent() {
			// 	if (!this.mobile) {
			// 		this.$notice.toast({
			// 			message: '请输入联系手机'
			// 		});
			// 		return;
			// 	}
			// 	const self = this;
			// 	self.$notice.confirm({
			// 		title: '提示',
			// 		message: '是否需要提交咨询？',
			// 		okTitle: '确认',
			// 		cancelTitle: '取消',
			// 		okCallback() {
			// 			// 点击确认按钮的回调
			// 			var userId = self.$storage.getSync('user_id');
			// 			var token = self.$storage.getSync('user_token');
			// 			if (!userId || !token) {
			// 				return;
			// 			}

			// 			var dict = {
			// 				user_id: userId,
			// 				user_token: token,
			// 				advice_type: 1,
			// 				content: self.content,
			// 				mobile: self.mobile
			// 			}
			// 			post('/user/advice', dict).then(res => {
			// 				self.$notice.toast({
			// 					message: '提交成功，我们会尽快与您联系！'
			// 				});
			// 				self.$router.back({
			// 					type: 'PUSH'
			// 				});
			// 			})

			// 		},
			// 		cancelCallback() {
			// 			// 点击取消按钮的回调
			// 		}

			// 	})

			// },
			toPay(type) {
				// this.pay_type = type
				this.postToOrder();
			},
			// wxcMaskSetHidden() {
			//     this.overlayShow = false;
			// },
			outAreaSetHidden() {
				this.outShow = false;
			},
			authSetHidden() {
				this.authShow = false;
			},
			toConfirm(type) {
				this.overlayShow = false;
				if (type == 1) {
					this.needDays = this.driverDays;
				}
			},
			toAuth(type) {
				this.authShow = false;
				if (type == 1) {
					this.$router.open({
						name: 'auth',
						type: 'PUSH'
					});
				}
			},
			toCheck(type) {
				this.outShow = false;
				if (type == 1) {
					this.$router.open({
						name: 'service_area',
						params: {
							pos: this.pos
						},
						type: 'PUSH'
					});
				}
			},
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

			getData() {
				if (this.$storage.getSync('notice_list')) {
					this.noticeList = this.$storage.getSync('notice_list');
					this.questionTxt = this.noticeList[2];
				}
				if (this.$storage.getSync('location')) {
					this.locationData = this.$storage.getSync('location');
					if (!this.getAddr1.hasOwnProperty('address')) {
						this.getAddr1 = this.locationData;
						this.getAddress1 = this.getAddr1.address;
					}
				}

				this.$router.getParams().then(resData => {
					this.carData = resData;
					this.carImg = util.setCarImg(this.carData.model_id, this.carData.last_time);
					this.carTitle = this.carData.car_brand + '' + this.carData.car_series;
					this.dayPrice = '￥' + this.carData.day_price + '/次';
					this.dayPrice2 = '￥' + this.carData.day_price2 + '/次';
				});
				if (this.$storage.getSync('user_mobile'))
					this.mobile = this.$storage.getSync('user_mobile');
			},
			postToOrder() {

				if (this.serviceType == 2) {
					if (!this.getAddr.hasOwnProperty('address')) {
						uni.showToast({
							title: '请输入接机航站楼',
							icon: 'none'
						})
						return;
					}
					if (!this.returnAddr.hasOwnProperty('address')) {
						uni.showToast({
							title: '请输入目的地地址',
							icon: 'none'
						})
						return;
					}
					if (this.getDate.length == 0) {
						uni.showToast({
							title: '请选择接机日期',
							icon: 'none'
						})
						return;
					}
					if (!this.getTime.length) {
						uni.showToast({
							title: '请选择接机时间',
							icon: 'none'
						})
						return;
					}
				} else {
					if (!this.getAddr1.hasOwnProperty('address')) {
						uni.showToast({
							title: '请输入上车地址',
							icon: 'none'
						})
						return;
					}
					if (!this.returnAddr1.hasOwnProperty('address')) {
						uni.showToast({
							title: '请输入送机航站楼',
							icon: 'none'
						})
						return;
					}
					if (this.getDate1.length == 0) {
						uni.showToast({
							title: '请选择送机日期',
							icon: 'none'
						})
						return;
					}

					if (!this.sendTime.length) {
						uni.showToast({
							title: '请选择送机时间',
							icon: 'none'
						})
						return;
					}
				}



				// var authState = this.$storage.getSync('user_info').user_state;
				// if(authState == 0){
				//     this.authShow = true;
				//     return;
				// }

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
				var start = '';
				var start_lon = 0;
				var start_lat = 0;
				if (this.serviceType == 2) {
					if (this.getAddr.title.length > 0 && this.getAddr.title != this.getAddr.address) {
						start = this.getAddr.title + "(" + this.getAddr.address + ")";
					} else {
						start = this.getAddr.address;
					}
					start_lon = this.getAddr.lon;
					start_lat = this.getAddr.lat;
				} else {
					if (this.getAddr1.title.length > 0 && this.getAddr1.title != this.getAddr1.address) {
						start = this.getAddr1.title + "(" + this.getAddr1.address + ")";
					} else {
						start = this.getAddr1.address;
					}
					start_lon = this.getAddr1.lon;
					start_lat = this.getAddr1.lat;
				}

				var end = '';
				var return_lon = 0;
				var return_lat = 0;
				if (this.serviceType == 2) {
					if (this.returnAddr.title.length > 0 && this.returnAddr.title != this.returnAddr.address) {
						end = this.returnAddr.title + "(" + this.returnAddr.address + ")";
					} else {
						end = this.returnAddr.address;
					}
					return_lon = this.returnAddr.lon;
					return_lat = this.returnAddr.lat;
				} else {
					if (this.returnAddr1.title.length > 0 && this.returnAddr1.title != this.returnAddr1.address) {
						end = this.returnAddr1.title + "(" + this.returnAddr1.address + ")";
					} else {
						end = this.returnAddr1.address;
					}
					return_lon = this.returnAddr1.lon;
					return_lat = this.returnAddr1.lat;
				}

				// var cityId = this.$storage.getSync('city_id');
				var startTime = this.getDate + ' ' + this.getTime + ':00';
				if (this.serviceType == 3) {
					startTime = this.getDate1 + ' ' + this.sendTime + ':00';
				}
				var dict = {
					user_id: userId,
					user_token: token,
					city_id: '321',
					service_type: this.serviceType,
					driver_need: driver_need,
					driver_days: days,
					insurance_type: insurance_type,
					model_id: this.carData.model_id,
					start_address: start,
					start_lon: start_lon,
					start_lat: start_lat,
					return_address: end,
					return_lon: return_lon,
					return_lat: return_lat,
					start_time: startTime,
					return_time: this.returnDate + ' ' + this.backTime + ':00',
					data_id: 0
				};

				uni.request({
					method: 'POST',
					url: util.getOpenUrl() + '/order',
					data: util.getParmasData(dict)
				}).then(res => {
					 var res = res[1].data
					if (res.result == 0) {
						// this.$notice.toast({message: '订单提交成功'});
						if (this.serviceType == 2) {
							this.saveHisAddr(0, this.getAddr);
							this.saveHisAddr(1, this.returnAddr);
						} else {
							this.saveHisAddr(0, this.getAddr1);
							this.saveHisAddr(1, this.returnAddr1);
						}

						// if(utilFunc.env.isAndroid()){
						//     this.$router.back({type:'PUSH'});
						// }
						this.toOrderPay(res.content);
					} else if (res.result == 1001) {
						uni.navigateTo({
							url: '../user/user'
						})
						uni.showToast({
							title: "账号异常，请重新登录",
							icon: 'none'
						})
						uni.clearStorageSync()
					} else {
						uni.showToast({
							title: res.message,
							icon: 'none'
						})
						if (res.message == '取车坐标不在指定范围内') {
							if (this.serviceType == 2) {
								this.pos[0] = this.getAddr.lon;
								this.pos[1] = this.getAddr.lat;
							} else {
								this.pos[0] = this.getAddr1.lon;
								this.pos[1] = this.getAddr1.lat;
							}

							this.outShow = true;
						} else if (res.message == '还车坐标不在指定范围内') {
							if (this.serviceType == 2) {
								this.pos[0] = this.returnAddr.lon;
								this.pos[1] = this.returnAddr.lat;
							} else {
								this.pos[0] = this.returnAddr1.lon;
								this.pos[1] = this.returnAddr1.lat;
							}
							this.outShow = true;
						}
					}

				});

			},
			toOrderPay(order) {
				var order = encodeURIComponent(JSON.stringify(order));
				uni.navigateTo({
					url: '../order/orderPay?param=' + order
				})
			},

			toAddrChoose(type) {
				this.getType = type;
				uni.navigateTo({
					url: `../city/addressSearch?type=${type}`
				})
			},
			pickerOverlayClick(e) {
				this.showPicker = false;
			},
			conditionClear() {
				if (this.isGet) {
					this.getTime = '';
					this.getTimeTxt = '接机时间';
				} else {
					this.sendTime = '';
					this.sendTimeTxt = '送机时间';
				}

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
		},
		created() {
			this.setDateRange();
		},
		onLoad(options) {
			var self = this;
			uni.$on('selectType', function(data) {
				if (!data.address) {
					
					return;
				}
				if (self.getType == 2) {
					self.getAddr = data
					self.getAddress = data.address
				} else if (self.getType == 5) {
					self.returnAddr = data
					self.returnAddress = data.address
				} else if (self.getType == 3) {
					self.getAddr1 = data
					self.getAddress1 = data.address
				} else {
					self.returnAddr1 = data
					self.returnAddress1 = data.address
				}



			})
			if (options.params) {
				var param = JSON.parse(decodeURIComponent(options.params));
				this.carData = param;
				this.carImg = util.setCarImg(this.carData.model_id, this.carData.last_time);
				this.carTitle = this.carData.car_brand + '' + this.carData.car_series;
				this.dayPrice = '￥' + this.carData.day_price + '/次';
				this.dayPrice2 = '￥' + this.carData.day_price2 + '/次';
			}
		}
	};
</script>
<style lang="scss" scoped>
	// @import 'src/js/css/base';
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

	.tab-content {
		width: 700px;
		height: 40px;
		display: flex;
		align-items: center;
		flex-direction: column;
		color: #fff;
	}

	.share-img {
		width: 54rpx;
		height: 27rpx;
	}

	.addr-img {
		width: 35rpx;
		height: 35rpx;
		margin: 20px 10px;
	}

	.time-text {
		color: #333333;
		font-size: 28rpx;
		white-space: nowrap;
		overflow: hidden;
	}
</style>
