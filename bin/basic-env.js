#!/usr/bin/env node
process.env.NODE_PATH = __dirname + '/../node_modules/';

const chalk = require('chalk');
const program = require('commander');
const { resolve } = require('path');

const res = command => resolve(__dirname, '../commands/', command);
const log = console.log;

program
	.version(require('../package').version);

// 使用指令参数 如 basic-env.js server;
program
	.usage('<cmd>');

// 设计模版 终端执行: basic-env.js _ cc -t test
program
	.command('__tpl__ <cmd>')
	.alias('_')
	.description('Just a new template')
	.option('-t, --test_mode <mode>', 'add pepper')
	.action((cmd, opts) => {
		log(chalk`__tpl__ {red ${cmd}} using {red ${opts.test_mode}} mode`);
		try {
			require(res('__tpl__'))(cmd, opts);
		} catch (e) {
			log(chalk`{red ${e}}`);
		}
	});


// 初始化项目 终端执行: basic-env.js init
program
	.command('init')
	.alias('i')
	.description('Create a new project')
	.action((opts) => require(res('init')));

// 初始化项目 终端执行：basic-env.js add
program
	.command('add')
	.alias('a')
	.description('Add a new Route')
	.action((opts) => require(res('add')));

// 任意匹配
program
	.command('*')
	.action((cmd) => log(chalk`{red Invalid mode ${cmd}}`));

program.parse(process.argv);

if (!program.args.length) {
	program.help();
}