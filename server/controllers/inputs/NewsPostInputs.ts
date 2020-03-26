import { ArgsType, Field } from 'type-graphql';
import { Length } from 'class-validator';


@ArgsType()
export class CreateNewsPostInput {
    @Field()
    @Length(10, 5000)
    public text!: string;

    @Field({ nullable: true })
    @Length(5, 5000)
    public pictureURL?: string;
}
