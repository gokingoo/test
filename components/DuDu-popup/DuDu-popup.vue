<template name="popup">
	<view @touchmove.stop.prevent="clear" v-if="showPopup">
		<view class="popup_mask" @touchmove.stop.prevent="clear"></view>
		<view class="aaa">
			<view class="popup_content">
				<view class="title">{{title}}</view>
				<view class="explain_text">
					亲爱的用户,感谢您的信任并使用酷享出行！为了更好的保护您的权益，同时遵守相关监管要求，我们定制了《酷享出行服务协议》和《隐私政策》，特向您说明如下：
					<view style="color: #000000;">
						<ul>
							<li>1.为了您正常使用酷享出行提供的产品或服务我们会遵循正当、合法、必要的原则收集、保存、使用您的必要个人信息和设备权限主要包括您的手机号、位置信息、设备信息等。</li>
							<li>2.未经您的授权同意我们不会将您的信息共享给第三方或用于您未授权的其他途径。</li>
							<li>3.您可以查询、更正、删除您的个人信息我们也将提供账户注销的功能。</li>
						</ul>
					</view>

					<text>请您仔细阅读并充分理解协议条款及隐私政策内容当您同意接受后我们将依法尽全力保护您的个人信息。</text>
					<view class="line">
						<navigator :url="protocolPath" open-type="navigate" class="path" hover-class="navigator-hover">
							《服务协议》
						</navigator>
						<navigator :url="policyPath" open-type="navigate" class="path" hover-class="navigator-hover">
							《隐私政策》
						</navigator>
					</view>
					<view class="butto" @click="consent">同意并继续</view>
					<view class="butto1" @click="back">不同意并退出</view>
				</view>

			</view>
		</view>
	</view>
</template>

<script>
	export default {
		name: "popup",
		props: {
			title: {
				type: String,
				default: "服务协议和隐私政策"
			},
			// 协议路径
			protocolPath: {
				type: String
			},
			// 政策路径
			policyPath: {
				type: String
			},
			showPopup:{
				type:Boolean,
				default:true
			}
			
		},
		data() {
			return {
				// showPopup: true
			};
		},
		methods: {
			// 禁止滚动
			clear() {
				return;
			},
			back() {
				wx.exitMiniProgram()
			},
			// 关闭弹框
			consent() {
				// this.showPopup = false;
				this.$emit('popupState', true)
			}

		},
	};
</script>

<style lang="scss">
	.popup_mask {
		position: fixed;
		bottom: 0;
		top: 0;
		left: 0;
		right: 0;
		background-color: rgba(0, 0, 0, 0.4);
		transition-property: opacity;
		transition-duration: 0.3s;
		opacity: 0;
		z-index: 98;
	}

	.popup_mask {
		opacity: 1;
	}

	.popup_content {
		overflow: hidden;
		box-sizing: border-box;
		align-items: center;
		position: fixed;
		bottom: 25%;
		border-radius: 8px;
		left: 50%;
		margin-left: -40%;
		min-height: 400rpx;
		background: #ffffff;
		width: 80%;
		z-index: 99;

		.title {
			text-align: center;
			font-size: 32rpx;
			padding: 10rpx 0 0 0;
		}

		.explain_text {
			font-size: 24rpx;
			padding: 10rpx 30rpx 0rpx 30rpx;
			line-height: 38rpx;
			color: #606266;
			align-items: center;

			.line {
				padding: 10px;
				font-size: 28rpx;
				display: flex;
				flex-direction: row;

				.path {
					color: #ff6911;
					display: flex;
					text-align: center;
				}
			}
		}

		.butto {
			text-align: center;
			border-style: solid;
			color: #ffffff;
			border-color: #333333;
			border-radius: 15px;
			background-color: #333333;
			font-size: 30rpx;
			line-height: 30px;
		}

		.butto1 {
			text-align: center;
			border-style: solid;
			color: #939393;
			border-color: #ffffff;
			border-radius: 15px;
			font-size: 26rpx;
			line-height: 42px;

		}
	}
</style>
