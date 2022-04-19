<template>
	<view class="content" :style="{paddingTop: setPaddingTop}">
		<image class="icon" src="https://static.coolcargo.cn/public/image/applet/nothing@2x.png"></image>
		<view class="title">{{title}}</view>
		<view class="btn" v-if="btnType1" @click="leftButtonClicked">{{btn1}}</view>
		<view class="flexRow" v-if="btnType2">
			<view class="btn maginR20" @click="leftButtonClicked">{{btn1}}</view>
			<view class="btn maginL20" @click="rightButtonClicked">{{btn2}}</view>
		</view>
	</view>
</template>

<script>
	export default {
		props: {
			title: {
				type: String,
				default: "当前还没有数据"
			},
			btnType1: {
				type: Boolean,
				default: false
			},
			btnType2: {
				type: Boolean,
				default: false
			},
			btn1: {
				type: String,
				default: "刷新一下"
			},
			btn2: {
				type: String,
				default: "刷新两下"
			},
			paddingTop: {
				type: [Number, String],
				default: 0
			},
		},
		data() {
			return {}
		},
		computed: {
			setPaddingTop() {
				const paddingTop = this.paddingTop;
				return `${paddingTop}rpx`
			},
		},
		methods: {
			//左边点击事件
			leftButtonClicked() {
				this.$emit('LeftBtnClicked');
			},

			//右边点击事件
			rightButtonClicked() {
				this.$emit('RightBtnClicked');
			},
		}
	}
</script>

<style lang="scss">
	.content {
		align-items: center;
		display: flex;
		flex-direction: column;
	}

	.flexRow {
		flex-direction: row;
	}

	.maginL20 {
		margin-left: 20rpx;
	}

	.maginR20 {
		margin-right: 20rpx;
	}

	.icon {
		width: 120rpx;
		height: 120rpx;
	}

	.title {
		font-size: 25rpx;
		color: #cfcece;
		line-height: 50rpx;
	}

	.btn {
		text-align: center;
		color: #FFFFFF;
		background-color: #ff6911;
		font-size: 26rpx;
		padding: 0 40rpx;
		line-height: 80rpx;
		border-width: 1px;
		// border-color: #989898;
		border-radius: 50rpx;
		margin-top: 40rpx;
	}
</style>
