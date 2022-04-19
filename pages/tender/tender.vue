<template>
	<view>
		<div class="cell">
		        <image class="img1" :src="imgSrc1" ></image>
				<image class="img2" :src="imgSrc2" ></image>
		</div>
		<view class="contain" style="padding: 20rpx;margin: 10rpx" @click="toChoose">
		    <button class="confirm-btn" >我有意向成为车主</button>
		    <!--<div class=" btn-income"  @click="toMyTender">-->
		        <!--<image class="car-tender"  src="bmlocal://assets/car_tender@2x.png"/>-->
		        <!--<text class="text-black">查看我的车辆</text>-->
		    <!--</div>-->
		
		</view>
	</view>
</template>

<script>
	import util from '../../utils/util.js'
	export default {
		data() {
			return {
			title: '成为车主',
			imgSrc1: 'https://static.coolcargo.cn/public/image/applet/tender_1@2x.jpg',
			imgSrc2: 'https://static.coolcargo.cn/public/image/applet/tender_2@2x.jpg',
			curHomeBackTriggerTimes: 1,
			maxHomeBackTriggerTimes: 2,
			}
		},
		methods: {
		    toChoose() {
				if (util.isLogin())
				uni.navigateTo({
					url:'./tenderCar'
				})
		    },
		    // toDetail() {
		    //     this.$router.open({
		    //         name: 'income_detail',
		    //         type: 'PUSH'
		    //     })
		    // },
		    // toMyTender() {
		    //     this.$router.open({
		    //         name: 'my_tender',
		    //         type: 'PUSH'
		    //     })
		    // }
		}
	}
</script>

<style lang="scss">
.img1 {
    width:100%;
    height: 400rpx;
}

.img2 {
    width: 100%;
    height: 732rpx;
}

.contain {
    background-color: #ffffff;
    border-radius: 15px;
}

.confirm-btn {
    height: 80rpx;
    text-align: center;
    background-color: #333333;
    font-size: 25rpx;
    line-height: 40px;
    border-width: 1px;
    border-color: #989898;
    border-radius: 10px;
    color: #ffffff;
}

.btn-income {
    flex-direction: row;
    align-items: center;
    justify-content: center;
    width: 670px;
    height: 80px;
    margin-top: 20px;
    margin-bottom: 20px;
    background-color: #ffffff;
    border-radius: 15px;
    border-width: 1px;
    border-color: #999999;
}

.income-img {
    width: 35px;
    height: 35px;
}

.car-tender {
    width: 45px;
    height: 35px;
    margin-right: 10px;
}
</style>
