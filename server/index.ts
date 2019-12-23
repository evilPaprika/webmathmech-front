/* eslint-disable no-console */
import path from 'path';
import koaWebpack from 'koa-webpack';
import config from 'config';
import Router from 'koa-router';
import Koa from 'koa';

const router = new Router();
const app = new Koa();

if (config.environment === 'development') {
    /* eslint-disable global-require,import/no-extraneous-dependencies */
    const webpack = require('webpack');
    const webpackConfig = require('../webpack.config').default;
    const chokidar = require('chokidar');
    /* eslint-enable global-require,import/no-extraneous-dependencies */

    const compiler = webpack(webpackConfig);
    koaWebpack({ compiler }).then((hmrMiddleware) => {
        app.use(hmrMiddleware);
        router.get('/', async (ctx) => {
            const filename = path.resolve(compiler.options.output?.path!, 'index.html');
            ctx.response.type = 'html';
            ctx.response.body = hmrMiddleware.devMiddleware.fileSystem.createReadStream(filename);
        });
    });

    const folderToClearCacheOf = /[/\\]server[/\\]/;
    chokidar.watch('./build/server', { ignoreInitial: true }).on('all', () => {
        console.info('Clearing module cache from server');
        Object
            .keys(require.cache)
            .filter(folderToClearCacheOf.test.bind(folderToClearCacheOf))
            .forEach((filePath) => { delete require.cache[filePath]; });
    });
}

app.use(async (ctx, next) => {
    await (await import('./middlewares')).default(ctx, next);
});

const { port } = config;
app.listen(port, () => {
    console.info(`Server started on ${port}`);
    console.info(`Open http://localhost:${port}/`);
});
