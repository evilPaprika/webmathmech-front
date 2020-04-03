import {
    Arg,
    Authorized,
    Ctx,
    Mutation,
    Query,
    Resolver,
} from 'type-graphql';

import User from '../models/User.sequelize';
import { ApolloServerContext } from '../types';
import { Role } from '../models/Role';
import { PaginationInputs } from './inputs/PaginationInputs';

@Resolver(User)
export default class UserResolver {
    @Authorized([Role.USER])
    @Query(() => User)
    public async getCurrentUser(@Ctx() context: ApolloServerContext) {
        const jwt = context?.koaCtx?.state?.user;

        const user = await User.findOne({
            where: { id: jwt.id },
        });

        if (!user) {
            throw new Error('User not found');
        }

        return user;
    }

    @Query(() => User)
    public async findUser(@Arg('login') login: string) {
        const user = await User.findOne({
            where: { login },
        });

        if (!user) {
            throw new Error('User not found');
        }

        return user;
    }

    @Query(() => [User])
    public async getUsers(@Arg('params') { limit, offset, order }: PaginationInputs) {
        return User.findAll({ offset, limit, order: [order] });
    }

    @Mutation(() => Boolean)
    public async removeUser(@Arg('id') id : string) {
        return Boolean(await User.destroy({ where: { id } }));
    }
}
