<template>
    <div class="flex-row contain">
        <div class="flex1">
            <text class="text-black" >{{incomeData.reason}}</text>
            <text class="text-gray" style="margin-top: 20rpx">{{incomeData.time}}</text>
        </div>
        <div style="align-items: flex-end">
            <text v-if="incomeData.change >= 0" class="text-black" >+{{incomeData.change}}</text>
            <text v-if="incomeData.change < 0" class="text-black" >{{incomeData.change}}</text>
            <text class="text-gray" style="margin-top: 20rpx">{{incomeData.balance}}</text>
        </div>
    </div>
</template>

<script>
    export default {
        props: {
            incomeData:{}
        },
        data(){
            return {
            }
        },
        methods: {
        },
    }
</script>

<style  lang="scss" scoped>
 .contain{
     padding: 30rpx;
    }

</style>
