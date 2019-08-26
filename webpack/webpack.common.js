const path = require("path");
const webpack = require("webpack");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const ScriptExtHtmlWebpackPlugin = require("script-ext-html-webpack-plugin");
const PreloadWebpackPlugin = require("preload-webpack-plugin");
const CopyWebpackPlugin = require("copy-webpack-plugin");

module.exports = {
	entry: {
		landing: "./src/js/landing/landing.js",
	},

	output: {
		filename: "js/[name].js",
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
							outputPath:
								process.env.NODE_ENV !== "production"
									? "images/"
									: "assets/",
							publicPath:
								process.env.NODE_ENV !== "production"
									? "images/"
									: "assets/",
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
							outputPath:
								process.env.NODE_ENV !== "production"
									? "fonts/"
									: "assets/",
							publicPath:
								process.env.NODE_ENV !== "production"
									? "fonts/"
									: "assets/",
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
							sourceMap: process.env.NODE_ENV !== "production",
						},
					},
					{
						loader: "postcss-loader",
						options: {
							sourceMap: process.env.NODE_ENV !== "production",
						},
					},
					{
						loader: "sass-loader",
						options: {
							sourceMap: process.env.NODE_ENV !== "production",
						},
					},
				],
			},

			{
				test: /\.js[x]?$/i,
				exclude: path.resolve(__dirname, "node_modules"),
				use: [
					{
						loader: "babel-loader",
					},
					{
						loader: "eslint-loader",
						options: {
							emitWarning: true,
						},
					},
				],
			},
		],
	},

	resolve: {
		extensions: [".js", ".scss", ".css"],
		alias: {
			Src: path.resolve(__dirname, "../src"),
		},
	},

	plugins: [
		new CleanWebpackPlugin(),

		...[
			{
				page: "index",
				chunks: ["landing"],
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
			filename: "style.css",
			chunkFilename:
				process.env.NODE_ENV !== "production"
					? "[id].css"
					: "[id]].[chunkhash:8].css",
		}),

		new webpack.ProvidePlugin({
			// 	$: "jquery",
			// 	jquery: "jQuery",
			// 	"window.$": "jquery",
		}),
		
		new CopyWebpackPlugin([
			// { from: "./src/index.php", to: "index.php" },
			// { from: "./src/meta.json", to: "meta.json" },
			// { from: "./src/seo.php", to: "seo.php" },
			// { from: "./src/.htaccess", to: ".htaccess", toType: "file" },
			// { from: "./src/robots.txt", to: "robots.txt" },
		]),
	],
};
