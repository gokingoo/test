<template>
    <div class="stories-view" append="tree"  :style="{height:`${totalheight}rpx`}">
        <div class="list-mask" :style="{height:`${totalheight-80}rpx`}"  @click="unselectedaddress"></div>
        <text class="addbutton basebutton" @click="selectedaddress" >确定</text>
        <div class="select-item"  >
            <list class="listitem">
                <cell v-for="(item, index) in proviceList" :key="index" append="tree" @click="selectprovince(index)">
                    <text class="cityitem" :style="{color:(index == selectindex)?'#00BBE4':'gray'}"> {{item.name}} </text>
                </cell>
            </list>
            <list class="listitem">
                <cell v-for="(item ,index) in cityList" :key="index" append="tree" @click="selectcity(index)">
                    <text class="cityitem" :style="{color:(index == selectcityindex)?'#00BBE4':'gray'}"> {{item.name}} </text>
                </cell>
            </list>
            <list class="listitem">
                <cell v-for="(item, index) in disList" :key="index" append="tree" @click="selectdist(index)">
                    <text class="cityitem" :style="{color:(index == selectdisindex)?'#00BBE4':'gray'}"> {{item}} </text>
                </cell>
            </list>
        </div>

    </div>
</template>



<script>
    export default {
        props: {
            proviceList: {
                type: Array,
                required: true
            },
        },
        data() {
            return{
                selectindex:0,
                selectcityindex:0,
                selectdisindex:0,
                cityList:[],//当前市列表
                disList:[],  // 当前区列表
                selectedprovince:{},
                selectedcity:{},
                selecteddist:{},
            }
        },
        methods: {
            selectedaddress(){
                //  this.isselectaddress = false  //关闭选择框
                this.selectplace =  this.proviceList[this.selectindex].name+'  '+ this.cityList[this.selectcityindex].name +'  ' + this.disList[this.selectdisindex]
                this.$emit('haveselectedaddress',this.selectplace);
            },
            unselectedaddress(){
                this.$emit('haveselectedaddress','');
            },
            selectprovince(index){
                this.selectedprovince = this.proviceList[index].name;
                //显示 市和区
                this.cityList = this.proviceList[index].cityList;
                this.disList = this.cityList[0].areaList;
                this.selectindex = index;
            },
            selectcity(index){
                this.selectedcity = this.cityList[index].name;
                //显示区
                this.disList = this.cityList[index].areaList;
                this.selectcityindex = index
            },
            selectdist(index){
                this.selecteddist = this.disList[index];
                this.selectdisindex = index
            }
        },
        computed: {
            totalheight(){
                // const height = 750/weex.config.env.deviceWidth*weex.config.env.deviceHeight
                // //console.error('height:'+height)
                return height
            }
        },
        created(){
            this.cityList = this.proviceList[this.selectindex].cityList;
            this.disList = this.cityList[this.selectcityindex].areaList;
        }
    }
</script>


<style scoped>
    .stories-view {
    min-height: 250rpx;
    overflow-y: auto;
    }
    .list-mask{
            position: absolute;
            top: 0;
            left: 0;
            /* width: 750rpx; */
            z-index: 10;
            background-color: black;
            opacity: 1;
    }
        .select-item{
            flex-direction: row;
            flex-wrap: nowrap;
            position: absolute;
            background-color: white;
            align-items: center;
            justify-content: center;
            bottom: 80rpx;
            height: 600rpx;
            /* width: 750rpx; */
            z-index:101;
            opacity: 1;
    }
        .listitem{
            max-height: 500rpx;
            margin-top: 20rpx;
            margin-bottom: 20rpx;
            width: 250rpx;
            max-height: 500rpx;
            flex-grow:1;
    }
        .cityitem{
            color: gray;
            text-align: center;
            padding-top: 10rpx;
            padding-bottom: 10rpx;
            font-size: 32rpx;
    }
        .addbutton{
            bottom: 0rpx;
            /* width:750rpx; */
            padding-top: 18rpx;
            text-align: center;
    }
        .basebutton{
            color:white;
            background-color: #00BBE4;
            position: absolute;
            font-size:32rpx;
            height:80rpx;
    }

</style>
