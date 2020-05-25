import { Args, Ctx, FieldResolver, Mutation, Resolver, Root, } from 'type-graphql';

import PollVote from '../models/PollVote.sequelize';
import PerformancePost from '../models/PerformancePost.sequelize';
import { ApolloServerContext } from '../types';
import User from '../models/User.sequelize';
import { VoteCurrentUserInput, VoteInput } from './inputs/PollvoteInputs';


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
            { id: jwt.id, ...args },
        );
    }

    @FieldResolver()
    async user(@Root() { userId }: PollVote) {
        return User.findOne({ where: { id: userId } });
    }

    @FieldResolver()
    async performance(@Root() { performanceId }: PollVote) {
        return PerformancePost.findOne({ where: { id: performanceId } });
    }
}
