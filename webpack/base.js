const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const stylesHandler = 'style-loader';
const webpack = require('webpack');
const { CleanWebpackPlugin } = require('clean-webpack-plugin')


module.exports = {
    mode: 'development',
    entry: {
        app: './src/index.js'
    },

    output: {
        path: path.resolve(__dirname, '../dist'),
    },

    devServer: {
        open: true,
        host: 'localhost',
    },

    plugins: [
        new HtmlWebpackPlugin({
            template: 'index.html',
        }),
        new webpack.DefinePlugin({
            'typeof CANVAS_RENDERER': JSON.stringify(true),
            'typeof WEBGL_RENDERER': JSON.stringify(true)
        }),
        new CleanWebpackPlugin({
            root: path.resolve(__dirname, "../")
        })
    ],

    module: {
        rules: [
            {
                test: /\.(js|jsx)$/i,
                loader: 'babel-loader',
                exclude: '/node_modules/'
            },
            {
                test: /\.css$/i,
                use: [stylesHandler,'css-loader'],
            },
            {
                test: [/\.vert$/, /\.frag$/],
                use: ['raw-loader']
            },
            {
                test: /\.(gif|png|jpe?g|svg|xml)$/i,
                use: ['file-loader']
            }
        ],
    },
};