# Static HTML webpack boilerplate

### Features

- Webpack 4
- ES 6
- JS/CSS chunking
- Dynamic Static HTML imports for HtmlWebPackPlugin

### Dependencies

- Built with [Webpack 4](https://github.com/webpack/webpack)
- ~~Tasks ran with [Gulp](https://github.com/gulpjs/gulp)~~
- Platform under [Node.js](https://nodejs.org/)

### Quick start

Clone and install in your local directory.

```
git clone REPO-URL
npm i
npm run build
```

## Structure of the project

`src` - Where the working files are

`dist` - Contains the production build, **you do not edit the files here**

###### Webpack config structure

`webpack.common.js` - Contains all core essential configurations that are needed in both **dev** and **prod** environments

`webpack.dev.js` - Merges with `webpack.common.js` and and only contains configurations for **dev** environment

`webpack.prod.js` - Merges with `webpack.common.js` and and only contains configurations for **production** environment

## TO-DO's

- [ ] Server deployment
