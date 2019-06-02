var path = require('path');

module.exports = {
	mode: 'none',
	entry: './src/js/index.js',
	output: {
		filename: 'bundle.js',
		path: path.resolve(__dirname, 'dist'),
	},
	module: {
		rules: [
			{
				test: /\.css$/,
				use: ['style-loader', 'css-loader'],
			},
			{
				test: /\.(png|woff|woff2|eot|ttf|svg)$/,
				use: 'url-loader?limit=100000',
			},
			{
				test: /\.(png|jpg|gif|svg)$/,
				use: [
					{
						loader: 'file-loader',
						options: {},
					},
				],
			},
		],
	},
};
