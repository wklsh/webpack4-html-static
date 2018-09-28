module.exports = {
	plugins: {
		"postcss-flexbugs-fixes": {},

		"css-mqpacker": {},

		autoprefixer: {
			browsers: ["defaults"]
		},
		cssnano: {
			zindex: false,
			reduceIdents: false
		}
	}
};
