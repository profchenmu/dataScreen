const path = require('path');
const {
    CleanWebpackPlugin
} = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const protocol = process.env.HTTPS === 'true' ? 'https' : 'http';
const host = process.env.HOST || '0.0.0.0';
const ExtractTextPlugin = require('extract-text-webpack-plugin');
// const cssFilename = 'dist/css/[name].[contenthash:8].css';

module.exports = {
    mode: 'production',
    entry: {
        index: path.resolve(__dirname, './src/index.ts'),
        qt: path.resolve(__dirname, "./src/qt/index.ts"),
        map: path.resolve(__dirname, "./src/map/index.ts"),
        chart1: path.resolve(__dirname, "./src/chart1/index.ts"),
        chart2: path.resolve(__dirname, "./src/chart2/index.ts"),
        matrix: path.resolve(__dirname, "./src/matrix/index.ts"),
        logos: path.resolve(__dirname, "./src/logos/index.ts"),
        news: path.resolve(__dirname, "./src/news/index.ts"),
    },
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: '[name].bundle.js',
        chunkFilename: '[name].bundle.js',
    },
    module: {
        rules: [{
                test: /\.(css|scss)$/,
                use: ExtractTextPlugin.extract({
                    fallback: 'style-loader',
                    use: [{
                            loader: 'css-loader',
                            options: {
                                // If you are having trouble with urls not resolving add this setting.
                                // See https://github.com/webpack-contrib/css-loader#url
                                url: false,
                                sourceMap: false
                            }
                        },
                        {
                            loader: 'sass-loader',
                            options: {
                                sourceMap: false
                            }
                        }
                    ]
                })
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
        new CleanWebpackPlugin(),
        new HtmlWebpackPlugin({
            filename: 'index.html',
            template: './index.html',
            chunks: ['index'],
            inject: true,
            minify: {
                collapseWhitespace: true,
                removeComments: true,
                removeRedundantAttributes: true,
                removeScriptTypeAttributes: true,
                removeStyleLinkTypeAttributes: true,
                useShortDoctype: true
            }
        }),
        new HtmlWebpackPlugin({
            filename: 'qt.html',
            template: './qt.html',
            chunks: ['qt'],
            inject: true,
            minify: {
                collapseWhitespace: true,
                removeComments: true,
                removeRedundantAttributes: true,
                removeScriptTypeAttributes: true,
                removeStyleLinkTypeAttributes: true,
                useShortDoctype: true
            }
        }),
        new HtmlWebpackPlugin({
            filename: 'map.html',
            template: './map.html',
            chunks: ['map'],
            inject: true,
            minify: {
                collapseWhitespace: true,
                removeComments: true,
                removeRedundantAttributes: true,
                removeScriptTypeAttributes: true,
                removeStyleLinkTypeAttributes: true,
                useShortDoctype: true
            }
        }),
        new HtmlWebpackPlugin({
            filename: 'chart1.html',
            template: './chart1.html',
            chunks: ['chart1'],
            inject: true,
            minify: {
                collapseWhitespace: true,
                removeComments: true,
                removeRedundantAttributes: true,
                removeScriptTypeAttributes: true,
                removeStyleLinkTypeAttributes: true,
                useShortDoctype: true
            }
        }),
        new HtmlWebpackPlugin({
            filename: 'chart2.html',
            template: './chart2.html',
            chunks: ['chart2'],
            inject: true,
            minify: {
                collapseWhitespace: true,
                removeComments: true,
                removeRedundantAttributes: true,
                removeScriptTypeAttributes: true,
                removeStyleLinkTypeAttributes: true,
                useShortDoctype: true
            }
        }),
        new HtmlWebpackPlugin({
            filename: 'matrix.html',
            template: './matrix.html',
            chunks: ['matrix'],
            inject: true,
            minify: {
                collapseWhitespace: true,
                removeComments: true,
                removeRedundantAttributes: true,
                removeScriptTypeAttributes: true,
                removeStyleLinkTypeAttributes: true,
                useShortDoctype: true
            }
        }),
        new HtmlWebpackPlugin({
            filename: 'logos.html',
            template: './logos.html',
            chunks: ['logos'],
            inject: true,
            minify: {
                collapseWhitespace: true,
                removeComments: true,
                removeRedundantAttributes: true,
                removeScriptTypeAttributes: true,
                removeStyleLinkTypeAttributes: true,
                useShortDoctype: true
            }
        }),
        new HtmlWebpackPlugin({
            filename: 'news.html',
            template: './news.html',
            chunks: ['news'],
            inject: true,
            minify: {
                collapseWhitespace: true,
                removeComments: true,
                removeRedundantAttributes: true,
                removeScriptTypeAttributes: true,
                removeStyleLinkTypeAttributes: true,
                useShortDoctype: true
            }
        }),
        new ExtractTextPlugin({
            filename: './[name].css'
        }),
    ]
};