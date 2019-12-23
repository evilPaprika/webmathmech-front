import path from "path";
import koaWebpack from "koa-webpack";
import config from 'config';
import webpack from "webpack";
import Router from "koa-router";
import Koa from "koa"

import webpackConfig from "../webpack.config";

const compiler = webpack(webpackConfig);
const router = new Router();
const app = new Koa();

if (config.environment === 'development') {
    koaWebpack({compiler}).then((hmrMiddleware) => {
        app.use(hmrMiddleware);
        router.get('/', async (ctx) => {
            const filename = path.resolve(compiler.options.output?.path!, 'index.html');
            ctx.response.type = 'html';
            ctx.response.body = hmrMiddleware.devMiddleware.fileSystem.createReadStream(filename);
        });
    });

    const chokidar = require('chokidar');
    const folderToClearCacheOf = /[\/\\]server[\/\\]/;
    chokidar.watch('./build/server', { ignoreInitial: true }).on('all', () => {
        console.info("Clearing module cache from server"); // eslint-disable-next-line no-console
        Object
            .keys(require.cache)
            .filter(folderToClearCacheOf.test.bind(folderToClearCacheOf))
            .forEach(filePath => { delete require.cache[filePath] })
    });
}

app.use(async (ctx, next) => {
    await (await import('./middlewares')).default(ctx, next);
});

const { port } = config;
app.listen(port, () => {
    console.info(`Server started on ${port}`); // eslint-disable-line no-console
    console.info(`Open http://localhost:${port}/`); // eslint-disable-line no-console
});
