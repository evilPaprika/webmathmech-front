import {
    Arg,
    Args,
    Mutation,
    Query,
    Resolver,
    ArgsType,
    Field,
    Int,
} from 'type-graphql';
import { Length } from 'class-validator';
import NewsPost from '../models/NewsPost.sequelize';


@ArgsType()
class CreateNewsPostInput {
    @Field()
    @Length(10, 5000)
    public text!: string;
}

@ArgsType()
class GetNewsPostsInput {
    @Field(() => Int)
    public limit!: number;

    @Field(() => Int)
    public offset!: number;
}


@Resolver(NewsPost)
export default class NewsPostResolver {
    @Mutation(() => NewsPost)
    public async createNewsPost(@Args() { text }: CreateNewsPostInput) {
        return NewsPost.create({
            text
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
    public async getNewsPosts(@Args() { limit, offset }: GetNewsPostsInput) {
        return NewsPost.findAll({ offset, limit });
    }
}
