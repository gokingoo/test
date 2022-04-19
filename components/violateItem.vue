<template>
	<div class="border-contain margin-top20" style="padding: 20rpx">
		<div class="flex-row ">
			<text class="violate-txt">违章时间：</text>
			<text class="violate-txt">{{setTime}}</text>
		</div>
		<div class="flex-row margin-top20">
			<text class="violate-txt">违章地址：</text>
			<text class="violate-txt">{{violateData.address}}</text>
		</div>
		<div class="flex-row margin-top20">
			<text class="violate-txt">违章内容：</text>
			<text class="violate-txt">{{violateData.rule}}</text>
		</div>
		<div class="flex-row margin-top20">
			<text class="violate-txt">违章扣分：</text>
			<text class="violate-txt">{{violateData.score}}</text>
		</div>
		<div class="flex-row margin-top20">
			<text class="violate-txt">违章罚款：</text>
			<text class="violate-txt">￥{{violateData.amount}}</text>
		</div>
	</div>
</template>


<script>
	export default {
		props: {
			violateData: {}
		},
		data() {
			return {}
		},
		computed: {

			setTime() {
				return this.violateData.violate_time.substring(0, this.violateData.violate_time.length - 3);
			}
		},
		methods: {

		},
	}
</script>

<style lang="scss" scoped>

	.violate-txt {
		font-size: 28rpx;
		color: #333333;
	}
</style>
