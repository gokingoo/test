/**
 * Created by libin on 2018/8/31.
 */
import md5 from 'js-md5'
import {
	get,
	post,
	put
} from './netUtil'
import Vue from 'vue'

const build = '1.0';
const flashwineSalt = 'coolcargo20190101';
const securlKey = 'coolsecurecoolurlcargo.com';
// const openUrl = 'http://172.28.127.164:5001';
// const openUrl = 'http://192.168.0.105:5001';
const openUrl = 'http://user-t.coolcargo.cn';
const idUrl = 'http://static-t.coolcargo.cn';
// const openUrl = 'https://user.coolcargo.cn';
const imgUrl = 'https://static.coolcargo.cn';
// const idUrl = 'https://secure.coolcargo.cn';


export const utilFunc = {
	getOpenUrl() {
		return openUrl;
	},
	getTimestamp() {
		var nowTime = new Date();
		return nowTime.getTime();
	},
	getHash(params) {
		var str = '';
		for (var k in params) {
			str += params[k];
		}
		str += flashwineSalt;

		return md5(str)
	},
	// #ifdef APP
	getParmasData(params) {
		if (!params)
			var params = {};
		params['build'] = build;
		params['time'] = this.getTimestamp() + '';
		params['ver'] = 'a1.1';
		var p = this.keysort(params);
		var hash = this.getHash(p);
		p['hash'] = hash;
		return p;
	},
	// #endif
	// #ifdef MP-WEIXIN
	getParmasData(params) {
		if (!params)
			var params = {};
		params['build'] = build;
		params['time'] = this.getTimestamp() + '';
		params['ver'] = 'm1.0';
		var p = this.keysort(params);
		var hash = this.getHash(p);
		p['hash'] = hash;
		return p;

	},
	// #endif

	keysort(params) {
		var pm = Object.keys(params).sort();
		var p = {};
		for (var i in pm) {
			p[pm[i]] = params[pm[i]];
		}
		return p;
	},
	setCarImg(modelId, lastTime) {
		return imgUrl + '/model/' + modelId + '.jpg?' + lastTime;
	},
	setTenderImg(carId) {
		return imgUrl + '/model/' + carId + '.jpg';
	},
	setAdvertImg(advertId) {
		return imgUrl + '/advert/' + advertId + '/' + advertId + '.jpg'
	},
	checkMobile(mobile) {
		if (/^1[3,4,5,6,7,8,9]\d{9}$/.test(mobile)) {
			return true
		}
		return false;
	},
	setUserCard(userId, type) {
		var path = '/user/' + userId + '/' + userId + '_' + type + '.jpg';
		var expire = parseInt(this.getTimestamp() / 1000) + 30;
		var resText = securlKey + path + expire;
		var baseText = this.toMd5(resText);
		var str = baseText.replace('b\'', '').replace('\'', '').replace('+', '-').replace('/', '_').replace('=',
			'');
		var url = path + '?st=' + str + '&e=' + expire;
		return idUrl + url;
	},
	toMd5(str) {
		return md5.base64(str);
	},
	getSpecialData(dict) {
		if (dict && dict.data && dict.data.length > 0) {
			const {
				title,
				data
			} = dict;
			return {
				title,
				data: data
			};
		} else {
			return null;
		}
	},

	isLogin() {
		var userId = uni.getStorageSync('user_id');
		var token = uni.getStorageSync('user_token');
		if (!userId || !token) {
			uni.showModal({
				title: '您未登录!',
				content: '请登录!!!',
				cancelText: '取消',
				confirmText: '确定',
				// #ifdef APP
				success(res) {
					if (res.confirm) {

						uni.navigateTo({
							url: '/pages/user/applogin'
						})
					} else if (res.cancel) {
						return false
					}
				},
				// #endif
				// #ifdef MP-WEIXIN
				success(res) {
					if (res.confirm) {

						uni.switchTab({
							url: '/pages/user/user'
						})
					} else if (res.cancel) {
						return false
					}
				},
				// #endif

			});
			return false;

		}
		return true;
	},
	getUerData() {
		var userId = uni.getStorageSync('user_id');
		var token = uni.getStorageSync('user_token');
		if (!userId || !token) {
			return;
		}

		var dict = {
			user_id: userId,
			user_token: token
		}
		get('/user', dict).then(res => {
			uni.getStorageSync('user_info', res)
		})
	}
}
export default utilFunc;
