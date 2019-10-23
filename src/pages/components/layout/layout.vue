<template>
	<div class="c-layout">
		<top />
		<left />
		<div
			:style="{
				paddingTop: `${ Config.topHeight }px`,
				paddingLeft: `${ Config.cellLeftWidth_1 + (Config.isExpand ? Config.cellLeftWidth_2 : 0) }px`
			}"
		>
			<router-view
				:style="{
					marginTop: Config.content.marginTop + 'px',
					marginLeft: Config.content.marginLeft + 'px',
					marginRight: Config.content.marginRight + 'px'
				}"
				class="content" />
		</div>
	</div>
</template>

<script>
import Config from './config'
import Left from './left'
import Top from './top'

export default {
	name: 't-layout',
	components: {
		Left,
		Top
	},
	data() {
		return {
			Config
		}
	},
	computed: {},
	methods: {}
}
</script>

<style lang="scss">
	.c-layout {
		position: relative;
		overflow: hidden;

		.content {
			min-width: 750px;
		}
	}
</style>
