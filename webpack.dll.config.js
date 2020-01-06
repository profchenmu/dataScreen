const path = require('path');
const webpack = require('webpack');
const {
    CleanWebpackPlugin
} = require('clean-webpack-plugin');
module.exports = {
    context: process.cwd(),
    resolve: {
        extensions: ['.ts', '.js', '.json', '.less', '.css'],
        modules: [__dirname, 'node_modules']
    },

    entry: {
        library: [
            'd3',
            'echarts',
            'axios',
            'moment',
            'numeral',
            'socket.io-client'
        ]
    },
    output: {
        filename: '[name].dll.js',
        path: path.resolve(__dirname, './dist/library'),
        library: '[name]'
    },
    plugins: [
        // new CleanWebpackPlugin(),
        new webpack.DllPlugin({
            name: '[name]',
            path: './dist/library/[name].json'
        })
    ]
};