import { ArgsType, Field } from 'type-graphql';
import { Length } from 'class-validator';
import NewsPost from '../../models/NewsPost.sequelize';


@ArgsType()
export class CreateNewsPostInput implements Partial<NewsPost> {
    @Field()
    @Length(10, 2500)
    public text!: string;

    @Field({ nullable: true })
    @Length(5, 2048)
    public pictureURL?: string;
}
