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

    @Field({ nullable: true })
    @Length(5, 5000)
    public pictureURL?: string;
}

@ArgsType()
class GetNewsPostsInput {
    @Field(() => Int)
    public limit: number = 10;

    @Field(() => Int)
    public offset!: number;
}


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
    public async getNewsPosts(@Args() { limit, offset }: GetNewsPostsInput) {
        return NewsPost.findAll({ offset, limit });
    }
}
