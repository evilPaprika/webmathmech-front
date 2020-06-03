import config from 'config';
import koaBodyparser from 'koa-bodyparser';
import koaCompose from 'koa-compose';
import koaJwt from 'koa-jwt';
import logger from 'koa-logger';


export default koaCompose(
    [
        koaBodyparser(),
        logger(),
        koaJwt({
            passthrough: true,
            secret: config.JWTSecret,
        }),
    ]
);
