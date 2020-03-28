import * as path from 'path';
import HtmlWebpackPlugin from 'html-webpack-plugin';


const BUILD_PATH = path.resolve('build', 'static');
const isDevMode = process.env.NODE_ENV === 'development' || !process.env.NODE_ENV;
const mode: 'development' | 'production' = isDevMode ? 'development' : 'production';
const hashTemplate = isDevMode ? '' : '.[contenthash:8]'; // hmr doesn't work with hashes

export default {
    entry: ['./client/index.tsx'],
    output: {
        path: BUILD_PATH,
        publicPath: '/static/',
        filename: `js/[name]${hashTemplate}.bundle.js`,
        chunkFilename: `js/[id]${hashTemplate}.bundle.js`
    },
    resolve: {
        extensions: ['.ts', '.tsx', '.js', '.jsx'],
        alias: {
            client: path.resolve(path.join(__dirname, '..'), 'client/'),
            apollo: path.resolve(path.join(__dirname, '..'), 'client/apollo/'),
            components: path.resolve(path.join(__dirname, '..'), 'client/components/'),
            contexts: path.resolve(path.join(__dirname, '..'), 'client/contexts/'),
        }
    },
    mode,
    module: {
        rules: [
            {
                test: /\.tsx?$/,
                loader: 'babel-loader'
            },
            {
                test: [/\.jpe?g$/, /\.png$/, /\.webp$/],
                loader: 'url-loader',
                options: {
                    name: `media/[name]${hashTemplate}.[ext]`,
                    limit: 8192
                }
            },
            {
                test: /\.svg$/,
                use: ['@svgr/webpack'],
            }
        ]
    },
    plugins: [
        new HtmlWebpackPlugin({
            hash: true,
            filename: 'index.html',
            template: './static/index.html'
        })
    ]
};
