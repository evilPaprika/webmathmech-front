/* eslint-disable no-console */
import config from 'config';

import app from './app';

const { port } = config;

app.listen(port, () => {
    console.info(`Server started on ${port}`);
    console.info(`Open http://localhost:${port}/`);
});
