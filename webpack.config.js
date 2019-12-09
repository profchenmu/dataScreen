const path = require('path');
const {
    CleanWebpackPlugin
} = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const protocol = process.env.HTTPS === 'true' ? 'https' : 'http';
const host = process.env.HOST || '0.0.0.0';
// const cssFilename = 'dist/css/[name].[contenthash:8].css';

module.exports = {
    mode: 'production',
    entry: './src/index.ts',
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: '[name].bundle.js',
        chunkFilename: '[name].bundle.js',
    },
    devtool: 'inline-source-map',
    devServer: {
        contentBase: './dist',
        watchContentBase: true,
        hot: true,
        https: protocol === 'https',
        host: host,
        overlay: false,
        proxy: {
            '/api': 'http://localhost:4000'
        },
        publicPath: '/',
    },
    module: {
        rules: [{
                test: /\.(css|scss)$/,
                use: [
                    // style-loader
                    {
                        loader: 'style-loader'
                    },
                    // css-loader
                    {
                        loader: 'css-loader',
                        options: {
                            modules: true
                        }
                    },
                    // sass-loader
                    {
                        loader: 'sass-loader'
                    }
                ]
            },
            {
                test: /\.ts$/,
                use: 'ts-loader',
                exclude: /node_modules/,
            },
            {
                test: /\.svg$/,
                loader: 'svg-inline-loader'
            }
        ]
    },
    resolve: {
        extensions: ['.tsx', '.ts', '.js'],
    },
    plugins: [
        new CleanWebpackPlugin(),
        new HtmlWebpackPlugin({
            template: './index.html'
        })
    ]
};