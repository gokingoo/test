<template>
	<div>
		<list class="list">

			<div class="contain">
				<div class="contain-cell flex-row">
					<input class="input" type="number" placeholder="请输入手机号码" placeholder-style="font-size:26rpx"
						v-model="user_mobile" pattern="[0-9]*" maxlength="11">
					<div style="width: 1rpx;height:110rpx;background-color: #cccccc;"></div>
					<div class="button-contain" @click="countDown">
						<text class="f25 cblack" v-if="canClick">{{content}}</text>
						<text class="f25 disabled" v-if="!canClick">{{content}}</text>
					</div>
				</div>
				<div class="line-gray"></div>
				<div class="contain-cell border-top">
					<input class="input" type="text" placeholder="请输入验证码" placeholder-style="font-size:26rpx"
						v-model="check_code">
				</div>
				<div class="line-gray"></div>
				<div class="contain-cell border-top">
					<input class="input" type="text" placeholder="请输入邀请码(选填)" placeholder-style="font-size:26rpx"
						v-model="req_code">
				</div>
			</div>
			<div class="btn" @click="login()">
				<div v-if="isAgree" class="btn-view">
					<text class="btn-text">登录</text>
				</div>
				<div v-if="!isAgree" class="btn-no-view">
					<text class="btn-text">登录</text>
				</div>
			</div>
		
			<div style="align-items: center;margin-top: 50rpx;">
				<div class="flex-row align">
					<image v-if="isAgree" class="agree-img" src="https://static.coolcargo.cn/public/image/applet/check_yes@2x.png"
						@click="checkClick()" />
					<image v-if="!isAgree" class="agree-img" src="https://static.coolcargo.cn/public/image/applet/check_no@2x.png"
						@click="checkClick()" />
					<text class="f28" style="color: #333333;margin-left: 10px">同意酷享出行</text>
					<text class="f28 text-yellow" style="text-decoration: underline;"
						@click="toAgreement">《用户服务协议》</text>
					<text class="f28 text-yellow" style="text-decoration: underline;"
						@click="toPrivacy">《隐私协议》</text>
				</div>
			</div>
		</list>
	</div>
</template>

<script>
	import {
		post,
		get
	} from '../../utils/netUtil.js'
	export default {
		data() {
			return {
				content: '获取验证码',
				canClick: true,
				disabled: false,
				user_mobile: '',
				check_code: '',
				req_code: '',
				timeOut: null,
				totalTime: 60,
				isAgree: false,
			}
		},
		components: {},
		computed: {},
		methods: {
			checkClick() {
				this.isAgree = !this.isAgree;
			},
			toAgreement() {
				uni.navigateTo({
					url: '../setting/protocol'
				})
			},
			toPrivacy() {
				uni.navigateTo({
					url: '../setting/privacy'
				})
			},
			countDown() {
				if (!this.checkMobile()) return;
				if (!this.canClick) return
				this.canClick = false
				this.content = this.totalTime + 's重新获取'
				var self = this
				const timeOut = setInterval(function() {
					self.totalTime--
					if (self.totalTime < 1) {
						clearInterval(timeOut);
						self.totalTime = 60
						self.canClick = true
					}
				}, 1000)
				this.getCode();
			},
			login() {
				if (!this.isAgree) {
					return;
				}
				if (!this.checkMobile()) {
					return;
				}
				if (!this.check_code) {
					uni.showToast({
						title: '请输入验证码',
						icon: 'error'
					});
					return;
				}
				this.postLogin();
			},

			checkMobile() {
				var regMobile = /^1[3,4,5,6,7,8,9]\d{9}$/;
				if (!this.user_mobile || !regMobile.test(this.user_mobile)) {
					uni.showToast({
						title: '手机号码错误',
						icon: 'error'
					});
					return false;
				}
				return true;
			},
			getCode() {
				var dict = {
					user_mobile: this.user_mobile
				}
				get('/user/code', dict).then(res => {
					uni.showToast({
						title: '验证码获取成功',
						icon: 'success'
					})
				})
			},
			postLogin() {
				var dict = {
					user_mobile: this.user_mobile,
					code: this.check_code,
					invite_code: this.req_code
				};
				post('/user/data', dict).then(res => {
					uni.showToast({
						title: '登录成功',
						icon: 'success'
					})
					res.user_level = 3;
					uni.setStorageSync('user_mobile', res.user_mobile);
					uni.setStorageSync('user_id', res.user_id);
					uni.setStorageSync('user_token', res.user_token);
					uni.setStorageSync('user_info', res);
					setTimeout(function() {
						uni.$emit('islogin', 1)
						uni.navigateBack()
					}, 500);
				})
			}
		},
		watch: {
			totalTime(e) {
				this.content = e + 's重新获取'
				if (e < 1 || e == 60) {
					this.content = '获取验证码'
				}
			}
		},
		created() {}
	}
</script>

<style lang="scss" scoped>
	.f25 {
		font-size: 25rpx;
	}

	.f28 {
		font-size: 28rpx;
	}

	.cblack {
		color: #333333;
	}

	.agree-img {
		margin-left: 30rpx;
		width: 40rpx;
		height: 40rpx;
	}

	.input {
		height: 130rpx;
		padding: 0 20rpx;
		color: #333333;
	}

	.contain {
		background-color: white;
		overflow: hidden;
		height: 300rpx;
		margin: 150rpx 10rpx 100rpx 10rpx;
		border-width: 7rpx;
		border-color: rgba(255, 255, 255, 0.2);
		border-radius: 10rpx;
		padding: 10rpx;
	}

	.contain-cell {
		height: 100rpx;
		overflow: hidden;
		// vertical-align: middle;
		// font-size: 0;
	}

	.border-top {
		border-top-width: 5px;
		border-top-color: rgba(255, 255, 255, 0.2);
	}

	.border-right {
		border-right-width: 5px;
		border-right-color: rgba(255, 255, 255, 0.2);
	}

	.btn {
		height: 75rpx;
		border-radius: 5px;
		margin: 0px 0 20rpx;
		overflow: hidden;
		text-align: center;
		background-color: #333333;
		font-size: 25rpx;
		line-height: 42px;
		color: #ffffff;

	}

	.btn-view {
		align-items: center;
		background-color: #333333;
		/*background-image: linear-gradient(to bottom, #39b8fe, #5492fe);*/
	}

	.btn-no-view {
		align-items: center;
		background-color: #cccccc;
		/*background-image: linear-gradient(to bottom, #39b8fe, #5492fe);*/
	}

	.btn-text {
		color: #ffffff;
		font-size: 28rpx;
	}

	.button-contain {
		width: 180rpx;
		overflow: hidden;
		justify-content: center;
		display: flex;
		flex-direction: row;
		align-items: center;
		height: 120rpx;
	}


	.disabled {
		color: #bababa;
	}
</style>
