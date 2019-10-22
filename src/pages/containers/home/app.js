export default [
	{
		path: '/home',
		redirect: '/home/main'
	},
	{
		path: '/home/main',
		name: 'home-main',
		component: () => import('./modules/home-main.vue')
	}
]
