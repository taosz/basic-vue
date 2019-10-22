const { resolve } = require('path')
const fs = require('fs-extra')

const hasOther = (module) => {
	let fullpath = resolve(__dirname, `../../src/pages/containers/${module}/app.js`)

	return (fs.existsSync(fullpath) ? fs.readFileSync(fullpath, 'utf-8') : '').includes('OtherConfig')
}

const h2c = (value) => {
	return value
		.split('-')
		.map((item, index) => {
			return index > 0
				? `${item[0].toUpperCase()}${item.slice(1)}`
				: item
		})
		.join('')
}

const routes = (opts = {}) => {
	let _modules = opts.modules.map(item => h2c(item))

	return `
		import { PRE_ROUTER_URL } from '../constants/constants'
		import Login from '../containers/login/app'
		import { loadCentralizationVariable } from '../utils/utils'
		
		// ../containers文件夹下不允许出现 app.js 以外的js文件
		const CONTAINER_ROOT = loadCentralizationVariable(require.context('../containers', true, /\\.js$/))
		
		let _dynamic = []
		let _modules = ${JSON.stringify(_modules)}
		
		_modules.forEach(i => {
			_dynamic[i] = CONTAINER_ROOT[i + '/app']
		})
		
		export const dynamicRoutes = _dynamic
		
		export const basicRoutes = {
			base: PRE_ROUTER_URL,
			mode: 'hash',
			// history mode 需要服务端配合
			// mode: 'history',
			routes: [
				...Login,
				{
					path: '/',
					redirect: (to) => {
						return '/home'
					}
				},
				{
					path: '*',
					redirect: (to) => {
						return '/login'
					}
				}
			]
		}
	`
}

module.exports = {
	routes
}
