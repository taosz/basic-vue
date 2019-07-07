import __tpl__ from './__tpl__/root';
import login from './login/root';
import layout from './layout/root';
import demo from './demo/root';

export default {
	...__tpl__,
	...layout,
	...login,
	...demo
};
