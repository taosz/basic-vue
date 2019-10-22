import { PRE_ROUTER_URL } from '../constants/constants'

import { loadCentralizationVariable } from '../utils/utils'

// ../containers文件夹下不允许出现 app.js 以外的js文件
const CONTAINER_ROOT = loadCentralizationVariable(require.context('../containers', true, /\.js$/))

console.log(CONTAINER_ROOT)

export const dynamicRoutes = {
}
export const basicRoutes = {
	base: PRE_ROUTER_URL,
	mode: 'hash',
	// history mode 需要服务端配合
	// mode: 'history',
	routes: [
		...CONTAINER_ROOT,
		{
			path: '*',
			redirect: (to) => {
				return '/login'
			}
		}
	]
}
