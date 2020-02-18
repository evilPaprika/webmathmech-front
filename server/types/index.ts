import { Context } from 'koa';

export enum Role {
    USER = 'USER',
    ADMIN = 'ADMIN',
}

export interface ApolloServerContext {
    koaCtx: Context;
}
