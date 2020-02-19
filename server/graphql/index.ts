import 'reflect-metadata';
import { ApolloServer } from 'apollo-server-koa';
import { buildSchema } from 'type-graphql';

import customAuthChecker from './customAuthChecker';


const createApolloServer = async () => {
    const schema = await buildSchema({
        authChecker: customAuthChecker,
        emitSchemaFile: true,
        // .js instead of .ts because ts will transpile into js
        resolvers: [`${__dirname}/../controllers/*.resolver.js`],
    });

    const server = new ApolloServer({
        context: ({ ctx }) => ({ koaCtx: ctx }),
        introspection: true,
        playground: true,
        schema
    });

    return server;
};

export default createApolloServer;
