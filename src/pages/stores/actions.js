/**
 * 根级别actions
 */
import { RegEx } from '@utils/utils'
import net from '../utils/net'
import { DEV_WITH_SERVER } from '../constants/constants'
import { loadCentralizationVariable } from '../utils/utils'

const API_ROOT = loadCentralizationVariable(require.context('./apis', true, /\.js$/))

let baseUrl
/* global __DEV__ */
if (__DEV__) {
	// 开发环境
	if (!DEV_WITH_SERVER) { // 开发环境-前端自模拟
		baseUrl = 'http://localhost:3000'
	} else { // 开发环境-后端数据
		baseUrl = 'https://xxx.com'
	}
} else {
	// 生产环境
	baseUrl = `${location.origin}`
}
let _API_ROOT = {}
for (let i in API_ROOT) {
	let item = API_ROOT[i]
	Object.keys(API_ROOT[i])
		.forEach(index => {
			_API_ROOT[index] = API_ROOT[i][index]
		})
	if (!RegEx.URLScheme.test(item)) {
		item = baseUrl + item
	}
}
export const actions = {
	request(store, opts = {}) {
		const {
			url: mutation,
			redirect, // 重定向Mutation
			param = {},
			pending,
			fail,
			refresh,
			loading = true,
			...rest
		} = opts
		console.log(_API_ROOT)

		if (!_API_ROOT[mutation]) {
			console.error(`'[rootActions/request]: ——${mutation}—— 所对应的action不存在`)
			return !1
		}

		// pending 为 false，则必须要写_PENDING的mutation
		pending && store.commit(redirect || `${mutation}_PENDING`, { param })
		return net.ajax({
			url: _API_ROOT[mutation],
			param,
			loading: param.page === undefined ? loading : false,
			...rest
		})
			.then((res) => {
				const { data } = res
				store.commit(redirect || `${mutation}_${refresh ? 'REFRESH' : 'SUCCESS'}`, {
					data,
					param
					// ...rest
				})
				return res
			})
			.catch((error) => {
				fail && store.commit(redirect || `${mutation}_FAIL`, { param })
				return Promise.reject(error)
			})
	}
}
