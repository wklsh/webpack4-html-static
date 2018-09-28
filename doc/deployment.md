# Deployment


## Overview
This app relies on [Gulp](https://github.com/gulpjs/gulp) to do the deployment process. [Webpack](https://github.com/webpack/webpack) is used to transpile ES6 codes to the backward-compatible ES5 codes. After which, Gulp continues to run a series of tasks to cleanup, update, optimise and upload (optional) the files.

## Commands
```
gulp build-staging
```
Compiles the staging build. 
`process.env.NODE_ENV` is set to `staging` 
Outputs to the `staging` folder.

```
gulp build-production
```
Compiles the production build. 
`process.env.NODE_ENV` is set to `production` 
Outputs to the `production` folder.


## Upload
Uploading to `S3` and `FTP` is supported but are *disabled by defaults*. Server credentials and folder settings in the form of `.env` files are needed to carry out the uploading process. 

To allow automated uploading, setup the `staging.env` and `production.env` files in the root folder and uncomment the uploading tasks (`['s3-publish', 'ftp-publish']`) in `gulpfile.js`.

The uploading to S3 requires setting up in AWS IAM, for more information, please refer to:
[gulp-awspublish](https://www.npmjs.com/package/gulp-awspublish)
[Getting your S3 credentials](https://docs.aws.amazon.com/sdk-for-javascript/v2/developer-guide/getting-your-credentials.html)


## `.env` configurations

Refer to `.sample-env` to create your own `.env` files. Format and explanation:

```json
{
	"NODE_ENV": "staging", //environment
	"webpack": "../webpack.staging.config.js", //config file for webpack to run
	"output": "staging", //where the compiled codes will output to
	"siteURL": "", //where the site will be hosted
	"assetsURL": "", //where the images / css / javascript will be hosted
	"endpointURL": "", //api endpoint
	"robotsMeta": "noindex", //whether web crawlers should index the site

	"s3Region": "", //s3 region
	"s3Bucket": "", //s3 bucket name
	"s3AccessKey": "", //s3 api access key
	"s3SecretKey": "", //s3 api secret key

	"ftpHost": "", //ftp host
	"ftpUser": "", //ftp username
	"ftpPassword": "", //ftp password
	"ftpParallel": 10 //how many files can be uploaded in parallel
}
```

