// @ts-ignore
import ConfigWebpackPlugin from 'config-webpack';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import * as path from 'path';


const BUILD_PATH = path.resolve('build', 'static');
const PROJECT_ROOT = path.join(__dirname, '..');
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
            _client: path.resolve(PROJECT_ROOT, 'client/'),
            _apollo: path.resolve(PROJECT_ROOT, 'client/apollo/'),
            _components: path.resolve(PROJECT_ROOT, 'client/components/'),
            _contexts: path.resolve(PROJECT_ROOT, 'client/contexts/'),
        }
    },
    mode,
    module: {
        rules: [
            {
                test: /\.tsx?$/,
                exclude: /node_modules/,
                loader: 'babel-loader',
                options: {
                    cacheDirectory: true
                }
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
        new ConfigWebpackPlugin(),
        new HtmlWebpackPlugin({
            hash: true,
            filename: 'index.html',
            template: './static/index.html'
        })
    ]
};
