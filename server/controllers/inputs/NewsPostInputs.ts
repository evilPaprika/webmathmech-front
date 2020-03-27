import { ArgsType, Field } from 'type-graphql';
import { Length } from 'class-validator';


@ArgsType()
export class CreateNewsPostInput {
    @Field()
    @Length(10, 2500)
    public text!: string;

    @Field({ nullable: true })
    @Length(5, 2048)
    public pictureURL?: string;
}
