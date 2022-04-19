<template>
	<div style="padding-top:20px">
		<uni-grid :column="2" :showBorder="false">
			<uni-grid-item v-for="(i, index) in carList" :key='index' style="align-items: center;">
				<car-item :carData="i" @toSchedule="toSchedule(i)"></car-item>
			</uni-grid-item>
		</uni-grid>
		<!-- <scroller ref="list" :showRefresh="true" @refresh="onrefresh" v-if="carList.length">
			<waterfall class="waterfall" :column-count="2" :column-gap="20" ref="list1" :showRefresh="true"
				@refresh="onrefresh">
				<cell v-for="(i, index) in carList" :key="index">
					<car-item :carData="i" @toSchedule="toSchedule(i)"></car-item>
				</cell>
			</waterfall>
		</scroller> -->
		<nothing padding-top="220" :title="nothingStr" v-if="!carList.length" :btnType1=true
			@LeftBtnClicked='refreshClick'></nothing>
	</div>
</template>

<script>
	import CarItem from '../../components/carItem.vue'
	import {
		get
	} from '../../utils/netUtil.js'
	import util from '../../utils/util.js'
	import nothing from '../../components/nothing.vue'
	export default {
		data() {
			return {
				nothingStr: '重新加载界面',
				carType: 4,
				carList: [],
				comeType: 1,
				orderId: 0
			}
		},
		components: {
			CarItem,
			nothing
		},
		methods: {

			getCarList() {
				var dict = {
					car_type: this.carType,
					service_type: 0,
					city_id: '321',
					rights_state: 1
				}
				
				get('/car', dict).then(res => {
					this.carList = res;
				})
			},
			toSchedule(carData) {
				if (util.isLogin()) {
					var data = {
						come_type: this.comeType,
						order_id: this.orderId,
						car_data: carData
					};
					var data = encodeURIComponent(JSON.stringify(data))
					uni.navigateTo({
						url: "./schedulecar?data=" + data
					})
				}
			},
			onrefresh() {
				this.$refs["list"].refreshEnd();
				this.$refs["list1"].refreshEnd();
				this.getCarList();
			},
			refreshClick() {
				this.getCarList();
			},
		},
		created() {
			
		},
		onLoad(data) {
			this.orderId = data.orderID
			this.getCarList();
		}

	}
</script>

<style scoped>
	.waterfall {
		padding: 0 15px
	}
</style>
