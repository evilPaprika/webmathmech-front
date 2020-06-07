import { Length } from 'class-validator';
import { ArgsType, Field } from 'type-graphql';

import NewsPost from '../../models/NewsPost.sequelize';


@ArgsType()
export class CreateNewsPostInput implements Partial<NewsPost> {
    @Field()
    @Length(10, 2500, {
        message: 'Описание должно быть длиной от 10 до 2500 символов!'
    })
    public description!: string;

    @Field({ nullable: true })
    @Length(5, 2048)
    public pictureURL?: string;
}


@ArgsType()
export class PatchNewsPostInputs implements Partial<NewsPost> {
    @Field()
    public id!: string;

    @Field({ nullable: true })
    @Length(10, 2500, {
        message: 'Описание должно быть длиной от 10 до 2500 символов!'
    })
    public description!: string;

    @Field({ nullable: true })
    @Length(5, 2048)
    public pictureURL?: string;
}
