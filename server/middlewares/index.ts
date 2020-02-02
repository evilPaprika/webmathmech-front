import koaCompose from 'koa-compose';
import koaStatic from 'koa-static';
import logger from 'koa-logger';

import path from 'path';

export default koaCompose(
    [
        logger(),
        koaStatic(path.join(__dirname, '..', '..', 'static'))
    ]
);
