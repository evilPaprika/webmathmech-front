import path from 'path';
import config from 'config';
import Koa from 'koa';
import Router from "koa-router";
import logger from "koa-logger";
import koaWebpack from "koa-webpack";
import koaStatic from "koa-static";
import webpack from "webpack";

import webpackConfig from "../webpack.config";

const compiler = webpack(webpackConfig);
const app = new Koa();
const router = new Router();

app.use(logger());
app.use(koaStatic(path.join(__dirname, '..', 'static')));

if (config.environment === 'development') {
    koaWebpack({compiler}).then((hmrMiddleware) => {
        app.use(hmrMiddleware);

        router.get('/', async (ctx) => {
            const filename = path.resolve(compiler.options.output?.path!, 'index.html');
            ctx.response.type = 'html';
            ctx.response.body = hmrMiddleware.devMiddleware.fileSystem.createReadStream(filename);
        });
    });
}

app
    .use(router.routes())
    .use(router.allowedMethods());

const port = config.port;
app.listen(port, () => {
    console.info(`Server started on ${port}`);
    console.info(`Open http://localhost:${port}/`);
});