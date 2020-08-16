import { Op } from 'sequelize';
import {
    Arg,
    Args,
    Authorized,
    Ctx,
    FieldResolver,
    Mutation,
    Query,
    Resolver,
    Root,
} from 'type-graphql';

import { PerformancePostState, Role } from '../models/EnumModels';
import PerformancePost, { Rating } from '../models/PerformancePost.sequelize';
import PollVote from '../models/PollVote.sequelize';
import User from '../models/User.sequelize';
import { ApolloServerContext } from '../types';
import { CursorPaginationInputs } from './inputs/PaginationInputs';
import {
    CreatePerformancePostInput,
    PatchPerformancePostInputs,
} from './inputs/PerformancePostInputs';


@Resolver(PerformancePost)
export default class PerformancePostResolver {
    @Authorized([Role.ADMIN])
    @Mutation(() => PerformancePost)
    public async createPerformancePost(@Args() {
        state,
        ...rest
    }: CreatePerformancePostInput) {
        return PerformancePost.create({
            ...rest,
            state: state || PerformancePostState.DRAFT,
        },
        { include: [{ model: User, required: true, right: true }], });
    }

    @Query(() => PerformancePost)
    public async findPerformancePost(@Arg('id') id: string) {
        const performancePost = await PerformancePost.findOne({
            where: { id },
            include: [User, { model: PollVote, include: [User] }]
        });

        if (!performancePost) {
            throw new Error('Performance post not found');
        }

        return performancePost;
    }

    @Query(() => [PerformancePost])
    public async getPerformancePostsCursor(@Args() {
        limit,
        dateTimeCursor,
        sequelizeWhere
    }: CursorPaginationInputs,) {
        return PerformancePost.findAll({
            limit,
            where: { createdAt: { [Op.lt]: dateTimeCursor }, ...sequelizeWhere },
            order: [['createdAt', 'DESC']],
            include: [User, { model: PollVote, include: [User] }]
        });
    }

    @Query(() => Number)
    public async getActivePerformancePostsCount(@Ctx() context: ApolloServerContext) {
        const jwt = context.koaCtx?.state?.user;

        const posts = await PerformancePost.findAll({
            where: {
                state: PerformancePostState.POLL
            },
            order: [['updatedAt', 'DESC']],
            include: [User, { model: PollVote, include: [User] }]
        });

        const userId = jwt.id;

        let count = 0;
        posts?.forEach(({ pollVotes }) => {
            if (!pollVotes || pollVotes.every((pollVote) => pollVote.userId !== userId)) {
                count += 1;
            }
        });

        return count;
    }

    @Authorized([Role.ADMIN])
    @Mutation(() => PerformancePost)
    public async patchPerformancePost(@Args() { id, ...newValues }: PatchPerformancePostInputs) {
        const performancePost = await PerformancePost.findOne({
            where: { id }
        });

        if (!performancePost) {
            throw new Error('PerformancePost not found');
        }

        await performancePost.update({ ...newValues });

        return performancePost;
    }

    @Authorized([Role.ADMIN])
    @Mutation(() => Boolean)
    public async removePerformancePost(@Arg('id') id : string) {
        return Boolean(await PerformancePost.destroy({ where: { id } }));
    }

    @FieldResolver()
    averageRating(@Root() { pollVotes }: PerformancePost): Rating {
        if (!pollVotes?.length) {
            return new Rating();
        }

        const initialRating = new Rating();
        const ratingFields = Object.keys(initialRating) as [keyof Rating];
        const pollVotesLength = pollVotes.length;

        const averageRating = pollVotes
            .reduce((acc, { rating }) => {
                ratingFields.forEach((key) => {
                    acc[key] += rating[key];
                });

                return acc;
            },
            initialRating);

        ratingFields.forEach((key) => {
            averageRating[key] /= pollVotesLength;
        });

        return averageRating;
    }

    @FieldResolver()
    async speaker(@Root() { speakerId, speaker }: PerformancePost) {
        if (!speakerId) {
            return null;
        }

        if (speaker) {
            return speaker;
        }

        return User.findOne({
            where: { id: speakerId },
        });
    }
}
