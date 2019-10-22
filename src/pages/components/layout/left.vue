<template>
	<div class="c-layout-left-menu g-flex">
		<div :style="{ width: `${Config.cellLeftWidth_1}px` }" class="_one-level">
			<div :style="{ height: `${ Config.topHeight }px` }">
				<slot name="logo" />
			</div>
			<template v-for="(chunk, index) in chunks">
				<router-link
					v-if="chunk.show"
					:key="index"
					:to="chunk.route"
					:class="currentChunk.value === chunk.value ? '__chunk-item-active' : '__chunk-item-unactive'"
					class="__chunk-item"
				>
					<i class="iconfont icon-add g-m-r-10" />
					{{ chunk.name }}
				</router-link>
			</template>
		</div>
		<div v-if="childMenus.length" :style="{ width: `${cellLeftWidth_2}px` }" class="_two-level">
			<div class="__name">
				{{ currentChunk.name }}
			</div>
			<div style="padding: 12px">
				<template v-for="(menu, index) in childMenus">
					<div
						v-if="menu.show"
						:key="index"
						:class="currentChildRoute === menu.route ? '__menu-item-active' : '__menu-item-unactive'"
						class="__menu-item"
						@click="handleLinkTo(menu.route)"
					>
						{{ menu.name }}
					</div>
				</template>
			</div>
		</div>
	</div>
</template>

<script>
import { loadCentralizationVariable } from '@utils/utils'
import { getChunks } from './menu/chunks'
import Config from './config'

let getChildMenus = loadCentralizationVariable(require.context('./menu/left/', false, /\.js$/))
let getTopMenus = loadCentralizationVariable(require.context('./menu/top/', false, /\.js$/))

export default {
	name: 't-layout-left',
	components: {},
	props: {},
	data() {
		return {
			Config
		}
	},
	computed: {
		chunks() {
			let array = getChunks()
			return array.filter(it => it.show)
		},
		/**
		 * 每个路由都一个name，格式：tpl-xxx-xxx，
		 * 不取route.path是因为正式环境下前面会加一级路由，不好判断
		 */
		currentChunk() {
			let routeName = this.$route.path.split('/')
			return this.chunks.filter(chunk => chunk.value.replace(/_/g, '') === routeName[1])[0] || {}
		},
		/**
		 * 获取二级导航菜单
		 */
		childMenus() {
			let children = getChildMenus[this.currentChunk.value] || []
			return children.filter((child) => child.show)
		},
		/**
		 * 获取当前二级导航路由，避免出现相近的路由情况而导致判断不正确
		 */
		currentChildRoute() {
			let path = this.$route.path.split('/')
			return path.splice(0, 3).join('/')
		}
	},
	watch: {
		childMenus(newVal, oldVal) {
			if (newVal.length !== oldVal.length) {
				this.emitLeftMenuWidth()
			}
		}
	},
	mounted() {
		this.emitLeftMenuWidth()
	},
	methods: {
		emitLeftMenuWidth() {
			this.Config.isExpand = !!this.childMenus.length
		},
		getIndexRoute(route) {
			// 如果top内有对应的menu.route，则获取第一个有权限的路由，进行跳转
			let routes = getTopMenus[route] || []
			if (typeof routes === 'string') {
				return route
			}
			let authRoutes = routes.filter((it) => it.show)
			return authRoutes.length ? authRoutes[0].route : route
		},
		handleLinkTo(route) {
			this.$router.push(this.getIndexRoute(route))
		}
	}
}
</script>

<style lang="scss">
	.c-layout-left-menu {
		position: fixed;
		top: 0;
		left: 0;
		z-index: 4;
		height: 100vh;
		user-select: none;

		._one-level {
			height: 100%;
			background-color: $c444;

			.__chunk-item {
				height: 42px;
				line-height: 42px;
				display: block;
				padding-left: 23px;
				font-size: 15px;
				cursor: pointer;
			}

			.__chunk-item-unactive {
				color: $cbd;

				&:hover {
					background-color: $c67;
					transition: background-color 0.2s linear;
				}
			}

			.__chunk-item-active {
				background-color: $cf8;
				color: $c000;
			}
		}

		._two-level {
			background-color: $white;

			.__name {
				height: 56px;
				line-height: 56px;
				font-size: 14px;
				color: $c000;
				border-bottom: 1px solid $cd9;
				border-right: 1px solid $cd9;
				text-align: center
			}

			.__menu-item {
				height: 32px;
				line-height: 32px;
				font-size: 14px;
				cursor: pointer;
				margin-bottom: 5px;
				text-align: center;

			}

			.__menu-item-unactive {
				color: #676767;

				&:hover {
					color: $main;
					transition: color 0.2s linear;
				}
			}

			.__menu-item-active {
				color: $c000;
				background: $cef;
				border-radius: 4px;
			}
		}
	}
</style>
