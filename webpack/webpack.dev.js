const Path = require("path");
const Webpack = require("webpack");
const merge = require("webpack-merge");
const common = require("./webpack.common.js");

module.exports = merge(common, {
	mode: "development",

	output: {
		path: Path.resolve(__dirname, "dist"),
		filename: "js/[name].js",
	},

	devServer: {
		host: "0.0.0.0",
		port: "8080",
		historyApiFallback: true,
		inline: true,
		progress: true,
		compress: true,
		quiet: true,
		contentBase: Path.join(__dirname, "../src"),
		watchContentBase: true,
		hot: true,
		headers: {
			"Access-Control-Allow-Origin": "*",
		},
	},

	devtool: "cheap-eval-source-map",

	module: {
		rules: [
			{
				test: /\.(css|scss)$/i,
				use: [
					{
						loader: "style-loader",
						options: {
							sourceMap: true,
						},
					},
					{
						loader: "css-loader",
						options: {
							url: true,
							sourceMap: true,
						},
					},
					{
						loader: "postcss-loader",
						options: {
							sourceMap: true,
						},
					},
					{
						loader: "sass-loader",
						options: {
							sourceMap: true,
						},
					},
				],
			},
		],
	},
});
