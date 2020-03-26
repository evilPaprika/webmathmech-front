import { Config } from 'config';


const config: Partial<Config> = {
    environment: 'production',
    port: parseInt(process.env.PORT || '3001', 10)
};

export = config;
