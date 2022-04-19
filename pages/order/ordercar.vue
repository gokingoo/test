<template>
	<div>
		<list class="list">
			<cell class="cell">

				<div class="border-contain align margin-top20 ">
					<view style="display: flex;flex-direction: column; align-items: center; ">
						<image class="img" src="/static/images/light_img@2x.png" />
						<text class="text-yellow"
							style="margin-left: 10rpx;margin-right: 10rpx;line-height: 30rpx">您选择了定制车型服务，请留下您的联系方式，我们会尽快与您联系，给您提供最专业的租车指导、实惠的长租价格、最妥帖的售后服务！</text>
					</view>
					<div class="line-gray margin-top20"></div>
					<div class="flex-row align">
						<image class="tel-img" src="/static/images/tel_img@2x.png" />
						<input class="input flex1" type="number" placeholder="请输入联系手机" v-model="mobile" />
						<!--<div class="flex-row align" style="margin-right: 10rpx" >-->
						<!--<image class="img" style="margin-right: 10rpx" src="/static/images/add_img@2x.png"/>-->
						<!--<text class="text-black">通讯录</text>-->
						<!--</div>-->
					</div>
				</div>
				<div class="border-contain align margin-top20" style="padding-top: 40rpx">
					<view style="display: flex;flex-direction: column; align-items: center; ">
						<image class="car-image" resize="cover" src="https://static.coolcargo.cn/public/image/applet/order_car@2x.png" />
						<text class="text-black margin-top5">您可以根据用车需求定制车型</text>
						<text class="text-yellow margin-top5" style="font-size: 25rpx">需保证您对定制车辆达到三个月以上长租</text>
					</view>
					<textarea class="text-area" rows="6" placeholder="您可简单描述具体需要车型及用车需求（选填）" v-model="content" />
				</div>
			</cell>
		</list>
		<view class="btn" @click="toSubmit">提交咨询</view>
	</div>
</template>
<script>
	import {
		post
	} from '../../utils/netUtil.js'

	export default {
		data() {
			return {
				title: "定制车辆",
				mobile: '',
				content: ''
			}
		},
		components: {},
		methods: {
			postOrderCar() {
				if (!this.mobile) {
					this.$notice.toast({
						message: '请输入联系手机'
					});
					return;
				}
				const self = this;
				uni.showModal({
					title: '提示',
					content: '是否需要提交咨询？',
					confirmText: '确认',
					cancelText: '取消',
					success: function(res) {
						// 点击确认按钮的回调 
						if (res.confirm) {
							var userId = uni.getStorageSync('user_id');
							var token = uni.getStorageSync('user_token');
							if (!userId || !token) {
								return;
							}

							var dict = {
								user_id: userId,
								user_token: token,
								advice_type: 0,
								content: self.content,
								mobile: self.mobile
							}
							post('/user/advice', dict).then(res => {
								uni.showToast({
									title: '提交成功，我们会尽快与您联系！',
									icon: 'none'
								})

								setTimeout(function() {
									uni.navigateBack()
								}, 500);
							})
						} else if (res.cancel) {
							return;
							// 点击取消按钮的回调
						}
					}
				})
			},
			toSubmit() {
				this.postOrderCar();
			}
		},
		created() {
			if (uni.getStorageSync('user_mobile'))
				this.mobile = uni.getStorageSync('user_mobile');
		}
	};
</script>
<style lang="scss" scoped>
	.img {
		width: 35rpx;
		height: 35rpx;
		margin: 30rpx 20rpx;
	}

	.car-image {
		width: 580rpx;
		height: 330rpx;
	}
</style>
