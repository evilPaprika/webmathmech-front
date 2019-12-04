import * as path from 'path';
import config from 'config';
import HtmlWebpackPlugin from "html-webpack-plugin";
import MiniCssExtractPlugin from "mini-css-extract-plugin";

const BUILD_PATH = path.resolve(__dirname, 'build');

export default {
    entry: './client/index.tsx',
    output: {
        path: BUILD_PATH,
        filename: 'static/js/[name].[contenthash:8].bundle.js',
        chunkFilename: 'static/js/[name].[contenthash:8].bundle.js'
    },
    resolve: {
        extensions: [".ts", ".tsx", ".js", ".jsx"]
    },
    module: {
        rules: [
            {
                test: /\.tsx?$/,
                loader: 'babel-loader'
            },
            {
                test: /\.css$/i,
                use: [
                    {
                        loader: MiniCssExtractPlugin.loader,
                        options: {
                            hmr: config.get('environment') === 'development',
                        },
                    },
                    'css-loader'
                ],
            },
            {
                test: [/\.bmp$/, /\.gif$/, /\.jpe?g$/, /\.png$/, /\.svg$/],
                loader: 'url-loader',
                options: {
                    name: 'static/media/[name].[contenthash:8].[ext]',
                    limit: 8192
                }
            },
        ]
    },
    plugins: [
        new HtmlWebpackPlugin({
            hash: true,
            filename: path.join(BUILD_PATH, 'index.html'),
            template: "./public/index.html"
        }),
        new MiniCssExtractPlugin({
            filename: 'static/css/[name].[contenthash:8].css',
            chunkFilename: 'static/css/[name].[contenthash:8].chunk.css',
            ignoreOrder: false
        }),
    ]
};
