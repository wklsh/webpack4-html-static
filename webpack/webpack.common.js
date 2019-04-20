const Path = require("path");
const CopyWebpackPlugin = require("copy-webpack-plugin");
const HtmlWebpackImportStaticPages = require("html-webpack-import-static-pages");

module.exports = {
	entry: {
		app: Path.resolve(__dirname, "../src/js/index.js"),
	},

	output: {
		path: Path.join(__dirname, "../build"),
		filename: "js/[name].js",
	},

	optimization: {
		splitChunks: {
			chunks: "all",
			name: false,
		},
	},

	module: {
		rules: [
			{
				test: /\.js[x]?$/i,
				exclude: Path.resolve(__dirname, "node_modules"),
				include: Path.resolve(__dirname, "../src"),
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
			{
				test: /\.(ico|jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mov|mp4|mp3)(\?.*)?$/i,
				use: {
					loader: "file-loader",
					options: {
						name:
							process.env.NODE_ENV == "development"
								? "[path][name].[ext]"
								: "assets/[sha512:hash:base64:7].[ext]",
					},
				},
			},
		],
	},

	resolve: {
		extensions: [".css", ".scss", ".js", ".jsx"],
		alias: {
			"~": Path.resolve(__dirname, "../src"),
		},
	},

	plugins: [
		new HtmlWebpackImportStaticPages({
			chunkAssign: {
				index: ["app"],
			},
		}),

		// new CopyWebpackPlugin([{ from: Path.resolve(__dirname, "../public"), to: "public" }]),
	],
};
