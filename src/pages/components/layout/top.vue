<template>
	<div
		:style="{
			height: `${ Config.topHeight }px`
		}"
		class="v-layout-top"
	>
		<div>logo</div>

		<div>
			<extra />
		</div>
	</div>
</template>

<script>
import Extra from './extra'
import Config from './config'

export default {
	name: 'v-layout-top',
	components: {
		Extra
	},
	props: {},
	data() {
		return {
			Config
		}
	},
	computed: {},
	watch: {},
	created() {
	},
	mounted() {
	},
	methods: {}
}
</script>

<style lang="scss">
	.v-layout-top {
		position: fixed;
		top: 0;
		left: 0;
		z-index: 999;
		background-color: $white;
		padding: 0 15px;
		border-bottom: 1px solid $cd9;
		width: 100%;

		._name {
			font-size: 14px;
			color: $c000;
			height: 56px;
			line-height: 56px;
			padding-left: 21px;
		}

		._menu-item {
			height: 56px;
			line-height: 56px;
			font-size: 14px;
			margin-right: 48px;
			cursor: pointer;
		}

		._menu-item-unactive {
			color: $c000;
			opacity: 0.8;

			&:hover {
				opacity: 1;
				will-change: opacity;
				transition: opacity 0.2s ease-in-out;
			}
		}

		._menu-item-active {
			color: $main;
			border-bottom: 2px solid $main;
			box-sizing: border-box
		}
	}
</style>
