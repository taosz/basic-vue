<template>
	<ul>
		<paging
			:load-data="loadData"
		/>
	</ul>

</template>

<script>
import Paging from '@components/_common/tpl/paging'

export default {
	name: 'tpl-links',
	components: { Paging },
	data() {
		return {}
	},
	created() {
	},
	methods: {
		loadData() {
			return new Promise((resolve, reject) => {
				resolve({})
			})
		}
	}
}
</script>

<style lang="scss">
</style>
