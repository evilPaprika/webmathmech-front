import { Config } from "config";

const config: Config = {
    environment: 'production',
    port: parseInt(process.env.PORT || '') || 8080
};

export = config;