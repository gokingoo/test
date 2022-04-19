<template>
	<div>
		<list class="list" ref="list" :showRefresh="true" @refresh="onrefresh">
			<cell v-if="recordList.length" v-for="(i, index) in recordList" :key="index" class="cell">
				<record-item :record-data="i"></record-item>
			</cell>
			<cell v-if="!recordList.length">
				<nothing padding-top="220" :title="nothingStr"></nothing>
			</cell>
		</list>
	</div>
</template>
<script>
	
	import RecordItem from "../../components/recordItem.vue";
	import nothing from '../../components/nothing.vue'
	import {
		get
	} from '../../utils/netUtil.js';

	export default {
		data() {
			return {
				nothingStr: '当前暂无开票记录',
				recordList: [],

			}
		},
		components: {
			
			RecordItem,
			nothing

		},
		computed: {

		},
		methods: {
			onrefresh() {
				this.$refs["list"].refreshEnd();
				this.getInvoiceRecord();
			},
			getInvoiceRecord() {
				var userId = uni.getStorageSync('user_id');
				var token = uni.getStorageSync('user_token');
				if (!userId || !token) {
					return;
				}

				var dict = {
					user_id: userId,
					user_token: token,
					invoice_type: 0
				}
				get('/user/invoice', dict).then(res => {
					// res = [{
					//     id: 1,
					//     state: 0,
					//     create_time: '2019.02.22 12:54',
					//     expect_date: '03.18',
					//     amount: 1000
					// }, {
					//     id: 2,
					//     state: 1,
					//     create_time: '2019.02.22 12:54',
					//     check_time: '2019.02.25 12:54',
					//     no: '805473836384',
					//     amount: 3000,
					// },
					//     {
					//         id: 3,
					//         state: -1,
					//         create_time: '2019.02.22 12:54',
					//         check_time: '2019.02.25 12:54',
					//         amount: 10000,
					//     }];
					this.recordList = res;
				})
			}
		},
		created() {
			this.getInvoiceRecord();
		}
	};
</script>
<style lang="scss" scoped>
	@import 'base.scss';
</style>
