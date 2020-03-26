import { Context } from 'koa';


export interface ApolloServerContext {
    koaCtx: Context;
}
