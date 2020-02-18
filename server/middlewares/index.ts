import koaCompose from 'koa-compose';
import logger from 'koa-logger';

export default koaCompose(
    [
        logger(),
    ]
);
