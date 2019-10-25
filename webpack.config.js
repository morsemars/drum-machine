const HTMLWebpackPlugin = require('html-webpack-plugin');
const { join } = require('path');
const { HotModuleReplacementPlugin } = require('webpack');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

module.exports = {
    entry: join(__dirname, 'index.js'),
    output: {
        path: join(__dirname, 'dist'),
        filename: 'app.min.js'
    },
    devServer: {
        port: 1000,
        hot: true,
        open: true,
        historyApiFallback: true
    },
    module: {
        rules:[
            {
                test: /\.(js|jsx)$/,
                loader: 'babel-loader',
                options: {
                    presets: ['@babel/preset-env']
                }
            },
            {
                test: /\.(sc|sa|c)ss$/,
                use:[
                    MiniCssExtractPlugin.loader,
                    "css-loader",
                    "postcss-loader",
                    "sass-loader"
                ]
            }
        ]
    },
    plugins: [
        new MiniCssExtractPlugin({
            filename: "bundle.css"
        }),
        new HotModuleReplacementPlugin(),
        new HTMLWebpackPlugin({
            /* favicon: join(__dirname, 'react.png'), */
            title: 'React with Webpack and Friends',
            template: join(__dirname, 'index.html'),
            cache: true,
            showErrors: true
        })
    ]
}