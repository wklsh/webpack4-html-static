const path = require("path");
const webpack = require("webpack");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const ScriptExtHtmlWebpackPlugin = require("script-ext-html-webpack-plugin");
const PreloadWebpackPlugin = require("preload-webpack-plugin");

module.exports = {
	mode: "development",

	entry: {
		base: "./src/index.js",
	},

	output: {
		filename: "js/bundle.js",
		path: path.resolve(__dirname, "../dist"),
	},

	module: {
		rules: [
			{
				test: /\.txt$/,
				use: "raw-loader",
			},
			{
				test: /\.html$/,
				use: [
					{
						loader: "html-loader",
						options: {
							minimize: true,
						},
					},
				],
			},
			{
				test: /\.(jpe?g|png|gif|svg)$/,
				use: [
					{
						loader: "file-loader",
						options: {
							name:
								process.env.NODE_ENV !== "production"
									? "[path][name].[ext]"
									: "[sha512:hash:base64:7].[ext]",
							outputPath: process.env.NODE_ENV !== "production" ? "images/" : "assets/",
							publicPath: process.env.NODE_ENV !== "production" ? "images/" : "assets/",
						},
					},
				],
			},
			{
				test: /\.(woff|woff2|ttf|otf)$/,
				use: [
					{
						loader: "file-loader",
						options: {
							name:
								process.env.NODE_ENV !== "production"
									? "[path][name].[ext]"
									: "[sha512:hash:base64:7].[ext]",
							outputPath: process.env.NODE_ENV !== "production" ? "fonts/" : "assets/",
							publicPath: process.env.NODE_ENV !== "production" ? "fonts/" : "assets/",
						},
					},
				],
			},
			{
				test: /\.(sa|sc|c)ss$/,
				use: [
					{
						loader: MiniCssExtractPlugin.loader,
						options: {
							hmr: process.env.NODE_ENV === "development",
							// reloadAll: true
						},
					},
					{
						loader: "css-loader",
						options: {
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
			{
				test: /\.js[x]?$/i,
				exclude: path.resolve(__dirname, "node_modules"),
				include: path.resolve(__dirname, "../src"),
				enforce: "pre",
				use: [
					{
						loader: "eslint-loader",
						options: {
							emitWarning: true,
						},
					},
					{
						loader: "babel-loader",
					},
				],
			},
		],
	},

	resolve: {
		alias: {
			Src: path.resolve(__dirname, "../src"),
		},
	},

	plugins: [
		new CleanWebpackPlugin(),

		...[
			{
				page: "index",
				chunks: ["base"],
			},
		].map(
			(event) =>
				new HtmlWebpackPlugin({
					template: `./src/${event.page}.html`,
					filename: `${event.page}.html`,
					chunks: event.chunks,
				})
		),

		new PreloadWebpackPlugin({
			rel: "preload",
			as(entry) {
				if (/\.(woff|woff2|ttf|otf)$/.test(entry)) return "font";
			},
			fileWhitelist: [/\.(woff|woff2|ttf|otf)$/],
			include: "allAssets",
		}),

		new ScriptExtHtmlWebpackPlugin({
			defaultAttribute: "defer",
		}),

		new MiniCssExtractPlugin({
			filename: "webpack-bundle.css",
			chunkFilename: "[id].css",
		}),

		new webpack.ProvidePlugin({
			// 	$: "jquery",
			// 	jquery: "jQuery",
			// 	"window.$": "jquery",
		}),
	],
};
