import {
    Arg,
    Args,
    Mutation,
    Query,
    Resolver,
} from 'type-graphql';

import NewsPost from '../models/NewsPost.sequelize';
import { PaginationInputs } from './inputs/PaginationInputs';
import { CreateNewsPostInput, PatchNewsPostInputs } from './inputs/NewsPostInputs';


@Resolver(NewsPost)
export default class NewsPostResolver {
    @Mutation(() => NewsPost)
    public async createNewsPost(@Args() { text, pictureURL }: CreateNewsPostInput) {
        return NewsPost.create({
            text,
            pictureURL
        });
    }

    @Query(() => NewsPost)
    public async findNewsPost(@Arg('id') id: string) {
        const newsPost = await NewsPost.findOne({
            where: { id },
        });

        if (!newsPost) {
            throw new Error('News post not found');
        }

        return newsPost;
    }

    @Query(() => [NewsPost])
    public async getNewsPosts(@Arg('params') { limit, offset, order }: PaginationInputs) {
        return NewsPost.findAll({ offset, limit, order: [order] });
    }

    @Mutation(() => NewsPost)
    public async patchNewsPost(@Args() { id, ...newValues }: PatchNewsPostInputs) {
        const newsPost = await NewsPost.findOne({
            where: { id },
        });

        if (!newsPost) {
            throw new Error('NewsPost not found');
        }

        await newsPost.update({ ...newValues });

        return newsPost;
    }

    @Mutation(() => Boolean)
    public async removeNewsPost(@Arg('id') id : string) {
        return Boolean(await NewsPost.destroy({ where: { id } }));
    }
}
