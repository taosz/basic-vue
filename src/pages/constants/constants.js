/**
 * 开发模式结合后端
 * true开启，false关闭
 * 即!0后端。!1前端:3000端口
 */
export const DEV_WITH_SERVER = !1

/**
 * 根路由
 * 根据入口文件在服务器下的相对路径配置
 */
export const PRE_ROUTER_URL = process.env.NODE_ENV === 'development'
	? '/'
	: '/'

export const URL_WEBSOCKET = '/wss'
/**
 * 用于判断登录token / user
 */
export const TOKEN_KEY = 'user'
