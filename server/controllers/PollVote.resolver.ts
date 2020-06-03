import { Args, Ctx, FieldResolver, Mutation, Query, Resolver, Root } from 'type-graphql';

import PerformancePost from '../models/PerformancePost.sequelize';
import PollVote from '../models/PollVote.sequelize';
import User from '../models/User.sequelize';
import { ApolloServerContext } from '../types';
import { FindVoteCurrentUser, VoteCurrentUserInput, VoteInput } from './inputs/PollVoteInputs';


@Resolver(PollVote)
export default class PollVoteResolver {
    @Mutation(() => PollVote)
    public async vote(@Args() args: VoteInput) {
        return PollVote.create(args);
    }

    @Mutation(() => PollVote)
    public async voteCurrentUser(@Args() args: VoteCurrentUserInput,
        @Ctx() context: ApolloServerContext) {
        const jwt = context.koaCtx?.state?.user;

        return PollVote.create(
            { userId: jwt.id, ...args },
        );
    }

    @FieldResolver()
    async user(@Root() { userId, user }: PollVote) {
        if (user) {
            return user;
        }

        return User.findOne({ where: { id: userId } });
    }

    @FieldResolver()
    async performance(@Root() { performanceId, performance }: PollVote) {
        if (performance) {
            return performance;
        }

        return PerformancePost.findOne({ where: { id: performanceId } });
    }

    @Query(() => PollVote)
    public async findVoteCurrentUser(@Args() { performanceId }: FindVoteCurrentUser,
        @Ctx() context: ApolloServerContext) {
        const jwt = context.koaCtx?.state?.user;

        return PollVote.findOne({
            where: {
                performanceId,
                userId: jwt.id
            },
        });
    }
}
