import path from 'path';
import logger from "koa-logger";
import koaStatic from "koa-static";
import koaCompose from 'koa-compose';

export default koaCompose(
    [
        logger(),
        koaStatic(path.join(__dirname, '..', 'static'))
    ]
);
