<template>
	<div class="flex-row border-contain align" style="margin-top: 20rpx" @click="clickChoose">
		<image v-if="invoiceData.checked" class="radio-img" src="/static/images/radio_checked@2x.png" />
		<image v-if="!invoiceData.checked" class="radio-img" src="https://static.coolcargo.cn/public/image/applet/radio_unchecked@2x.png" />
		<div>
			<div class="flex-row align">
				<image class="addr-img" src="https://static.coolcargo.cn/public/image/applet/time_img@2x.png" />
				<text
					style="width: 440rpx;font-size: 25rpx;color: #333333;overflow: hidden;text-overflow: ellipsis">{{invoiceData.time}}</text>
				<text class="type-bg">{{setType}}</text>
			</div>
			<div v-if="invoiceData.reason != 0 && invoiceData.start_address" class="flex-row align">
				<image class="addr-img" src="/static/images/get_img@2x.png" />
				<text
					style="font-size: 25rpx;color: #333333;overflow: hidden;text-overflow: ellipsis">{{invoiceData.start_address}}</text>
			</div>
			<div class="flex-row align">
				<image v-if="invoiceData.reason != 0 && invoiceData.return_address" class="addr-img"
					src="/static/images/return_img@2x.png" />
				<text v-if="invoiceData.reason != 0 && invoiceData.return_address"
					style="width: 420rpx;font-size: 25rpx;color: #333333;white-space:nowrap;overflow: hidden;text-overflow: ellipsis">{{invoiceData.return_address}}</text>
				<div v-if="invoiceData.reason == 0 || !invoiceData.return_address"
					style="width: 490rpx;margin-top: 30rpx;margin-bottom: 30rpx"></div>
				<text style="font-size: 25rpx;color: #fabe00;width: 130rpx">￥{{invoiceData.amount}}</text>
			</div>

		</div>
	</div>
</template>

<script>
	export default {
		props: {
			invoiceData: {}
		},
		data() {
			return {}
		},
		computed: {
			setType() {
				var type = '储值';
				if (this.invoiceData.reason == 1)
					type = '租车';
				else if (this.invoiceData.reason == 2)
					type = '车+司机';
				else if (this.invoiceData.reason == 3)
					type = '接送机';
				else if (this.invoiceData.reason == 4)
					type = '接送机';
				return type;
			}
		},
		methods: {
			clickChoose() {
				return this.$emit('clickChoose');
			}
		},
	}
</script>

<style lang="scss" scoped>
	.type-bg {
		width: 100rpx;
		padding: 2rpx;
		margin-right: 20rpx;
		text-align: center;
		border-width: 1rpx;
		border-color: #989898;
		color: #999999;
		font-size: 22rpx;
	}
</style>
