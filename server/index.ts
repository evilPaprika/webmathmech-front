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
    chokidar.watch('./build/server').on('all', () => {
        console.log("Clearing module cache from server");
        Object.keys(require.cache).forEach((id) => {
            if (/[\/\\]server[\/\\]/.test(id)) delete require.cache[id]
        })
    });
}

app.use(async (ctx, next) => {
    await (await import('./composedMiddleware')).default(ctx, next);
});

const port = config.port;
app.listen(port, () => {
    console.info(`Server started on ${port}`);
    console.info(`Open http://localhost:${port}/`);
});
