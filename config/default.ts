import { Config } from 'config';

const config: Config = {
    environment: 'development',
    port: parseInt(process.env.PORT || '', 10) || 3000
};

export = config;
