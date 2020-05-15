import {
    Arg,
    Args,
    Mutation,
    Query,
    Resolver,
} from 'type-graphql';

import { PaginationInputs } from './inputs/PaginationInputs';
import { CreatePerformancePostInput, PatchPerformancePostInputs } from './inputs/PerformancePostInputs';
import PerformancePost, { Rating } from '../models/PerformancePost.sequelize';
import { PerformancePostState } from '../models/EnumModels';
import User from '../models/User.sequelize';


@Resolver(PerformancePost)
export default class PerformancePostResolver {
    @Mutation(() => PerformancePost)
    public async createPerformancePost(@Args() {
        state,
        averageRating,
        ...rest
    }: CreatePerformancePostInput) {
        return PerformancePost.create({
            ...rest,
            state: state || PerformancePostState.DRAFT,
            averageRating: averageRating || new Rating()
        });
    }

    @Query(() => PerformancePost)
    public async findPerformancePost(@Arg('id') id: string) {
        const newsPost = await PerformancePost.findOne({
            where: { id }, include: [User]
        });

        if (!newsPost) {
            throw new Error('News post not found');
        }

        return newsPost;
    }

    @Query(() => [PerformancePost])
    public async getPerformancePosts(@Arg('params') { limit, offset, order }: PaginationInputs) {
        return PerformancePost.findAll({ offset, limit, order: [order], include: [User] });
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
}
