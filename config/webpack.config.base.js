const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');

module.exports = {
    entry: {
        app: path.resolve(__dirname, '../src/index.js')
    },
    output: {
        path: path.resolve(__dirname, '../dist/'),
        filename: '[name].js'
    },
    module: {
        rules: [
            {
                test: /\.css$/,
                loader: [ 'style-loader', 'css-loader']
            },
            {
                test: /\.jsx?/,
                loader: 'babel-loader'
            },
            {
                test: /\.(:?jpg|gif|png)$/i,
                use: [
                    {
                        loader: 'url-loader',
                        options: {
                            limit: 1200
                        }
                    }
                ]
            }
        ]
    },
    resolve: {
        alias: {
            '@Common': path.resolve(__dirname, '../src/common'),
            '@Util': path.resolve(__dirname, '../src/util'),
            '@Store': path.resolve(__dirname, '../src/store'),
            '@Component': path.resolve(__dirname, '../src/components'),
            '@Container': path.resolve(__dirname, '../src/containers'),
            '@Asset': path.resolve(__dirname, '../assets')
        }
    },
    plugins: [
        new HtmlWebpackPlugin({ 
            title: 'BIM浏览器',
            filename: 'index.html',
            template: '../index.html'
         }),
        new CopyWebpackPlugin([
            {
                from: path.resolve(__dirname, '../assets/'),
                to: path.resolve(__dirname, '../dist/assets/')
            }
        ])
    ],
    node: false
};