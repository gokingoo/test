/**
 * Created by libin on 2018/8/31.
 */

import util from './util.js'

export const post = (url, paramsObj) => {
	return _fetch(url, 'POST', paramsObj)
}

export const get = (url, paramsObj) => {
	return _fetch(url, 'GET', paramsObj)
}

export const put = (url, paramsObj) => {
	return _fetch(url, 'PUT', paramsObj)
}

export const del = (url, paramsObj) => {
	return _fetch(url, 'DELETE', paramsObj)
}

export const _fetch = (url, method, paramsObj) => {
	return new Promise((resolve, reject) => {
		uni.request({
			url: util.getOpenUrl() + url,
			header: {
				"Content-Type": "application/x-www-form-urlencoded"
			},
			method: method,
			data: util.getParmasData(paramsObj),
			// #ifdef APP
			success: function(res) {
				if (res.data.result == 1001) {
					uni.navigateTo({
						url: '/pages/user/applogin',
					});
					uni.showToast({
						title: '账号异常，请重新登录',
						icon: 'none'
					})
				} else if (res.data.result == 0) {
					resolve(res.data.content)
				}
				resolve(res.data);
			},
			// #endif
			// #ifdef MP-WEIXIN
			success: function(res) {
				if (res.data.result == 1001) {
					uni.navigateTo({
						url: '/pages/user/user',
					});
					uni.showToast({
						title: '账号异常，请重新登录',
						icon: 'none'
					})
				} else if (res.data.result == 0) {
					resolve(res.data.content)
				}
				resolve(res.data);
			},
			// #endif
			fail: function(error) {
				uni.showToast({
					title: '网络异常!',
					icon: 'error'
				});
			}
		});
	});
};
