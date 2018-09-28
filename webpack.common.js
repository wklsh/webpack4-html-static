//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//// Base Config for webpack.
//// - Settings in here executes on both Dev and Prod env.
//// -----------------------------------------------------------------
//// ** DO NOT INCLUDE DEV / PROD SPECIFIC SETTINGS IN HERE ***
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
const fs = require("fs");
const path = require("path");
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const CopyWebpackPlugin = require("copy-webpack-plugin");
const FriendlyErrorsWebpackPlugin = require("friendly-errors-webpack-plugin");
const HtmlWebpackImportStaticPages = require("html-webpack-import-static-pages");

module.exports = {
	entry: {
		app: path.resolve(__dirname, "src/js/index.js"),
		landing: path.resolve(__dirname, "src/js/views/landing/page-landing.js")
	},

	devtool: "cheap-module-source-map",

	module: {
		rules: [
			{
				test: /\.js[x]?$/,
				include: path.resolve(__dirname, "src"),
				exclude: path.resolve(__dirname, "node_modules"),
				loader: "babel-loader"
			},

			{
				test: /\.(gif|png|jpe?g|svg)$/i,
				use: [
					{
						loader: "file-loader",
						options: {
							publicPath: path.resolve(__dirname, "/"),
							outputPath: path.resolve(__dirname, "/"),
							context: path.resolve(__dirname, "src"),
							name: process.env.NODE_ENV == "development" ? "[path][name].[ext]" : "img/[sha512:hash:base64:7].[ext]"
						}
					}
				]
			}
		]
	},

	resolve: {
		extensions: [".css", ".scss", ".js", ".jsx"],
		alias: {
			StyleAlias: path.resolve(__dirname, "src/scss"),
			JsAlias: path.resolve(__dirname, "src/js")
		}
	},

	plugins: [
		new FriendlyErrorsWebpackPlugin({
			compilationSuccessInfo: {
				messages: ["Application is running.", "http://localhost:3000"]
			}
		}),

		new HtmlWebpackImportStaticPages({
			// blacklist: ["page2"],
			chunkAssign: {
				index: ["app", "landing"]
			}
		}),

		new CopyWebpackPlugin([
			// { from: "./src/index.php", to: "index.php" },
			// { from: "./src/meta.json", to: "meta.json" },
			// { from: "./src/seo.php", to: "seo.php" },
			{ from: "./src/.htaccess", to: ".htaccess", toType: "file" },
			{ from: "./src/robots.txt", to: "robots.txt" }
		])
	]
};
