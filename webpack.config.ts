/* eslint-disable import/no-extraneous-dependencies */

import * as path from 'path';
import config from 'config';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import MiniCssExtractPlugin from 'mini-css-extract-plugin';

const BUILD_PATH = path.resolve('build', 'static');
const idDevMode = config.environment === 'development';
const hashTemplate = idDevMode ? '' : '.[contenthash:8]'; // hmr doesn't work with hashes

export default {
    entry: ['./client/index.tsx'],
    output: {
        path: BUILD_PATH,
        publicPath: '/',
        filename: `js/[name]${hashTemplate}.bundle.js`,
        chunkFilename: `js/[id]${hashTemplate}.bundle.js`
    },
    resolve: {
        extensions: ['.ts', '.tsx', '.js', '.jsx']
    },
    mode: config.environment,
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
                            hmr: idDevMode,
                        },
                    },
                    'css-loader'
                ],
            },
            {
                test: [/\.bmp$/, /\.gif$/, /\.jpe?g$/, /\.png$/, /\.svg$/],
                loader: 'url-loader',
                options: {
                    name: `media/[name]${hashTemplate}.[ext]`,
                    limit: 8192
                }
            },
        ]
    },
    plugins: [
        new HtmlWebpackPlugin({
            hash: true,
            filename: 'index.html',
            template: './public/index.html'
        }),
        new MiniCssExtractPlugin({
            filename: `css/[name]${hashTemplate}.css`,
            chunkFilename: `css/[id]${hashTemplate}.chunk.css`,
            ignoreOrder: false,

        })
    ]
};
