<template>
	<div @click="toChoose">
		<image class="coupon-line" style="align-items: center;" src="/static/images/coupon_line@2x.png" />
		<div class="contain">
			<div class="price">
				<text style=" color: #ff6004;font-size: 22rpx;margin-left: 30rpx">￥</text>
				<text class="price-txt">{{couponData.coupon_amount}}</text>
			</div>
			<div style="width: 440rpx">
				<text class="coupon-name" style="margin-bottom: 0px;">{{couponData.coupon_name}}</text>
				<div style="display: flex;flex-direction: row;align-items: center">
					<text style="color: #999999;font-size: 50rpx;margin-right: 5rpx">·</text>
					<text class="txt">{{couponData.comment}}</text>
				</div>

				<div style="display: flex;flex-direction: row;align-items: center">
					<text style="color: #999999;font-size: 50rpx;margin-right: 5rpx">·</text>
					<text class="txt">有效期至{{couponData.available_time.substring(0,10)}}</text>
				</div>
			</div>

			<image v-if="type!=99 && couponData.checked" class="radio-img" src="/static/images/radio_checked@2x.png">
			</image>
			<image v-if="type!=99 && !couponData.checked " class="radio-img"
				src="/static/images/radio_unchecked@2x.png"></image>
		</div>
	</div>
</template>

<script>
	export default {
		props: {
			type: 0,
			couponData: {}
		},
		data() {
			return {}
		},
		methods: {
			toChoose() {
				return this.$emit('toChoose');
			}
		},
	}
</script>

<style scoped>
	.coupon-line {
		width: 100%;
		margin-top: 10rpx;
		height: 8rpx;

	}

	.contain {
		display: flex;
		flex-direction: row;
		align-items: center;
		height: 220rpx;
		background-color: #ffffff;
		border-radius: 15rpx;
	}

	.coupon-name {
		font-size: 30rpx;
		color: #333333;
		display: flex;
		flex-direction: column;
		align-items: center;
	}

	.radio-img {
		width: 45rpx;
		height: 45rpx;
		margin: 20rpx;
	}

	.txt {
		font-size: 20rpx;
		color: #999999;
		margin-top: 5rpx;
	}

	.price {
		width: 200rpx;
		flex-direction: row;
		align-items: center;
	}

	.price-txt {
		font-size: 45rpx;
		color: #ff6004;
	}
</style>
