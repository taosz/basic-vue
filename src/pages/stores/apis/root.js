import { RegEx } from '@utils/utils';
import { DEV_WITH_SERVER } from '../../constants/constants';
import __tpl__ from './__tpl__';
import _common from './_common';
import login from './login';
import home from './home';
import demo from './demo';

const API = {
	...__tpl__,
	..._common,
	...login,
	...home,
	...demo
};

let baseUrl;

/* global __DEV__ */
if (__DEV__) {
	// 开发环境
	if (!DEV_WITH_SERVER) { // 开发环境-前端自模拟
		baseUrl = 'http://localhost:3000';
	} else { // 开发环境-后端数据
		baseUrl = 'https://gateway.wyawds.com';
	}
} else {
	// 生产环境
	baseUrl = `${location.origin}`;
}
for (let i in API) {
	if (RegEx.URLScheme.test(API[i])) {
		API[i] = API[i];
	} else {
		API[i] = baseUrl + API[i];
	}
}
export default API;
