<template>
	<div>
		<list class="list">
			<cell class="cell">
				<div class="border-contain margin-top20">


					<div class="item-bg">
						<text class="item-title">抬头类型</text>

						<div class="flex-row  align" @click="titleCheck(1)">
							<image v-if="isCompany" class="radio-img" src="/static/images/radio_checked@2x.png" />
							<image v-if="!isCompany" class="radio-img" src="https://static.coolcargo.cn/public/image/applet/radio_unchecked@2x.png" />
							<text class="text-black">企业单位</text>
						</div> -->
						<div class="flex-row align" style="margin-left:50rpx" @click="titleCheck(0)">
							<image v-if="!isCompany" class="radio-img" src="/static/images/radio_checked@2x.png" />
							<image v-if="isCompany" class="radio-img" src="https://static.coolcargo.cn/public/image/applet/radio_unchecked@2x.png" />
							<text class="text-black">个人/非企业单位</text>
						</div>
					</div>
					<div v-if="isCompany" class="line-gray"></div>
					<div v-if="isCompany" class="item-bg">
						<text class="item-title">发票抬头</text>
						<input class="input" type="text" placeholder="请输入企业单位名称" placeholder-style="font-size:26rpx"
							v-model="cName" />
					</div>
					<div v-if="isCompany" class="line-gray"></div>
					<div v-if="isCompany" class="item-bg">
						<text class="item-title">税号</text>
						<input class="input" type="text" placeholder="请输入企业单位税号" placeholder-style="font-size:26rpx"
							v-model="cNo" />
					</div>
					<div class="line-gray"></div>
					<div class="item-bg">
						<text class="item-title">发票内容</text>
						<text class="text-black" style="margin-left: 20rpx">车辆服务费</text>
					</div>
					<div class="line-gray"></div>
					<div class="item-bg">
						<text class="item-title">发票金额</text>
						<text style="font-size: 25rpx;color: #fabe00;margin-left: 20rpx">￥{{invoiceAmount}}</text>
					</div>
				</div>
				<div class="border-contain margin-top20">
					<div class="item-bg">
						<text class="item-title">收件人</text>
						<input class="input" type="text" placeholder="请输入收件人姓名" placeholder-style="font-size:26rpx"
							v-model="name" />
					</div>
					<div class="line-gray"></div>
					<div class="item-bg">
						<text class="item-title">联系电话</text>
						<input class="input" type="text" placeholder="请输入收件人手机" placeholder-style="font-size:26rpx"
							v-model="mobile" />
					</div>
					<div class="line-gray"></div>
					<div class="item-bg">
						<text class="item-title">所在地区</text>
						<input class="input" type="text" placeholder="请输入省市区" placeholder-style="font-size:26rpx"
							v-model="area" />
						<!--<text class="flex1 text-gray margin-left20" >{{area}}</text>
						<!--<image class="point-right" src="/static/images/point_right@2x.png"/>-->
					</div>
					<div class="line-gray"></div>
					<div class="item-bg">
						<text class="item-title">详细地址</text>
						<input class="input" type="text" placeholder="请输入详细地址" placeholder-style="font-size:26rpx"
							v-model="addrDetail" />
					</div>
					<div class="line-gray"></div>
					<div class="item-bg">
						<text class="item-title">邮寄方式</text>
						<text class="text-black" style="margin-left: 20rpx">圆通快递</text>
					</div>
				</div>
			</cell>
		</list>
		<view class="btn" @click="postInvoice">确认提交</view>
		<area-select class="list-mask" v-if="isSelect" :provice-list="proviceData" @haveselectedaddress="selectAddress">
		</area-select>
	</div>
</template>
<script>
	import AreaSelect from '../../components/areaSelect.vue'
	import ConfigData from './data';
	import {
		post
	} from '../../utils/netUtil.js';


	export default {
		data() {
			return {
				proviceData: ConfigData.provinceList,
				invoiceAmount: 0,
				chooseList: [],
				isCompany: true,
				isSelect: false,
				cName: '',
				cNo: '',
				name: "",
				mobile: '',
				area: '',
				addrDetail: '',
				invoiceType: 1
			}
		},
		components: {

			AreaSelect
		},
		computed: {

		},
		methods: {
			chooseArea() {
				this.isSelect = true;
			},
			selectAddress(evtValue) {
				this.isSelect = false
				if (evtValue == '') {
					return;
				}
				this.area = evtValue;
			},
			titleCheck(type) {
				if (type == 0) {
					this.isCompany = false;
					this.invoiceType = 0;
				} else {
					this.isCompany = true;
					this.invoiceType = 1;
				}
			},
			postInvoice() {
				if (this.invoiceType == 1) {
					if (this.cName.length == 0) {
						uni.showToast({
							title: '请输入企业单位名称',
							icon: 'none'
						})
						return;
					}
					if (this.cNo.length == 0) {
						uni.showToast({
							title: '请输入企业单位税号',
							icon: 'none'
						})
						return;
					}
				}
				if (this.name.length == 0) {
					uni.showToast({
						title: '请输入收件人姓名',
						icon: 'none'
					})
					return;
				}
				if (this.mobile.length == 0) {
					uni.showToast({
						title: '请输入收件人手机',
						icon: 'none'
					})
					return;
				}
				if (this.area.length == 0) {
					uni.showToast({
						title: '请输入省市区',
						icon: 'none'
					})
					return;
				}
				if (this.addrDetail.length == 0) {
					uni.showToast({
						title: '请输入详细地址',
						icon: 'none'
					})
					return;
				}
				var userId = uni.getStorageSync('user_id');
				var token = uni.getStorageSync('user_token');
				if (!userId || !token) {
					return;
				}
				var balances = '';
				var orders = '';
				for (var i = 0; i < this.chooseList.length; i++) {
					var data = this.chooseList[i];
					if (data.balance_id > 0) {
						balances += data.balance_id + ','
					} else if (data.order_id > 0) {
						orders += data.order_id + ','
					}
				}

				if (balances.length > 0)
					balances = balances.substring(0, balances.lastIndexOf(','));
				if (orders.length > 0)
					orders = orders.substring(0, orders.lastIndexOf(','));
				var dict = {
					user_id: userId,
					user_token: token,
					balances: balances,
					orders: orders,
					invoice_type: this.invoiceType,
					amount: this.invoiceAmount,
					receiver: this.name,
					receiver_mobile: this.mobile,
					address: this.area + this.addrDetail
				}
				if (this.invoiceType == 1) {
					dict['title'] = this.cName;
					dict['tax_serial'] = this.cNo;
				}
				post('/user/invoice', dict).then(res => {
					uni.showToast({
						title: '发票提交成功',
						icon: 'success'
					})
					uni.$emit('isCancel', 1)
					setTimeout(function() {
						uni.navigateBack()
					}, 500);
				})

			},
			getData() {
				// this.$router.getParams().then(resData => {
				// 	if (resData.amount)
				// 		this.invoiceAmount = resData.amount;
				// 	if (resData.list)
				// 		this.chooseList = resData.list;
				// });
				if (uni.getStorageSync('user_mobile'))
					this.mobile = uni.getStorageSync('user_mobile');
			}
		},
		created() {
			this.getData();
		},

		onLoad(options) {
			
			var param = JSON.parse(decodeURIComponent(options.parm))
			if (param.amount)
				this.invoiceAmount = param.amount;
			if (param.list)
				this.chooseList = param.list;


		}
	};
</script>
<style lang="scss" scoped>
	.list-mask {
		position: absolute;
		top: 0;
		left: 0;
		width: 750rpx;
		z-index: 10;
		background-color: black;
		opacity: 1;
	}

	.item-bg {
		display: flex;
		flex-direction: row;
		align-items: center;
		height: 80rpx;
		padding-left: 20rpx;
		padding-right: 20rpx;
	}

	.item-title {
		width: 150rpx;
		font-size: 25rpx;
		color: #333333;
	}

	.pay-btn {
		width: 250rpx;
		height: 80rpx;
		text-align: center;
		font-size: 25rpx;
		line-height: 80rpx;
		color: #ffffff;
	}

	.input {
		width: 650rpx;
		height: 55rpx;
		color: #333333;
		// font-size: 28rpx;
		padding: 0px 10px;
	}

	.flex-row {
		display: flex;
		// flex-direction: row;
	}
</style>
