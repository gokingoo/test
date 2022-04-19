<template>
	<div>
		<list class="list">
			<cell v-if="violateList.length" v-for="(i, index) in violateList" :key="index" class="cell">
				<violate-item :violate-data="i"></violate-item>
			</cell>
			<cell class="cell" v-if="!violateList.length">
				<nothing padding-top="220" :title="nothingStr"></nothing>
			</cell>
		</list>

	</div>
</template>
<script>
	import ViolateItem from '../../components/violateItem.vue'
	import nothing from '../../components/nothing.vue'

	export default {
		data() {
			return {
				nothingStr: '当前暂无订违章',
				violateList: [],

			}
		},
		components: {
			ViolateItem,
			nothing,
		},
		computed: {

		},
		methods: {
			// getData() {
			// 	this.$router.getParams().then(resData => {
			// 		if (resData.vio_list)
			// 			this.violateList = resData.vio_list;

			// 	});
			// }
		},
		created() {
			// this.getData();
		},
		onLoad(data) {
			const self = this
			if(data.vio_list){
				self.violateList = data.vio_list;		
			}
		}
		

	};
</script>
<style lang="scss" scoped>
</style>
