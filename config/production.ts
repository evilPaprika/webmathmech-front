import { Config } from 'config';

const config: Config = {
    environment: 'production',
    port: parseInt(process.env.PORT || '', 10) || 8080
};

export = config;
