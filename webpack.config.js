var path = require('path');
var webpack = require ('webpack');
var DEV_SERVER_PORT = 3001;
var env = process.env.NODE_ENV;

var entry = ['./root'];
var publicPath = '/assets/';
var plugins = [];

if (env === 'development'){
	var entry = [	
					'./root',
			 		'webpack-dev-server/client?http://localhost:' + DEV_SERVER_PORT,
  			 		'webpack/hot/only-dev-server',
  				];
	var publicPath = 'http://localhost:'+ DEV_SERVER_PORT +'/assets/';
	var plugins = [new webpack.HotModuleReplacementPlugin()];

}

module.exports = {
	context: path.resolve('src'),
	entry: entry,
	output: {
		path: path.resolve('dist/public/'),
		publicPath: publicPath,
		filename: "bundle.js"
	},
	plugins: plugins,

	module: {
		preLoaders: [
			{
				test: /\.(js|jsx)$/,
				exclude: /node_modules/,
				loader: 'eslint-loader'
			}
		],
		loaders: [
			{
				test: /\.(js|jsx)$/,
				exclude: /node_modules/,
				loaders: ['react-hot', 'babel-loader'],
			},
			{
				test: /\.css$/,
				exclude: /node_modules/,
				loader: "style-loader!css-loader!autoprefixer-loader"
			},
			{
				test: /\.scss$/,
				exclude: /node_modules/,
				loader: "style-loader!css-loader!autoprefixer-loader!sass-loader"
			},
			{
				test: /\.(png|jpg|ttf|eot)$/, 
				exclude: /node_modules/,
				loader: 'url-loader?limit=1000'
			}
		]
	},


	resolve: {
		extensions: ['', '.js', '.jsx']
	}
}