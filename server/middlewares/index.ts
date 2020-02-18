import koaCompose from 'koa-compose';
import logger from 'koa-logger';
import koaBodyparser from 'koa-bodyparser';
import koaJwt from 'koa-jwt';
import config from 'config';

export default koaCompose(
    [
        koaBodyparser(),
        logger(),
        koaJwt({
            passthrough: true,
            secret: config.secret,
        }),
    ]
);
