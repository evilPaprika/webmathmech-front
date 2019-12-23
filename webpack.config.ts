/* eslint-disable import/no-extraneous-dependencies */

import * as path from 'path';
import config from 'config';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import MiniCssExtractPlugin from 'mini-css-extract-plugin';

const BUILD_PATH = path.resolve(__dirname, 'build');

export default {
    entry: './client/index.tsx',
    output: {
        path: BUILD_PATH,
        filename: '[name].[contenthash].bundle.js',
        chunkFilename: '[name].[contenthash].bundle.js',
    },
    resolve: {
        extensions: ['.ts', '.tsx', '.js', '.jsx']
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
                            publicPath: '../',
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
                    name: 'static/media/[name].[contenthash].[ext]',
                    limit: 8192
                }
            },
        ]
    },
    plugins: [
        new HtmlWebpackPlugin({
            hash: true,
            filename: path.join(BUILD_PATH, 'index.html'),
            template: './public/index.html'
        }),
        new MiniCssExtractPlugin({
            filename: '[name].[contenthash].css',
            chunkFilename: '[id].[contenthash].css',
            ignoreOrder: false
        }),
    ]
};
