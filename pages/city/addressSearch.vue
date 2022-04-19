<template>
	<div>
		<div v-if="type!=2 && type!=4" class="flex-row align"
			style="background-color: white;height: 90rpx;margin-top: 10rpx">
			<div class="flex-row align" style="width: 140rpx;justify-content: center">
				<text style="color: #333333;font-size: 25rpx;">上海</text>
				<image class="down" src="https://static.coolcargo.cn/public/image/applet/down@2x.png" />
			</div>
			<div style="width: 1rpx;height: 35rpx;background-color: #cccccc"></div>
			<!-- #ifdef APP -->
			<input class="add-input" type="text" :placeholder="plaTxt" v-model="keyWords" @input="inputChange" />
			<!-- #endif -->
			<!-- #ifdef MP-WEIXIN -->
			<input class="add-input" type="text" :placeholder="plaTxt" v-model="keyWords" @input="getAuthorizeInfo" />
			<!-- #endif -->
			<div style="width: 1rpx;height: 35rpx;background-color: #cccccc"></div>
			<text style="color: #333333;width: 120rpx;text-align: center;font-size: 25rpx;line-height: 90rpx"
				@click="cancel">取消</text>
		</div>
		<list class="list">
			<cell class="cell">
				<div v-if="addressList.length == 0" class="border-contain" style="margin-top: 20rpx">
					<text class="hub-txt">交通枢纽：</text>
					<div class="line-gray"></div>
					<div v-for="(i, index) in hubList" :key="index">
						<text class="hub-txt" @click="onHubClick(i)">{{i.address}}</text>
						<div v-if="index != hubList.length-1" class="line-gray"></div>
					</div>
				</div>
				<div v-if="addressList.length == 0 && type!=2 && type!=4" class="border-contain"
					style="margin-top: 20rpx">
					<text class="hub-txt">历史地址：</text>
					<div v-if="historyList.length > 0" class="line-gray"></div>
					<div v-for="(i, index) in historyList" :key="index">
						<address-item :address-data="i" @onItemClick="onItemClick(i)"></address-item>
						<div v-if="index != historyList.length-1" class="line-gray"></div>
					</div>
				</div>
			</cell>
			<cell class="cell">
				<div v-if="addressList.length > 0" class="border-contain" style="margin-top: 20rpx">
					<div v-for="(i, index) in addressList " :key="index">
						<address-item :address-data="i" @onItemClick="onItemClick(i)"></address-item>
						<div v-if="index != addressList.length-1" class="line-gray"></div>
					</div>
				</div>
			</cell>
		</list>
	</div>
</template>
<script>
	import ConfigData from './data'
	import util from '../../utils/util.js';
	import AddressItem from '../../components/addressItem.vue'
	import amap from '../../libs/amap-wx.js'
	var amapPlugin = new amap.AMapWX({
		key: '4c81e94d7f204195532961c90d06a73a'
	});

	export default {
		data() {
			return {
				addressName: '',
				weather: {
					hasData: false,
					data: []
				},

				plaTxt: '请输入取车地址',
				keyWords: '',
				type: 0,
				hubNo: '',
				hubAddress: {},
				overlayShow: false,
				hubList: ConfigData.hubList,
				historyList: [
					// {
					//     title:'浦东国际机场',
					//     city:'上海市',
					//     address:'浦东国际机场',
					//     lat:31.1504340000,
					//     lon:121.8064430000
					// },
					// {
					//     title:'虹桥机场',
					//     city:'上海市',
					//     address:'虹桥机场',
					//     lat:31.1966800000,
					//     lon:121.3376000000
					// },
					// {
					//     title:'虹桥火车站',
					//     city:'上海市',
					//     address:'虹桥火车站',
					//     lat:31.1940680000,
					//     lon:121.3207790000
					// },
					// {
					//     title:'上海南站',
					//     city:'上海市',
					//     address:'上海南站',
					//     lat:31.1530870000,
					//     lon:121.4293600000
					// }
				],
				addressList: [],

			}
		},
		components: {
			AddressItem,
		},

		methods: {

			getAuthorizeInfo(event) {
				const that = this;
				uni.authorize({
					scope: 'scope.userLocation',
					success() { // 允许授权
						that.inputChange(event);
					},
					fail() { // 拒绝授权
						that.openConfirm();
					}
				})
			},
			// 再次获取授权
			// 当用户第一次拒绝后再次请求授权
			openConfirm() {
				uni.showModal({
					title: '请求授权当前位置',
					content: '需要获取您的地理位置，请确认授权',
					success: (res) => {
						if (res.confirm) {

							uni.openSetting(); // 打开地图权限设置
						} else if (res.cancel) {
							uni.showToast({
								title: '你拒绝了授权，无法获得周边信息',
								icon: 'none',
								duration: 1000
							})
						}
					}
				});
			},

			inputChange: function(event) {
				uni.showLoading({
					title: '获取信息中'
				});
				const self = this;
				self.keyWords = event.detail.value
				if (self.keyWords.length > 0) {
					amapPlugin.getInputtips({
						keywords: self.keyWords,
						city: "上海",
						location: '121.473701,31.230416',
						citylimit: true,
						success(res) {
							if (res.tips.length > 0) {
								self.addressList = res.tips
							} else {
								uni.showToast({
									title: '暂无',
									icon: 'error'
								})
								return
							}
							setTimeout(() => {
								wx.hideLoading();
							}, 100)

						},
						fail(parmas) {
							switch (parmas.code) {
								case 401:
									uni.clearStorageSync()
									break
								default:
									uni.showToast({
										title: '网络不给力~',
										icon: 'none'
									})
									break

							}
						},

					})
				} else {
					wx.hideLoading();
					self.keyWords = '';
					self.addressList = [];
				}
			},
			cancel() {
				this.keyWords = '';
				this.addressList = [];
			},
			onHubClick(address) {
				this.hubAddress = address;
				if (this.type == 0 || this.type == 2 || this.type == 1 || this.type == 3 || this.type ==
					6) {
					uni.showModal({
						title: '您选择了交通枢纽为您的送取车地址，请完善您的航班号,车次，以便我们更准时为您送取车！',
						cancelText: '跳过',
						confirmText: '确定',
						placeholderText: '请输入航班号/车次',
						editable: true,
						success: function(res) {
							if (res.confirm) {
								var data = {
									title: address.title,
									city: address.city,
									lat: address.lat,
									lon: address.lon,
									address: address.address + res.content,
								}
								uni.$emit('selectType', data)
								uni.navigateBack()
							} else if (res.cancel) {
								var data = {

									title: address.title,
									city: address.city,
									lat: address.lat,
									lon: address.lon,
									address: address.address,
								}
								uni.$emit('selectType', data)
								uni.navigateBack()
							}
						}
					})
				} else {
					var data = this.hubAddress
					uni.$emit('selectType', data)
					uni.navigateBack();
				}

			},
			onItemClick(address) {
				if (address.location && address.address.length > 0) {
					var location = address.location.split(',')
					var data = {
						title: address.name,
						city: '上海',
						lat: location[1],
						lon: location[0],
						address: address.address,
					}
				} else {
					var data = {
						title: address.address,
						city: '上海',
						lat: address.lat,
						lon: address.lon,
						address: address.title,
					}
				}

				uni.$emit('selectType', data)
				uni.navigateBack()
			},
		},
		created() {},
		onLoad(data) {
			this.type = data.type;
			if (this.type == 0) {
				this.plaTxt = '请输入取车地址';
				if (uni.getStorageSync('his_get_address'))
					this.historyList = uni.getStorageSync('his_get_address');
			} else if (this.type == 1) {
				this.plaTxt = '请输入还车地址';
				if (uni.getStorageSync('his_return_address'))
					this.historyList = uni.getStorageSync('his_return_address');
			} else if (this.type == 3) {
				this.plaTxt = '请输入上车地址';
				if (uni.getStorageSync('his_get_address'))
					this.historyList = uni.getStorageSync('his_get_address');
			} else if (this.type == 5) {
				this.plaTxt = '请输入目的地地址';
				if (uni.getStorageSync('his_return_address'))
					this.historyList = uni.getStorageSync('his_return_address');
			} else if (this.type == 6) {
				this.plaTxt = '请输入结束行程地址';
				if (uni.getStorageSync('his_return_address'))
					this.historyList = uni.getStorageSync('his_return_address');
			}
		}
	};
</script>
<style lang="scss" scoped>
	.gou-img {
		width: 31rpx;
		height: 21rpx;
	}

	.down {
		margin-left: 5rpx;
		width: 16rpx;
		height: 8rpx;
	}

	.add-input {
		width: 490rpx;
		height: 85rpx;
		color: #333333;
		font-size: 25rpx;
		padding: 0rpx 20rpx;
	}

	.hub-txt {
		color: #333333;
		font-size: 30rpx;
		height: 90rpx;
		line-height: 90rpx;
		padding-left: 20rpx;
	}

	.confim {
		width: 300rpx;
		height: 80rpx;
		font-size: 28rpx;
		text-align: center;
		color: #333333;
		line-height: 80rpx;
	}

	.hub-input {
		width: 540rpx;
		height: 80rpx;
		color: #333333;
		font-size: 25rpx;
		background-color: #fafafa;
		border-color: #cccccc;
		border-width: 1rpx;
		padding: 0rpx 20rpx;
		margin-top: 20rpx;
	}

	.line {
		width: 1rpx;
		height: 80rpx;
		background-color: #cccccc;
	}

	.viewItem {
		position: relative;
		width: 100%;
		padding: 20rpx;
		margin-top: 50rpx;
		text-align: center;
		display: flex;
		align-items: center;
		justify-content: center;
		font-size: 40rpx;
		font-weight: 300;
		color: #FFFFFF;
		background-color: rgba(212, 201, 240, 0.8);
	}
</style>
