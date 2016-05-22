import path from'path';
import webpack from 'webpack';
import config from './config';
import ExtractTextPlugin from 'extract-text-webpack-plugin';

const env = process.env.NODE_ENV;

let entry = ['./root'];
let publicPath = '/assets/';
let plugins = [new ExtractTextPlugin("style.css", {
            		allChunks: true
        	  })];

if (env === 'development'){
	entry = [	
				'./root',
		 		'webpack-dev-server/client?http://localhost:' + config.DEV_SERVER_PORT,
		 		'webpack/hot/only-dev-server',
			];
	publicPath = 'http://localhost:'+ config.DEV_SERVER_PORT +'/assets/';
	plugins = [
		new webpack.HotModuleReplacementPlugin(),
		new ExtractTextPlugin("style.css", {
            		allChunks: true
        	  })
	];
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
				loader: ExtractTextPlugin.extract("style-loader", "css-loader")
			},
			{
				test: /\.(png|jpg|ttf|eot|woff|woff2)$/, 
				loader: 'url-loader?limit=1000'
			}
		]
	},


	resolve: {
		extensions: ['', '.js', '.jsx']
	}
};