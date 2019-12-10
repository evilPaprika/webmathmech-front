declare module 'config' {
  interface MyConfig {
    port: number,
    environment: 'production' | 'development'
  }
  export type Config = MyConfig;
  const config: Config;
  export default config;
}
