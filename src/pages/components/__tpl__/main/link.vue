<template>
	<div>
		<button @click="handleRequestTest">Request</button>
	</div>
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
		console.log(this)
	},
	methods: {
		handleRequestTest() {
			this.request({ api: 'TPL_MAIN_GET' }).then(res => {
				console.log(res)
			})
		},
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
