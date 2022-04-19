<template>
	<div>
		<view>
			<view class="tab-content" @click="toRecord">开票记录</view>
		</view>
		<list class="list" ref="list" :showRefresh="true" @refresh="onrefresh">

			<cell v-if="invoiceList.length" v-for="(i, index) in invoiceList" :key="index" class="cell">
				<invoice-item :invoice-data="i" @clickChoose="clickChoose(index)"></invoice-item>
			</cell>
			<cell v-if="!invoiceList.length">
				<nothing padding-top="220" :title="nothingStr"></nothing>
			</cell>
		</list>
		<div class="flex-row align"
			style="height:90rpx;background-color: #ffffff;border-top-color: #999999;position:fixed;bottom:0;width: 100%;">
			<text class="text-black" style="margin-left: 30rpx;font-size: 25rpx">共已选</text>
			<text style="margin-left: 10rpx;font-size: 30rpx;color: #fabe00">￥{{invoiceAmount}}</text>
			<div class="flex1"></div>
			<text v-if="invoiceAmount > 0" class="pay-btn" @click="toNext">下一步</text>
			<text v-if="invoiceAmount == 0" class="pay-btn1">下一步</text>
		</div>
	</div>
</template>
<script>
	import InvoiceItem from '../../components/invoiceItem.vue'
	import nothing from '../../components/nothing.vue'
	import {
		get
	} from '../../utils/netUtil.js';

	export default {
		data() {
			return {
				nothingStr: '当前暂无可开发票',
				invoiceAmount: 0,
				invoiceList: [],
				chooseList: []

			}
		},
		components: {
			InvoiceItem,
			nothing

		},
		computed: {

		},
		methods: {
			onrefresh() {
				this.$refs["list"].refreshEnd();
				this.getInvoiceList();
			},
			clickChoose(index) {
				this.invoiceList[index].checked = !this.invoiceList[index].checked;
				if (this.invoiceList[index].checked) {
					this.invoiceAmount += this.invoiceList[index].amount;
					this.chooseList.push(this.invoiceList[index]);
				} else {
					this.invoiceAmount -= this.invoiceList[index].amount;
					this.chooseList.splice(index, 1);
				}

			},
			getInvoiceList() {
				var userId = uni.getStorageSync('user_id');
				var token = uni.getStorageSync('user_token');
				if (!userId || !token) {
					return;
				}

				var dict = {
					user_id: userId,
					user_token: token,
					invoice_type: 1
				}
				get('/user/invoice', dict).then(res => {
					// res = [{
					//     balance_id:1,
					//     order_id:0,
					//     reason:1,
					//     time:'2019.02.22 周五 12:54',
					//     start_address:'上海，浦江科技园区5号楼',
					//     return_address:'上海，浦东国际机场T1出发站台',
					//     amount:1000,
					// },{
					//     balance_id:2,
					//     order_id:0,
					//     reason:1,
					//     time:'2019.02.22 周五 12:54',
					//     start_address:'上海，浦江科技园区5号楼',
					//     return_address:'上海，浦东国际机场T1出发站台',
					//     amount:2000,
					// },
					//     {
					//         balance_id:0,
					//         order_id:3,
					//         reason:0,
					//         time:'2019.02.22 周五 12:54',
					//         amount:10000,
					//     }];
					if (res.length > 0) {
						this.invoiceList = [];
						for (var i = 0; i < res.length; i++) {
							res[i].checked = false;
							this.invoiceList.push(res[i]);
						}
					}


				})
			},
			toNext() {
				
				var params = {
					amount: this.invoiceAmount,
					list: this.chooseList
				}
				var params = encodeURIComponent(JSON.stringify(params));
				uni.navigateTo({
					url: './invoice?parm=' + params
				})
			},
			toRecord() {
				uni.navigateTo({
					url: './invoiceRecord'
				})
			},
		},

		created() {
			// this.$navigator.setRightItem({
			// 	text: '开票记录', // 展示的文字 (和图片 二选一)
			// 	textColor: '#3333333', // 文字颜色 (默认为白色)
			// 	fontSize: '28', // 字号（默认32rpx）
			// 	fontWeight: 'normal', // 是否加粗（默认不加粗）
			// }, () => {
			// 	this.$router.open({
			// 		name: 'invoice_record',
			// 		type: 'PUSH'
			// 	})
			// });
			this.getInvoiceList();
		},
		onLoad() {
			uni.$on("isCancel", function(data) {
				if (data) {
					if (data == 1) {
						uni.navigateTo({
							url: './invoiceRecord'
						})
					}
				}
			})



		}
	};
</script>
<style lang="scss" scoped>
	.pay-btn {
		width: 250rpx;
		height: 90rpx;
		background-color: #333333;
		text-align: center;
		font-size: 25rpx;
		line-height: 90rpx;
		color: #ffffff;
	}

	.pay-btn1 {
		width: 250rpx;
		height: 90rpx;
		background-color: #999999;
		text-align: center;
		font-size: 25rpx;
		line-height: 90rpx;
		color: #ffffff;
	}

	.tab-content {
		width: 80px;
		height: 25px;
		float: right;
		background-color: #ffffff;
		overflow: hidden;
		align-items: center;
		border-radius: 10px;
		display: flex;
		flex-direction: column;
	}

	.list {
		margin: 0;
		padding: 1px;
	}
</style>
