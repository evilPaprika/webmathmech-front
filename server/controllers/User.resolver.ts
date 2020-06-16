import { Op } from 'sequelize';
import {
    Arg,
    Args,
    Authorized,
    Ctx,
    Mutation,
    Query,
    Resolver,
} from 'type-graphql';

import { Role } from '../models/EnumModels';
import PerformancePost from '../models/PerformancePost.sequelize';
import PollVote from '../models/PollVote.sequelize';
import User from '../models/User.sequelize';
import { ApolloServerContext } from '../types';
import { CursorPaginationInputs, OffsetPaginationInputs } from './inputs/PaginationInputs';

@Resolver(User)
export default class UserResolver {
    @Authorized([])
    @Query(() => User)
    public async getCurrentUser(@Ctx() context: ApolloServerContext) {
        const jwt = context.koaCtx?.state?.user;

        const user = await User.findOne({
            where: { id: jwt.id },
            include: [PerformancePost, { model: PollVote, include: [PerformancePost] }]
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
            include: [PerformancePost, { model: PollVote, include: [PerformancePost] }]
        });

        if (!user) {
            throw new Error('User not found');
        }

        return user;
    }

    @Query(() => [User])
    public async getUsers(@Arg('params') { limit, offset, order }: OffsetPaginationInputs) {
        return User.findAll({
            offset,
            limit,
            order: [order],
            include: [PerformancePost, { model: PollVote, include: [PerformancePost] }]
        });
    }

    @Query(() => [User])
    public async getUsersCursor(@Args() { limit, dateTimeCursor }: CursorPaginationInputs) {
        return User.findAll({
            limit,
            where: {
                createdAt: {
                    [Op.lt]: dateTimeCursor
                }
            },
            order: [['createdAt', 'DESC']],
            include: [PerformancePost, { model: PollVote, include: [PerformancePost] }]
        });
    }

    @Authorized([Role.ADMIN])
    @Mutation(() => Boolean)
    public async removeUser(@Arg('id') id : string) {
        return Boolean(await User.destroy({ where: { id } }));
    }
}
