import { Context } from 'koa';
import KoaRouter from 'koa-router';
import send from 'koa-send';

import pingController from './controllers/ping';


const router = new KoaRouter();

router.get('/ping', pingController);
router.get('/robots.txt', async (ctx: Context) => {
    await send(ctx, 'build/static/robots.txt');
});

export default router;
