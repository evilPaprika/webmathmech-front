import {
    Arg,
    Args,
    Mutation,
    Query,
    Resolver,
} from 'type-graphql';

import { Op } from 'sequelize';
import NewsPost from '../models/NewsPost.sequelize';
import { CursorPaginationInputs, OffsetPaginationInputs } from './inputs/PaginationInputs';
import { CreateNewsPostInput, PatchNewsPostInputs } from './inputs/NewsPostInputs';


@Resolver(NewsPost)
export default class NewsPostResolver {
    @Mutation(() => NewsPost)
    public async createNewsPost(@Args() { description, pictureURL }: CreateNewsPostInput) {
        return NewsPost.create({
            description,
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
    public async getNewsPosts(@Arg('params') { limit, offset, order }: OffsetPaginationInputs) {
        return NewsPost.findAll({ offset, limit, order: [order] });
    }

    @Query(() => [NewsPost])
    public async getNewsPostsCursor(@Arg('params') { limit, dateTimeCursor }: CursorPaginationInputs) {
        return NewsPost.findAll({
            limit,
            where: {
                createdAt: {
                    [Op.lt]: dateTimeCursor
                }
            },
            order: [['createdAt', 'DESC']]
        });
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
