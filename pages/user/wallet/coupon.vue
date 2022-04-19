<template>
	<div class="align">
		<list class="list" ref="list" :showRefresh="true" @refresh="onrefresh">
			<cell class="cell">
				<div class="border-contain flex-row align"
					style="padding: 20rpx;margin-top: 20rpx;margin-bottom: 10rpx">
					<input class="input" type="text" placeholder="请输入兑换码" v-model="chargeCode" />
					<text class="change-btn" @click="toCharge">兑换</text>
				</div>
				<div v-if="type!=99" class="border-contain flex-row align"
					style="padding-left: 20rpx;padding-top: 10rpx;padding-bottom: 10rpx" @click="checkNoUse">
					<text class="text-black flex1">不使用优惠券</text>
					<image v-if="noUse" class="radio-img" src="/static/images/radio_checked@2x.png" />
					<image v-if="!noUse" class="radio-img" src="https://static.coolcargo.cn/public/image/applet/radio_unchecked@2x.png" />
				</div>
				<div class="align" style="justify-content: center" v-if="!couponList.length">
					<nothing padding-top="220rpx" :title="nothingStr"></nothing>
				</div>
			</cell>
			<cell v-if="couponList.length" class="cell" v-for="(i, index) in couponList" :key="index">
				<coupon-item :couponData="i" @toChoose="toChoose(index)" :type="type"></coupon-item>
			</cell>
		</list>
		<view v-if="type!=99" class="btn" @click="onConfirm">确认选择</view>
	</div>
</template>
<script>
	import {
		get,
		put
	} from '../../../utils/netUtil.js'
	import CouponItem from '../../../components/couponItem'
	import nothing from '../../../components/nothing'
	export default {
		data() {
			return {
				title: "设置",
				nothingStr: '当前暂无优惠券',
				type: 0,
				noUse: false,
				couponList: [],
				chargeCode: '',
				coupon: {}

			}
		},
		components: {
			// bmContainer,
			CouponItem,
			nothing
		},
		methods: {
			onrefresh() {
				this.$refs["list"].refreshEnd();
				this.getCouponList();
			},
			onConfirm() {
				if (this.noUse) {
					this.coupon = {
						data_id: 0,
						coupon_amount: 0,
					}
				}
				var coupon = {
					coupon: this.coupon
				}
				uni.$emit('coupon', coupon)
				uni.navigateBack();
			},
			toChoose(index) {
				this.couponList[index].checked = true;
				this.coupon = this.couponList[index];
				this.noUse = false;
				for (var i = 0; i < this.couponList.length; i++) {
					if (index != i) {
						this.couponList[i].checked = false;
					}
				}
			},
			toCharge() {
				if (!this.chargeCode) {
					uni.showToast({
						title: '请输入兑换码',
						icon: 'none'
					});
					return;
				}
				var userId = uni.getStorageSync('user_id');
				var token = uni.getStorageSync('user_token');
				var dict = {
					user_id: userId,
					user_token: token,
					code: this.chargeCode,
					service_type: this.type
				}
				put('/coupon', dict).then(res => {
					uni.showToast({
						title: '兑换成功',
						icon: 'success'
					});

					// var user = this.$storage.getSync('user_info');
					// user.coupon_list = this.couponList;
					// this.$storage.setSync('user_info',user);
					this.couponList = [];
					if (this.type != 99) {
						for (var i = 0; i < res.length; i++) {
							if (i == 0) {
								res[i].checked = true;
								this.coupon = res[i];
							} else {
								res[i].checked = false;
							}
							this.couponList.push(res[i]);
						}
					} else
						this.couponList = res;
				})
			},
			checkNoUse() {
				this.noUse = true;
				for (var i = 0; i < this.couponList.length; i++) {
					this.couponList[i].checked = false;
				}
			},
			getCouponList() {
				var userId = uni.getStorageSync('user_id');
				var token = uni.getStorageSync('user_token');
				if (!userId || !token) {
					return;
				}
				var dict = {
					user_id: userId,
					user_token: token,
					service_type: this.type
				}
				get('/coupon', dict).then(res => {
					// res = [{
					//     data_id:1,
					//     service_name:'新用户体验券',
					//     coupon_name:'新用户体验券',
					//     available_time:'2019-01-18',
					//     coupon_amount:100,
					//     comment:'该券不与其他优惠活动同时使用 该券不找零，不可兑换现金'
					// }, {
					//     data_id:2,
					//     service_name:'分享有礼回馈券',
					//     coupon_name:'分享有礼回馈券',
					//     available_time:'2019-01-18',
					//     coupon_amount:50,
					//     comment:'该券不与其他优惠活动同时使用 该券不找零，不可兑换现金'
					// },
					//     {
					//         data_id:3,
					//         service_name:'新用户体验券1',
					//         coupon_name:'新用户体验券1',
					//         available_time:'2019-02-18',
					//         coupon_amount:200,
					//         comment:'该券不与其他优惠活动同时使用 该券不找零，不可兑换现金'
					//     }];
					this.couponList = [];
					if (this.type !== 99 && res.length > 0) {
						for (var i = 0; i < res.length; i++) {
							if (i == 0) {
								res[i].checked = true;
								this.coupon = res[i];
							} else
								res[i].checked = false;

							this.couponList.push(res[i]);
						}
					} else
						this.couponList = res;

				})
			},
			getData() {
				if (uni.getStorageSync('user_info').coupon_list) {
					this.couponList = uni.getStorageSync('user_info').coupon_list;
					if (this.type == 0 && this.couponList.length > 0) {
						for (let i = 0; i < this.couponList.length; i++) {
							if (i == 0) {
								this.couponList[i].checked = true;
							} else {
								this.couponList[i].checked = false;
							}
						}
					}
				}
			}
		},
		created() {
			this.getData();
		},
		onLoad(data) {
			this.type = data.type;
			this.getCouponList();
		}
	};
</script>
<style lang="scss" scoped>
	.input {
		width: 520rpx;
		height: 80rpx;
		font-size: 30rpx;
		background-color: #cccccc;
		border-radius: 10px;
	}

	.change-btn {
		width: 140rpx;
		height: 80rpx;
		font-size: 25rpx;
		background-color: #333333;
		border-radius: 10px;
		margin-left: 20rpx;
		color: #ffffff;
		line-height: 80rpx;
		text-align: center;
	}
</style>
