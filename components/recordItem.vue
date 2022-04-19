<template>
	<div class="border-contain" style="margin-top: 20rpx;padding: 30rpx 20rpx;">
		<div class="flex-row align">
			<text style="font-size: 30rpx;color: #333333">发票申请 {{recordData.amount}}元（</text>
			<text :style="stateTxt">{{setState}}</text>
			<text style="font-size: 30rpx;color: #333333">）</text>
		</div>
		<div class="flex-row" style="margin-top: 40rpx">
			<div class="state-bg">
				<div class="flex-row align">
					<image class="state-img" style="margin-left: 65rpx" src="/static/images/state_ok@2x.png" />
					<div style="width: 65rpx;height: 1rpx;background-color: #cccccc"></div>
				</div>
				<text class="text-gray" style="margin-top: 10rpx;width: 180rpx;text-align: center">申请提交成功</text>
				<text class="text-gray"
					style="width:180rpx;text-align: center;margin-top: 10rpx;line-height: 40rpx">{{recordData.create_time}}</text>
			</div>
			<div class="flex1" style="height: 1rpx;background-color: #cccccc;margin-top: 24rpx"></div>
			<div class="state-bg">
				<div class="flex-row align">
					<div style="width: 65rpx;height: 1rpx;background-color: #cccccc"></div>
					<image v-if="recordData.state == -1" class="state-img" src="/static/images/state_fail@2x.png" />
					<image v-if="recordData.state == 0" class="state-img" src="/static/images/state_normal@2x.png" />
					<image v-if="recordData.state == 1" class="state-img" src="/static/images/state_ok@2x.png" />
					<div style="width: 65rpx;height: 1rpx;background-color: #cccccc"></div>
				</div>
				<text class="text-gray" style="margin-top: 10rpx;width: 180rpx;text-align: center">{{setReview}}</text>
				<text v-if="recordData.state !=0" class="text-gray"
					style="width: 180rpx;text-align: center;margin-top: 10rpx;line-height: 40rpx">{{recordData.check_time}}</text>
			</div>
			<div class="flex1" style="height: 1rpx;background-color: #cccccc;margin-top: 24rpx"></div>
			<div class="state-bg">
				<div class="flex-row align">
					<div style="width: 65rpx;height: 1rpx;background-color: #cccccc"></div>
					<image v-if="recordData.state == -1" class="state-img" src="/static/images/state_normal@2x.png" />
					<image v-if="recordData.state == 0" class="state-img" src="/static/images/state_normal@2x.png" />
					<image v-if="recordData.state == 1" class="state-img" src="/static/images/state_ok@2x.png" />
				</div>
				<text class="text-gray"
					style="margin-top: 10rpx;width: 180rpx;text-align: center;line-height: 40rpx">{{setEnd}}</text>
				<text v-if="recordData.state == 1" class="text-gray"
					style="width: 180rpx;text-align: center;line-height: 40rpx">{{recordData.express_number}}</text>
			</div>
		</div>

	</div>
</template>

<script>
	export default {
		props: {
			recordData: {}
		},
		data() {
			return {
				stateTxt: {
					fontSize: '30rpx',
					color: '#333333',
				},
			}
		},
		computed: {
			setState() {
				var state = '处理中...';

				if (this.recordData.state == -1) {
					state = '失败';
					this.stateTxt = {
						fontSize: '30rpx',
						color: '#ff8383',
					};
				} else if (this.recordData.state == 1) {
					state = '完成';
					this.stateTxt = {
						fontSize: '30rpx',
						color: '#70ccbb',
					}
				}
				return state;
			},
			setReview() {
				var review = '等待财务审核';
				if (this.recordData.state == -1) {
					review = '财务审核未通过';
				} else if (this.recordData.state == 1) {
					review = '财务审核已通过';
				}
				return review;
			},
			setEnd() {
				var end = '圆通快递寄出 运单号';
				if (this.recordData.state == 0) {
					end = '预计' + this.recordData.estimate_time + '之前完成发票邮寄';
				} else if (this.recordData.state == -1) {
					end = '发票申请终止';
				}
				return end;
			}
		},
		methods: {

		},
	}
</script>

<style lang="scss" scoped>
	.state-img {
		width: 50rpx;
		height: 50rpx;
	}

	.state-bg {
		width: 180rpx;
	}
</style>
