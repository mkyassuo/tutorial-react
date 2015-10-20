var path = require('path');
const config = {
	entry: {
		app: path.join(__dirname, '/index.js'),
	},
	output: {
		path: __dirname,
		filename: 'bundle.js',
		publicPath: '/',
	},
	devtool: 'source-map',
	debug: true,
	module: {
		loaders: [
			{
				test: /\.js(x)?$/,
				loaders: ['babel-loader?stage=0'],
				exclude: /(node_modules)/,
				include: __dirname
			},
		],
	},
};
module.exports = config;

