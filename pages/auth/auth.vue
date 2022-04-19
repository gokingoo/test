<template>
	<div>
		<list class="list">
			<cell class="cell">
				<div class="border-contain margin-top20">
					<text class="text-black" style="margin-left: 20rpx;margin-top: 30rpx">请上传清晰、无反光、无遮挡的证件照片</text>
					<div class="flex-row" style="padding: 30rpx">
						<image class="idcard-img" resize="cover" :src="imageSrc1" @click="pickHeadImg(0)" />
						<image class="idcard-img" resize="cover" style="margin-left: 50rpx" :src="imageSrc2"
							@click="pickHeadImg(1)" />
					</div>
					<div class="flex-row" style="padding: 30rpx">
						<image class="idcard-img" resize="cover" :src="imageSrc3" @click="pickHeadImg(2)" />
						<image class="idcard-img" resize="cover" style="margin-left: 50rpx" :src="imageSrc4"
							@click="pickHeadImg(3)" />
					</div>
				</div>
				<div class="border-contain" style="margin-top: 20rpx">
					<div class="flex-row align" style="height: 80rpx;padding-left: 30rpx">
						<text class="text-gray" style="width: 130rpx;font-size: 25rpx">姓名</text>
						<input class="input" type="text" placeholder="请输入姓名" placeholder-style="font-size:26rpx"
							v-model="name" :disabled="userState!=0 && !canModify" ref="id1" />
					</div>
					<div class="line-gray"></div>
					<div class="flex-row align" style="height: 80rpx;padding-left: 30rpx">
						<text class="text-gray" style="width: 130rpx;font-size: 25rpx">证件号码</text>
						<input class="input" type="text" placeholder="请输入证件号码" placeholder-style="font-size:26rpx"
							v-model="no" :disabled="userState!=0 && !canModify" />
					</div>
					<div class="line-gray"></div>
					<div class="flex-row align" style="height: 80rpx;padding-left: 30rpx">
						<text class="text-gray" style="width: 130rpx;font-size: 25rpx">准驾车型</text>
						<input class="input" type="text" placeholder="请输入准驾车型" placeholder-style="font-size:26rpx"
							v-model="carArrow" :disabled="userState!=0 && !canModify" />
					</div>
					<div class="line-gray"></div>
					<div class="flex-row align" style="height: 80rpx;padding-left: 30rpx">
						<text class="text-gray" style="width: 130rpx;font-size: 25rpx">起始时间</text>
						<input class="input" type="text" placeholder="请输入驾照起始时间(格式2019-08-08)"
							placeholder-style="font-size:26rpx" v-model="startTime"
							:disabled="userState!=0 && !canModify" />
					</div>
					<div class="line-gray"></div>
					<div class="flex-row align" style="height: 80rpx;padding-left: 30rpx">
						<text class="text-gray" style="width: 130rpx;font-size: 25rpx">过期时间</text>
						<input class="input" type="text" placeholder="请输入驾照过期时间(格式2025-08-08)"
							placeholder-style="font-size:26rpx" v-model="endTime"
							:disabled="userState!=0 && !canModify" />
					</div>
				</div>


			</cell>
		</list>
		<view style="width: 750rpx;text-align: center;margin-bottom:30rpx;margin-top: 20rpx">
			<text class="text-yellow">酷享出行会严格保障您的信息安全</text>
		</view>
		<view class="btn" v-if="userState<2" @click="toAuth">{{btnTxt}}</view>
	</div>
</template>
<script>
	import {
		put
	} from '../../utils/netUtil.js'
	import util from '../../utils/util.js'


	export default {
		data() {
			return {
				userState: 0,
				name: '',
				no: '',
				carArrow: '',
				startTime: '',
				endTime: '',
				isBottomShow: false,
				isFace: false,
				isBack: false,
				licFace: false,
				licBack: false,
				canModify: true,
				imgType: 0,
				btnTxt: '提交认证',
				imageSrc1: 'https://static.coolcargo.cn/public/image/applet/idcard_img@2x.png',
				imageSrc2: 'https://static.coolcargo.cn/public/image/applet/idcard_back@2x.png',
				imageSrc3: 'https://static.coolcargo.cn/public/image/applet/license_img@2x.png',
				imageSrc4: 'https://static.coolcargo.cn/public/image/applet/license_back@2x.png',
			}
		},
		components: {

		},
		computed: {
			btnStyle() {
				const customStyle = {
					marginTop: '20rpx'
				};
				return customStyle
			},
			btnStyle1() {
				const customStyle = {
					marginTop: '40rpx'
				};
				return customStyle
			}
		},
		methods: {
			pickHeadImg(type) {
				uni.chooseImage({
					count: 1,
					sizeType: ['original', 'compressed'],
					sourceType: ['camera', 'album'], //这要注意，camera掉拍照，album是打开手机相册
					success: (res) => {
						const tempFilePaths = res.tempFilePaths;
						if (type == 0) {
							this.imageSrc1 = res.tempFilePaths[0]
							this.isFace = true
						} else if (type == 1) {
							this.imageSrc2 = res.tempFilePaths[0]
							this.isBack = true;
						} else if (type == 2) {
							this.imageSrc3 = res.tempFilePaths[0]
							this.licFace = true;
						} else if (type == 3) {
							this.imageSrc4 = res.tempFilePaths[0]
							this.licBack = true;
						}
					}
				});
				if (this.userState != 0 && !this.canModify) {
					return;
				}
				this.imgType = type;
			},
			// toCameraClick() {
			// 	this.hidenOverlayClick();
			// 	const self = this;
			// 	this.$image.camera({
			// 		imageWidth: '300',
			// 		allowCrop: false
			// 	}).then(resData => {
			// 		if (self.imgType == 0) {
			// 			self.imageSrc1 = resData[0];
			// 			self.isFace = true;
			// 		} else if (self.imgType == 1) {
			// 			self.imageSrc2 = resData[0];
			// 			self.isBack = true;
			// 		} else if (self.imgType == 2) {
			// 			self.imageSrc3 = resData[0];
			// 			self.licFace = true;
			// 		} else if (self.imgType == 3) {
			// 			self.imageSrc4 = resData[0];
			// 			self.licBack = true;
			// 		}
			// 	});
			// },
			// toPhotoClick() {
			// 	this.hidenOverlayClick();
			// 	const self = this;
			// 	this.$image.pick({
			// 		maxCount: 1,
			// 		imageWidth: '300',
			// 		allowCrop: false
			// 	}).then(resData => {
			// 		if (self.imgType == 0) {
			// 			self.imageSrc1 = resData[0];
			// 			self.isFace = true;
			// 		} else if (self.imgType == 1) {
			// 			self.imageSrc2 = resData[0];
			// 			self.isBack = true;
			// 		} else if (self.imgType == 2) {
			// 			self.imageSrc3 = resData[0];
			// 			self.licFace = true;
			// 		} else if (self.imgType == 3) {
			// 			self.imageSrc4 = resData[0];
			// 			self.licBack = true;
			// 		}
			// 	})
			// },
			// hidenOverlayClick() {
			// 	this.isBottomShow = false;
			// },
			uploadImg(imgType) {
				var userId = uni.getStorageSync('user_id') + '';
				var token = uni.getStorageSync('user_token') + '';
				if (!userId || !token) {
					return;
				}
				var p = {
					user_id: userId,
					user_token: token,
					user_name: this.name,
					idcard_no: this.no,
					driving_type: this.carArrow,
					license_begin: this.startTime,
					license_end: this.endTime,
					img_type: imgType
				};
				var dict = {
					url: util.getOpenUrl() + '/user/data2',
					params: util.getParmasData(p),
				}
				dict['source'] = [this.imageSrc1]
				if (imgType == 1) {
					dict['source'] = [this.imageSrc2]
				} else if (imgType == 2) {
					dict['source'] = [this.imageSrc3]
				} else if (imgType == 3) {
					dict['source'] = [this.imageSrc4]
				}
				uni.uploadFile({
					url: dict.url,
					filePath: dict.source[0],
					name: 'file',
					formData: {
						build: dict.params.build,
						driving_type: dict.params.driving_type,
						hash: dict.params.hash,
						idcard_no: dict.params.idcard_no,
						img_type: dict.params.img_type,
						license_begin: dict.params.license_begin,
						license_end: dict.params.license_end,
						time: dict.params.time,
						user_id: dict.params.user_id,
						user_name: dict.params.user_name,
						user_token: dict.params.user_token,
						ver: dict.params.ver,
					},
				}).then(resData => {
					var res = JSON.parse(resData[1].data)
					if (res.result == 0) {
						if (imgType == 3) {
							uni.showToast({
								title: '提交成功',
								icon: 'success'
							})
							setTimeout(function() {
								uni.navigateBack()
							}, 500);
							uni.setStorageSync('user_info', res.content);
							var ver = new Date().getTime();
							uni.setStorageSync('card_ver', ver);
						}

					} else {
						uni.showToast({
							title: res.message,
							icon: 'none'
						})
					}

				}, error => {
					uni.showToast({
						title:'提交失败',
						icon:'error'
					})
				})
			},
			toAuth() {
				if (this.btnTxt == '修改') {
					this.btnTxt = '提交认证';
					this.canModify = true;
					this.isFace = false;
					this.isBack = false;
					this.licFace = false;
					this.licBack = false;
					this.imageSrc1 = 'https://static.coolcargo.cn/public/image/applet/idcard_img@2x.png';
					this.imageSrc2 = 'https://static.coolcargo.cn/public/image/applet/idcard_back@2x.png';
					this.imageSrc3 = 'https://static.coolcargo.cn/public/image/applet/license_img@2x.png';
					this.imageSrc4 = 'https://static.coolcargo.cn/public/image/applet/license_back@2x.png';
					this.name = '';
					this.no = "";
					this.carArrow = '';
					this.startTime = '';
					this.endTime = '';
					return;
				}
				if (!this.isFace) {
					uni.showToast({
						title: '请选择身份证正面图片',
						icon: 'none'
					});
					return;
				}
				if (!this.isBack) {
					uni.showToast({
						title: '请选择身份证背面图片',
						icon: 'none'
					});
					return;
				}
				if (!this.licFace) {
					uni.showToast({
						title: '请选择驾驶证正面图片',
						icon: 'none'
					});
					return;
				}
				if (!this.licBack) {
					uni.showToast({
						title: '请选择驾驶证证背面图片',
						icon: 'none'
					});
					return;
				}
				if (!this.name) {
					uni.showToast({
						title: '请输入姓名',
						icon: 'none'
					});
					return;
				}
				if (!this.no) {
					uni.showToast({
						title: '请输入证件号码',
						icon: 'none'
					});
					return;
				}
				if (!this.carArrow) {
					uni.showToast({
						title: '请输入准驾车型',
						icon: 'none'
					});
					return;
				}
				if (!this.startTime) {
					uni.showToast({
						title: '请输入驾照起始时间',
						icon: 'none'
					});
					return;
				}
				if (!this.endTime) {
					uni.showToast({
						title: '请输入驾照过期时间',
						icon: 'none'
					});
					return;
				}
				this.uploadImg(0);
				this.uploadImg(1);
				this.uploadImg(2);
				this.uploadImg(3);
			}
		},
		created() {

			if (uni.getStorageSync('user_info').user_name)
				this.name = uni.getStorageSync('user_info').user_name;
			if (uni.getStorageSync('user_info').idcard_no)
				this.no = uni.getStorageSync('user_info').idcard_no;
			if (uni.getStorageSync('user_info').driving_type)
				this.carArrow = uni.getStorageSync('user_info').driving_type;
			if (uni.getStorageSync('user_info').license_begin)
				this.startTime = uni.getStorageSync('user_info').license_begin;
			if (uni.getStorageSync('user_info').license_end)
				this.endTime = uni.getStorageSync('user_info').license_end;
			if (uni.getStorageSync('user_info').user_state)
				this.userState = uni.getStorageSync('user_info').user_state;
			if (this.userState > 0) {
				this.canModify = false;
				this.btnTxt = '修改';
				var userId = uni.getStorageSync('user_id');
				var ver = uni.getStorageSync('card_ver');
				this.imageSrc1 = util.setUserCard(userId, 0);
				this.imageSrc2 = util.setUserCard(userId, 1);
				this.imageSrc3 = util.setUserCard(userId, 2);
				this.imageSrc4 = util.setUserCard(userId, 3);
			}
		}
	};
</script>
<style lang="scss" scoped>
	.idcard-img {
		width: 300rpx;
		height: 197rpx;
	}
</style>
