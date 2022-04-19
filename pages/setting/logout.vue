<template>
    <div class="align">
        <view class="list">
            <cell class="cell">
                <text  style="font-size: 32rpx;font-weight: bold;color:#333333;margin: 30rpx;margin-top: 5rpx">注销当前账号</text>
                <div style="margin: 30rpx;margin-top: 5rpx">
                    <div class="flex1">
                        <text class="flex1 text-black" >将{{ mobile }}所绑定的账号注销</text> 
                        <text class="tag-text">注意，注销账号后以下信息将被清空且无法恢复</text>
                    </div>
                </div>  
				<text  style="font-size: 28rpx;color:#333333;margin: 30px; margin-top: 10px;display: flex;flex-direction: column;" v-for="item,i in items" :key="i">{{ item }}</text>
                <text  style="font-size: 32rpx;font-weight: bold;color:#333333;margin: 10px;margin-top: 5rpx">注意事项</text>
				<text  style="font-size: 26rpx;color:#8c8c8c; margin: 10px;margin-top: 5rpx;display: flex;flex-direction: column;" v-for="item,i in items1" :key="i">{{ item }}</text>
				<view class="btn1" @click="toSubmit">注销账号</view>
            </cell>
         </view>
    </div> 
</template>
<script>
    import {post} from '../../utils/netUtil.js'
    export default {
    data() {
        return {
            items:['•  个人资料','•  账户充值消费信息','•  优惠券、储蓄余额等','•  订单信息、发票信息','•  会员等级、会员权益等','•  以及您在酷享出行平台留存的其他信息'],
			items1:[
				'1.请确认所有交易已完结且无纠纷',
				'2.若账号下有帐户余额,建议您使用完后再注销',
				'3.若帐号下有待支付订单,需您完成支付后即可进行帐号注销',
				'4.账号注销后的历史交易可能产生的资金退回权益等将视作自动放弃'
			],
            overlayShow:false,
            mobile:""
        }
    },
    components: {
        // bmContainer,
        // WxcMask
    },
    methods: {
        toSubmit(){
			uni.showModal({
				title:'您确定要注销账号',
				content:'注销账号会清空您所有信息和数据，您确定注销该账号？',
				confirmText: '确认注销',
				cancelText: '我再想想',
				success:function(res) {
					// 点击确认按钮的回调 
					if (res.confirm){
					   this.postLogout()
				   }else if(res.cancel){
					   // 点击取消按钮的回调
				   }
				}.bind(this)
			})
		},
			
		
        postLogout(){
            var userId = uni.getStorageSync('user_id');
            var token = uni.getStorageSync('user_token');
            var dict = {
                user_id: userId,
                user_token:token, 
            }
            post('/user/logout', dict).then(res => {
                uni.removeStorageSync('user_id');
                uni.removeStorageSync('user_token');
				uni.removeStorageSync('user_mobile');
                uni.removeStorageSync('user_info');
				uni.removeStorageSync('isagree')
                uni.showToast({
                	title:'已注销',
					icon:'success'
                })
				wx.exitMiniProgram();
				// uni.$emit('islogot', 1)
				// setTimeout(function() {
					// uni.navigateBack({
					// 	delta:2
					// })
				// }, 500);
			}
        )}
	},
    created(){
         if(uni.getStorageSync('user_mobile'))
         this.mobile = uni.getStorageSync('user_mobile');
    },
};
</script>
<style lang="scss" scoped>
.tag-text{
	display: flex;
	flex-direction: column;
    height: 32px;
    line-height: 32rpx;
    font-size: 22rpx;
    color:#808080
    }
  .line{
    width: 1px;
    height: 80rpx;
    background-color: #cccccc;
    }
    .confim1{
    width: 300rpx;
    height: 80rpx;
    font-size: 28rpx;
    text-align: center;
    color: #ff6005;
    line-height: 80rpx;
    }
    .confim{
    width: 300rpx;
    height: 80rpx;
    font-size: 28rpx;
    text-align: center;
    color: #333333;
    line-height: 80rpx;
    }
    .btn1 {
	height: 80rpx;
	text-align: center;
	background-color: #333333;
	font-size: 25rpx;
	line-height: 40px;
	border-width: 1px;
	border-radius: 10px;
	color: #ffffff;
}
</style>
