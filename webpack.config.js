const path = require('path');
const webpack = require('webpack');
const {
    CleanWebpackPlugin
} = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const protocol = process.env.HTTPS === 'true' ? 'https' : 'http';
const host = process.env.HOST || '0.0.0.0';
// const cssFilename = 'dist/css/[name].[contenthash:8].css';

module.exports = {
    mode: 'production',
    entry: {
        index: path.resolve(__dirname, './src/index.ts'),
        qt: path.resolve(__dirname, './src/qt/index.ts'),
        map: path.resolve(__dirname, './src/map/index.ts'),
        chart1: path.resolve(__dirname, './src/chart1/index.ts'),
        chart2: path.resolve(__dirname, './src/chart2/index.ts'),
        matrix: path.resolve(__dirname, './src/matrix/index.ts'),
        logos: path.resolve(__dirname, './src/logos/index.ts'),
        incremental: path.resolve(__dirname, './src/incremental/index.ts'),
        smallchart1: path.resolve(__dirname, './src/smallchart1/index.ts'),
    },
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
                    require.resolve('style-loader'),
                    {
                        loader: require.resolve('css-loader'),
                        options: {
                            importLoaders: 2,
                            sourceMap: true,
                        },
                    },
                    {
                        loader: require.resolve('postcss-loader'),
                        options: {
                            // Necessary for external CSS imports to work
                            // https://github.com/facebookincubator/create-react-app/issues/2677
                            ident: 'postcss',
                            sourceMap: true,
                            plugins: () => [
                                require('postcss-flexbugs-fixes'),
                            ],
                        },
                    },
                    {
                        loader: require.resolve('sass-loader'),
                        options: {
                            sourceMap: true,

                        }
                    }
                ],
            },
            {
                test: /\.(png|jpg|gif|svg)$/i,
                use: [{
                    loader: 'url-loader',
                }]
            },
            {
                test: /\.ts$/,
                use: 'ts-loader',
                exclude: /node_modules/,
            },
            // {
            //     test: /\.svg$/,
            //     loader: 'svg-inline-loader'
            // },
            // {
            //     test: /\.(html)$/,
            //     use: {
            //         loader: 'html-loader',
            //         options: {
            //             attrs: [':data-src']
            //         }
            //     }
            // }
        ]
    },
    resolve: {
        extensions: ['.tsx', '.ts', '.js'],
    },
    plugins: [
        // new CleanWebpackPlugin(),
        new HtmlWebpackPlugin({
            filename: 'index.html',
            template: './index.html',
            chunks: ['index'],
            inject: true,
        }),
        new HtmlWebpackPlugin({
            filename: 'qt.html',
            template: './qt.html',
            chunks: ['qt'],
            inject: true,
        }),
        new HtmlWebpackPlugin({
            filename: 'map.html',
            template: './map.html',
            chunks: ['map'],
            inject: true,
        }),
        new HtmlWebpackPlugin({
            filename: 'chart1.html',
            template: './chart1.html',
            chunks: ['chart1'],
            inject: true,
        }),
        new HtmlWebpackPlugin({
            filename: 'chart2.html',
            template: './chart2.html',
            chunks: ['chart2'],
            inject: true,
        }),
        new HtmlWebpackPlugin({
            filename: 'matrix.html',
            template: './matrix.html',
            chunks: ['matrix'],
            inject: true,
        }),
        new HtmlWebpackPlugin({
            filename: 'logos.html',
            template: './logos.html',
            chunks: ['logos'],
            inject: true,
        }),
        new HtmlWebpackPlugin({
            filename: 'incremental.html',
            template: './incremental.html',
            chunks: ['incremental'],
            inject: true,
        }),
        new HtmlWebpackPlugin({
            filename: 'smallchart1.html',
            template: './smallchart1.html',
            chunks: ['smallchart1'],
            inject: true,
        }),
        new webpack.DllReferencePlugin({
            context: __dirname,
            manifest: require('./dist/library/library.json')
        })
    ]
};