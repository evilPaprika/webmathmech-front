import 'reflect-metadata';
import { AuthenticationError } from 'apollo-server-koa';
import { AuthChecker } from 'type-graphql';

import User from '../models/User.sequelize';
import { ApolloServerContext } from '../types';

// here you can read jwt from context
// and check his permission in db against `roles` argument
// that comes from `@Authorized`, eg. ["ADMIN", "MODERATOR"]
const customAuthChecker: AuthChecker<ApolloServerContext> = async ({ context }, roles,) => {
    const jwt = context.koaCtx?.state?.user;

    if (!jwt) {
        return false;
    }

    const user = await User.findOne({
        where: { id: jwt.id },
    });

    if (!user) {
        throw new AuthenticationError('User does not exist in database!');
    }

    const { role } = user;


    return roles.length === 0 || roles.includes(role);
};

export default customAuthChecker;
