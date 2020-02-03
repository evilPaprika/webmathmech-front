import KoaRouter from 'koa-router';

import pingController from './controllers/ping';

const router = new KoaRouter();

router.get('/ping', pingController);

export default router;
