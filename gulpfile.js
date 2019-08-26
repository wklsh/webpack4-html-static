const gulp = require("gulp");
const env = require("gulp-env");
const del = require("del");
const runSequence = require("run-sequence");
const webpack = require("webpack");
const webpackStream = require("webpack-stream");
const awspublish = require("gulp-awspublish");
const ftp = require("vinyl-ftp");
const cloudfront = require("gulp-cloudfront-invalidate");

let loadEnv = (environment) => {
	env({
		file: "./env/" + environment + ".env",
		type: ".json",
	});
};

// generate staging build
gulp.task("build-staging", (callback) => {
	loadEnv("staging");
	runSequence(
		"cleanup",
		"webpack",
		["s3-publish"],
		"cloudfront-invalidate",
		callback
	);
});

// generate production build
gulp.task("build-production", (callback) => {
	loadEnv("production");
	runSequence(
		"cleanup",
		"webpack",
		["s3-publish"],
		"cloudfront-invalidate",
		callback
	);
});

gulp.task("cleanup", () => {
	return del([process.env.output + "/**/*"]);
});

gulp.task("webpack", () => {
	return gulp
		.src("../src/js/index.js")
		.pipe(webpackStream(require(process.env.webpack), webpack))
		.pipe(gulp.dest("./" + process.env.output));
});

gulp.task("s3-publish", () => {
	let publisher = awspublish.create({
		region: process.env.s3Region,
		params: {
			Bucket: process.env.s3Bucket,
		},
		accessKeyId: process.env.s3AccessKey,
		secretAccessKey: process.env.s3SecretKey,
	});

	gulp.src("./" + process.env.output + "/**/*")
		.pipe(publisher.publish())
		.pipe(publisher.sync("", [/^4xx/, /^5xx/]))
		.pipe(awspublish.reporter());
});

gulp.task("cloudfront-invalidate", () => {
	let cfSettings = {
		distribution: process.env.cloudfrontDistribution,
		accessKeyId: process.env.cloudfrontAccessKey,
		secretAccessKey: process.env.cloudfrontSecretKey,
		paths: ["/*"],
	};
	return gulp
		.src("./" + process.env.output + "/**/*")
		.pipe(cloudfront(cfSettings));
});
