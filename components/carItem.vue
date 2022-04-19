<template>
    <div class="contain" @click="toSchedule">
        <div class="car-contain" >
            <image class="car-image"  resize="cover" :src="setImg"/>
            <image v-if="carData.model_id >0 && carData.service_type==1" class="driver-img"  resize="cover" src="https://static.coolcargo.cn/public/image/applet/driver_img@2x.png"/>
        </div>

        <div class="flex-row align">
            <text class="car-name">{{setName}}</text>
            <text v-if="carData.car_tag.length > 0" class="tag-text">{{carData.car_tag}}</text>
        </div>

        <div class="price">
            <text class="txt" v-if="carData.model_id >0 && carData.service_type!=2">日均</text>
            <text class="txt" v-if="carData.model_id >0 && carData.service_type==2">虹桥</text>
            <text class="price-txt" v-if="carData.model_id >0 ">￥</text>
            <text class="price-txt">{{carData.day_price}}</text>
            <text class="txt" v-if="carData.model_id >0 && carData.service_type!=2">起</text>
            <text class="txt" v-if="carData.model_id >0 && carData.service_type==2">/</text>
            <text class="txt" v-if="carData.model_id >0 && carData.service_type==2">浦东</text>
            <text class="price-txt" v-if="carData.model_id >0 && carData.service_type==2">￥{{carData.day_price2}}</text>
            <text class="driver-txt" v-if="carData.model_id >0 && carData.service_type==1">(8h或100km)</text>
        </div>
    </div>
</template>


<script>
    import util from '../utils/util.js'
    export default {
        props: {
            carData:{}
        },
        data(){
            return {
            }
        },
        computed:{
            setImg(){
                var img = 'https://static.coolcargo.cn/public/image/applet/order_car@2x.png';
                if(this.carData.model_id > 0){
                 img = util.setCarImg(this.carData.model_id,this.carData.last_time);
                }
                return img;
            },
          setName(){
              var name = this.carData.car_brand;
              if(this.carData.car_series.length > 0)
                  name += this.carData.car_series;
              return name;
          }
        },
        methods: {
            toSchedule(){
                return  this.$emit('toSchedule');
            }
        },
    }
</script>

<style lang="scss" scoped>
.contain{
    width: 350rpx;
    background-color: #ffffff;
    overflow: hidden;
    align-items: center;
    border-radius: 10px;
    padding: 40rpx 5rpx;
    margin-bottom: 10rpx;
	display: flex;
	flex-direction: column;

}
.car-contain{
    display: inline-block;
    position: relative;
}
 .driver-img{
     width: 60rpx;
     height: 60rpx;
     display: block;
     position: absolute;
     top: 1px;
     right: 1px;
}
.car-image{
    width: 305rpx;
    height: 175rpx;
}
.car-name{
    font-size: 28rpx;
    color: #333333;
}
.price{
    flex-direction: row;
    align-items: center;
    margin-top: 10rpx;
}
.txt{
    font-size: 24rpx;
    color: #999999;
}
.price-txt{
    font-size: 26rpx;
    color: #ff6004;
}
 .driver-txt{
     font-size: 24rpx;
     color: #ff6004;
    }
.tag-text{
    height: 30rpx;
    line-height: 30rpx;
    margin-left: 10rpx;
    padding-left: 8rpx;
    padding-right: 8rpx;
    background-color: #fdceb2;
    border-radius: 5px;
    font-size: 23rpx;
    color: #ff6004;
    }
</style>
