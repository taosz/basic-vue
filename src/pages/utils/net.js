import axios from 'axios'
import { Message, MessageBox } from 'element-ui'
// import store from '@/store'
// import { getToken } from '@/utils/auth'

const baseConf = {
	baseURL: process.env.BASE_API, // api 的 base_url
	timeout: 10 * 1000, // request timeout
	method: 'post'
}

const sqOnFulfilled = config => {
	// if (store.getters.token) {
	// 	// 让每个请求携带token-- ['X-Token']为自定义key 请根据实际情况自行修改
	// 	config.headers['token'] = getToken()
	// }
	// if (!(config.data instanceof FormData)) {
	// 	config.headers['Content-Type'] = 'application/json; charset=UTF-8'
	// }

	return config
}

const sqOnRejected = error => {
	// Do something with request error
	console.log(error) // for debug
	Promise.reject(error)
}

const spOnFulfilled = response => {
	console.log(response)
	const res = response.data
	if (res.code !== '00' && res.code !== 200 && res.code !== 0) {
		Message({
			message: res.message || res.msg,
			type: 'error',
			duration: 3 * 1000
		})
		// 50008:非法的token; 50012  50014:Token 过期了;
		if (res.code === '4048' || res.code === '4050' || res.code === '4047') {
			// 请自行在引入 MessageBox
			MessageBox.alert('你已被登出，请重新登录', '警告', {
				type: 'warning'
			}).then(() => {
				// store.dispatch('FedLogOut').then(() => {
				// 	location.reload() // 为了重新实例化vue-router对象 避免bug
				// })
			})
		}
		return Promise.reject(res.msg + '[response code error !]')
	} else {
		return (res.data || res)
	}
}

const spOnRejected = error => {
	Message({
		message: error.message,
		type: 'error',
		duration: 5 * 1000
	})
	return Promise.reject(error)
}

const service = axios.create(baseConf)

service.interceptors.request.use(
	sqOnFulfilled,
	sqOnRejected
)

service.interceptors.response.use(
	spOnFulfilled,
	spOnRejected
)
export default service
export const $request = {
	install(Vue) {
		Vue.prototype.$request = service
	}
}
