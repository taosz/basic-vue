import '@babel/polyfill'

/**
 * Vue
 */
import Vue from 'vue'
import Router from 'vue-router'
import Vuex from 'vuex'
import { sync } from 'vuex-router-sync'

/**
 * 全局变量 _global, 不要动
 */
import _global from './_global' // eslint-disable-line

/**
 * 全局加载elementUI
 */
import ElementUI from 'element-ui'
// import 'element-ui/lib/theme-chalk/index.css';

/**
 * 配置
 */
import SetTitle from '@common/set-title/set-title'
import Loading from '@common/loading/loading'
import emitter from '@extends/mixins/emitter'
import request from '@extends/plugins/request'
import App from '../App'

import { beforeEach, afterEach, clearLocalStorage } from './hooks'

/**
 * Vuex Config
 */
import { storeConfig } from '../stores/root'

import RoutesManager from './routes.dynamic'

/**
 * vue-router Config
 * 根据环境选择不同路由配置项
 */
let dynamicRoutes
if (process.env.NODE_ENV !== 'production') {
	dynamicRoutes = require('./routes.dev').dynamicRoutes
} else {
	dynamicRoutes = require('./routes.dist').dynamicRoutes
}
let basicRoutes
if (process.env.NODE_ENV !== 'production') {
	basicRoutes = require('./routes.dev').basicRoutes
} else {
	basicRoutes = require('./routes.dist').basicRoutes
}

console.log([basicRoutes, dynamicRoutes])
let routesManager = new RoutesManager(basicRoutes, dynamicRoutes)

Vue.config.productionTip = false

/**
 * 挂载element
 */
Vue.use(ElementUI, { size: 'small' })

// - 全局组件
Vue.component(SetTitle.name, SetTitle)
Vue.component(Loading.name, Loading)

// - 全局mixins
Vue.mixin(emitter)

// - 全局plugins
Vue.use(request)

// - 全局global对象
Vue.use(_global)

// - 路由
Vue.use(Router)

const router = new Router({
	...routesManager.config,
})

routesManager.setRouter(router)

router.beforeEach(beforeEach)
router.afterEach(afterEach)
router.onError((error) => {
	if (error.message.match(/Loading chunk (\d)+ failed/g)) {
		location.reload()
	}
})

// - Vuex
Vue.use(Vuex)
const store = new Vuex.Store(storeConfig)

// - 同步
sync(store, router)

// - 实例
const app = new Vue({
	el: '#pages',
	router,
	store,
	// todo 目前使用引用vue问文件的方式 可以选用jsx插入
	render: h => h(App)
})

router.onReady(() => {
	app.$mount()
})

window.app = app
window.routesManager = routesManager

