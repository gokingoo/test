<template>
	<div>
		<list class="list">
			<cell class="cell">
				<div class="border-contain align margin-top20">
					<view style="display: flex;flex-direction: column; align-items: center; ">
						<image class="img" src="/static/images/light_img@2x.png" />
						<text class="text-yellow"
							style="margin-left: 10rpx;margin-right: 10rpx;line-height: 30rpx">您有投车意向的话请留下联系方式，我们会尽快与您联系，给您提供最合适的投车方案，一站式的后续投车服务！</text>
						<div class="line-gray margin-top20"></div>
						<div class="flex-row align">
							<image class="address" src="/static/images/addr_img@2x.png" />
							<text class="text-black "
								style="font-size: 28rpx;width: 630rpx;margin-left: 20rpx">上海</text>
						</div>
						<div class="line-gray"></div>
						<div class="flex-row align">
							<image class="tel-img" src="/static/images/tel_img@2x.png" />
							<input class="input " type="number" placeholder="请输入联系手机"
								placeholder-style="font-size:26rpx" v-model="mobile" pattern="[0-9]*" maxlength="11"/>
							<!--<div class="flex-row align" style="margin-right: 10rpx" >-->
							<!--<image class="img" style="margin-right: 10rpx" src="/static/images/add_img@2x.png"/>-->
							<!--<text class="text-black">通讯录</text>-->
							<!--</div>-->
						</div>
					</view>
					<textarea class="text-area" style="margin-top: 0rpx" rows="6" placeholder="您可简单描述您的投车疑问（选填）"
						v-model="content" />
				</div>

				<!--<div class="border-contain align margin-top20" style="padding-top: 40rpx">-->
				<!--<image class="car-image" src="/static/images/car_img@2x.png"/>-->
				<!--<text class="text-black margin-top5">宝马 535Li</text>-->
				<!--<div class="flex-row align margin-top5">-->
				<!--<text class="text-gray" >投入</text>-->
				<!--<text class="text-yellow">42.5</text>-->
				<!--<text class="text-gray" >万，收益</text>-->
				<!--<text class="text-yellow">1.5</text>-->
				<!--<text class="text-gray" >万/月</text>-->
				<!--</div>-->
				<!--<div class="line-gray" style="margin-top: 30rpx"></div>-->
				<!--<div class="flex-row align" @click="plateCheck">-->
				<!--<text class="text-black" style="width: 600rpx" >有沪牌投车（表明您有闲置沪牌额度）</text>-->
				<!--<image v-if="hasPlate" class="radio-img" src="/static/images/radio_checked@2x.png"/>-->
				<!--<image v-if="!hasPlate" class="radio-img" src="/static/images/radio_unchecked@2x.png"/>-->
				<!--</div>-->
				<!--<div class="line-gray"></div>-->
				<!--<div class="flex-row align" @click="plateCheck">-->
				<!--<text class="text-black" style="width: 600rpx" >无沪牌投车（我们会提供解决方案）</text>-->
				<!--<image v-if="!hasPlate" class="radio-img" src="/static/images/radio_checked@2x.png"/>-->
				<!--<image v-if="hasPlate" class="radio-img" src="/static/images/radio_unchecked@2x.png"/>-->
				<!--</div>-->
				<!--</div>-->
			</cell>
		</list>
		<view class="btn" @click="toSubmit">提交咨询</view>
	</div>
</template>
<script>
	import {
		post
	} from '../../utils/netUtil.js'
	import util from '../../utils/util.js'
	export default {
		data() {
			return {
				mobile: '',
				content: ''
			}
		},
		components: {},

		methods: {
			postTenderCar() {
				if (!this.mobile) {
					uni.showToast({
						title: '请输入联系手机!!!',
						icon: 'none'
					});
					return;
				}
				if (!util.checkMobile(this.mobile)) {
					uni.showToast({
						title: '请输入正确的联系手机!',
						icon: 'none'
					});
					return;
				}
				const self = this;
				uni.showModal({
					title: '提示',
					content: '是否需要提交咨询？',
					cancelText: '取消',
					confirmText: '确定',
					success: res => {
						if (res.confirm) {
							var userId = uni.getStorageSync('user_id');
							var token = uni.getStorageSync('user_token');
							if (!userId || !token) {
								return;
							}

							var dict = {
								user_id: userId,
								user_token: token,
								advice_type: 2,
								content: self.content,
								mobile: self.mobile
							}
							post('/user/advice', dict).then(res => {
								uni.showToast({
									title: '提交成功，我们会尽快与您联系！',
									icon: 'none'
								});

							})
						} else if (res.cancel) {
							return
							
						}
					}

				})
			},
			toSubmit() {
				
				this.postTenderCar();
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
		width: 350rpx;
		height: 199rpx;
	}

	.text-area {
		width: 660rpx;
		background-color: #fafafa;
		border-width: 1rpx;
		border-color: #989898;
		border-radius: 15rpx;
		margin: 30rpx;
		padding: 20rpx;
		font-size: 25rpx;
	}

	.address {
		width: 29rpx;
		height: 35rpx;
		margin-left: 30rpx;
		margin-top: 28rpx;
		margin-bottom: 28rpx;
		margin-right: 18rpx;
	}
</style>
