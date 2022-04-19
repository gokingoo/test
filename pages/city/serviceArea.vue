<template>
	<div class="container">
		<!-- <weex-amap class="map" id="map2019" scale="true" geolocation="true" :center="pos" :zoom="zoom" >
            <weex-amap-marker :position="position" :title="title" :icon="icon"></weex-amap-marker>
            <template v-for="(i, index) in pathList">
                <weex-amap-polygon :path="i" fillColor="#97c9ed" strokeColor="#178cdd" fillOpacity="0,5" strokeWidth="1"  ></weex-amap-polygon>
            </template>

        </weex-amap> -->
	</div>
</template>
<script>
	import util from '../../utils/util.js'
	export default {
		data() {
			return {
				pos: [],
				position: [],
				title: '选择的地址',
				icon: 'bmlocal://assets/addr_img@2x.png',
				zoom: 10,
				pathList: []
			}
		},
		components: {
		},
		methods: {
			// setUserLocation() {
			//     const self = this;
			//     amap.getUserLocation("map2019", function (data) {
			//         if (data.result === 'success') {
			//             self.pos[0] = data.data.position[2];
			//             self.pos[1] = data.data.position[3];
			//
			//         }else {
			//             self.$notice.toast({message: '定位失败'});
			//         }
			//     });
			// },
			toDetail() {
				this.$router.open({
					name: 'income_detail',
					type: 'PUSH'
				})
			},
			toMyTender() {
				this.$router.open({
					name: 'my_tender',
					type: 'PUSH'
				})
			},
			getData() {
				if (this.$storage.getSync('server_area')) {
					this.pathList = this.$storage.getSync('server_area');
				}
				this.$router.getParams().then(resData => {
					if (resData.pos) {
						this.position = resData.pos;
					}


				});
			}
		},
		created() {

			// this.setUserLocation();
		},
		eros: {
			beforeAppear(params, options) {
				this.getData();
			},
		}
	};
</script>
<style lang="scss" scoped>
	.container {
		position: relative;
		flex: 1;
		background-color: #fff;
	}

	.map {
		flex: 1;
		position: relative;
		background-color: #fff;
		min-height: 800;
		border-bottom-width: 10;
		border-bottom-color: #fff;
	}
</style>
