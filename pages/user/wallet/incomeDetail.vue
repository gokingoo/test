<template>
	<div>
		<list class="list" ref="list"  @refresh="onrefresh">
			<cell class="cell">
				<div v-if="type==0" class="income-bg margin-top20" style="display: flex;flex-direction: column;">
					<text class="text-gray">余额（元）</text>
					<text style="color:#ffffff;font-size: 40rpx;margin-top: 20rpx">{{userData.cash}}</text>
					<div class="flex-row align margin-top20" @click="toWithDraw">
						<text class="text-gray">当前有{{canCash}}元可去提现</text>
						<image class="point-right margin-left20" src="https://static.coolcargo.cn/public/image/applet/point_right@2x.png" />
					</div>
				</div>
				<div class="deposit-bg" v-if="type == 0 && userData.deposit > 0">
					<text class="flex1"
						style="color: #ff6004;font-size: 26rpx;">储值账户与现金账户中共有{{userData.deposit}}元违损押金冻结中。</text>
					<text class="text-black" style="text-decoration: underline;margin-right: 20rpx"
						@click="questionClick">详情说明</text>
				</div>

				<div class="flex-row align" style="padding-top: 40rpx;padding-bottom: 40rpx">
					<image class="line-img" src="/static/images/income_line@2x.png" />
					<text style="color:#333333;font-size: 30rpx">{{titleTxt}}</text>
				</div>
				<div v-if="incomeList.length" class="border-contain">
					<view v-for="(i, index)  in incomeList" :key="index">
						<income-item :income-data="i"></income-item>
						<text v-if="index != incomeList.length-1" class="line-gray"></text>
					</view>
				</div>
				<div v-if="!incomeList.length">
					<nothing padding-top="220" :title="nothingStr"></nothing>
				</div>
			</cell>
		</list>
		<!-- <wxc-mask height="400" width="650" border-radius="10" duration="200" :top="300" mask-bg-color="#FFFFFF"
                  :overlay-can-close="true" :has-animation="true" :has-overlay="true" :show-close="false"
                  :show="questionShow" @wxcMaskSetHidden="questionSetHidden">
            <div class="align">
                <div class="flex-row align" >
                    <text  style="width:510rpx;font-size: 32rpx;color:#333333;margin: 30rpx;text-align: center">{{questionTitle}}</text>
                    <image class="cancel-btn"  src="bmlocal://assets/cancel_img@2x.png" @click="toCancel"/>
                </div>
                <text class="text-black" style="line-height: 40rpx;padding-left: 30rpx;padding-right: 30rpx;margin-bottom: 20rpx">{{questionTxt}}</text>
            </div>
        </wxc-mask>
        <wxc-popup popup-color="rgb(255, 255, 255)"
                   :show="isBottomShow"
                   @wxcPopupOverlayClicked="popupOverlayBottomClick"
                   pos="bottom"
                   height="400">
            <div>
                <div class="flex-row align" style="padding: 30rpx">
                    <image class="cancel-btn" @click="drawCancel" src="bmlocal://assets/cancel_img@2x.png" />
                    <text style="width:560rpx;text-align: center;font-size: 30rpx;color: black">提现</text>
                </div>
                <text class="text-black" style="width:750rpx;text-align: center;margin-bottom: 20rpx">可提现金额{{canCash}}元</text>
                <div class="amount-bg">
                    <text class="text-black" style="margin-right: 30rpx">提现金额</text>
                    <input  class="amount-input" type="number" placeholder="请输入提现金额" v-model="cashAmount"/>
                </div>
                <div class="line-gray" style="margin-top: 50rpx"></div>
                    <text  class="pay-btn" @click="postToDraw">确认提现</text>
            </div>
        </wxc-popup> -->
	</div>
</template>
<script>
	import IncomeItem from '../../../components/incomeItem.vue'
	import nothing from '../../../components/nothing.vue'
	import {
		get,
		post
	} from '../../../utils/netUtil.js'
	export default {
		data() {
			return {
				nothingStr: '当前暂无明细',
				type: 0,
				userData: {},
				canCash: 0,
				cashAmount: '',
				titleTxt: '余额变动明细',
				incomeList: [],
				questionShow: false,
				isBottomShow: false,
				questionTitle: '违损押金介绍',
				questionTxt: '违损保证金的充值标准，与服务类型相关，不同服务所需冻结的违损保证金额度不同，同时使用车辆每增加一台，须再支付一份违损保证金，违损保证金将冻结在用户的违损保证金账户中。用车结束后，可在30日后向酷享出行APP发起提现申请，平台在3个工作日内受理，具体到账时间以各银行/平台规则为准。',
			}
		},
		components: {
			nothing,
			IncomeItem
		},
		methods: {
			toWithDraw() {
				const self = this
				if (this.canCash > 0) {
					uni.showModal({
						title: '可提现金额' + self.canCash + '元！',
						cancelText: '暂不提现',
						confirmText: '确定提现',
						placeholderText: '请输入提现金额',
						editable: true,
						success(res) {
							if (res.confirm) {
								if (res.content) {
									self.cashAmount = res.content
									self.postToDraw()
								} else if (res.content > self.canCash) {
									uni.showToast({
										title: '提现金额不能大于可提现金额',
										icon: 'none'
									})
									return
								} else {
									uni.showToast({
										title: '请认真输入！！',
										icon: 'none'
									})
									return
								}


							} else if (res.cancel) {
								return;
							}

						}

					})
				} else {
					uni.showToast({
						title: '暂无可提现金额',
						icon: 'error',
					})
				}

			},
			toCancel() {
				this.questionShow = false;
			},
			drawCancel() {
				this.isBottomShow = false;
			},
			popupOverlayBottomClick() {
				this.isBottomShow = false;
			},
			questionClick() {
				uni.showModal({
					title:'违损押金介绍',
					content:'违损保证金的充值标准，与服务类型相关，不同服务所需冻结的违损保证金额度不同，同时使用车辆每增加一台，须再支付一份违损保证金，违损保证金将冻结在用户的违损保证金账户中。用车结束后，可在30日后向酷享出行APP发起提现申请，平台在3个工作日内受理，具体到账时间以各银行/平台规则为准。',
					showCancel:false
				})
			},
			questionSetHidden() {
				this.questionShow = false;
			},
			onrefresh() {
				this.$refs["list"].refreshEnd();
				this.getChangeList();
			},
			plateCheck() {
				this.hasPlate = !this.hasPlate;
			},
			postToDraw() {
				if (this.cashAmount.length == 0) {
					uni.showToast({
						title: '请输入提现金额',
						icon: 'none'
					});
					return;
				}
				var amount = parseInt(this.cashAmount);
				if (amount == 0) {
					uni.showToast({
						title: '提现金额不能为0',
						icon: 'none'
					});
					return;
				}
				if (amount > this.canCash) {
					uni.showToast({
						title: '提现金额不能大于可提现金额',
						icon: 'none'
					})
					return;
				}
				var userId = uni.getStorageSync('user_id');
				var token = uni.getStorageSync('user_token');
				if (!userId || !token) {
					return;
				}
				var dict = {
					user_id: userId,
					user_token: token,
					amount: amount
				}
				post('/user/withdraw', dict).then(res => {
					this.canCash = this.canCash - amount;
					this.userData.cash = this.userData.cash - amount;
					setTimeout(function() {
						uni.showToast({
							title: '申请提交',
							icon: 'success',
						});
					}, 2000);
					this.cashAmount = '';
					this.getChangeList();
				})
			},
			getChangeList() {
				var userId = uni.getStorageSync('user_id');
				var token = uni.getStorageSync('user_token');
				if (!userId || !token) {
					return;
				}
				var url = '/user/cash';
				if (this.type == 1) {
					url = '/user/balance';
				}


				var dict = {
					user_id: userId,
					user_token: token
				}
				get(url, dict).then(res => {
					// res = [{
					//     id:1,
					//     reason:'收益',
					//     time:'2019-01-18',
					//     change:'1000',
					//     balance:1890
					// }, {
					//     id:2,
					//     reason:'提现',
					//     time:'2019-01-18 18:23',
					//     change:'-3000',
					//     balance:890
					// }];
					// (res)
					this.incomeList = res;
				})
			},
			getData() {
				this.userData = {};
				if (uni.getStorageSync('user_info')) {
					this.userData = uni.getStorageSync('user_info');
					if (this.userData.deposit > 0) {
						if (this.userData.balance >= this.userData.deposit) {
							this.canCash = this.userData.cash;
						} else {
							this.canCash = (this.userData.cash - (this.userData.deposit - this.userData.balance)) > 0 ? (
								this.userData.cash - (this.userData.deposit - this.userData.balance)) : 0;
						}
					} else {
						this.canCash = this.userData.cash;
					}
				}

			}
		},
		created() {},
		onLoad(data) {
			this.getData();
			this.getChangeList();
			if (data.type) {
				this.type = data.type;
			}


		}
	};
</script>
<style lang="scss" scoped>
	.income-bg {
		// width: 720rpx;
		height: 220rpx;
		align-items: center;
		justify-content: center;
		background-color: #595959;
		border-radius: 10px;
	}

	.btn {
		background-color: #b4b4b4;
		font-size: 24rpx;
		margin-top: 40rpx;
		padding: 0 20rpx;
		line-height: 50rpx;
		border-width: 1px;
		border-color: #ffffff;
		border-radius: 50rpx;
		color: #ffffff;
	}

	.line-img {
		width: 10rpx;
		height: 43rpx;
		margin-right: 20rpx;
	}

	.deposit-bg {
		line-height: 30px;
		flex-direction: row;
		align-items: center;
		height: 70rpx;
		margin-top: 10rpx;
		padding-left: 10rpx;
		background-color: #fff7d6;
		border-radius: 12rpx;
	}

	.cancel-btn {
		width: 50rpx;
		height: 50rpx;
		margin-right: 30rpx;
	}

	.pay-btn {
		width: 750rpx;
		height: 90rpx;
		text-align: center;
		background-color: #333333;
		font-size: 25rpx;
		line-height: 90rpx;
		color: #ffffff;
	}

	.amount-bg {
		flex-direction: row;
		align-items: center;
		height: 100rpx;
		padding: 10rpx 30rpx;

	}

	.amount-input {
		width: 200rpx;
		height: 80rpx;
		color: #333333;
		font-size: 25rpx;
		margin-right: 10rpx;
		padding: 10rpx;
		background-color: #fafafa;
		border-width: 1rpx;
		border-color: #989898;
		border-radius: 15rpx;
	}
</style>
