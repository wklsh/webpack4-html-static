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

- [ ] Gulp

## ~~Deployment~~

~~Gulp is used to transpile and package the files for various purposes. The deployment sequence supports direct upload to FTP and S3 but additional configurations are needed to achieve that. For more info, please refer to [deployment documentation](./doc/deployment.md).~~

~~**Note: .env files are required, please refer to .sample-env for the format**~~

~~To do a staging build:~~

```
gulp build-staging
```

~~Files will be outputted in the `staging` folder.~~

~~To do a production build:~~

```
gulp build-production
```

~~Files will be outputted in the `build` folder.~~

~~Depending on the build configurations, contents in `js` and `img` can be uploaded to an S3 bucket or to a server via FTP.~~
