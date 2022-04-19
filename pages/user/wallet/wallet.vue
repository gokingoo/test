<template>
	<div class="align">
		<div class="border-contain" style="padding: 30rpx;margin-top: 20rpx">
			<div class="flex-row" style="padding-top: 20rpx;padding-bottom: 50rpx">
				<text class="flex1 text-black" style="font-size: 30rpx">优惠券</text>
				<div class="flex-row" @click="toCoupon">
					<text class="text-gray" style="margin-right: 10rpx">查看全部</text>
					<image class="point-right" src="https://static.coolcargo.cn/public/image/applet/point_right@2x.png" />
				</div>

			</div>
			<div class="coupon-bg flex-row align">
				<image class="coupon-left" src="../../../static/images/wallet_bg_left@2x.png" />
				<div class="flex1" >
					<div class="flex-row align" style="margin-bottom: 50rpx">
						<image class="card-img" src="https://static.coolcargo.cn/public/image/applet/coupon_img@2x.png" />
						<text class="text-black" style="font-size: 28rpx;margin-left: 20rpx;">优惠券</text>
					</div>
					<text class="text-gray">当前拥有{{couponSize}}张优惠券</text>
				</div>
				<div style="width: 1px;height:130rpx;background-color: #cccccc;"></div>
				<text class="text-black"
					style="height: 152rpx;line-height:152rpx;font-size: 28rpx; margin-left: 50rpx;margin-right: 30rpx"
					@click="toCoupon">去兑换</text>
				<image class="coupon-left" src="../../../static/images/wallet_bg_right@2x.png" />
			</div>
		</div>
		<div class="border-contain" style="padding: 30rpx;margin-top: 20rpx">
			<div class="flex-row" style="padding-top: 20rpx;padding-bottom: 50rpx">
				<text class="flex1 text-black" style="font-size: 30rpx">储值卡</text>
				<div class="flex-row" @click="toValueCard">
					<text class="text-gray" style="margin-right: 10rpx">前往储值</text>
					<image class="point-right" src="https://static.coolcargo.cn/public/image/applet/point_right@2x.png" />
				</div>

			</div>
			<div class="card-bg flex-row">
				<div class="flex1">
					<div class="flex-row align" style="margin-bottom: 30rpx">
						<image class="card-img" src="https://static.coolcargo.cn/public/image/applet/card_img@2x.png" />
						<text class="text-white" style="font-size: 28rpx;margin-left: 20rpx;">储值卡</text>
					</div>
					<text class="text-gray">储值卡消费低至85折</text>
				</div>
				<div class="flex-row ">
					<text class="text-white" style="font-size: 35rpx">{{userData.balance}}</text>
					<text class="text-white" style="margin-top: 10rpx">元</text>
				</div>
			</div>
		</div>
	</div>
</template>
<script>
	export default {
		data() {
			return {
				title: "设置",
				couponSize: 0,
				userData: {}

			}
		},
		components: {
			// bmContainer
		},
		methods: {
			toCoupon() {
				uni.navigateTo({
					url: './coupon?type=99'
				})
			},
			toValueCard() {
				uni.navigateTo({
					url: './valueCard'
				})
			},
			getData() {
				this.userData = {};
				if (uni.getStorageSync('user_info')) {
					this.userData = uni.getStorageSync('user_info');
					if (this.userData.coupon_list.length > 0) {
						this.couponSize = this.userData.coupon_list.length;
					}

				}
			}
		},
		onLoad() {
			this.getData()
			const self = this
			uni.$on("ispay", function(data) {
				if (data == 1) {
					self.getData()
				}
			})
		}
	};
</script>
<style lang="scss" scoped>
	.coupon-bg {
		// width: 660rpx;
		height: 152rpx;
		border-style:solid;
		border-width: 1rpx;
		border-top-color: #cccccc;
		border-bottom-color: #cccccc;
		border-left-color: #ffffff;
		border-right-color: #ffffff;
		border-radius: 10rpx;
	}

	.coupon-left {
		width: 24rpx;
		height: 152rpx;
	}

	.card-img {
		width: 41rpx;
		height: 35rpx;
	}

	.card-bg {
		// width: 660rpx;
		height: 90rpx;
		padding: 30rpx;
		border-radius: 12rpx;
		background-color: #595959;
		/*background: linear-gradient(to right , #5d5d5d, #333333);*/
	}
</style>
