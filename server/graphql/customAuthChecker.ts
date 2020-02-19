import 'reflect-metadata';
import { AuthChecker } from 'type-graphql';

import { ApolloServerContext } from '../types';

// here you can read jwt from context
// and check his permission in db against `roles` argument
// that comes from `@Authorized`, eg. ["ADMIN", "MODERATOR"]
const customAuthChecker: AuthChecker<ApolloServerContext> = ({ context }, roles,) => {
    const jwt = context?.koaCtx?.state?.user;

    if (!jwt) {
        return false;
    }

    if (roles.length === 0 || roles.includes(jwt.role)) {
        return true;
    }

    return false;
};

export default customAuthChecker;
