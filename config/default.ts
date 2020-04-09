import { Config } from 'config';


function throwError(message: string): string {
    // eslint-disable-next-line no-console
    console.error(message);

    return '';
}

const port = parseInt(process.env.PORT || '3000', 10);

const config: Config = {
    environment: 'development',
    port,
    databaseURL: process.env.DB_URL || throwError('process.env.DB_URL is not specified 😢'),
    JWTSecret: process.env.JWT_SECRET || throwError('process.env.JWT_SECRET is not specified 😢'),
    vkOAuth: {
        redirectURI: `http://localhost:${port}/auth/vk`,
        clientId: 7382632,
        clientSecret: process.env.VK_APPLICATION_CLIENT_SECRET_LOCALHOST
            || throwError('process.env.VK_APPLICATION_CLIENT_SECRET_LOCALHOST is not specified 😢'),
        version: '5.3'
    },
    minio: {
        endPoint: 'direct.webmathmech.site',
        port: 9000,
        useSSL: false,
        accessKey: process.env.MINIO_ACCESS_KEY || throwError('process.env.MINIO_ACCESS_KEY is not specified 😢'),
        secretKey: process.env.MINIO_SECRET_KEY || throwError('process.env.MINIO_SECRET_KEY is not specified 😢')
    }
};


export = config;
