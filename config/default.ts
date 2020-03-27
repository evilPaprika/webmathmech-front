import { Config } from 'config';


function throwError(message: string): never {
    throw new Error(message);
}

const config: Config = {
    environment: 'development',
    port: parseInt(process.env.PORT || '3000', 10),
    databaseURL: process.env.DB_URL || throwError('process.env.DB_URL is not specified 😢'),
    JWTSecret: process.env.JWT_SECRET || throwError('process.env.JWT_SECRET is not specified 😢')
};


export = config;
