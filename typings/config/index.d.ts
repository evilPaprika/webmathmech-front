declare module 'config' {
    export interface Config {
        port: number,
        environment: 'production' | 'development'
    }

    const config: Config;
    export default config;
}
