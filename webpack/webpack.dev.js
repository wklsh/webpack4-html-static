const path = require("path");
const merge = require("webpack-merge");
const common = require("./webpack.common.js");
const portFinderSync = require("portfinder-sync");

module.exports = merge(common, {
	mode: "development",

	devServer: {
		host: "0.0.0.0",
		port: portFinderSync.getPort(8080),
		historyApiFallback: true,
		inline: true,
		progress: true,
		compress: true,
		quiet: true,
		contentBase: path.join(__dirname, "../src"),
		watchContentBase: true,
		hot: true,
		headers: {
			"Access-Control-Allow-Origin": "*",
		},
		after: function(app, server) {
			console.log("\n\n\n-------------------------------");
			console.log("devServer running on:");
			console.log(`http://${server.options.host}:${server.options.port}`);
			console.log("-------------------------------\n");
		},
	},

	devtool: "inline-source-map",
});
