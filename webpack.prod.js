//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//// - Settings in here executes only in Prod env.
//// -----------------------------------------------------------------
//// ** DO NOT INCLUDE COMMON / DEV SPECIFIC SETTINGS IN HERE ***
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
const path = require("path");
const webpack = require("webpack");
const merge = require("webpack-merge");
const CleanWebpackPlugin = require("clean-webpack-plugin");
const OfflinePlugin = require("offline-plugin");
const UglifyJSPlugin = require("uglifyjs-webpack-plugin");
const common = require("./webpack.common.js");

const MiniCssExtractPlugin = require("mini-css-extract-plugin");

module.exports = merge(common, {
	mode: "production",

	entry: {
		vendor: ["offline-plugin/runtime"]
	},

	output: {
		path: path.resolve(__dirname, "dist"),
		filename: "js/[chunkhash].js"
	},

	optimization: {
		splitChunks: {
			cacheGroups: {
				commons: {
					name: "commons",
					chunks: "initial",
					minChunks: 2
				}
			}
		}
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
							minimize: true,
							sourceMap: true
						}
					},
					{
						loader: "postcss-loader",
						options: {
							sourceMap: true
						}
					},
					{
						loader: "sass-loader",
						options: {
							sourceMap: true
						}
					}
				]
			},
			{
				test: /\.(gif|png|jpe?g|svg)$/i,
				use: [
					{
						loader: "image-webpack-loader",
						options: {
							mozjpeg: {
								progressive: true,
								quality: 75
							},
							optipng: {
								optimizationLevel: 5
							},
							pngquant: {
								enabled: false
							},
							gifsicle: {
								interlaced: true
							}
						}
					}
				]
			}
		]
	},

	plugins: [
		// Removes older dist folder before every production build
		new CleanWebpackPlugin(["dist"]),

		// JS Minifications
		new UglifyJSPlugin({
			sourceMap: true
		}),

		// Offline caching
		new OfflinePlugin({
			AppCache: false,
			ServiceWorker: { events: true }
		}),

		// CSS file extracts
		new MiniCssExtractPlugin({
			filename: "css/[contenthash].css",
			chunkFilename: "css/[contenthash].css"
		}),

		// Webpack optimisations
		new webpack.optimize.ModuleConcatenationPlugin()
	]
});
