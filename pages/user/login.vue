<template>
	<view class="content">
		<button open-type="getPhoneNumber" @getphonenumber="onGetPhoneNumber">手机登录</button>
	</view>
</template>

<script>
	import {
		post
	} from '../../utils/netUtil.js'
	export default {
		data() {
			return {
				access_token: '',
				code: '',
			}
		},

		methods: {

			get_accesstoken() {
				const self = this;
				let dict = {
					code: self.code,
				}
				post('/access', dict).then(res => {
					// (res)
					// if (res) {
					// 	uni.showToast({
					// 		title: '系统错误，请联系客服',
					// 		icon: 'none'
					// 	})
					// }
					// // this.$notice.toast({message: '登录成功'})
					// res.user_level = 3;
					// uni.setStorageSync('user_mobile', res.user_mobile);
					// uni.setStorageSync('user_id', res.user_id);
					// uni.setStorageSync('user_token', res.user_token);
					// uni.setStorageSync('user_info', res);
					// // uni.reLaunch({
					// // 	url:'../order/myorder'
					// // })
					// let pages = getCurrentPages(); // 当前页面
					// let beforePage = pages[pages.length - 2]; // 上一页
					// uni.navigateBack({
					// 	success: function() {
					// 		beforePage.onLoad(); // 执行上一页的onLoad方法
					// 	}
					// });

				})

			},
			onGetPhoneNumber(e) {

				if (e.detail.code) {
					//发起网络请求
					this.code = e.detail.code
					this.get_accesstoken()
				} else {
					uni.showToast({
						title: '授权失败',
						icon: 'none'
					})
					return

				}
			},

		},

		created() {},
	}
</script>
<style>
</style>
