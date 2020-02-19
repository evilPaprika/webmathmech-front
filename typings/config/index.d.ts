declare module 'config' {
    export interface Config {
        port: number;
        environment: 'production' | 'development';
        databaseURL: string;
        secret: string;
    }

    const config: Config;
    export default config;
}
