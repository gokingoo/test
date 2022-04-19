<template>
    <div class="align">
       <list class="list">
           <cell class="cell" style="display: flex;flex-direction: column;">
               <text class="fqa-title">1.如何用车？</text>
               <text class="fqa-txt">答：您可以下载酷享租车APP，首次注册后，用车前上传您的身份证、驾照、认证通过后，您就可以在线购买一份属于您的酷享租车套餐，最后输入您的用车信息，即可完成约车。</text>
               <text class="fqa-title">2.多久能通过审核？用车是否有送取车服务？有司机服务吗？</text>
               <text class="fqa-txt">答：1、工作日1天内可收到身份认证结果，非工作日2天内能收到身份认证结果；2、上海外环内，机场（浦东和虹桥）、迪士尼度假区免费提供车管家取送车服务，超出范围的会额外收取部分费用，详询客服；3、有司机服务。</text>
               <text class="fqa-title">3.可以异地取还车吗？请问用车限制公里数吗？有区域限制吗？</text>
               <text class="fqa-txt">答：1、不可以异地取还车；2、不限公里数；3、用户进入包括但不限于高海拔、无人区、戈壁滩、沙漠、草原等自然条件、社会环境特殊的地区，如西藏、青海、新疆等应当确保所选车型的状况具备相关条件，并提前5日通知酷享出行，酷享出行有权最多增收3倍的违损保证金，最多按照使用价格的2倍增收基础服务费用。</text>
               <text class="fqa-title">4. 请问油费如何计算？</text>
               <text class="fqa-txt">答：油费执行满油取还原则，系统以16格为准，40元/小格，具体以车型油表换算为准。</text>
               <text class="fqa-title">5．租车押金怎么操作？</text>
               <text class="fqa-txt">答：会员免押金，非会员以页面显示车型押金为准。</text>
               <text class="fqa-title">6. 若提前还车，已经预付的金额可以退还吗？</text>
               <text class="fqa-txt">答：可以提前还车，但不支持退款。</text>
               <text class="fqa-title">7. 租车费是如何计算的？</text>
               <text class="fqa-txt">答：租期计算方式是以24小时为一天；4小时以内按0.5天计算，超过4小时不足24小时的，按1天计算。</text>
               <text class="fqa-title">8.租赁车提供哪些保险种类？</text>
               <text class="fqa-txt">答：基础保险涵盖交强险；不计免赔涵盖第三者责任险，车损险，座位险，玻璃险，划痕险，盗抢险等。</text>
               <text class="fqa-title">9.租车出了事故怎样处理？</text>
               <text class="fqa-txt" >答：用户在使用过程中，出现任何交通事故，均须在事故发生后的第一时间通知酷享出行客服中心400-820-4770，由客户向车辆投保保险公司进行报案，酷享出行工作人员协助理赔流程操作。 如须交警介入，须及时报警处理。</text>
               <text class="fqa-title">10.可以修改地址和时间吗？</text>
               <text class="fqa-txt" style="margin-bottom: 40rpx">答：可以，会员每单允许修改一次，但需提前至少3小时通知酷享客服，非会员无法修改地址和时间信息。</text>
           </cell>
       </list>
        <!-- <bmContainer :touchBarShow="true"></bmContainer> -->
    </div>
</template>
<script>
   
    export default {
    data() {
        return {

        }
    },
};
</script>
<style lang="scss" scoped>

.fqa-title{
    color: black;
    font-size: 30rpx;
    margin-top: 40rpx;
}
.fqa-txt{
    margin-top: 20rpx;
    color: #333333;
    font-size: 28rpx;
}
</style>
