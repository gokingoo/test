<template>
	<div>
		<div class="waterfall" :column-count="2" :column-gap="20" ref="list" :showRefresh="true" @refresh="onrefresh">
			<uni-grid :column="2" :showBorder="false">
				<uni-grid-item v-for="(i, index)  in carList" :key="index">
					<car-item :carData="i" @toSchedule="toSchedule(i)"></car-item>

				</uni-grid-item>
			</uni-grid>
		</div>
	</div>
</template>
<script>
	import {
		get
	} from '../../utils/netUtil.js'
	import CarItem from '../../components/carItem.vue'

	export default {
		data() {
			return {
				carList: [],
				carType: 1,
			}
		},
		components: {
			CarItem,
		},
		methods: {
			onrefresh() {
				this.$refs["list"].refreshEnd();
				this.getCarList();
			},
			toSchedule(carData) {
				var carData = encodeURIComponent(JSON.stringify(carData));
				if (this.carType == 1) {
					uni.navigateTo({
						url: './needDriver?params=' + carData
					})
				} else {
					uni.navigateTo({
						url: './transfer?params=' + carData
					})
				}
			},
			getCarList() {
				//  var cityId = '0';
				// if(this.$storage.getSync('city_id'))
				//     cityId = this.$storage.getSync('city_id');
				var dict = {
					car_type: 0,
					service_type: this.carType,
					city_id: '321'
				}
				get('/car', dict).then(res => {
					this.carList = res;
					
				})
			},
			// getData() {

			//     this.$router.getParams().then(resData => {
			//         this.carType = resData.car_type;
			//         this.getCarList();
			//     });
			// },
		},
		onLoad(data) {
			this.carType = data.car_type;
			this.getCarList();
		},
	};
</script>
<style lang="scss" scoped>
	.choose-item {
		flex: 1;
		align-items: center;
		padding: 20rpx
	}

	.waterfall {
		padding: 1rpx
	}
</style>
