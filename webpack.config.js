const path = require('path');

const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

module.exports = {
    entry: path.resolve(__dirname, 'src/main.js'),
    output: {
        filename: 'js/[name]-[hash].js',
        path: path.resolve(__dirname, 'dist')
    },
    devServer: {
        disableHostCheck: true
    },
    devtool: 'source-map',
    plugins: [
        new CleanWebpackPlugin(),
        new HtmlWebpackPlugin({
            filename: 'index.html',
            template: 'src/index.html',
        }),
        new ExtractTextPlugin("qiao-styles.css")
    ],
    module: {
        rules: [
            {
                test: /\.scss$/,
                use: ExtractTextPlugin.extract({
                    fallback: 'style-loader',
                    use: ['css-loader', 'sass-loader']
                })
            },
            {
                test: /.(png|jpg|gif|bmp|webp)$/,
                use: [{
                    loader: 'url-loader?limit=14240&name=[hash:8]-[name].[ext]',
                }]
            },
            {
                test: /.(eot|ttf|woff|woff2|svg)$/,
                use: 'url-loader',
            },
            {
                test: /.js$/,
                exclude: /(node_modules|bower_components)/,
                use: {
                    loader: 'babel-loader',
                }
            }
        ]
    }
}
