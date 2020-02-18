/* eslint-disable import/first */
import { Context } from 'koa';
import { IJWTPayLoad } from '../../server/types/jwt';

declare module 'koa' {
    export interface Context {
        state: { user?: IJWTPayLoad }
    }
}
