<template>
	<el-tabs
		:value="type"
		:animated="false"
		type="card"
		class="g-m-t-24"
		@click="handleChange"
	>
		<el-tab-pane
			v-for="(item) in tabs"
			:key="item.value"
			:label="item.label"
			:name="item.value"
		>
			<!--			<el-paging-->
			<!--				:show="item.value == type" -->
			<!--				:type="item.value"-->
			<!--				:data-source="listInfo[item.value].data"-->
			<!--				:total="listInfo[item.value].total"-->
			<!--				:count="listInfo[item.value].count"-->
			<!--				:reset="listInfo[item.value].reset"-->
			<!--				:current.sync="current[item.value]"-->
			<!--				:history="true"-->
			<!--				:load-data="loadData"-->
			<!--				@page-size-change="handleResetFirst"-->
			<!--			>-->
			<!--				<tpl-item />-->
			<!--			</el-paging>-->
		</el-tab-pane>
	</el-tabs>
</template>

<script>
import { URL } from '@utils/utils'
import Item from './item'

export default {
	name: 'tpl-paging-tabs-list',
	components: {
		'tpl-item': Item
	},
	data() {
		const { query } = this.$route

		return {
			type: String(query.type || '1'), // 同tabs下的value
			tabs: [
				{ label: '标签一', value: '1' },
				{ label: '标签二', value: '2' },
				{ label: '标签三', value: '3' }
			],
			current: {}
		}
	},
	computed: {
		listInfo() {
			return this.$store.state.tplPagingTabs.listInfo
		}
	},
	methods: {
		loadData(page, pageSize) {
			const { query = {} } = URL.parse()
			return this.request({
				url: 'TPL_PAGING_TABS_LIST_GET',
				type: 'GET',
				param: {
					...query,
					page: page || 1,
					pageSize: pageSize || 10,
					type: this.type
				}
			}).then((res) => {
				console.log(res, 'res')
			}).catch((error) => {
				console.log(error, 'error')
			})
		},
		handleChange(type) {
			this.type = type

			let { query = {} } = URL.parse()
			query = {
				...query,
				type,
				page: this.current[type]
			}
			this.$router.replace(URL.merge({ path: `/tpl/paging/tabs`, query }))
		},
		handleChangePageSize() {
			this.$store.commit('TPL_PAGING_TABS_LIST_INIT')
		},
		handleResetFirst() {
			this.$store.commit('TPL_PAGING_TABS_LIST_INIT')
		},
		handleResetCur() {
			this.$store.commit('TPL_PAGING_TABS_LIST_RESET')
		}
	}
}
</script>

<style lang="scss">

</style>
