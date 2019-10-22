export default [
	{
		path: '/tpl/main',
		name: 'tpl-main',
		components: [
			() => import('./modules/tpl-main.vue')
		]
	},
	{
		path: '/tpl/basic',
		name: 'tpl-basic',
		components: [
			() => import('./modules/tpl-basic.vue'),
			'left',
			'top'
		]
	},
	// 表单
	{
		path: '/tpl/form',
		name: 'tpl-form',
		components: [
			() => import('./modules/tpl-form.vue'),
			'left',
			'top'
		]
	},
	{
		path: '/tpl/paging/basic',
		name: 'tpl-paging-basic',
		components: [
			() => import('./modules/tpl-paging-basic.vue'),
			'left',
			'top'
		]
	},
	{
		path: '/tpl/paging/piece',
		name: 'tpl-paging-piece',
		components: [
			() => import('./modules/tpl-paging-piece.vue'),
			'left',
			'top'
		]
	},
	{
		path: '/tpl/nolayout',
		name: 'tpl-nolayout',
		components: [
			import('./modules/tpl-nolayout.vue')
		]
	}
]
