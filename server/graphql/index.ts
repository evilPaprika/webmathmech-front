import 'reflect-metadata';
import { ApolloServer } from 'apollo-server-koa';
import { buildSchema } from 'type-graphql';

import customAuthChecker from './customAuthChecker';


const createApolloServer = async () => {
    // https://github.com/MichalLytek/type-graphql/issues/94#issuecomment-550020949
    try {
        const schema = await buildSchema({
            authChecker: customAuthChecker,
            emitSchemaFile: { path: './schema.graphql' },
            // .js instead of .ts because ts will transpile into js
            resolvers: [`${__dirname}/../controllers/*.resolver.js`],
        });

        return new ApolloServer({
            context: ({ ctx }) => ({ koaCtx: ctx }),
            introspection: true,
            playground: true,
            schema
        });
    } catch (e) {
        // eslint-disable-next-line no-console
        console.error(e);
        throw e;
    }
};

export default createApolloServer;
