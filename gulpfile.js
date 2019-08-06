const //general packing
	gulp = require("gulp"),
	env = require("gulp-env"),
	runSequence = require("run-sequence"),
	webpack = require("webpack"),
	webpackStream = require("webpack-stream"),
	htmlmin = require("gulp-htmlmin"),
	replace = require("gulp-replace"),
	awspublish = require("gulp-awspublish"),
	ftp = require("vinyl-ftp");
//////////////////////////////////////////////////////////////////////////////////////////
let publisher;
let loadEnv = (environment) => {
	env({
		file: environment + ".env",
		type: ".json"
	});

	// publisher = awspublish.create({
	// 	region: process.env.s3Region,
	// 	params: {
	// 		Bucket: process.env.s3Bucket
	// 	},
	// 	accessKeyId: process.env.s3AccessKey,
	// 	secretAccessKey: process.env.s3SecretKey
	// });
};
// //////////////////////////////////////////////////////////////////////////////////////////
// //generate staging build
gulp.task("build-staging", (callback) => {
	loadEnv("staging");
	runSequence(
		"webpack",
		//'webpack-replace',
		"minify",
		["ftp-publish"],
		callback
	);
});

gulp.task("build-production", (callback) => {
	loadEnv("production");
	runSequence(
		"webpack",
		//'webpack-replace',
		"minify",
		["ftp-publish"],
		callback
	);
});
//////////////////////////////////////////////////////////////////////////////////////////
gulp.task("webpack", () => {
	return gulp
		.src("./src/app/index.js")
		.pipe(webpackStream(require(process.env.webpack), webpack))
		.pipe(gulp.dest("./" + process.env.output));
});

gulp.task("minify", () => {
	gulp
		.src("./" + process.env.output + "/index.html")
		.pipe(htmlmin({ collapseWhitespace: true }))
		.pipe(gulp.dest("./" + process.env.output));
});

//////////////////////////////////////////////////////////////////////////////////////////
gulp.task("ftp-publish", () => {
	let conn = ftp.create({
		host: process.env.ftpHost,
		user: process.env.ftpUser,
		password: process.env.ftpPassword,
		parallel: process.env.ftpParallel
	});

	gulp
		.src(process.env.output + "/**/*", {
			base: process.env.output,
			buffer: false
		})
		.pipe(conn.newer("/"))
		.pipe(conn.dest("/"));
});
