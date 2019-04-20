const Path = require("path");
const Webpack = require("webpack");
const merge = require("webpack-merge");
const common = require("./webpack.common.js");
const CopyWebpackPlugin = require("copy-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const CleanWebpackPlugin = require("clean-webpack-plugin");

module.exports = merge(common, {
	mode: "production",

	devtool: "source-map",

	stats: "errors-only",

	bail: true,

	output: {
		path: Path.resolve(__dirname, "../dist"),
		filename: "js/[name].[chunkhash:8].js",
		chunkFilename: "js/[name].[chunkhash:8].chunk.js",
	},

	module: {
		rules: [
			{
				test: /\.(css|scss)$/i,
				use: [
					MiniCssExtractPlugin.loader,
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

	plugins: [
		new CleanWebpackPlugin({
			cleanOnceBeforeBuildPatterns: Path.resolve(__dirname, "../dist"),
		}),

		new Webpack.optimize.ModuleConcatenationPlugin(),

		new MiniCssExtractPlugin({
			filename: "css/[contenthash].css",
			chunkFilename: "css/[contenthash].css",
		}),
	],
});
