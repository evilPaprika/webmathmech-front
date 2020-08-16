import { Op } from 'sequelize';
import {
    Arg,
    Args,
    Authorized,
    Mutation,
    Query,
    Resolver,
} from 'type-graphql';

import { Role } from '../models/EnumModels';
import NewsPost from '../models/NewsPost.sequelize';
import { CreateNewsPostInput, PatchNewsPostInputs } from './inputs/NewsPostInputs';
import { CursorPaginationInputs, OffsetPaginationInputs } from './inputs/PaginationInputs';


@Resolver(NewsPost)
export default class NewsPostResolver {
    @Authorized([Role.ADMIN])
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
    public async getNewsPostsCursor(@Args() { limit, dateTimeCursor }: CursorPaginationInputs) {
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

    @Authorized([Role.ADMIN])
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

    @Authorized([Role.ADMIN])
    @Mutation(() => Boolean)
    public async removeNewsPost(@Arg('id') id : string) {
        return Boolean(await NewsPost.destroy({ where: { id } }));
    }
}
