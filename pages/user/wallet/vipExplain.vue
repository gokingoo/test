<template>
	<div>
		<list class="list">
			<cell class="cell">
				<div class="border-contain margin-top20">
					<div class="flex-row align" style="padding: 30rpx">
						<text class="text-black">当前会员等级</text>
						<image class="vip-img" :src="vipImg" />
						<text class="vip-text" :style="vipColor">{{levelName}}</text>
						<text class="text-black">（当前用户积分{{score}}）</text>
					</div>
					<div class="line-gray"></div>
				</div>
				<div class="flex-row align" style="padding-top: 40rpx;padding-bottom: 40rpx">
					<image class="line-img" src="/static/images/income_line@2x.png" />
					<text class="text-black" style="font-size: 30rpx">会员等级权益</text>
				</div>
				<div class="flex-row">
					<div class="title-gray-bg">
						<text class="text-black">等级</text>
					</div>
					<div class="title-gray-bg1 flex1">
						<text class="text-black">违损押金</text>
					</div>
					<div class="title-gray-bg1 flex1">
						<text class="text-black">租车费折扣</text>
					</div>
					<div class="title-gray-bg1 flex1">
						<text class="text-black">同时可租数量</text>
					</div>
				</div>
				<div class="flex-row">
					<div class="title-white-bg">
						<text class="text-black">普通</text>
					</div>
					<div class="title-white-bg1 flex1">
						<text class="text-black">5000元/辆</text>
					</div>
					<div class="title-white-bg1 flex1">
						<text class="text-black">无</text>
					</div>
					<div class="title-white-bg1 flex1">
						<text class="text-black">1辆车</text>
					</div>
				</div>
				<div class="flex-row">
					<div class="title-white-bg">
						<text class="text-black">黄金</text>
					</div>
					<div class="title-white-bg1 flex1">
						<text class="text-black">3000元/辆</text>
					</div>
					<div class="title-white-bg1 flex1">
						<text class="text-black">95折</text>
					</div>
					<div class="title-white-bg1 flex1">
						<text class="text-black">1辆车</text>
					</div>
				</div>
				<div class="flex-row">
					<div class="title-white-bg">
						<text class="text-black">白金</text>
					</div>
					<div class="title-white-bg1 flex1">
						<text class="text-black">3000元/辆</text>
					</div>
					<div class="title-white-bg1 flex1">
						<text class="text-black">9折</text>
					</div>
					<div class="title-white-bg1 flex1">
						<text class="text-black">3辆车</text>
					</div>
				</div>
				<div class="flex-row">
					<div class="title-white-bg">
						<text class="text-black">钻石</text>
					</div>
					<div class="title-white-bg1 flex1">
						<text class="text-black">3000元/辆</text>
					</div>
					<div class="title-white-bg1 flex1">
						<text class="text-black">85折</text>
					</div>
					<div class="title-white-bg1 flex1">
						<text class="text-black">5辆车</text>
					</div>
				</div>
				<div class="flex-row align" style="padding-top: 40rpx;padding-bottom: 40rpx">
					<image class="line-img" src="/static/images/income_line@2x.png" />
					<text class="text-black" style="font-size: 30rpx">会员升降级规则</text>
				</div>
				<div class="flex-row">
					<div class="title-gray-bg">
						<text class="text-black">等级</text>
					</div>
					<div class="title-gray-bg1 flex1">
						<text class="text-black">升级规则</text>
					</div>
					<div class="title-gray-bg1 flex1">
						<text class="text-black">降级规则</text>
					</div>
				</div>
				<div class="flex-row">
					<div class="title-white-bg">
						<text class="text-black">普通</text>
					</div>
					<div class="title-white-bg1 flex1">
						<text class="txt">注册并完成登录</text>
					</div>
					<div class="title-white-bg1 flex1">
						<text class="txt">不会降级</text>
					</div>
				</div>
				<div class="flex-row">
					<div class="title-white-bg">
						<text class="text-black">黄金</text>
					</div>
					<div class="title-white-bg1 flex1">
						<text class="txt">一次性充值10000元</text>
						<text class="txt">或累计充值10000元</text>
					</div>
					<div class="title-white-bg1 flex1">
						<text class="txt">储值账户余额小于等于3000元</text>
						<text class="txt">且大于等于180天无完成单</text>
					</div>
				</div>
				<div class="flex-row">
					<div class="title-white-bg">
						<text class="text-black">白金</text>
					</div>
					<div class="title-white-bg1 flex1">
						<text class="txt">一次性充值30000元</text>
						<text class="txt">或累计充值30000元</text>
					</div>
					<div class="title-white-bg1 flex1">
						<text class="txt">储值账户余额小于等于3000元</text>
						<text class="txt">且大于等于180天无完成单</text>
					</div>
				</div>
				<div class="flex-row">
					<div class="title-white-bg">
						<text class="text-black">钻石</text>
					</div>
					<div class="title-white-bg1 flex1">
						<text class="txt">一次性充值50000元</text>
						<text class="txt">或累计充值50000元</text>
					</div>
					<div class="title-white-bg1 flex1">
						<text class="txt">储值账户余额小于等于3000元</text>
						<text class="txt">且大于等于180天无完成单</text>
					</div>
				</div>
			</cell>
		</list>
	</div>
</template>
<script>
	import {
		get
	} from '../../../utils/netUtil.js'
	export default {
		data() {
			return {
				vipImg: 'https://static.coolcargo.cn/public/image/applet/vip_comm@2x.png',
				vipColor: {
					color: '#dda76f'
				},
				levelName: '普通会员',
				score: 0,
				userData: {}
			}
		},
		components: {},
		computed: {

		},
		methods: {
			setVipImg() {
				if (this.userData.user_level == 1) {
					this.vipImg = 'https://static.coolcargo.cn/public/image/applet/vip_comm@2x.png';
					this.vipColor = {
						color: '#dda76f'
					}
				} else if (this.userData.user_level == 2) {
					this.vipImg = 'https://static.coolcargo.cn/public/image/applet/vip_gold@2x.png';
					this.vipColor = {
						color: '#f5ea89'
					}
				} else if (this.userData.user_level == 3) {
					this.vipImg = 'https://static.coolcargo.cn/public/image/applet/vip_plat@2x.png';
					this.vipColor = {
						color: '#c2c2c2'
					}
				} else if (this.userData.user_level == 4) {
					this.vipImg = 'https://static.coolcargo.cn/public/image/applet/vip_diamond@2x.png';
					this.vipColor = {
						color: '#568fcd'
					}
				}
			},
			getUserData() {
				var userId = uni.getStorageSync('user_id');
				var token = uni.getStorageSync('user_token');
				if (!userId || !token) {
					this.userData = {};
					return;
				}

				var dict = {
					user_id: userId,
					user_token: token
				}
				get('/user/data', dict).then(res => {
					this.userData = res;
					this.levelName = this.userData.level_name;
					this.score = this.userData.score;
					this.setVipImg();
					uni.setStorageSync('user_info', res);
				})
			},
		},
		created() {
			this.getUserData();
		}
	};
</script>
<style lang="scss" scoped>
	.title-gray-bg {
		width: 102rpx;
		height: 80rpx;
		background-color: #c5c5c5;
		
		display: flex;
		align-items: center;
		justify-content: center;
		border-style: solid;
		border-width: 1px;
		border-color: #999999;
	}

	.title-gray-bg1 {
		height: 80rpx;
		background-color: #c5c5c5;
		border-style: solid  solid solid none;
		border-top-color: #999999;
		border-top-width: 1px;
		border-right-color: #999999;
		border-right-width: 1px;
		border-bottom-color: #999999;
		border-bottom-width: 1px;
		display: flex;
		align-items: center;
		justify-content: center;
	}

	.title-white-bg {
		width: 102rpx;
		height: 80rpx;
		background-color: #ffffff;
		display: flex;
		align-items: center;
		justify-content: center;
		border-style: none  solid solid solid;
		border-left-color: #999999;
		border-left-width: 1px;
		border-right-color: #999999;
		border-right-width: 1px;
		border-bottom-color: #999999;
		border-bottom-width: 1px;
	}

	.title-white-bg1 {
		height: 80rpx;
		background-color: #ffffff;
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		border-style: none  solid solid none;
		border-right-color: #999999;
		border-right-width: 1px;
		border-bottom-color: #999999;
		border-bottom-width: 1px;
		
	}

	.line-img {
		width: 10rpx;
		height: 43rpx;
		margin-right: 20rpx;
	}

	.txt {
		color: #333333;
		font-size: 22rpx;
	}
</style>
