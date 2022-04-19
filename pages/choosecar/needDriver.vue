<template>
	<div>

		<div class="item-container">
			<list class="list">
				<cell>
					<div style="height: 20rpx;"></div>
				</cell>
				<cell class="cell">
					<div class="border-contain">
						<div class="flex-row align">
							<div class="flex1" style="overflow: hidden;">
								<div class="flex-row align" @click="toAddrChoose(3)">
									<image class="addr-img" src="/static/images/get_img@2x.png" />
									<text class="text-gray">上海</text>
									<image class="down" src="https://static.coolcargo.cn/public/image/applet/down_gray@2x.png" />
									<text
										style="color:#333333;font-size: 28rpx;white-space: nowrap;text-overflow: ellipsis;overflow:hidden">{{getAddress}}</text>
								</div>
								<div class="line-gray"></div>
								<div class="flex-row align" @click="toAddrChoose(6)">
									<image class="addr-img" src="/static/images/return_img@2x.png" />
									<text class="text-gray">上海</text>
									<image class="down" src="https://static.coolcargo.cn/public/image/applet/down_gray@2x.png" />
									<text
										style="color:#333333;font-size: 28rpx;white-space:nowrap;text-overflow: ellipsis;overflow: hidden">{{returnAddress}}</text>
								</div>
							</div>
							<div>
								<text class="border-btn margin20" style="font-size: 28rpx;">司机全程随车</text>
							</div>
						</div>
						<div class="line-gray"></div>
						<div class="flex-row align" style="height: 140rpx">
							<div class="align flex1">
								<div class="align flex1" style="display: flex;flex-direction: column;"
									@click="DatePicker(0)">
									<text class="text-black" style="font-size: 28rpx">{{getDayTxt}}</text>
									<text class="text-gray margin-top5">{{getTimeTxt}}</text>
								</div>
							</div>
							<div class="align" style="padding-bottom: 10rpx ">
								<text class="text-yellow"
									style="display: flex;flex-direction: column; align-items: center;">{{daysTxt}}</text>
								<image class="line-img" src="/static/images/line_img@2x.png" />
							</div>
							<div class="align flex1">
								<div class="align flex1" style="display: flex;flex-direction: column;"
									@click="DatePicker(1)">
									<text class="text-black" style="font-size: 28rpx">{{backDayTxt}}</text>
									<text class="text-gray margin-top5">{{backTimeTxt}}</text>
								</div>
							</div>
						</div>
					</div>
					<div class="border-contain align margin-top20"
						style="display: flex;flex-direction: column; align-items: center; ">
						<image class="car-image" resize="cover" :src="carImg" />
						<text class="text-black margin-top5" style="font-size: 30rpx">{{carTitle}}</text>
						<text class="text-gray margin-top5" style="font-size: 25rpx">{{carData.car_detail}}</text>
						<div class="flex-row align margin-top5">
							<div style="margin-right:10rpx;">
								<text class="text-yellow">{{dayPrice}}</text>
							</div>
							<!--<div class="vip-tag-contain flex-row align" @click="toValueCard">-->
							<!--<image class="vip-tag-img" src="/static/images/vip_tag@2x.png"></image>-->
							<!--<text class="vip-tag-text">会员低至￥{{Math.round(carData.day_price * 0.85)}}/天</text>-->
							<!--</div>-->
						</div>
						<div class="flex-row align margin-top5">
							<text class="text-yellow">{{outTime}}</text>
							<text class="text-yellow" style="margin-left: 20rpx">{{outDis}}</text>
						</div>
						<div class=" margin-top20 margin-bottom20 flex-row align " @click="questionClick()">
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
				</cell>
			</list>
			<view class="btn" @click="toPay(0)">立即订车</view>
		</div>

		<!-- <bmContainer :touchBarShow="true"></bmContainer> -->
		<!--<wxc-mask height="460" width="650" border-radius="10" duration="200" :top="300" mask-bg-color="#FFFFFF"-->
		<!--:overlay-can-close="false" :has-animation="true" :has-overlay="true" :show-close="false"-->
		<!--:show="overlayShow" @wxcMaskSetHidden="wxcMaskSetHidden">-->
		<!--<div class="align" style="overflow:hidden;">-->
		<!--<text  style="font-size: 32rpx;color:#333333;margin: 30rpx">【尊享司机服务天数选择】</text>-->
		<!--<text class="text-black" >您租车时长为{{daysTxt}}，最多可选择{{days}}天</text>-->
		<!--<text class="text-black" style="margin-left: 30rpx;margin-right: 30rpx">专属代驾司机服务，下单后代驾司机会与您联系确定具体服务细节。</text>-->
		<!--<div class="flex-row align "style="margin-top: 50rpx">-->
		<!--<image class="del-btn" src="/static/images/day_del@2x.png" @click="delClick"/>-->
		<!--<text class="text-black" style="font-size: 28rpx;width: 150rpx;text-align: center">{{driverDays}}天</text>-->
		<!--<image class="del-btn" src="/static/images/day_add@2x.png" @click="addClick"/>-->
		<!--</div>-->
		<!--<div class="line-gray" style="margin-top: 80rpx"></div>-->
		<!--<div class="flex-row">-->
		<!--<text class="confim" @click="toConfirm(0)">取消</text>-->
		<!--<div class="line"></div>-->
		<!--<text class="confim"  @click="toConfirm(1)">确定</text>-->
		<!--</div>-->
		<!--</div>-->
		<!--</wxc-mask>-->
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
        <wxc-mask height="500" width="650" border-radius="10" duration="200" :top="300" mask-bg-color="#FFFFFF"
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
				showPicker: false,
				timetype: 0,
				mobile: '',
				content: '',
				carData: {},
				getAddr: {},
				returnAddr: {},
				overlayShow: false,
				outShow: false,
				authShow: false,
				carImg: '',
				needInsurance: false,
				needDriver: false,
				animationType: 'push',
				getDate: [],
				returnDate: [],
				isRange: false,
				calendarTitle: '选择日期',
				dateRange: [],
				dateRange1: [],
				getNote: ['开始'],
				returnNote: ['结束'],
				minibarCfg: {
					title: '日期选择'
				},
				isGet: true,
				getTime: '',
				backTime: '',
				getDayTxt: '选择开始',
				getTimeTxt: '日期时间',
				backDayTxt: '选择结束',
				backTimeTxt: '日期时间',
				daysTxt: '',
				days: 0,
				driverDays: 0, //最后选择的天数
				needDays: 0,
				order: {},
				locationData: {},
				getType: 0,
				getAddress: '请输入上车地址',
				returnAddress: '请输入结束行程地址',
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
				questionTitle: '车+司机服务介绍',
				questionTxt: '本服务提供车辆与专属司机服务。价格包含车费、油费、保险费、司机服务费等。服务中产生的路桥费、停车费等额外费用由乘客自行承担。如产生超时与超公里费用，由司机与乘客确认后扫码支付。夜间服务时间段（23：00-7:00）需加收50元/次服务费。',
				carTitle: '',
				dayPrice: '',
				outTime: '',
				outDis: '',
				noticeList: [],
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
						this.backTimeTxt = this.backTime
						this.countTime();
					}
					// //选择的值
					// // ('value => ' + e.value);
					// //原始的Date对象
					// // ('date => ' + e.date);
				}
			},

			tabPageSelected() {},
			toCancel() {
				this.questionShow = false;
			},
			questionClick() {
				uni.showModal({
					showCancel: false,
					title: "接送机服务介绍",
					content: "本服务提供机场或火车站接送。以预定到达时间为准，机场免费等待1小时。价格包含车费、油费、保险费、司机服务费等。服务中产生的路桥费、停车费等额外费用由乘客自行承担。夜间服务时间段（23：00-7:00）需加收50元/次服务费。"
				})
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
			toPay() {
				this.postToOrder();
			},
			// toConfirm(type) {
			//     this.overlayShow = false;
			//     if (type == 1) {
			//         this.needDays = this.driverDays;
			//     }
			// },
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
			countTime() {
				if (this.getDayTxt == '选择开始' || this.getTimeTxt == '日期时间' || this.backDayTxt == '选择结束' || this
					.backTimeTxt == '日期时间') {
					this.daysTxt = '';
					return;
				}
				var get = this.getDayTxt + ' ' + this.getTimeTxt;
				var back = this.backDayTxt + ' ' + this.backTimeTxt;
				var start = new Date(get.replace(/-/g, "/")).getTime();
				var end = new Date(back.replace(/-/g, "/")).getTime();
				var dateDiff = end - start; //时间差的毫秒数
				if (dateDiff <= 0) {
					uni.showModal({
						content: '请认真选择时间!!',
						showCancel: false
					})
					this.conditionClear();
					return
				}
				var dayDiff = Math.floor(dateDiff / (24 * 3600 * 1000)); //计算出相差天数
				var leave1 = dateDiff % (24 * 3600 * 1000); //计算天数后剩余的毫秒数
				var hours = Math.floor(leave1 / (3600 * 1000)); //计算出小时数
				//计算相差分钟数
				var leave2 = leave1 % (3600 * 1000); //计算小时数后剩余的毫秒数
				var minutes = Math.floor(leave2 / (60 * 1000)); //计算相差分钟数
				this.days = dayDiff;
				if (hours > 0 || minutes > 0) {
					this.days = dayDiff + 1;
				}
				this.daysTxt = this.days + '天';
				// if(hours ===0 && minutes ===0)
				//     this.daysTxt =  dayDiff+'天';
				// else
				//     this.daysTxt = dayDiff+'天'+hours+'时'+minutes+'分';
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
			// backClick() {
			// 	const self = this;
			// 	globalEvent.addEventListener('androidBack', options => {
			// 		self.$notice.toast({
			// 			message: '点击返回键'
			// 		});
			// 		if (self.$refs['wxcGetCalendar'].isShow()) {
			// 			self.$refs['wxcGetCalendar'].dismiss();
			// 			return;
			// 		}
			// 	})
			// },
			// getData() {
			// 	if (this.$storage.getSync('notice_list')) {
			// 		this.noticeList = this.$storage.getSync('notice_list');
			// 		this.questionTxt = this.noticeList[1];
			// 	}
			// 	if (this.$storage.getSync('location')) {
			// 		this.locationData = this.$storage.getSync('location');
			// 		if (!this.getAddr.hasOwnProperty('address')) {
			// 			this.getAddr = this.locationData;
			// 			this.getAddress = this.getAddr.address;
			// 		}
			// 	}
			// 	if (this.$storage.getSync('user_mobile'))
			// 		this.mobile = this.$storage.getSync('user_mobile');
			// },
			postToOrder() {
				if (!this.getAddr.hasOwnProperty('address')) {
					uni.showToast({
						title: '请输入上车地址!',
						icon: 'none'
					})
					return;
				}
				if (!this.returnAddr.hasOwnProperty('address')) {
					uni.showToast({
						title: '请输入还车地址!',
						icon: 'none'
					})
					return;
				}
				if (this.getDate.length === 0) {
					uni.showToast({
						title: '请选择开始日期!',
						icon: 'none'
					})
					return;
				}
				if (this.returnDate.length === 0) {
					uni.showToast({
						title: '请选择结束日期!',
						icon: 'none'
					})
					return;
				}
				if (!this.getTime.length) {
					// // (this.getTime)
					uni.showToast({
						title: '请选择开始时间!',
						icon: 'none'
					})
					return;
				}
				if (!this.backTime.length) {
					uni.showToast({
						title: '请选择结束时间!',
						icon: 'none'
					})
					return;
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
				if (this.needDriver) {
					driver_need = 1;
					days = this.driverDays;
				}
				var start = '';
				if (this.getAddr.title.length > 0 && this.getAddr.title != this.getAddr.address) {
					start = this.getAddr.title + "(" + this.getAddr.address + ")";
				} else {
					start = this.getAddr.address;
				}
				var end = '';
				if (this.returnAddr.hasOwnProperty('address')) {
					if (this.returnAddr.title.length > 0 && this.returnAddr.title != this.returnAddr.address) {
						end = this.returnAddr.title + "(" + this.returnAddr.address + ")";
					} else {
						end = this.returnAddr.address;
					}
				}

				// var cityId = this.$storage.getSync('city_id');
				var dict = {
					user_id: userId,
					user_token: token,
					city_id: '321',
					service_type: this.carData.service_type,
					driver_need: driver_need,
					driver_days: days,
					insurance_type: insurance_type,
					model_id: this.carData.model_id,
					start_address: start,
					start_lon: this.getAddr.lon,
					start_lat: this.getAddr.lat,
					start_time: this.getDate + ' ' + this.getTime + ':00',
					return_time: this.returnDate + ' ' + this.backTime + ':00',
					data_id: 0
				};
				if (this.returnAddr.hasOwnProperty('address')) {
					dict.return_address = end;
					dict.return_lon = this.returnAddr.lon;
					dict.return_lat = this.returnAddr.lat;
				}
				uni.request({
					method: 'POST',
					url: util.getOpenUrl() + '/order',
					data: util.getParmasData(dict)
				}).then(res => {
					var res = res[1].data;
					if (res.result == 0) {
						// this.$notice.toast({message: '订单提交成功'});
						this.saveHisAddr(0, this.getAddr);
						this.saveHisAddr(1, this.returnAddr);
						// if(utilFunc.env.isAndroid()){
						//     this.$router.back({type:'PUSH'});
						// }
						// // (res.content)
						this.toOrderPay(res.content);

					} else {
						uni.showToast({
							title: res.message,
							icon: 'none'
						});
						if (res.message == '取车坐标不在指定范围内') {
							this.pos[0] = this.getAddr.lon;
							this.pos[1] = this.getAddr.lat;
							this.outShow = true;
						} else if (res.message == '还车坐标不在指定范围内') {
							this.pos[0] = this.returnAddr.lon;
							this.pos[1] = this.returnAddr.lat;
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
				if (type == 3)
					uni.navigateTo({
						url: `../city/addressSearch?type=${type}`
					})

				if (type == 6) {
					if (this.getAddress == "请输入上车地址") {
						uni.showModal({
							content: '请先输入上车地址',
							showCancel: false
						})
						return false;
					} else {
						uni.navigateTo({
							url: `../city/addressSearch?type=${type}`
						})
					}
				}

			},
			conditionClear() {
				this.returnDate = [];
				this.getTime = '';
				this.getDayTxt = '选择开始'
				this.getTimeTxt = '日期时间';
				this.backDayTxt = '选择结束';
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

			}
		},
		created() {
			this.setDateRange();
		},
		onLoad(options) {
			var self = this;
			uni.$on("selectType", function(data) {
				if (!data.address) {
					return;
				}
				if (self.getType == 3) {
					self.getAddr = data
					self.getAddress = data.address
				} else {
					self.returnAddr = data
					self.returnAddress = data.address
				}
			})

			if (options.params) {
				var param = JSON.parse(decodeURIComponent(options.params));
				this.carData = param;
				this.carImg = util.setCarImg(this.carData.model_id, this.carData.last_time);
				this.carTitle = this.carData.car_brand + '' + this.carData.car_series;
				this.dayPrice = '￥' + this.carData.day_price + '/天(8h或100km)';
				this.outTime = '超时￥' + this.carData.overtime_price + '/h';
				this.outDis = '超程￥' + this.carData.overmileage_price + '/km';
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

	.addr-img {
		width: 35rpx;
		height: 35rpx;
		margin: 20px 10px;
	}
</style>
