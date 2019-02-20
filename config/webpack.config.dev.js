const baseConfig = require('./webpack.config.base');
const merge = require('webpack-merge');

const devConfig = {
    mode: 'development',
    output: {
        publicPath: '/'
    },
    devServer: {
        contentBase: './dist'
    },
    devtool: 'source-map'
};

module.exports = merge(baseConfig, devConfig);