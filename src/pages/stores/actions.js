/**
 * 根级别actions
 */
import { RegEx } from '@utils/utils'
import net from '../utils/net'
import { DEV_WITH_SERVER } from '../constants/constants'
import { loadCentralizationVariable } from '../utils/utils'

const API_ROOT = loadCentralizationVariable(require.context('./apis', true, /\.js$/))

// Mock
let Mock = require('mockjs')
import mockTpls from './mock'

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

const actions = {
	async request(store, opts = {}) {
		const {
			api,
			mutation,
			redirect, // 重定向Mutation
			param = {},
			query = {},
			pending,
			fail,
			refresh,
			method,
			loading = true
		} = opts

		const isMock = _global.mock
		const url = _API_ROOT[api]

		;(() => {
			let msg = ''
			if (!url && !isMock) {
				msg = 'action'
			} else if (!mockTpls[api] && !isMock) {
				msg = 'Mock Template'
			}

			if (msg) {
				console.error(`'[rootActions/request]: ——${api}—— 所对应的${msg}不存在`)
				return false
			}
		})()

		// pending 为 false，则必须要写_PENDING的mutation
		// pending && store.commit(redirect || `${mutation}_PENDING`, { param })

		_global.mock && Mock.mock(url, method, mockTpls[api])
		console.log(url)
		return net({
			url,
			param,
			query
		}).then((res) => {
			// const { data } = res
			// store.commit(redirect || `${mutation}_${refresh ? 'REFRESH' : 'SUCCESS'}`, {
			// 	data,
			// 	param
			// 	// ...rest
			// })
			return res
		}).catch(error => {
			fail && store.commit(redirect || `${mutation}_FAIL`, { param })
			throw error(error)
		})
	}
}

export default actions
