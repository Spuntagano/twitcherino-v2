import path from'path';
import webpack from 'webpack';
import CONSTS from './src/utils/consts';

const env = process.env.NODE_ENV;

let entry = ['./root'];
let publicPath = '/assets/';
let plugins = [];

if (env === 'development'){
	entry = [	
				'./root',
		 		'webpack-dev-server/client?http://localhost:' + CONSTS.DEV_SERVER_PORT,
		 		'webpack/hot/only-dev-server',
			];
	publicPath = 'http://localhost:'+ CONSTS.DEV_SERVER_PORT +'/assets/';
	plugins = [new webpack.HotModuleReplacementPlugin()];
}

export default {
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
};