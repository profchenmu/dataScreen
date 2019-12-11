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
    entry: {
        index: path.resolve(__dirname, './src/index.ts'),
        qt: path.resolve(__dirname, "./src/qt/index.ts"),
        map: path.resolve(__dirname, "./src/map/index.ts"),
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
                test: /\.(png|jpg|gif)$/i,
                use: [{
                    loader: 'url-loader',
                }]
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
            filename: 'index.html',
            template: './index.html',
            inject: true,
        }),
        new HtmlWebpackPlugin({
            filename: 'qt.html',
            template: './qt.html',
            inject: true,
        }),
        new HtmlWebpackPlugin({
            filename: 'map.html',
            template: './map.html',
            inject: true,
        }),
    ]
};