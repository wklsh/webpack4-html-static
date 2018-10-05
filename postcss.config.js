module.exports = {
	plugins: {
		"postcss-flexbugs-fixes": {},

		"css-mqpacker": {},

		autoprefixer: {
			grid: true,
			browsers: [">1%"]
		},
		cssnano: {
			zindex: false,
			reduceIdents: false
		}
	}
};
