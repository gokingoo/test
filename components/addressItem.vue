<template>
	<div class="contain" @click="onItemClick">
		<text class="t-text">{{addressData.title}}</text>
		<text class="text-gray" style="margin-top: 5rpx">{{addressData.address}}</text>
	</div>
</template>

<script>
	export default {
		props: {
			addressData: {}
		},
		data() {
			return {}
		},
		methods: {
			onItemClick() {
				return this.$emit('onItemClick');
			}
		},
	}
</script>

<style lang="scss" scoped>
	.contain {
		background-color: white;
		padding: 20rpx;
	}

	.t-text {
		color: #333333;
		font-size: 30rpx;
	}
</style>
