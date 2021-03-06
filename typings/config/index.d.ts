interface IConfig {
    port: number;
    environment: 'production' | 'development';
    databaseURL: string;
    JWTSecret: string;
    vkOAuth: {
        redirectURI: string;
        clientId: number;
        clientSecret: string;
        version: string;
    };
    minio: {
        endPoint: string;
        port: number;
        useSSL: boolean;
        accessKey: string;
        secretKey: string;
    };
}

declare module 'config' {
    export interface Config extends IConfig {}
    const config: Config;
    export default config;
}

declare const CONFIG: IConfig; // only for bundled files, so ConfigWebpackPlugin works
