<template>
	<div>
		<el-button
			type="primary"
			class="g-m-b-16"
			@click="handleExport"
		>
			导出
		</el-button>

		<div>
			<span>退款信息：</span>
			<el-input
				v-model="keywords.search"
				placeholder="请输入关键字搜索"
				style="width: 240px"
				clearable
				@enter="handleSearch"
				@change="handleInputChange"
			/>
			<el-button
				type="primary"
				class="g-m-l-24"
				@click="handleSearch"
			>
				搜索
			</el-button>
			<span
				class="g-m-l-12 g-c-black-dark g-fs-12 g-pointer g-no-select"
				@click="handleToggle"
			>
				{{ show ? '收起' : '展开' }}
				<el-icon :type="show ? 'triangle-up' : 'triangle-down'" class="g-fs-12" />
			</span>
		</div>
		<!--		<el-expand-->
		<!--			ref="expand"-->
		<!--			v-model="show"-->
		<!--		>-->
		<div class="g-pd-t-16">
			<div
				class="g-search-form g-lh-50 g-bg-f4"
				style="padding-top: 5px; padding-bottom: 5px"
			>
				<div class="g-flex g-fw-w" style="min-width: 796px">
					<div>
						<span class="g-c-333 g-w-100">退款方式：</span>
						<el-input
							v-model="formValidate.name"
							style="width: 160px"
							placeholder="请输入公司名称"
							@enter="handleSearch"
							@change="handleInputChange"
						/>
					</div>
					<div>
						<span class="g-c-333 g-w-100">退款传方式：</span>
						<el-input
							v-model="formValidate.name"
							style="width: 220px"
							placeholder="请输入公司名称"
							@enter="handleSearch"
							@change="handleInputChange"
						/>
					</div>
				</div>
			</div>
		</div>
		<!--		</el-expand>-->
	</div>
</template>

<script>
import { URL } from '@utils/utils'
import { debounce } from 'lodash'

export default {
	name: 'tpl-filter2',
	components: {},
	data() {
		const { query = {} } = this.$route
		return {
			keywords: {
				search: String(query.search || ''),
				name: String(query.name || '')
			},
			show: false,
			formValidate: {},
			ruleValidate: {}
		}
	},
	methods: {
		handleSearch: debounce(function (value) {
			let query = {
				...this.$route.query,
				...this.keywords
			}
			this.$router.replace(URL.merge({
				path: `/tpl/paging/tabs`,
				query
			}))
			this.$store.commit('TPL_PAGING_TABS_LIST_INIT')
		}, 300),
		handleToggle() {
			this.$refs.expand.toggle()
		},
		handleChange(obj) {
			let type = Object.keys(obj)[0]
			let value = obj[type]
			this.keywords[type] = value
			this.handleSearch()
		},
		handleInputChange(e) {
			if (!e.target.value) {
				this.handleSearch()
			}
		},
		handleExport() {
		}
	}
}

</script>

<style lang="scss">

</style>

