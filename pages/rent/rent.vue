<template>
	<view>
		<swiper style="margin-top: 10rpx border-radius: 25rpx;" :indicator-dots="true" :autoplay="true" :interval="6000"
			:duration="1000" :circular="true">
			<swiper-item v-for="(item,i) in lunboList" :key="i">
				<view class="swiper-item">
					<image :src="item.src"></image>
				</view>
			</swiper-item>
		</swiper>
		<view>
			<div class="flex-row" style="margin-top: 10rpx;margin-bottom: 10rpx">
				<div class="flex1 plane-contain" @click="toChooseCar(2)">
					<div class="flex-row align">
						<image class="plane-img" src='https://static.coolcargo.cn/public/image/applet/plane_img@2x.png' />
						<text class="text-black">接送机服务</text>
					</div>
				</div>
				<div class="flex1 plane-contain" style="margin-left: 15rpx" @click="toChooseCar(1)">
					<div class="flex-row align">
						<image class="driver-need" src="/static/images/driver_need@2x.png" />
						<text class="text-black">车+司机服务</text>
					</div>
				</div>
			</div>
		</view>
		<view>
			<div class="flex-row">
				<div class="flex1">
					<div class="choose-item" @click="chooseCarType(0)">
						<image style="width: 35rpx;height: 33rpx;margin-bottom: 10rpx" :src="allImg" />
						<text :style="{fontSize:chooseTxt.fontSize,color:chooseTxt.color}">全部</text>
					</div>
				</div>
				<div class="flex1" @click="chooseCarType(1)">
					<div class="choose-item">
						<image style="width: 90rpx;height: 33rpx;margin-bottom: 10rpx" :src="carImg" />
						<text :style="{fontSize:chooseTxt1.fontSize,color:chooseTxt1.color}">轿车</text>
					</div>
				</div>
				<div class="flex1">
					<div class="choose-item" @click="chooseCarType(2)">
						<image style="width: 78rpx;height: 23rpx;margin-top:10rpx;margin-bottom: 10rpx"
							:src="runImg " />
						<text :style="{fontSize:chooseTxt2.fontSize,color:chooseTxt2.color}">跑车</text>
					</div>
				</div>
				<div class="flex1">
					<div class="choose-item" @click="chooseCarType(3)">
						<image style="width: 84rpx;height: 36rpx;margin-bottom: 10rpx" :src="businessImg" />
						<text :style="{fontSize:chooseTxt3.fontSize,color:chooseTxt3.color}">商务车</text>
					</div>
				</div>
			</div>
		</view>
		<uni-grid :column="2" :showBorder="false">
			<uni-grid-item v-for="(i, index) in carList" :key='index' style="align-items: center;">
				<car-item :carData="i" @toSchedule="toSchedule(i)"></car-item>
			</uni-grid-item>
		</uni-grid>
		<nothing padding-top="220" :title="nothingStr" v-if="!carList.length" :btnType1=true
			@LeftBtnClicked='refreshClick'></nothing>

	</view>
</template>

<script>
	import {
		get,
		
	} from ' ../../utils/netUtil.js'
	import util from ' ../../utils/util.js'
	import CarItem from '../../components/carItem.vue'
	import nothing from '../../components/nothing.vue'
	export default {
		data() {
			return {
				url :'',
				opentype: 0,
				carList: [],
				lunboList: [],

				city: "上海市",
				carType: 0,
				banners: [],
				chooseTxt: {
					fontSize: "25rpx",
					color: "#333333"
				},
				chooseTxt1: {
					fontSize: '25rpx',
					color: '#999999'
				},
				chooseTxt2: {
					fontSize: '25rpx',
					color: '#999999'
				},
				chooseTxt3: {
					fontSize: '25rpx',
					color: '#999999'
				},
				allImg: '/static/images/all_checked@2x.png',
				carImg: '/static/images/car_unchecked@2x.png',
				runImg: '/static/images/run_unchecked@2x.png',
				businessImg: '/static/images/business_unchecked@2x.png',
				carList: [],
				orderCar: {
					model_id: 0,
					car_brand: '定制车型',
					car_series: '',
					day_price: '三个月以上长租可使用',
					car_tag: ''
				},
				nothingStr: '重新加载界面',
			}
		},
		methods: {
			refreshClick(){
			    this.getAdvert();
			    this.getCarList();
			},
			toSchedule(carData) {
				if (util.isLogin())
					if (carData.model_id === 0) {
						uni.navigateTo({
							url: '../order/ordercar'
						})
					} else {
						var carData = encodeURIComponent(JSON.stringify(carData));
						uni.navigateTo({
							url: '../order/schedulecar?param=' + carData
						})
					}
			},
			getCarList() {
				var data = {
					car_type: this.carType,
					service_type: 0,
					city_id: '321'
				}
				get('/car', data).then(res => {
					this.carList = res;
					 this.carList[this.carList.length] = this.orderCar;
				})

			},
			toChooseCar(type) {
				if (util.isLogin())
					uni.navigateTo({
						url: `../choosecar/choosecar?car_type=${type}`
					})
			},
			getAdvert() {
				var dict = {}
				get('/advert', dict).then(res => {
					this.banners = [];
					if (res.length > 0) {
						for (var i = 0; i < res.length; i++) {
							var advert = res[i];
							advert.src = util.setAdvertImg(advert.advert_id);
							this.banners.push(advert);
						}
						this.lunboList = this.banners
					}
				})
			},
			chooseCarType(type) {
				if (type == 0) {
					this.carType = 0;
					this.allImg = '/static/images/all_checked@2x.png';
					this.carImg = '/static/images/car_unchecked@2x.png';
					this.runImg = '/static/images/run_unchecked@2x.png';
					this.businessImg = '/static/images/business_unchecked@2x.png';
					this.chooseTxt = {
						fontSize: '25rpx',
						color: '#333333'
					};
					this.chooseTxt1 = {
						fontSize: '25rpx',
						color: '#999999'
					};
					this.chooseTxt2 = {
						fontSize: '25rpx',
						color: '#999999'
					};
					this.chooseTxt3 = {
						fontSize: '25rpx',
						color: '#999999'
					};
				} else if (type == 1) {
					this.carType = 1;
					this.allImg = '/static/images/all_unchecked@2x.png';
					this.carImg = '/static/images/car_checked@2x.png';
					this.runImg = '/static/images/run_unchecked@2x.png';
					this.businessImg = '/static/images/business_unchecked@2x.png';
					this.chooseTxt = {
						fontSize: '25rpx',
						color: '#999999'
					};
					this.chooseTxt1 = {
						fontSize: '25rpx',
						color: '#333333'
					};
					this.chooseTxt2 = {
						fontSize: '25rpx',
						color: '#999999'
					};
					this.chooseTxt3 = {
						fontSize: '25rpx',
						color: '#999999'
					};
				} else if (type == 2) {
					this.carType = 3;
					this.allImg = '/static/images/all_unchecked@2x.png';
					this.carImg = '/static/images/car_unchecked@2x.png';
					this.runImg = '/static/images/run_checked@2x.png';
					this.businessImg = '/static/images/business_unchecked@2x.png';
					this.chooseTxt = {
						fontSize: '25rpx',
						color: '#999999'
					};
					this.chooseTxt1 = {
						fontSize: '25rpx',
						color: '#999999'
					};
					this.chooseTxt2 = {
						fontSize: '25rpx',
						color: '#333333'
					};
					this.chooseTxt3 = {
						fontSize: '25rpx',
						color: '#999999'
					};
				} else if (type == 3) {
					this.carType = 2;
					this.allImg = '/static/images/all_unchecked@2x.png';
					this.carImg = '/static/images/car_unchecked@2x.png';
					this.runImg = '/static/images/run_unchecked@2x.png';
					this.businessImg = '/static/images/business_checked@2x.png';
					this.chooseTxt = {
						fontSize: '25rpx',
						color: '#999999'
					};
					this.chooseTxt1 = {
						fontSize: '25rpx',
						color: '#999999'
					};
					this.chooseTxt2 = {
						fontSize: '25rpx',
						color: '#999999'
					};
					this.chooseTxt3 = {
						fontSize: '25rpx',
						color: '#333333'
					}
				}

				this.getCarList();
			},

		},
		created() {
			this.getCarList()
			this.getAdvert()
		},
		onPullDownRefresh() {
			var self = this;
			self.getCarList()
			self.getAdvert()
			setTimeout(function() {
				uni.stopPullDownRefresh();
			}, 500);
		},
		components: {
			CarItem,
			nothing
		},
		onLoad() {},
	}
</script>

<style lang="scss">
	swiper {
		height: 330rpx;

		.swiper-item,
		image {
			width: 100%;
			height: 100%;
		}
	}

	.plane-contain {
		flex-direction: column;
		display: flex;
		align-items: center;
		background-color: #ffffff;
		overflow: hidden;
		border-radius: 10rpx;
		padding: 30rpx 20rpx;
	}

	.plane-img {
		width: 70rpx;
		height: 50rpx
	}

	.driver-need {
		width: 90rpx;
		height: 50rpx;
		margin-right: 20rpx;
	}

	.choose-item {
		display: flex;
		flex-direction: column;
		align-items: center;
		padding: 20rpx
	}

	.waterfall {
		padding: 0 15rpx
	}

	.tag-text {
		width: 30px;
		height: 30rpx;
		text-align: center;
		line-height: 30rpx;
		margin-left: 10rpx;
		padding-left: 8rpx;
		padding-right: 8rpx;
		background-color: #fdceb2;
		border-radius: 5rpx;
		font-size: 23rpx;
		color: #ff6004;
	}

	.text {
		color: #ff6004;
	}

	.txt {
		font-size: 24rpx;
		color: #999999;
	}
</style>
