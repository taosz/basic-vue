/**
 * 响应头外层
 * @param data
 * @returns {{msg: string, code: number, data: *}}
 * @constructor
 */
const RequestPack = data => ({
	code: 0,
	msg: 'ok',
	data
})

export default {
	'TPL_MAIN_GET': RequestPack({ TPL_MAIN_GET: 'TPL_MAIN_GET' })
}
