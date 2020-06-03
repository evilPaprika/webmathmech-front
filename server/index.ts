/* eslint-disable no-console */
/* eslint-disable import/first */
require('dotenv').config();


import config from 'config';

import createApp from './app';


const { port } = config;

(async () => {
    const app = await createApp();
    app.listen(port, () => {
        console.info(`Server started on ${port}`);
        console.info(`Open http://localhost:${port}/`);
    });
})();
