import {
    Arg,
    Args,
    Mutation,
    Query,
    Resolver,
} from 'type-graphql';

import { PaginationInputs } from './inputs/PaginationInputs';
import { CreatePerformancePostInput } from './inputs/PerformancePostInputs';
import PerformancePost from '../models/PerformancePost.sequelize';
import { PerformancePostState } from '../models/EnumModels';


@Resolver(PerformancePost)
export default class PerformancePostResolver {
    @Mutation(() => PerformancePost)
    public async createPerformancePost(@Args() { text, pictureURL, videoURL, state }: CreatePerformancePostInput) {
        return PerformancePost.create({
            text,
            pictureURL,
            videoURL,
            state: state || PerformancePostState.DRAFT
        });
    }

    @Query(() => PerformancePost)
    public async findPerformancePost(@Arg('id') id: string) {
        const newsPost = await PerformancePost.findOne({
            where: { id },
        });

        if (!newsPost) {
            throw new Error('News post not found');
        }

        return newsPost;
    }

    @Query(() => [PerformancePost])
    public async getPerformancePosts(@Arg('params') { limit, offset, order }: PaginationInputs) {
        return PerformancePost.findAll({ offset, limit, order: [order] });
    }

    @Mutation(() => Boolean)
    public async removePerformancePost(@Arg('id') id : string) {
        return Boolean(await PerformancePost.destroy({ where: { id } }));
    }
}
