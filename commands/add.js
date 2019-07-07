'use strict'

Object.defineProperty(exports, "__esModule", {
	value: true
})
var log = console.log

var _chalk = require('chalk')

var _inquirer = require('inquirer')

var _upath = require('upath')

var _upath2 = _interopRequireDefault(_upath)

var _shelljs = require('shelljs')

var _index = require('./add/index')

function _interopRequireDefault(obj) {
	return obj && obj.__esModule ? obj : {default: obj}
}

var question = [
	{
		type: 'input',
		name: 'project',
		message: 'Project Name:',
		validate: function validate(val) {
			if (val === '') {
				return 'Project Name is required!'
			} else {
				return true
			}
		}
	},
	{
		type: 'list',
		name: 'template',
		message: 'Select template:',
		choices: [new _inquirer.Separator(' = For template = '), 'basic', 'paging', 'form'],
		default: 'basic'
	},
	{
		type: 'list',
		name: 'pagingType',
		message: 'Select type:',
		when: function when(answers) {
			return answers.template === 'paging'
		},
		choices: [new _inquirer.Separator(' = For template = '), 'basic', 'tabs'],
		default: 'basic'
	},
	{
		type: 'list',
		name: 'pagingMode',
		message: 'Select mode:',
		when: function when(answers) {
			return answers.template === 'paging'
		},
		choices: [new _inquirer.Separator(' = For template = '), 'table', 'piece', 'native'],
		default: 'table'
	},
	{
		type: 'input',
		name: 'path',
		message: 'RoutePath is required:',
		default: '/home',
		when: function when(answers) {
			return answers.type !== 'none'
		},
		validate: function validate(val) {
			if (val === '') {
				return 'Name is required!'
			} else {
				return true
			}
		}
	},
	{
		type: 'input',
		name: 'dir',
		message: 'Where to in the project:',
		when: function when(answers) {
			return answers.type !== 'none'
		},
		default: _upath2.default.normalize(process.cwd() + '/src/pages/'),
		// default: upath.normalize(`${process.cwd()}/tmp/`),
		// default: upath.normalize(`${process.cwd()}/tmp/src/pages/`),
		validate: function validate(val) {
			if (val === process.cwd() + '/tmp/') {
				// shell.rm('-rf', 'tmp');
			}
			return true
		}
	}
]

var stream = (0, _inquirer.prompt)(question).then(function (res) {
	(0, _index.routeForVue)(res)
})

exports.default = stream
