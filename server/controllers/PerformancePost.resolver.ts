import {
    Arg,
    Args,
    FieldResolver,
    Mutation,
    Query,
    Resolver,
    Root,
} from 'type-graphql';

import { PaginationInputs } from './inputs/PaginationInputs';
import { CreatePerformancePostInput, PatchPerformancePostInputs } from './inputs/PerformancePostInputs';
import PerformancePost, { Rating } from '../models/PerformancePost.sequelize';
import { PerformancePostState } from '../models/EnumModels';
import User from '../models/User.sequelize';
import PollVote from '../models/PollVote.sequelize';


@Resolver(PerformancePost)
export default class PerformancePostResolver {
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
            throw new Error('Performance post  not found');
        }

        return performancePost;
    }

    @Query(() => [PerformancePost])
    public async getPerformancePosts(@Arg('params') { limit, offset, order }: PaginationInputs) {
        return PerformancePost.findAll({
            offset,
            limit,
            order: [order],
            include: [User, { model: PollVote, include: [User] }]
        });
    }

    @Mutation(() => PerformancePost)
    public async patchPerformancePost(@Args() { id, ...newValues }: PatchPerformancePostInputs) {
        const performancePost = await PerformancePost.findOne({
            where: { id },
        });

        if (!performancePost) {
            throw new Error('PerformancePost not found');
        }

        await performancePost.update({ ...newValues });

        return performancePost;
    }

    @Mutation(() => Boolean)
    public async removePerformancePost(@Arg('id') id : string) {
        return Boolean(await PerformancePost.destroy({ where: { id } }));
    }

    @FieldResolver()
    averageRating(@Root() { pollVotes }: PerformancePost): Rating {
        if (!pollVotes || pollVotes.length === 0) {
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
}
