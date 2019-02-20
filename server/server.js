const express = require('express');
const webpackDevMiddleware = require('webpack-dev-middleware');
const webpack = require('webpack');
const config = require('../config/webpack.config.dev');

const app = express();
const compiler = webpack(config);
const DEV_SERVER_PORT = 8080;


app.use(webpackDevMiddleware(compiler, {
    publicPath: config.output.publicPath
}));

app.listen(DEV_SERVER_PORT, () => {
    console.log(`Server is listening at port ${DEV_SERVER_PORT}`);
});