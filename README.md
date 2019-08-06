# Webpack 4 Static HTML webpack boilerplate

## Start DEV environment

```javascript
npm run start
```

## Build Production Version

```javascript
npm run build
```

## Project Structure

`src` - Where the working files are

`dist` - Contains the production build, **do not edit the files here**

## Webpack config structure

`webpack.common.js` - Contains all core essential configurations that are needed in both **dev** and **prod** environments

`webpack.dev.js` - Merges with `webpack.common.js` and and only contains configurations for **dev** environment

`webpack.prod.js` - Merges with `webpack.common.js` and and only contains configurations for **production** environment
