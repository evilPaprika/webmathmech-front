import { Context } from 'koa';
import KoaRouter from 'koa-router';
import send from 'koa-send';
import { Stream } from 'stream';

import pingController from './controllers/ping';
import { minioClient } from './minio';


const router = new KoaRouter();

router.get('/ping', pingController);
router.get('/robots.txt', async (ctx: Context) => {
    await send(ctx, 'build/static/robots.txt');
});

router.get('/media/:filename', async (ctx: Context) => {
    await new Promise((resolve) => {
        minioClient.getObject('main', ctx.params.filename, (error: Error | null, dataStream: Stream) => {
            // eslint-disable-next-line no-console
            if (error) console.error(error);
            ctx.type = 'jpg';
            ctx.body = dataStream;
            resolve();
        });
    });
});

export default router;
