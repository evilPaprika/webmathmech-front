import { Config } from 'config';


const config: Partial<Config> = {
    environment: 'production',
    port: parseInt(process.env.PORT || '3001', 10),
    vkOAuth: {
        redirectURI: 'https://webmathmech.site/auth/vk',
        clientId: 7381806,
        clientSecret: process.env.VK_APPLICATION_CLIENT_SECRET || '',
        version: '5.3'
    },
    minio: {
        endPoint: 'localhost',
        port: 45000,
        useSSL: false,
        accessKey: process.env.MINIO_ACCESS_KEY || '',
        secretKey: process.env.MINIO_SECRET_KEY || ''
    }
};

export = config;
