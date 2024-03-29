module.exports = {
	plugins: [
		require('postcss-import')({}),
		require('postcss-flexbugs-fixes')({}),
		require('precss')({}),
		require('cssnano')({
			preset: 'default',
		}),
		require('autoprefixer')({
			// 不删除老式写法
			remove: false,
			// 样式前缀添加
			browsers: [
				"> 1%", 
				"IE > 8",
				"last 2 versions", 
				"Firefox ESR", 
				"Opera 12.1",
				"Safari > 7"
			]
		})
	]
}
