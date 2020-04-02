import { Config } from 'config';


function throwError(message: string): string {
    // eslint-disable-next-line no-console
    console.error(message);

    return '';
}

const config: Config = {
    environment: 'development',
    port: parseInt(process.env.PORT || '3000', 10),
    databaseURL: process.env.DB_URL || throwError('process.env.DB_URL is not specified 😢'),
    JWTSecret: process.env.JWT_SECRET || throwError('process.env.JWT_SECRET is not specified 😢'),
    vkOAuth: {
        redirectURI: 'http://localhost:3000/auth/vk',
        clientId: 7382632,
        clientSecret: process.env.VK_APPLICATION_CLIENT_SECRET_LOCALHOST
            || throwError('process.env.VK_APPLICATION_CLIENT_SECRET_LOCALHOST is not specified 😢'),
        version: '5.3'
    }
};


export = config;
